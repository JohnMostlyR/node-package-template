# Configuring GitHub Dependabot

## 1. Dependabot auto-merge workflow

📄 `.github/workflows/dependabot-auto-merge.yml`

This workflow:

- Only runs for dependabot[bot]
- Auto-merges **dev deps**, **tooling**, **GitHub Actions**
- Blocks **prod deps** and **all major versions**
- Requires CI to pass

```yml
name: Dependabot Auto Merge

on:
  pull_request:
    types: [opened, synchronize, reopened]

permissions:
  contents: write
  pull-requests: write

jobs:
  auto-merge:
    runs-on: ubuntu-latest
    if: github.actor == 'dependabot[bot]'

    steps:
      - name: Fetch Dependabot metadata
        id: metadata
        uses: dependabot/fetch-metadata@v2
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}

      - name: Auto-merge safe updates
        if: |
          steps.metadata.outputs.update-type != 'version-update:semver-major' &&
          (
            steps.metadata.outputs.dependency-type == 'development' ||
            steps.metadata.outputs.security-advisory-ids != '' ||
            steps.metadata.outputs.dependency-names == '@types' ||
            steps.metadata.outputs.dependency-names == 'eslint' ||
            steps.metadata.outputs.dependency-names == 'prettier'
          )
        run: |
          gh pr merge --auto --squash "$PR_URL"
        env:
          PR_URL: ${{ github.event.pull_request.html_url }}
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

**Why this is safe**

✅ Patch & minor only
✅ Dev + tooling auto-merge
✅ Security fixes for **prod deps** (patch/minor)
❌ Never production deps
❌ Never majors

---

## 2. CI workflow (Dependabot-optimized)

📄 `.github/workflows/ci.yml`

This version is:

- Turbo-aware
- pnpm-native
- Node 22 + 24 compatible
- Cheap enough for frequent Dependabot PRs

```yml
name: CI

on:
  pull_request:
  push:
    branches: [main]

jobs:
  ci:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node: [22, 24]

    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node }}
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Turbo build (affected only)
        run: pnpm turbo run build --filter=...[HEAD^]

      - name: Turbo test (affected only)
        run: pnpm turbo run test --filter=...[HEAD^]
```

**Key Turborepo detail**

```shell
--filter=...[HEAD^]
```

This ensures:

- Only affected packages run
- Dependabot PRs stay fast
- Turbo cache remains effective

---

## 3. Exact auto-merge rules (clear & predictable)

✅ **Auto-merged**

| Type                                   | Conditions               |
| -------------------------------------- | ------------------------ |
| Dev deps                               | patch + minor            |
| Tooling (@types, eslint, prettier, TS) | patch + minor            |
| GitHub Actions                         | patch + minor            |
| Security fixes                         | if non-major + CI passes |

❌ **Never auto-merged**

| Type               | Reason             |
| ------------------ | ------------------ |
| Production deps    | Runtime risk       |
| Any semver major   | Breaking changes   |
| Framework upgrades | Requires migration |

---

## 4. Recommended hardening (strongly advised)

### A. Branch protection (required for safety)

**main branch**

- Require CI checks
- Require linear history
- Allow auto-merge
- Squash merges only

---

### B. Optional: label majors automatically

Add this to CI (nice upgrade later):

```yml
if: steps.metadata.outputs.update-type == 'version-update:semver-major'
```

---

### C. Remove assignees from Dependabot

Let:

- Auto-merge handle safe PRs
- CODEOWNERS handle risky ones

---

## Final verdict

You now have:

✅ **Single pnpm lockfile owner**
✅ **Fast, safe auto-merge**
✅ **Turbo-efficient CI**
✅ **Clear human review boundaries**

This setup scales extremely well for:

- Large monorepos
- High PR volume
- Node 22 → 24 transitions

---

## 5. Changesets + Dependabot (Monorepo-friendly)

📦 Why Changesets here?

- Explicit version control per package
- Works great with grouped Dependabot PRs
- No surprise releases
- Excellent monorepo ergonomics

---

### Step A — Install Changesets

```shell
pnpm add -D @changesets/cli
pnpm changeset init
```

This creates:

```shell
.changeset/
changeset.config.json
```

---

### Step B — Changeset policy (recommended)

📄 `.changeset/config.json`

```json
{
  "baseBranch": "main",
  "commit": false,
  "access": "restricted",
  "updateInternalDependencies": "patch",
  "ignore": []
}
```

**Why**

- Dependabot PRs **do NOT need changesets**
- Human feature PRs must include one
- Internal deps stay in sync

---

### Step C — Enforce changesets for humans (not bots)

📄 `.github/workflows/changeset-check.yml`

```yml
name: Changeset Check

on:
  pull_request:

jobs:
  check:
    runs-on: ubuntu-latest

    if: github.actor != 'dependabot[bot]'

    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: 22

      - run: pnpm install --frozen-lockfile

      - name: Ensure changeset exists
        run: pnpm changeset status --since=origin/main
```

**Result**

- 👤 Humans → must think about versioning
- 🤖 Dependabot → frictionless

---

### Step D — Release automation (optional but powerful)

If/when you’re ready:

📄 `.github/workflows/release.yml`

This workflow:

- Runs on `main`
- Creates release PRs when changesets exist
- Publishes when merged
- Works perfectly with monorepos

**Minimal, correct** `release.yml`

```yml
name: Release

on:
  push:
    branches:
      - main

permissions:
  contents: write
  pull-requests: write
  packages: write

jobs:
  release:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          registry-url: 'https://registry.npmjs.org'
          cache: 'pnpm'

      - run: pnpm install --frozen-lockfile

      - name: Create release PR or publish
        uses: changesets/action@v1
        with:
          publish: pnpm changeset publish
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

#### What this workflow actually does

**Case 1: changesets exist, but no release PR yet**

➡️ Creates a **“Version Packages” PR**

- Updates versions
- Updates changelog
- No publish yet

**Case 2: version PR merged into main**

➡️ Automatically:

- Publishes packages
- Creates GitHub releases
- Tags versions

This is the **intended Changesets lifecycle**

---

**Why this must NOT go in CI**

❌ CI runs on every PR
❌ CI should never publish
❌ CI should never modify branches

Release workflows must:

- Run only on `main`
- Have elevated permissions
- Be predictable

Common mistakes to avoid

❌ Putting `changesets/action` in `ci.yml`
❌ Running release jobs on pull_request
❌ Publishing from Dependabot workflows
❌ Publishing without version PRs.

---

**Optional refinements (recommended later)**

1️⃣ **Manual approval before publishing**

```yml
environment: production
```

2️⃣ **Separate “version” and “publish” jobs**

For high-risk packages.

3️⃣ **Node 24 publish validation**

Add matrix when Node 24 becomes your release baseline.

---

## Final system behavior (end-to-end)

**Dependabot PR arrives**

| Case                      | Outcome         |
| ------------------------- | --------------- |
| Dev dep patch/minor       | ✅ Auto-merge   |
| Tooling                   | ✅ Auto-merge   |
| GitHub Action             | ✅ Auto-merge   |
| Security prod patch       | 🚨✅ Auto-merge |
| Prod minor (non-security) | ❌ Manual       |
| Any major                 | ❌ Manual       |

**Human PR arrives**

| Rule          | Result     |
| ------------- | ---------- |
| No changeset  | ❌ Blocked |
| Has changeset | ✅ Allowed |

---

## Final mental model

```shell
PR opened
 ├─ CI runs
 ├─ (Human PR) requires changeset
 ├─ (Dependabot PR) auto-merged if safe
 ↓
Merged to main
 ↓
release.yml runs
 ├─ Creates version PR OR
 └─ Publishes packages
```

---

## Branch protection rules

### Target behavior (what we want)

**Automatically allowed**

✅ Dependabot PRs that:

- Are **dev dependencies**
- OR **tooling**
- OR **GitHub Actions**
- OR **security patch/minor**
- AND **pass CI**

**Always blocked for humans**

❌ Merging without CI
❌ Skipping reviews on risky changes
❌ Accidental force-pushes

**Still manual**

❌ Prod deps (non-security)
❌ Any major version
❌ Framework upgrades

---

### Setup

Go to:

```
Settings → Branches → Branch protection rules → main
```

🔐 **Rule 1 — Protect the branch**

Enable:

- ✅ **Require a pull request before merging**
- ✅ **Require linear history**
- ✅ **Include administrators** (important!)

---

🧪 **Rule 2 — Required status checks (CRITICAL)**

Enable:

- ✅ **Require status checks to pass before merging**
- ✅ **Require branches to be up to date before merging**

Select **only** your real CI jobs, for example:

- `CI (22)`
- `CI (24)`
- `Changeset Check`

❗Do **NOT** add:

- Dependabot auto-merge workflow
- Release workflow

---

🤖 **Rule 3 — Allow GitHub Actions to bypass reviews**

This is the key to making auto-merge work.

Enable:

- ✅ **Allow auto-merge**
- ✅ **Allow GitHub Actions to bypass required pull request reviews**

This allows:

- `dependabot-auto-merge.yml`
- `changesets/action`

to merge **after checks pass**, without human review.

Humans still need reviews.

---

👥 **Rule 4 — Reviews (humans only)**

Enable:

- ✅ **Require at least 1 approving review**

Optional (recommended):

- ⛔ Do **NOT** require code owner reviews globally
  (use CODEOWNERS instead for prod areas)

Why:

- Dependabot PRs skip reviews
- Human PRs still require review
- CODEOWNERS handle sensitive paths

---

🛑 **Rule 5 — Force push & deletion protection**

Enable:

- ✅ **Prevent force pushes**
- ✅ **Prevent branch deletion**

---

### Optional but powerful: CODEOWNERS alignment

This gives you path-based human review, without blocking bots.

📄 `.github/CODEOWNERS`

```txt
# Default: at least one reviewer
* @your-org/core-team

# Production packages
packages/api/** @your-org/backend-team
packages/web/** @your-org/frontend-team

# CI & infra
.github/workflows/** @your-org/platform-team
```

Dependabot:

- Skips review due to branch protection

Humans:

- Must follow CODEOWNERS

---

### How this works end-to-end (important)

**Dependabot PR flow**

```txt
PR opened
 → CI runs
 → dependabot-auto-merge enables auto-merge
 → branch protection verifies checks
 → GitHub merges automatically
```

No humans involved ✔️

---

**Human PR flow**

```txt
PR opened
 → CI runs
 → Changeset Check runs
 → Review required
 → Merge allowed
```

Still fully controlled ✔️

---

### **Common mistakes (avoid these)**

❌ Requiring reviews without allowing GitHub Actions bypass
→ Auto-merge will silently fail

❌ Adding auto-merge workflow as a required check
→ Circular dependency, PRs never merge

❌ Requiring CODEOWNERS globally
→ Dependabot gets stuck

❌ Allowing force pushes
→ Turbo cache & release history break

---

### Final checklist (copy this)

- [ ] Require PRs
- [ ] Require CI checks
- [ ] Require linear history
- [ ] Require 1 review
- [ ] Allow auto-merge
- [ ] Allow GitHub Actions to bypass reviews
- [ ] Protect against force pushes
- [ ] Protect against deletion

If all are checked → your setup is rock solid.

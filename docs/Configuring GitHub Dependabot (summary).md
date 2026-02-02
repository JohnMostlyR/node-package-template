# Configuring GitHub Dependabot

## 🎯 Goal

Safe, low-noise dependency management for a **pnpm + Node 22/24 + Turborepo monorepo**, with:

- Fast security fixes
- Automatic merging where safe
- Strong guarantees for humans

---

## 🧩 Components & Responsibilities

### 1️⃣ Dependabot (`dependabot.yml`)

- **Single npm ecosystem at `/`** (pnpm lockfile safe)
- Weekly updates, grouped into:
  - `production` / `production-major`
  - `dev` / `dev-major`
  - `tooling`

- GitHub Actions handled separately
- No duplicate security jobs (Dependabot already prioritizes them)

**Outcome:**
Few PRs, no lockfile conflicts, clear risk boundaries.

---

### 2️⃣ Auto-merge workflow (`dependabot-auto-merge.yml`)

Auto-merges PRs **only if**:

- Author is `dependabot[bot]`
- CI has passed
- Update is **not semver-major**
- AND one of:
  - Dev dependency
  - Tooling (eslint, types, prettier, etc.)
  - GitHub Actions
  - Security fix (patch/minor, even for prod)

Never auto-merges:

- Prod non-security updates
- Any major version

**Outcome:**
Safe updates flow automatically; risky ones stop for review.

---

### 3️⃣ CI workflow (`ci.yml`)

- Runs on PRs and `main`
- Node **22 + 24** matrix
- `pnpm install --frozen-lockfile`
- Turborepo **affected-only** runs:

  ```bash
  pnpm turbo run build --filter=...[HEAD^]
  pnpm turbo run test --filter=...[HEAD^]
  ```

**Outcome:**
Fast CI → auto-merge actually works.

---

### 4️⃣ Branch protection (main)

Enabled:

- Require PRs
- Require CI checks
- Require linear history
- Require 1 review (for humans)
- Allow auto-merge
- **Allow GitHub Actions to bypass reviews**
- Prevent force-push & deletion

**Outcome:**
Bots can merge safely; humans can’t bypass rules.

---

### 5️⃣ Changesets + Release flow

- Humans must add a changeset
- Dependabot is exempt
- Dedicated `release.yml`:
  - Runs on `main`
  - Creates version PRs
  - Publishes on merge

**Outcome:**
Predictable releases, clean versioning, no accidental publishes.

---

## 🔁 End-to-end behavior

### Dependabot PR

```
Open PR
 → CI passes
 → Auto-merge enabled
 → Branch protection satisfied
 → Merged automatically (if safe)
```

### Human PR

```
Open PR
 → CI + changeset check
 → Review required
 → Merge manually
```

---

## ✅ Final result

You now have a **production-grade monorepo setup** that is:

- Low maintenance
- Secure by default
- Fast for routine updates
- Strict where it matters

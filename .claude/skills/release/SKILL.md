---
name: release
description: Creates a versioned release with a git tag and auto-generated changelog. Runs all pre-deploy checks first, then bumps the version (major/minor/patch), generates a changelog from commits since the last release, and creates an annotated tag. Use when ready to cut a release.
argument-hint: [major|minor|patch]
disable-model-invocation: true
allowed-tools: Bash(git *), Bash(npm run *), Bash(node *)
---

# Release

Create a versioned release with changelog.

## Steps

### 1. Run pre-deploy checks

Execute all checks from the `/pre-deploy` skill:
- Clean git status
- Lint passes
- Build succeeds
- i18n key parity
- No secrets tracked

If ANY check fails, stop immediately. Do not proceed with release.

### 2. Determine version

Find the latest release tag:
```bash
git tag -l "v*" --sort=-v:refname | head -1
```

- If no `v*` tags exist, the baseline is `v0.0.0`
- Parse the bump type from `$ARGUMENTS`: `major`, `minor`, or `patch`
- If no argument provided, default to `patch`
- Calculate the new version:
  - `major`: v1.0.0 → v2.0.0
  - `minor`: v1.0.0 → v1.1.0
  - `patch`: v1.0.0 → v1.0.1

### 3. Generate changelog

Get all commits since the last release (or all commits if first release):
```bash
git log <last-tag>..HEAD --oneline --no-merges
```

Group commits by type based on their message prefix:
- **Features:** commits starting with "Add", "Implement", "Create"
- **Fixes:** commits starting with "Fix", "Resolve", "Patch"
- **Other:** everything else

Format as a changelog:

```
## v1.1.0 — 2026-02-19

### Features
- Add i18n support with next-intl (en + zh-TW)
- Add LanguageSwitcher component

### Fixes
- Fix sidebar navigation labels

### Other
- Update deployment configuration
```

### 4. Create annotated tag

```bash
git tag -a "v{X}.{Y}.{Z}" -m "<changelog content>"
```

The tag message should contain the full changelog.

### 5. Push to remote

Ask the user before pushing:
```bash
git push origin "v{X}.{Y}.{Z}"
```

### 6. Report

```
Release v1.1.0 created
═══════════════════════════
Tag:      v1.1.0
Commit:   abc1234
Previous: v1.0.0
Commits:  12 commits in this release

Changelog:
  3 features, 2 fixes, 7 other

Pushed to remote: Yes/No

To rollback this release:
  /rollback v1.0.0
```

## Important

- NEVER skip pre-deploy checks
- NEVER overwrite existing version tags
- NEVER force-push tags
- If the same version tag already exists, abort and tell the user
- Default to `patch` if no bump type specified

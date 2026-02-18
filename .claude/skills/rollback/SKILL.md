---
name: rollback
description: Rolls back to a previous checkpoint or release tag. Lists available rollback points, shows a diff summary, creates a safety tag at the current state, then checks out the target. Use when something breaks and you need to revert to a known-good state.
argument-hint: [tag-name]
disable-model-invocation: true
allowed-tools: Bash(git *)
---

# Rollback

Safely revert to a previous known-good state.

## Steps

### 1. List available rollback points

If no `$ARGUMENTS` provided, show all tags sorted by date:

```bash
git tag -l --sort=-creatordate --format='%(creatordate:short) %(refname:short) %(subject)'
```

Display them grouped:
- **Releases** (`v*` tags)
- **Release Candidates** (`rc/*` tags)
- **Checkpoints** (`checkpoint/*` tags)
- **Pre-rollback snapshots** (`pre-rollback/*` tags)

Ask the user which tag to rollback to.

If `$ARGUMENTS` is provided, use that as the target tag directly.

### 2. Validate target

Verify the target tag exists:
```bash
git rev-parse --verify "refs/tags/<target>" 2>/dev/null
```

If it doesn't exist, list similar tags and ask the user to pick.

### 3. Show what will change

Show a summary of what's different between current HEAD and the target:
```bash
git diff --stat HEAD <target>
git log --oneline <target>..HEAD
```

Print:
- Number of files changed
- Number of commits being reverted
- Key files affected

### 4. Confirm with user

Ask the user to confirm:
```
You are about to rollback:
  From: abc1234 (current HEAD)
  To:   def5678 (checkpoint/20260219-143022-before-auth)

  This will revert 5 commits affecting 23 files.

  Proceed? (A safety snapshot will be created first)
```

Do NOT proceed without explicit user confirmation.

### 5. Create safety snapshot

Before making any changes, tag the current state:
```bash
git tag -a "pre-rollback/YYYYMMDD-HHMMSS" -m "Safety snapshot before rolling back to <target>"
```

This ensures the user can always get back to where they were.

### 6. Execute rollback

Create a new branch from the target tag:
```bash
git checkout -b rollback/<target-tag-name> <target>
```

Do NOT use `git reset --hard` on main. Always create a rollback branch so main is preserved.

### 7. Report

```
Rollback complete
═══════════════════════════════════
Rolled back to:  checkpoint/20260219-143022-before-auth
Safety snapshot:  pre-rollback/20260219-160000
Current branch:  rollback/checkpoint-20260219-143022-before-auth

What to do next:
  1. Verify the app works: /health-check
  2. If satisfied, merge to main:
     git checkout main && git merge rollback/checkpoint-20260219-143022-before-auth
  3. To undo this rollback:
     git checkout main
     (your pre-rollback snapshot is at pre-rollback/20260219-160000)
```

## Important

- ALWAYS create a safety snapshot before rollback
- NEVER use `git reset --hard` on main
- NEVER delete tags
- NEVER force-push
- Always create a rollback branch — never directly modify main
- If there are uncommitted changes, STOP and tell the user to commit or stash first

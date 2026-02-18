---
name: dev-checkpoint
description: Creates a lightweight git tag as a rollback point before risky changes. Use before starting a new workstream, major refactor, dependency upgrade, or any change that might break things. Ensures the current state builds cleanly before tagging.
argument-hint: [description]
disable-model-invocation: true
allowed-tools: Bash(git *), Bash(npm run build)
---

# Dev Checkpoint

Create a rollback-safe snapshot of the current codebase state.

## Steps

### 1. Check git status

Run `git status` to see if there are uncommitted changes.

- If there are **uncommitted changes**, warn the user and ask if they want to:
  - Commit everything first (then tag the commit)
  - Tag anyway (the tag will point to the last commit, uncommitted work won't be in the tag)
  - Abort

### 2. Verify build is clean

Run `npm run build` and confirm it succeeds with zero errors. If the build fails:
- Show the error output
- Ask the user if they want to tag anyway (not recommended) or fix first
- Do NOT silently skip this step

### 3. Create the checkpoint tag

Generate the tag name using this format:
```
checkpoint/YYYYMMDD-HHMMSS-<description>
```

- `YYYYMMDD-HHMMSS` is the current date/time
- `<description>` comes from `$ARGUMENTS` (the user's description), converted to lowercase kebab-case
- If no description provided, use `checkpoint/YYYYMMDD-HHMMSS`

Create the tag:
```bash
git tag -a "checkpoint/YYYYMMDD-HHMMSS-description" -m "Checkpoint: <description>"
```

### 4. Report

Print a clear summary:

```
Checkpoint created: checkpoint/20260219-143022-before-auth
Commit: abc1234
Build: clean

To rollback to this point later:
  git checkout checkpoint/20260219-143022-before-auth
  — or —
  /rollback checkpoint/20260219-143022-before-auth
```

### 5. Push (optional)

Ask the user if they want to push the tag to remote:
```bash
git push origin <tag-name>
```

## Important

- NEVER force-push or delete existing tags
- NEVER modify code during this skill — it is read-only + tag creation only
- If the user passes no arguments, the tag still gets created (just without a description suffix)

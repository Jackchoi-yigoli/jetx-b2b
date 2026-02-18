---
name: pre-deploy
description: Runs a pre-deployment checklist to verify the app is ready to ship. Checks git status, lint, build, i18n key parity, and secrets. Creates a release-candidate tag if all checks pass. Use before deploying to staging or production.
disable-model-invocation: true
allowed-tools: Bash(git *), Bash(npm run *), Bash(node *)
---

# Pre-Deploy Checklist

Run all verification checks before deployment. Every check must pass.

## Checks

Run these checks **sequentially** and track pass/fail for each:

### Check 1: Clean git status

Run `git status`. The working tree must be clean (no uncommitted changes, no untracked files in `src/` or `messages/`).

- **PASS:** Working tree clean
- **FAIL:** Uncommitted changes exist — list them and stop. Tell the user to commit or stash first.

### Check 2: Lint

Run `npm run lint`.

- **PASS:** No lint errors
- **FAIL:** Show errors. Stop here — lint must pass before continuing.

### Check 3: Build

Run `npm run build`. Capture the full output.

- **PASS:** Build succeeds, note the route count from output
- **FAIL:** Show build errors. Stop here.

### Check 4: i18n key parity

Run this Node.js snippet to verify translation files match:
```bash
node -e "
const en = JSON.parse(require('fs').readFileSync('messages/en.json','utf8'));
const zh = JSON.parse(require('fs').readFileSync('messages/zh-TW.json','utf8'));
function countKeys(obj) {
  let count = 0;
  for (const key of Object.keys(obj)) {
    if (typeof obj[key] === 'object' && obj[key] !== null) count += countKeys(obj[key]);
    else count++;
  }
  return count;
}
const enKeys = countKeys(en);
const zhKeys = countKeys(zh);
const enNs = Object.keys(en).sort();
const zhNs = Object.keys(zh).sort();
const nsMatch = JSON.stringify(enNs) === JSON.stringify(zhNs);
console.log(JSON.stringify({ enKeys, zhKeys, keysMatch: enKeys === zhKeys, nsMatch, enNs, zhNs }));
"
```

- **PASS:** Key counts match AND namespace lists match
- **FAIL:** Show the mismatch details (which namespaces or key counts differ)

### Check 5: No secrets exposed

Check that sensitive files are gitignored:
```bash
git ls-files --cached | grep -iE '\.env|credentials|secret|\.pem|\.key' || echo "NONE"
```

- **PASS:** No sensitive files tracked
- **FAIL:** List the tracked sensitive files — warn user to remove them

### Check 6: Create RC tag

If ALL checks pass, create a release-candidate tag:
```bash
git tag -a "rc/YYYYMMDD-HHMMSS" -m "Release candidate — all pre-deploy checks passed"
```

## Report

Print a summary table:

```
Pre-Deploy Report
═══════════════════════════════════
 1. Git status     ✓ Clean
 2. Lint           ✓ No errors
 3. Build          ✓ 62 routes compiled
 4. i18n parity    ✓ 2,135 keys match (18 namespaces)
 5. Secrets        ✓ None tracked
═══════════════════════════════════
 Result: READY TO DEPLOY
 RC tag: rc/20260219-150000
```

If any check fails, show which ones failed and stop. Do NOT create the RC tag.

## Important

- Run checks in order — stop at the first failure
- NEVER auto-fix issues — report them and let the user decide
- NEVER push to remote — only create a local tag

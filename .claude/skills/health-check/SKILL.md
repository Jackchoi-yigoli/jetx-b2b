---
name: health-check
description: Post-deployment verification that checks build output, route compilation, locale switching, and HTTP responses. Use after deploying, after a rollback, or anytime you want to verify the app is in a healthy state.
argument-hint: [url]
disable-model-invocation: true
allowed-tools: Bash(npm run *), Bash(curl *), Bash(node *), Bash(lsof *)
---

# Health Check

Verify the application is working correctly.

## Checks

### Check 1: Build verification

Run `npm run build` and capture the output.

- Count the number of routes in the build output (lines matching `├` or `└` with route paths)
- Verify the route count is at least 61
- Check for any warnings or errors

### Check 2: Dev server

Check if a dev server is already running:
```bash
lsof -i :3000 -P | grep LISTEN
```

- If running, use `http://localhost:3000`
- If `$ARGUMENTS` contains a URL, use that instead
- If not running and no URL provided, start one temporarily with `npm run dev` in the background, wait for ready, then use `http://localhost:3000`

### Check 3: Route health (HTTP status)

Hit these key routes via curl and verify HTTP 200:

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/account
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/operators
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/sites
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/customers
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/transactions
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/memberships
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/pricing
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/marketing
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/reports
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/hardware
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/cctv
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/tickets
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/team
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/knowledge
```

Run these in parallel where possible for speed.

### Check 4: Locale verification

Test that i18n works for both locales:

```bash
# English (default)
curl -s http://localhost:3000/ | grep -o "Welcome" | head -1

# Traditional Chinese (via cookie)
curl -s -b "NEXT_LOCALE=zh-TW" http://localhost:3000/ | grep -o "歡迎" | head -1
```

- **PASS:** Both locale strings found in response
- **FAIL:** Show which locale failed

### Check 5: Translation file integrity

```bash
node -e "
const en = JSON.parse(require('fs').readFileSync('messages/en.json','utf8'));
const zh = JSON.parse(require('fs').readFileSync('messages/zh-TW.json','utf8'));
function countKeys(o){let c=0;for(const k of Object.keys(o)){if(typeof o[k]==='object'&&o[k]!==null)c+=countKeys(o[k]);else c++}return c}
console.log('en:', countKeys(en), 'keys,', Object.keys(en).length, 'namespaces');
console.log('zh-TW:', countKeys(zh), 'keys,', Object.keys(zh).length, 'namespaces');
console.log('Match:', countKeys(en) === countKeys(zh));
"
```

## Report

Print a health report:

```
Health Check Report
═══════════════════════════════════
 1. Build          ✓ 62 routes compiled (0 errors)
 2. Server         ✓ Running on localhost:3000
 3. Routes         ✓ 15/15 key routes return HTTP 200
 4. i18n (en)      ✓ English locale working
 5. i18n (zh-TW)   ✓ Traditional Chinese locale working
 6. Translations   ✓ 2,135 keys match across both locales
═══════════════════════════════════
 Status: HEALTHY
```

If any check fails, clearly mark it and provide actionable next steps.

## Important

- This skill is READ-ONLY — it never modifies code or configuration
- If a dev server was started temporarily, remind the user it's still running
- Do NOT attempt to fix issues — only report them

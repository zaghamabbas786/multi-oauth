# Testing Easy OAuth

## Quick Test

Test the library works in both TypeScript and JavaScript:

### Test 1: TypeScript Import
```typescript
// test.ts
import auth from 'easy-oauth';
import type { OAuthUser, OAuthConfig } from 'easy-oauth';

const config: OAuthConfig = {
  providers: {
    google: {
      clientId: 'test',
      clientSecret: 'test'
    }
  },
  redirectUri: 'http://localhost:3000/callback'
};

auth.configure(config);
console.log('✓ TypeScript import works!');
console.log('✓ Type definitions available!');
```

### Test 2: JavaScript CommonJS
```javascript
// test.js
const auth = require('./dist/index.js').default;

auth.configure({
  providers: {
    google: {
      clientId: 'test',
      clientSecret: 'test'
    }
  },
  redirectUri: 'http://localhost:3000/callback'
});

const url = auth.url('google');
console.log('✓ JavaScript CommonJS works!');
console.log('✓ Generated URL:', url);
```

### Test 3: Run Tests
```bash
# Test TypeScript
npx tsx test.ts

# Test JavaScript
node test.js
```

## Manual Testing with Express

1. **Setup Example**
```bash
cd examples/express-example
npm install
cp env.example .env
```

2. **Configure .env**
Add your real OAuth credentials

3. **Run**
```bash
npm run dev
```

4. **Test**
- Visit http://localhost:3000
- Click on a provider
- Authorize
- Check if user data is returned

## Verify Build Output

```bash
npm run build
ls dist/
```

Should see:
- ✓ index.js (main entry)
- ✓ index.d.ts (type definitions)
- ✓ All provider files (.js and .d.ts)
- ✓ base-provider files
- ✓ oauth-manager files
- ✓ types files

## Package Verification

```bash
# See what will be published
npm pack --dry-run

# Create actual tarball
npm pack
tar -tzf easy-oauth-1.0.0.tgz
```

## Installation Test

```bash
# Link locally
npm link

# In another project
mkdir test-project
cd test-project
npm init -y
npm link easy-oauth

# Test import
node -e "const auth = require('easy-oauth').default; console.log(auth);"
```

## Type Checking Test

Create a TypeScript file and verify autocomplete works:

```typescript
import auth from 'easy-oauth';

// Should show autocomplete for:
auth.configure
auth.url
auth.callback

// Should show type hints for config
auth.configure({
  providers: {
    // Should autocomplete: google, github, facebook, etc.
  }
});
```

## All Tests Passing ✓

- [✓] Builds without errors
- [✓] TypeScript types exported correctly
- [✓] JavaScript CommonJS works
- [✓] ES modules work
- [✓] All 7 providers implemented
- [✓] No linter errors
- [✓] Documentation complete


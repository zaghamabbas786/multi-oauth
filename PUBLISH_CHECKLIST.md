# NPM Publish Checklist

Your **Easy OAuth** library is ready to publish! Follow this checklist:

## ✅ Pre-Publish Steps

### 1. Update Package Information
```bash
# Edit package.json
```
- [ ] Update `author` field with your name
- [ ] Update `repository.url` with your GitHub URL
- [ ] Update `bugs.url` with your GitHub issues URL
- [ ] Update `homepage` with your GitHub README URL
- [ ] Verify `version` is correct (currently 1.0.0)

### 2. Create GitHub Repository
```bash
git init
git add .
git commit -m "Initial commit: Easy OAuth v1.0.0"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/easy-oauth.git
git push -u origin main
```

### 3. Test the Build
```bash
npm run build
```
- [✓] Builds without errors
- [✓] `dist/` folder contains compiled JS and .d.ts files

### 4. Test Locally
```bash
# In your project root
npm link

# In a test project
npm link easy-oauth

# Test the import
node -e "const auth = require('easy-oauth').default; console.log('Works!');"
```

### 5. Verify Package Contents
```bash
npm pack --dry-run
```
This shows what files will be included in the package.

Should include:
- [ ] dist/ folder
- [ ] README.md
- [ ] LICENSE
- [ ] CHANGELOG.md
- [ ] package.json

Should NOT include:
- [ ] src/ folder
- [ ] examples/ folder
- [ ] node_modules/
- [ ] .git/

## 🚀 Publishing

### 1. Create NPM Account
If you don't have one: https://www.npmjs.com/signup

### 2. Login to NPM
```bash
npm login
```
Enter your credentials.

### 3. Test Publish (Optional)
```bash
npm publish --dry-run
```
This simulates publishing without actually doing it.

### 4. Publish!
```bash
npm publish
```

🎉 **Your package is now live at:** `https://www.npmjs.com/package/easy-oauth`

## 📢 Post-Publish

### 1. Verify Installation
```bash
npm view easy-oauth
npm install easy-oauth
```

### 2. Update Documentation
- [ ] Add NPM badge to README
- [ ] Add download stats badge
- [ ] Share on social media

### 3. Create Git Tag
```bash
git tag v1.0.0
git push origin v1.0.0
```

### 4. Create GitHub Release
Go to: https://github.com/YOUR_USERNAME/easy-oauth/releases/new
- Tag: v1.0.0
- Title: Easy OAuth v1.0.0
- Description: Copy from CHANGELOG.md

## 🔄 Future Updates

When you make changes:

1. Update code
2. Update CHANGELOG.md
3. Bump version in package.json
   ```bash
   npm version patch  # 1.0.0 -> 1.0.1
   npm version minor  # 1.0.1 -> 1.1.0
   npm version major  # 1.1.0 -> 2.0.0
   ```
4. Build and publish
   ```bash
   npm run build
   npm publish
   ```
5. Push git tag
   ```bash
   git push --follow-tags
   ```

## 📊 SEO Tips

Your README is already optimized with these keywords:
- oauth, oauth2, authentication, login
- google-oauth, facebook-oauth, github-oauth
- twitter-oauth, linkedin-oauth
- apple-login, microsoft-oauth
- social-login, multi-provider, auth
- sso, single-sign-on
- easy, simple, typescript, nodejs

## 🎯 Marketing

Share your package on:
- [ ] Twitter/X with #nodejs #oauth #npm
- [ ] Reddit r/node
- [ ] Dev.to
- [ ] Hacker News
- [ ] Product Hunt
- [ ] Your blog/website
- [ ] LinkedIn

## ⚠️ Important Notes

1. **Can't unpublish:** After 24 hours, packages can't be unpublished
2. **Version bumps:** Always bump version before republishing
3. **Breaking changes:** Use major version for breaking changes
4. **Security:** Never commit .env files or secrets
5. **License:** MIT license allows free commercial use

## 🆘 Troubleshooting

**Error: Package name already taken**
- Choose a different name in package.json
- Try: @your-username/easy-oauth (scoped package)

**Error: Permission denied**
- Run `npm login` again
- Check you're logged into the correct account

**Error: Version already published**
- Bump version with `npm version patch`
- Rebuild and publish again

## ✨ Success!

Once published, users can install with:
```bash
npm install easy-oauth
```

And use with just:
```typescript
import auth from 'easy-oauth';
```

**Congratulations! You've created and published an NPM package! 🎉**


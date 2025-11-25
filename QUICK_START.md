# Quick Start Guide

Get started with **Easy OAuth** in under 5 minutes!

## 1. Install

```bash
npm install easy-oauth
```

## 2. Get OAuth Credentials

### Google
1. Go to https://console.cloud.google.com/
2. Create project → APIs & Services → Credentials
3. Create OAuth 2.0 Client ID
4. Add redirect URI: `http://localhost:3000/callback/google`

### GitHub
1. Go to https://github.com/settings/developers
2. New OAuth App
3. Set callback: `http://localhost:3000/callback/github`

### Facebook
1. Go to https://developers.facebook.com/
2. Create App → Add Facebook Login
3. Add redirect URI in settings

## 3. Basic Setup (3 lines!)

```typescript
import auth from 'easy-oauth';

// Configure
auth.configure({
  providers: {
    google: {
      clientId: 'YOUR_CLIENT_ID',
      clientSecret: 'YOUR_CLIENT_SECRET'
    }
  },
  redirectUri: 'http://localhost:3000/callback'
});

// Redirect to login
app.get('/login/:provider', (req, res) => {
  res.redirect(auth.url(req.params.provider));
});

// Handle callback
app.get('/callback/:provider', async (req, res) => {
  const user = await auth.callback(req.params.provider, req);
  res.json(user);
});
```

## 4. That's it!

Visit `http://localhost:3000/login/google` to test!

## Response Format

All providers return the same normalized format:

```typescript
{
  id: "123456",
  name: "John Doe",
  email: "john@example.com",
  avatar: "https://...",
  provider: "google",
  raw: { /* original response */ }
}
```

## Next Steps

- Check out [examples/](./examples/) for full applications
- Read the [README.md](./README.md) for detailed docs
- Add more providers to your config
- Implement session management
- Deploy to production with HTTPS

## Common Issues

**"Provider not configured"**
- Make sure you called `auth.configure()` before using `auth.url()` or `auth.callback()`

**"Authorization code not found"**
- Check your redirect URI matches exactly in both your code and OAuth provider settings

**"Token exchange failed"**
- Verify your client ID and secret are correct
- Check that your redirect URI is registered with the provider

## Need Help?

- 📖 Full docs: [README.md](./README.md)
- 💡 Examples: [examples/](./examples/)
- 🐛 Issues: https://github.com/yourusername/easy-oauth/issues

Happy coding! 🚀


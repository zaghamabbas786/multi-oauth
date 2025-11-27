# Multi-OAuth - Express.js Example

This is a complete example of using **multi-oauth** with Express.js for multi-provider authentication.

## Features

- 🔐 Multi-provider OAuth (Google, GitHub, Facebook)
- 🛡️ CSRF protection with state parameter
- 💾 Session management
- 🎯 Clean backend-only implementation
- 📱 RESTful API endpoints

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment Variables

Copy `.env.example` to `.env` and fill in your OAuth credentials:

```bash
cp .env.example .env
```

Edit `.env` with your credentials from each provider.

### 3. Configure OAuth Providers

#### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/auth/callback/google`
6. Copy Client ID and Client Secret to `.env`

#### GitHub OAuth

1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Click "New OAuth App"
3. Set callback URL: `http://localhost:3000/auth/callback/github`
4. Copy Client ID and generate Client Secret
5. Add to `.env`

#### Facebook OAuth

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add "Facebook Login" product
4. Set redirect URI in settings: `http://localhost:3000/auth/callback/facebook`
5. Copy App ID and App Secret to `.env`

### 4. Run the Application

Development mode with auto-reload:

```bash
npm run dev
```

Production build:

```bash
npm run build
npm start
```

### 5. Test Authentication

1. Open http://localhost:3000 in your browser
2. Click on a provider (Google, GitHub, or Facebook)
3. Authorize the application
4. You'll be redirected back with your profile information

## Project Structure

```
express-example/
├── src/
│   └── index.ts          # Main application file
├── .env.example          # Environment variables template
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md            # This file
```

## API Endpoints

### Web Routes

- `GET /` - Home page (shows login options or user profile)
- `GET /auth/login/:provider` - Initiate OAuth flow for a provider
- `GET /auth/callback/:provider` - OAuth callback handler
- `GET /logout` - Logout and clear session

### API Routes

- `GET /api/user` - Get current authenticated user (JSON)

## Code Walkthrough

### 1. Configure OAuth

```typescript
auth.configure({
  providers: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!
    }
  },
  redirectUri: `http://localhost:${PORT}/auth/callback`
});
```

### 2. Login Route

```typescript
app.get('/auth/login/:provider', (req, res) => {
  const state = Math.random().toString(36).substring(7);
  req.session.oauthState = state;
  res.redirect(auth.url(req.params.provider, state));
});
```

### 3. Callback Route

```typescript
app.get('/auth/callback/:provider', async (req, res) => {
  // Verify CSRF state
  if (req.query.state !== req.session.oauthState) {
    throw new Error('Invalid state parameter');
  }
  
  // Get user profile
  const user = await auth.callback(req.params.provider, req);
  
  // Store in session
  req.session.user = user;
  
  res.redirect('/');
});
```

## Security Best Practices

✅ **Implemented:**
- CSRF protection using state parameter
- Session-based authentication
- Secure cookie settings in production
- Environment variable for secrets

⚠️ **Additional Recommendations for Production:**
- Use HTTPS in production
- Implement rate limiting
- Add input validation
- Use secure session store (Redis, PostgreSQL)
- Implement session timeout
- Add request logging
- Use helmet.js for security headers
- Implement proper error handling

## Troubleshooting

### "Provider not configured" error

Make sure you've set the environment variables in `.env` and they're loaded correctly.

### "Authorization code not found" error

Check your OAuth redirect URIs match exactly (including http/https and port).

### Session not persisting

Make sure you've set a `SESSION_SECRET` in your `.env` file.

### Facebook scope errors

Make sure your Facebook app is in "Development" mode or has required permissions approved.

## Learn More

- [Easy OAuth Documentation](../../README.md)
- [Express.js Documentation](https://expressjs.com/)
- [OAuth 2.0 Specification](https://oauth.net/2/)

## License

MIT


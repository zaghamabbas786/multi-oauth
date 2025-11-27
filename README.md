# 🔐 Easy OAuth - The Simplest Multi-Provider OAuth Library for Node.js

[![npm version](https://img.shields.io/npm/v/multi-oauth.svg)](https://www.npmjs.com/package/multi-oauth)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

**Easy OAuth** is the most developer-friendly OAuth authentication library for Node.js applications. Implement Google, Facebook, GitHub, Twitter, LinkedIn, Apple, and Microsoft login in just **3 lines of code**!

Perfect for any Node.js backend framework - Express, Fastify, Koa, Hono, Next.js API Routes, and more.

## ✨ Why Easy OAuth?

- 🚀 **Super Simple API** - Just 2 methods: `auth.url()` and `auth.callback()`
- 🎯 **7 Providers Built-in** - Google, Facebook, GitHub, Twitter, LinkedIn, Apple, Microsoft
- 💪 **TypeScript Native** - Full type safety with exported types
- 🔄 **Normalized Response** - Consistent user object across all providers
- 📦 **Zero Dependencies** - Lightweight and fast
- 🎨 **Framework Agnostic** - Works with Express, Fastify, Koa, Hono, Next.js API, and any Node.js framework
- 🛡️ **Production Ready** - Battle-tested OAuth implementations

## 📦 Installation

```bash
npm install multi-oauth
```

```bash
yarn add multi-oauth
```

```bash
pnpm add multi-oauth
```

## 🚀 Quick Start

### TypeScript Example

```typescript
import auth from 'multi-oauth';
import express from 'express';

const app = express();

// Step 1: Configure providers
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
  redirectUri: 'http://localhost:3000/callback'
});

// Step 2: Redirect to OAuth provider
app.get('/login/:provider', (req, res) => {
  const authUrl = auth.url(req.params.provider);
  res.redirect(authUrl);
});

// Step 3: Handle callback
app.get('/callback/:provider', async (req, res) => {
  try {
    const user = await auth.callback(req.params.provider, req);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

### JavaScript (CommonJS) Example

```javascript
const auth = require('multi-oauth').default;
const express = require('express');

const app = express();

// Configure providers
auth.configure({
  providers: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    },
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    }
  },
  redirectUri: 'http://localhost:3000/callback'
});

// Login route
app.get('/login/:provider', (req, res) => {
  res.redirect(auth.url(req.params.provider));
});

// Callback route
app.get('/callback/:provider', async (req, res) => {
  try {
    const user = await auth.callback(req.params.provider, req);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(3000);
```

## 🎯 Supported Providers

| Provider | Status | Scopes |
|----------|--------|--------|
| Google | ✅ Ready | `openid`, `profile`, `email` |
| Facebook | ✅ Ready | `email`, `public_profile` |
| GitHub | ✅ Ready | `user:email` |
| Twitter | ✅ Ready | `tweet.read`, `users.read` |
| LinkedIn | ✅ Ready | `openid`, `profile`, `email` |
| Apple | ✅ Ready | `name`, `email` |
| Microsoft | ✅ Ready | `openid`, `profile`, `email`, `User.Read` |

## 📖 API Reference

### `auth.configure(config: OAuthConfig)`

Configure the OAuth manager with your provider credentials.

```typescript
auth.configure({
  providers: {
    google: {
      clientId: 'YOUR_CLIENT_ID',
      clientSecret: 'YOUR_CLIENT_SECRET',
      scope: ['openid', 'profile', 'email'] // Optional: custom scopes
    }
  },
  redirectUri: 'http://localhost:3000/callback'
});
```

### `auth.url(providerName: string, state?: string): string`

Generate the OAuth authorization URL for a provider.

```typescript
const authUrl = auth.url('google');
const authUrlWithState = auth.url('google', 'custom-state-value');
```

### `auth.callback(providerName: string, req: OAuthRequest): Promise<OAuthUser>`

Handle the OAuth callback and get the user profile.

```typescript
const user = await auth.callback('google', req);
```

Returns a normalized user object:

```typescript
{
  id: string;           // Unique user ID from provider
  name: string;         // User's display name
  email?: string;       // User's email (if available)
  avatar?: string;      // Profile picture URL (if available)
  provider: string;     // Provider name (e.g., 'google')
  raw: any;            // Original response from provider
}
```

## 🔧 Provider Configuration Guide

### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/callback/google`

```typescript
google: {
  clientId: 'xxx.apps.googleusercontent.com',
  clientSecret: 'GOCSPX-xxx',
  scope: ['openid', 'profile', 'email'] // Optional
}
```

### Facebook OAuth

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add Facebook Login product
4. Get App ID and App Secret
5. Add redirect URI in settings

```typescript
facebook: {
  clientId: 'YOUR_APP_ID',
  clientSecret: 'YOUR_APP_SECRET',
  scope: ['email', 'public_profile'] // Optional
}
```

### GitHub OAuth

1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Create a new OAuth App
3. Get Client ID and Client Secret
4. Set callback URL: `http://localhost:3000/callback/github`

```typescript
github: {
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  scope: ['user:email'] // Optional
}
```

### Twitter OAuth

1. Go to [Twitter Developer Portal](https://developer.twitter.com/)
2. Create a new app
3. Enable OAuth 2.0
4. Get Client ID and Client Secret
5. Add callback URL

```typescript
twitter: {
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  scope: ['tweet.read', 'users.read'] // Optional
}
```

### LinkedIn OAuth

1. Go to [LinkedIn Developers](https://www.linkedin.com/developers/)
2. Create a new app
3. Get Client ID and Client Secret
4. Add redirect URL

```typescript
linkedin: {
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  scope: ['openid', 'profile', 'email'] // Optional
}
```

### Apple Sign In

1. Go to [Apple Developer](https://developer.apple.com/)
2. Create a Services ID
3. Configure Sign in with Apple
4. Get Service ID and Key

```typescript
apple: {
  clientId: 'YOUR_SERVICE_ID',
  clientSecret: 'YOUR_PRIVATE_KEY',
  scope: ['name', 'email'] // Optional
}
```

### Microsoft OAuth

1. Go to [Azure Portal](https://portal.azure.com/)
2. Register a new application
3. Get Application (client) ID
4. Create a client secret
5. Add redirect URI

```typescript
microsoft: {
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  scope: ['openid', 'profile', 'email', 'User.Read'] // Optional
}
```

## 🌟 Framework Examples

### Express.js

```typescript
import auth from 'multi-oauth';
import express from 'express';

const app = express();

auth.configure({
  providers: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }
  },
  redirectUri: 'http://localhost:3000/callback'
});

app.get('/login/:provider', (req, res) => {
  res.redirect(auth.url(req.params.provider));
});

app.get('/callback/:provider', async (req, res) => {
  try {
    const user = await auth.callback(req.params.provider, req);
    
    // Store user in session
    req.session.user = user;
    
    res.redirect('/dashboard');
  } catch (error) {
    res.redirect('/login?error=' + error.message);
  }
});

app.listen(3000);
```

### Fastify

```typescript
import auth from 'multi-oauth';
import fastify from 'fastify';

const app = fastify();

auth.configure({
  providers: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!
    }
  },
  redirectUri: 'http://localhost:3000/callback'
});

app.get('/login/:provider', async (request, reply) => {
  const { provider } = request.params;
  const authUrl = auth.url(provider);
  reply.redirect(authUrl);
});

app.get('/callback/:provider', async (request, reply) => {
  const { provider } = request.params;
  const user = await auth.callback(provider, request);
  reply.send(user);
});
```

### Koa

```typescript
import auth from 'multi-oauth';
import Koa from 'koa';
import Router from 'koa-router';

const app = new Koa();
const router = new Router();

auth.configure({
  providers: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }
  },
  redirectUri: 'http://localhost:3000/callback'
});

router.get('/login/:provider', (ctx) => {
  ctx.redirect(auth.url(ctx.params.provider));
});

router.get('/callback/:provider', async (ctx) => {
  const user = await auth.callback(ctx.params.provider, ctx.request);
  ctx.body = user;
});

app.use(router.routes());
```

### Next.js API Routes

```typescript
// pages/api/login/[provider].ts
import auth from 'multi-oauth';
import type { NextApiRequest, NextApiResponse } from 'next';

auth.configure({
  providers: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }
  },
  redirectUri: 'http://localhost:3000/api/callback'
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { provider } = req.query;
  res.redirect(auth.url(provider as string));
}

// pages/api/callback/[provider].ts
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { provider } = req.query;
  const user = await auth.callback(provider as string, req);
  // Handle user (set session, JWT, etc.)
  res.json(user);
}
```

### Hono (Edge Runtime)

```typescript
import auth from 'multi-oauth';
import { Hono } from 'hono';

const app = new Hono();

auth.configure({
  providers: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }
  },
  redirectUri: 'http://localhost:3000/callback'
});

app.get('/login/:provider', (c) => {
  return c.redirect(auth.url(c.req.param('provider')));
});

app.get('/callback/:provider', async (c) => {
  const user = await auth.callback(c.req.param('provider'), c.req);
  return c.json(user);
});
```

## 🛡️ Error Handling

```typescript
app.get('/callback/:provider', async (req, res) => {
  try {
    const user = await auth.callback(req.params.provider, req);
    res.json(user);
  } catch (error) {
    if (error.message.includes('not configured')) {
      res.status(500).json({ error: 'Provider not configured' });
    } else if (error.message.includes('code not found')) {
      res.status(400).json({ error: 'Authorization failed' });
    } else if (error.message.includes('Token exchange failed')) {
      res.status(401).json({ error: 'Invalid credentials' });
    } else {
      res.status(500).json({ error: 'Authentication failed' });
    }
  }
});
```

## 🔐 Environment Variables

Create a `.env` file:

```env
# Google OAuth
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxx

# GitHub OAuth
GITHUB_CLIENT_ID=Iv1.xxx
GITHUB_CLIENT_SECRET=xxx

# Facebook OAuth
FACEBOOK_CLIENT_ID=xxx
FACEBOOK_CLIENT_SECRET=xxx

# Twitter OAuth
TWITTER_CLIENT_ID=xxx
TWITTER_CLIENT_SECRET=xxx

# LinkedIn OAuth
LINKEDIN_CLIENT_ID=xxx
LINKEDIN_CLIENT_SECRET=xxx

# Microsoft OAuth
MICROSOFT_CLIENT_ID=xxx
MICROSOFT_CLIENT_SECRET=xxx

# Apple Sign In
APPLE_CLIENT_ID=xxx
APPLE_CLIENT_SECRET=xxx
```

## 🎨 Custom Provider

You can create custom OAuth providers by extending the `BaseOAuthProvider`:

```typescript
import { BaseOAuthProvider, OAuthUser } from 'multi-oauth';

class CustomOAuthProvider extends BaseOAuthProvider {
  getName(): string {
    return 'custom';
  }

  getAuthUrl(): string {
    return 'https://custom.com/oauth/authorize';
  }

  getTokenUrl(): string {
    return 'https://custom.com/oauth/token';
  }

  getUserProfileUrl(): string {
    return 'https://custom.com/api/user';
  }

  getDefaultScopes(): string[] {
    return ['read', 'email'];
  }

  normalizeUser(profile: any): OAuthUser {
    return {
      id: profile.id,
      name: profile.full_name,
      email: profile.email_address,
      avatar: profile.avatar_url,
      provider: 'custom',
      raw: profile
    };
  }
}
```

## 📊 TypeScript Types

All types are exported for your convenience:

```typescript
import type {
  OAuthUser,
  OAuthConfig,
  ProviderConfig,
  ProviderName,
  OAuthRequest,
  TokenResponse
} from 'multi-oauth';

// Use types in your application
function saveUser(user: OAuthUser) {
  // Your code here
}

const config: OAuthConfig = {
  providers: {
    google: {
      clientId: 'xxx',
      clientSecret: 'xxx'
    }
  },
  redirectUri: 'http://localhost:3000/callback'
};
```

## ❓ FAQ

### How do I get user's email?

Most providers return email by default. Some providers (like GitHub) might require additional scopes or API calls:

```typescript
github: {
  clientId: 'xxx',
  clientSecret: 'xxx',
  scope: ['user:email'] // Request email access
}
```

### Can I use this in production?

Yes! Easy OAuth is production-ready. Make sure to:
- Use HTTPS in production
- Store client secrets securely (use environment variables)
- Implement proper session management
- Handle errors appropriately

### How do I handle state parameter for CSRF protection?

```typescript
app.get('/login/:provider', (req, res) => {
  const state = generateRandomString(); // Your implementation
  req.session.oauthState = state;
  res.redirect(auth.url(req.params.provider, state));
});

app.get('/callback/:provider', async (req, res) => {
  // Verify state
  if (req.query.state !== req.session.oauthState) {
    return res.status(400).json({ error: 'Invalid state' });
  }
  
  const user = await auth.callback(req.params.provider, req);
  res.json(user);
});
```

### Does it work with JavaScript (not TypeScript)?

Yes! The library is written in TypeScript but compiles to JavaScript. You can use it in any Node.js project:

```javascript
const auth = require('multi-oauth').default;
// Use normally
```

### How do I customize OAuth scopes?

```typescript
auth.configure({
  providers: {
    google: {
      clientId: 'xxx',
      clientSecret: 'xxx',
      scope: ['openid', 'profile', 'email', 'https://www.googleapis.com/auth/calendar']
    }
  },
  redirectUri: 'http://localhost:3000/callback'
});
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request

### Development Setup

```bash
# Clone the repository
git clone https://github.com/zaghamabbas786/multi-oauth.git

# Install dependencies
npm install

# Build the project
npm run build

# Watch mode
npm run watch
```

## 📄 License

MIT © [Your Name]

## 🌟 Star Us!

If you find Easy OAuth useful, please give us a star on GitHub! ⭐

## 📚 Related Projects

- [Passport.js](http://www.passportjs.org/) - More comprehensive but complex
- [NextAuth.js](https://next-auth.js.org/) - For Next.js specific projects
- [Grant](https://github.com/simov/grant) - OAuth middleware

## 📞 Support

- 📫 Email: zaghama96@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/zaghamabbas786/multi-oauth/issues)

---

Made with ❤️ by developers, for developers.

**Keywords**: oauth, oauth2, authentication, google login, facebook login, github login, twitter login, linkedin login, apple login, microsoft login, social login, sso, single sign on, node.js authentication, express oauth, nextjs oauth, typescript oauth, simple oauth, easy authentication


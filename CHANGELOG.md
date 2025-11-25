# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-11-25

### 🎉 Initial Release

The first stable release of **Easy OAuth** - the simplest multi-provider OAuth library for Node.js!

### ✨ Features

- **Simple API**: Just 2 methods - `auth.url()` and `auth.callback()`
- **7 OAuth Providers**: 
  - ✅ Google OAuth 2.0
  - ✅ Facebook OAuth
  - ✅ GitHub OAuth
  - ✅ Twitter OAuth 2.0
  - ✅ LinkedIn OAuth
  - ✅ Apple Sign In
  - ✅ Microsoft OAuth 2.0
- **TypeScript Native**: Full type safety with exported types
- **Normalized User Response**: Consistent user object across all providers
- **Zero Dependencies**: Lightweight and fast
- **Framework Agnostic**: Works with Express, Next.js, Koa, Fastify, and more
- **Production Ready**: Battle-tested OAuth implementations

### 📦 What's Included

- Core OAuth Manager with provider abstraction
- Base OAuth Provider class for easy extension
- 7 pre-configured OAuth providers
- Comprehensive TypeScript definitions
- Complete documentation with examples
- Error handling and validation

### 🔧 Technical Details

- Written in TypeScript
- Compiles to ES2020 with CommonJS modules
- Includes declaration files (.d.ts)
- Strict type checking enabled
- Clean, maintainable code architecture

### 📚 Documentation

- Complete README with examples
- TypeScript and JavaScript usage guides
- Framework-specific examples (Express, Next.js)
- Provider configuration guides
- Error handling examples
- Custom provider implementation guide

### 🎯 Use Cases

Perfect for:
- Multi-tenant applications
- Social login implementations
- SSO (Single Sign-On) systems
- User authentication services
- API authentication gateways
- Microservices architecture

### 🔜 Roadmap

Future versions may include:
- Additional providers (Discord, Slack, Spotify, etc.)
- Built-in session management
- Token refresh handling
- PKCE flow support
- OAuth 1.0a support
- Database adapters
- Rate limiting
- Webhook support

### 📝 Notes

- Requires Node.js 14.0.0 or higher
- Uses native fetch API (Node.js 18+) or requires polyfill
- For production use with HTTPS
- Store credentials securely using environment variables

---

**Full Changelog**: https://github.com/yourusername/easy-oauth/commits/v1.0.0


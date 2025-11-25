# Contributing to Easy OAuth

Thank you for your interest in contributing to **Easy OAuth**! We welcome contributions from the community.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- A clear title and description
- Steps to reproduce the issue
- Expected vs actual behavior
- Your environment (Node.js version, OS, etc.)
- Code samples if applicable

### Suggesting Enhancements

We welcome feature suggestions! Please create an issue with:
- A clear title and description
- Use case and motivation
- Proposed implementation (if you have ideas)
- Examples of how it would work

### Pull Requests

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/easy-oauth.git
   cd easy-oauth
   ```

2. **Create a branch**
   ```bash
   git checkout -b feature/my-new-feature
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Make your changes**
   - Write clean, readable code
   - Follow the existing code style
   - Add TypeScript types for all new code
   - Update documentation if needed

5. **Build and test**
   ```bash
   npm run build
   ```

6. **Commit your changes**
   ```bash
   git commit -m "Add: new feature description"
   ```

7. **Push to your fork**
   ```bash
   git push origin feature/my-new-feature
   ```

8. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill in the PR template
   - Wait for review

## Development Guidelines

### Code Style

- Use TypeScript for all source code
- Follow the existing code structure
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Keep functions small and focused

### Project Structure

```
easy-oauth/
├── src/
│   ├── types.ts              # Type definitions
│   ├── base-provider.ts      # Base OAuth provider
│   ├── oauth-manager.ts      # Main manager class
│   ├── index.ts              # Main entry point
│   └── providers/            # Provider implementations
│       ├── google.ts
│       ├── github.ts
│       └── ...
├── examples/                 # Example projects
├── dist/                     # Compiled output (gitignored)
├── package.json
├── tsconfig.json
└── README.md
```

### Adding a New Provider

To add a new OAuth provider:

1. Create a new file in `src/providers/your-provider.ts`
2. Extend the `BaseOAuthProvider` class
3. Implement required methods:
   - `getName()`
   - `getAuthUrl()`
   - `getTokenUrl()`
   - `getUserProfileUrl()`
   - `getDefaultScopes()`
   - `normalizeUser()`

Example:

```typescript
import { BaseOAuthProvider } from '../base-provider';
import { OAuthUser } from '../types';

export class YourProviderOAuthProvider extends BaseOAuthProvider {
  getName(): string {
    return 'yourprovider';
  }

  getAuthUrl(): string {
    return 'https://yourprovider.com/oauth/authorize';
  }

  getTokenUrl(): string {
    return 'https://yourprovider.com/oauth/token';
  }

  getUserProfileUrl(): string {
    return 'https://api.yourprovider.com/user';
  }

  getDefaultScopes(): string[] {
    return ['profile', 'email'];
  }

  normalizeUser(profile: any): OAuthUser {
    return {
      id: profile.id,
      name: profile.name,
      email: profile.email,
      avatar: profile.avatar_url,
      provider: 'yourprovider',
      raw: profile
    };
  }
}
```

4. Export the provider in `src/index.ts`
5. Add to the provider map in `src/oauth-manager.ts`
6. Update the README.md with provider documentation
7. Add example configuration

### Commit Messages

Use clear, descriptive commit messages:

- `Add: new feature or provider`
- `Fix: bug fix`
- `Update: improvements to existing code`
- `Docs: documentation changes`
- `Refactor: code restructuring`
- `Test: adding or updating tests`

### Documentation

- Update README.md for new features
- Add JSDoc comments for all public APIs
- Include code examples
- Update CHANGELOG.md

## Testing

Currently, the project doesn't have automated tests. If you'd like to contribute to adding tests:

1. Choose a testing framework (Jest, Vitest, etc.)
2. Add unit tests for core functionality
3. Add integration tests for providers
4. Update the contributing guide

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Accept constructive criticism
- Focus on what's best for the community
- Show empathy towards others

## Questions?

If you have questions:
- Open a GitHub Discussion
- Ask in the issue you're working on
- Reach out to maintainers

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for making Easy OAuth better! 🎉


import { OAuthManager } from './oauth-manager';

// Export types
export {
  OAuthUser,
  OAuthConfig,
  ProviderConfig,
  ProviderName,
  OAuthRequest,
  TokenResponse
} from './types';

export { BaseOAuthProvider } from './base-provider';
export { OAuthManager } from './oauth-manager';

// Export individual providers for advanced usage
export { GoogleOAuthProvider } from './providers/google';
export { FacebookOAuthProvider } from './providers/facebook';
export { GitHubOAuthProvider } from './providers/github';
export { TwitterOAuthProvider } from './providers/twitter';
export { LinkedInOAuthProvider } from './providers/linkedin';
export { AppleOAuthProvider } from './providers/apple';
export { MicrosoftOAuthProvider } from './providers/microsoft';

// Create and export default instance
const auth = new OAuthManager();

export default auth;


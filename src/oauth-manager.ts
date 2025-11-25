import { BaseOAuthProvider } from './base-provider';
import { OAuthConfig, OAuthUser, ProviderName, OAuthRequest } from './types';
import { GoogleOAuthProvider } from './providers/google';
import { FacebookOAuthProvider } from './providers/facebook';
import { GitHubOAuthProvider } from './providers/github';
import { TwitterOAuthProvider } from './providers/twitter';
import { LinkedInOAuthProvider } from './providers/linkedin';
import { AppleOAuthProvider } from './providers/apple';
import { MicrosoftOAuthProvider } from './providers/microsoft';

/**
 * Main OAuth Manager class
 */
export class OAuthManager {
  private config: OAuthConfig | null = null;
  private providers: Map<ProviderName, BaseOAuthProvider> = new Map();

  /**
   * Configure the OAuth manager with provider settings
   */
  configure(config: OAuthConfig): void {
    this.config = config;
    this.providers.clear();

    // Initialize configured providers
    for (const [providerName, providerConfig] of Object.entries(config.providers)) {
      if (providerConfig) {
        const provider = this.createProvider(
          providerName as ProviderName,
          providerConfig,
          config.redirectUri
        );
        this.providers.set(providerName as ProviderName, provider);
      }
    }
  }

  /**
   * Create a provider instance
   */
  private createProvider(
    name: ProviderName,
    config: any,
    redirectUri: string
  ): BaseOAuthProvider {
    switch (name) {
      case 'google':
        return new GoogleOAuthProvider(config, redirectUri);
      case 'facebook':
        return new FacebookOAuthProvider(config, redirectUri);
      case 'github':
        return new GitHubOAuthProvider(config, redirectUri);
      case 'twitter':
        return new TwitterOAuthProvider(config, redirectUri);
      case 'linkedin':
        return new LinkedInOAuthProvider(config, redirectUri);
      case 'apple':
        return new AppleOAuthProvider(config, redirectUri);
      case 'microsoft':
        return new MicrosoftOAuthProvider(config, redirectUri);
      default:
        throw new Error(`Unknown provider: ${name}`);
    }
  }

  /**
   * Get a provider instance
   */
  private getProvider(providerName: string): BaseOAuthProvider {
    if (!this.config) {
      throw new Error('OAuth manager not configured. Call configure() first.');
    }

    const provider = this.providers.get(providerName as ProviderName);
    if (!provider) {
      throw new Error(`Provider "${providerName}" not configured or not supported.`);
    }

    return provider;
  }

  /**
   * Generate authorization URL for a provider
   */
  url(providerName: string, state?: string): string {
    const provider = this.getProvider(providerName);
    return provider.buildAuthUrl(state);
  }

  /**
   * Handle OAuth callback and return user profile
   */
  async callback(providerName: string, req: OAuthRequest): Promise<OAuthUser> {
    const provider = this.getProvider(providerName);

    // Extract authorization code from request
    const code = this.extractCode(req);
    if (!code) {
      throw new Error('Authorization code not found in request');
    }

    // Authenticate and return normalized user
    return await provider.authenticate(code);
  }

  /**
   * Extract authorization code from request object
   */
  private extractCode(req: OAuthRequest): string | null {
    // Check query parameters
    if (req.query?.code) {
      return req.query.code;
    }

    // Check body (for POST requests, like Apple)
    if (req.body?.code) {
      return req.body.code;
    }

    // Try parsing URL if provided
    if (req.url) {
      try {
        const url = new URL(req.url, 'http://localhost');
        return url.searchParams.get('code');
      } catch {
        // Invalid URL, continue
      }
    }

    return null;
  }

  /**
   * Get list of configured provider names
   */
  getConfiguredProviders(): ProviderName[] {
    return Array.from(this.providers.keys());
  }
}


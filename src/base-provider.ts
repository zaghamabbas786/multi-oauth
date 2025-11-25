import { OAuthUser, ProviderConfig, TokenResponse } from './types';

/**
 * Base OAuth Provider class that all providers extend
 */
export abstract class BaseOAuthProvider {
  protected config: ProviderConfig;
  protected redirectUri: string;

  constructor(config: ProviderConfig, redirectUri: string) {
    this.config = config;
    this.redirectUri = config.redirectUri || redirectUri;
  }

  /**
   * Get the provider name
   */
  abstract getName(): string;

  /**
   * Get the authorization URL
   */
  abstract getAuthUrl(): string;

  /**
   * Get the token URL
   */
  abstract getTokenUrl(): string;

  /**
   * Get the user profile URL
   */
  abstract getUserProfileUrl(): string;

  /**
   * Get default scopes for this provider
   */
  abstract getDefaultScopes(): string[];

  /**
   * Normalize the user profile from provider-specific format
   */
  abstract normalizeUser(profile: any): OAuthUser;

  /**
   * Build the full authorization URL
   */
  buildAuthUrl(state?: string): string {
    const scopes = this.config.scope || this.getDefaultScopes();
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: this.redirectUri,
      response_type: 'code',
      scope: scopes.join(' '),
      ...(state && { state })
    });

    return `${this.getAuthUrl()}?${params.toString()}`;
  }

  /**
   * Exchange authorization code for access token
   */
  async exchangeCodeForToken(code: string): Promise<TokenResponse> {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      code: code,
      redirect_uri: this.redirectUri,
      grant_type: 'authorization_code'
    });

    const response = await fetch(this.getTokenUrl(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: params.toString()
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Token exchange failed: ${response.status} ${errorText}`);
    }

    return await response.json() as TokenResponse;
  }

  /**
   * Fetch user profile using access token
   */
  async fetchUserProfile(accessToken: string): Promise<any> {
    const response = await fetch(this.getUserProfileUrl(), {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch user profile: ${response.status} ${errorText}`);
    }

    return await response.json();
  }

  /**
   * Complete OAuth flow: exchange code for token and fetch user profile
   */
  async authenticate(code: string): Promise<OAuthUser> {
    const tokenResponse = await this.exchangeCodeForToken(code);
    const profile = await this.fetchUserProfile(tokenResponse.access_token);
    return this.normalizeUser(profile);
  }
}


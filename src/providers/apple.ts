import { BaseOAuthProvider } from '../base-provider';
import { OAuthUser } from '../types';

export class AppleOAuthProvider extends BaseOAuthProvider {
  getName(): string {
    return 'apple';
  }

  getAuthUrl(): string {
    return 'https://appleid.apple.com/auth/authorize';
  }

  getTokenUrl(): string {
    return 'https://appleid.apple.com/auth/token';
  }

  getUserProfileUrl(): string {
    // Apple doesn't have a separate user info endpoint
    // User info comes from the ID token
    return '';
  }

  getDefaultScopes(): string[] {
    return ['name', 'email'];
  }

  buildAuthUrl(state?: string): string {
    const scopes = this.config.scope || this.getDefaultScopes();
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: this.redirectUri,
      response_type: 'code',
      response_mode: 'form_post',
      scope: scopes.join(' '),
      ...(state && { state })
    });

    return `${this.getAuthUrl()}?${params.toString()}`;
  }

  async fetchUserProfile(_accessToken: string): Promise<any> {
    // For Apple, we decode the ID token to get user info
    // In production, you should verify the JWT signature
    throw new Error('Apple provider requires ID token decoding. Please use a JWT library.');
  }

  normalizeUser(profile: any): OAuthUser {
    return {
      id: profile.sub,
      name: profile.name || 'Apple User',
      email: profile.email,
      avatar: undefined,
      provider: 'apple',
      raw: profile
    };
  }
}


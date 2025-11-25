import { BaseOAuthProvider } from '../base-provider';
import { OAuthUser } from '../types';

export class TwitterOAuthProvider extends BaseOAuthProvider {
  getName(): string {
    return 'twitter';
  }

  getAuthUrl(): string {
    return 'https://twitter.com/i/oauth2/authorize';
  }

  getTokenUrl(): string {
    return 'https://api.twitter.com/2/oauth2/token';
  }

  getUserProfileUrl(): string {
    return 'https://api.twitter.com/2/users/me?user.fields=id,name,username,profile_image_url';
  }

  getDefaultScopes(): string[] {
    return ['tweet.read', 'users.read'];
  }

  buildAuthUrl(state?: string): string {
    const scopes = this.config.scope || this.getDefaultScopes();
    const codeChallenge = 'challenge'; // In production, generate proper PKCE challenge
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: this.redirectUri,
      response_type: 'code',
      scope: scopes.join(' '),
      code_challenge: codeChallenge,
      code_challenge_method: 'plain',
      ...(state && { state })
    });

    return `${this.getAuthUrl()}?${params.toString()}`;
  }

  async exchangeCodeForToken(code: string): Promise<any> {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      code: code,
      redirect_uri: this.redirectUri,
      grant_type: 'authorization_code',
      code_verifier: 'challenge' // In production, use proper PKCE verifier
    });

    // Twitter requires Basic Auth
    const credentials = Buffer.from(`${this.config.clientId}:${this.config.clientSecret}`).toString('base64');

    const response = await fetch(this.getTokenUrl(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${credentials}`,
        'Accept': 'application/json'
      },
      body: params.toString()
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Token exchange failed: ${response.status} ${errorText}`);
    }

    return await response.json();
  }

  normalizeUser(profile: any): OAuthUser {
    const user = profile.data;
    return {
      id: user.id,
      name: user.name,
      email: undefined, // Twitter API v2 doesn't provide email by default
      avatar: user.profile_image_url,
      provider: 'twitter',
      raw: profile
    };
  }
}


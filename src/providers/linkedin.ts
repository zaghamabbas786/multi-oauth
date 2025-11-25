import { BaseOAuthProvider } from '../base-provider';
import { OAuthUser } from '../types';

export class LinkedInOAuthProvider extends BaseOAuthProvider {
  getName(): string {
    return 'linkedin';
  }

  getAuthUrl(): string {
    return 'https://www.linkedin.com/oauth/v2/authorization';
  }

  getTokenUrl(): string {
    return 'https://www.linkedin.com/oauth/v2/accessToken';
  }

  getUserProfileUrl(): string {
    return 'https://api.linkedin.com/v2/userinfo';
  }

  getDefaultScopes(): string[] {
    return ['openid', 'profile', 'email'];
  }

  normalizeUser(profile: any): OAuthUser {
    return {
      id: profile.sub,
      name: profile.name,
      email: profile.email,
      avatar: profile.picture,
      provider: 'linkedin',
      raw: profile
    };
  }
}


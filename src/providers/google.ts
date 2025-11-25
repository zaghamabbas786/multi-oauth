import { BaseOAuthProvider } from '../base-provider';
import { OAuthUser } from '../types';

export class GoogleOAuthProvider extends BaseOAuthProvider {
  getName(): string {
    return 'google';
  }

  getAuthUrl(): string {
    return 'https://accounts.google.com/o/oauth2/v2/auth';
  }

  getTokenUrl(): string {
    return 'https://oauth2.googleapis.com/token';
  }

  getUserProfileUrl(): string {
    return 'https://www.googleapis.com/oauth2/v2/userinfo';
  }

  getDefaultScopes(): string[] {
    return ['openid', 'profile', 'email'];
  }

  normalizeUser(profile: any): OAuthUser {
    return {
      id: profile.id,
      name: profile.name,
      email: profile.email,
      avatar: profile.picture,
      provider: 'google',
      raw: profile
    };
  }
}


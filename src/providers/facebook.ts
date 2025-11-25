import { BaseOAuthProvider } from '../base-provider';
import { OAuthUser } from '../types';

export class FacebookOAuthProvider extends BaseOAuthProvider {
  getName(): string {
    return 'facebook';
  }

  getAuthUrl(): string {
    return 'https://www.facebook.com/v18.0/dialog/oauth';
  }

  getTokenUrl(): string {
    return 'https://graph.facebook.com/v18.0/oauth/access_token';
  }

  getUserProfileUrl(): string {
    return 'https://graph.facebook.com/me?fields=id,name,email,picture';
  }

  getDefaultScopes(): string[] {
    return ['email', 'public_profile'];
  }

  normalizeUser(profile: any): OAuthUser {
    return {
      id: profile.id,
      name: profile.name,
      email: profile.email,
      avatar: profile.picture?.data?.url,
      provider: 'facebook',
      raw: profile
    };
  }
}


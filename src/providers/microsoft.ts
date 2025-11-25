import { BaseOAuthProvider } from '../base-provider';
import { OAuthUser } from '../types';

export class MicrosoftOAuthProvider extends BaseOAuthProvider {
  getName(): string {
    return 'microsoft';
  }

  getAuthUrl(): string {
    return 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize';
  }

  getTokenUrl(): string {
    return 'https://login.microsoftonline.com/common/oauth2/v2.0/token';
  }

  getUserProfileUrl(): string {
    return 'https://graph.microsoft.com/v1.0/me';
  }

  getDefaultScopes(): string[] {
    return ['openid', 'profile', 'email', 'User.Read'];
  }

  normalizeUser(profile: any): OAuthUser {
    return {
      id: profile.id,
      name: profile.displayName,
      email: profile.mail || profile.userPrincipalName,
      avatar: undefined, // Microsoft Graph requires separate call for photo
      provider: 'microsoft',
      raw: profile
    };
  }
}


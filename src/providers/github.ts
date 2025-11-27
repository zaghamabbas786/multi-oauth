import { BaseOAuthProvider } from '../base-provider';
import { OAuthUser } from '../types';

export class GitHubOAuthProvider extends BaseOAuthProvider {
  getName(): string {
    return 'github';
  }

  getAuthUrl(): string {
    return 'https://github.com/login/oauth/authorize';
  }

  getTokenUrl(): string {
    return 'https://github.com/login/oauth/access_token';
  }

  getUserProfileUrl(): string {
    return 'https://api.github.com/user';
  }

  getDefaultScopes(): string[] {
    return ['user:email'];
  }

  async fetchUserProfile(accessToken: string): Promise<any> {
    // Fetch user profile
    const profileResponse = await fetch(this.getUserProfileUrl(), {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
        'User-Agent': 'multi-oauth'
      }
    });

    if (!profileResponse.ok) {
      const errorText = await profileResponse.text();
      throw new Error(`Failed to fetch user profile: ${profileResponse.status} ${errorText}`);
    }

    const profile: any = await profileResponse.json();

    // If email is not public, fetch it from emails endpoint
    if (!profile.email) {
      const emailsResponse = await fetch('https://api.github.com/user/emails', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json',
          'User-Agent': 'multi-oauth'
        }
      });

      if (emailsResponse.ok) {
        const emails: any = await emailsResponse.json();
        const primaryEmail = emails.find((e: any) => e.primary);
        profile.email = primaryEmail?.email || emails[0]?.email;
      }
    }

    return profile;
  }

  normalizeUser(profile: any): OAuthUser {
    return {
      id: profile.id.toString(),
      name: profile.name || profile.login,
      email: profile.email,
      avatar: profile.avatar_url,
      provider: 'github',
      raw: profile
    };
  }
}


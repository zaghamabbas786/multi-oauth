/**
 * Normalized user profile returned by all OAuth providers
 */
export interface OAuthUser {
  /** Unique user ID from the provider */
  id: string;
  /** User's display name */
  name: string;
  /** User's email address (if available) */
  email?: string;
  /** User's avatar/profile picture URL (if available) */
  avatar?: string;
  /** OAuth provider name */
  provider: string;
  /** Raw response from the provider */
  raw: any;
}

/**
 * Configuration for a single OAuth provider
 */
export interface ProviderConfig {
  /** OAuth client ID */
  clientId: string;
  /** OAuth client secret */
  clientSecret: string;
  /** Optional custom scopes */
  scope?: string[];
  /** Optional custom redirect URI (overrides global) */
  redirectUri?: string;
}

/**
 * Supported OAuth provider names
 */
export type ProviderName = 'google' | 'facebook' | 'github' | 'twitter' | 'linkedin' | 'apple' | 'microsoft';

/**
 * Main OAuth configuration
 */
export interface OAuthConfig {
  /** Provider configurations */
  providers: Partial<Record<ProviderName, ProviderConfig>>;
  /** Global redirect URI (can be overridden per provider) */
  redirectUri: string;
}

/**
 * Request object interface (compatible with Express, Next.js, etc.)
 */
export interface OAuthRequest {
  query?: Record<string, any>;
  body?: Record<string, any>;
  url?: string;
}

/**
 * Token response from OAuth providers
 */
export interface TokenResponse {
  access_token: string;
  token_type?: string;
  expires_in?: number;
  refresh_token?: string;
  scope?: string;
  id_token?: string;
}


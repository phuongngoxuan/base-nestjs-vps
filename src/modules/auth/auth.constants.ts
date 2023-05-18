import * as config from 'config';

export const JWT_CONSTANTS = {
  accessTokenSecret: config.get<string>('app.jwt_access_token_secret'),
  accessTokenExpiry: parseInt(config.get<string>('app.jwt_access_token_expiration_time')),
  refreshTokenSecret: config.get<string>('app.jwt_refresh_token_secret'),
  refreshTokenExpiry: parseInt(config.get<string>('app.jwt_refresh_token_expiration_time')),
};
export const SIGN_UP_EXPIRY = parseInt(config.get<string>('sign_up_expiration_time'));
export const FORGOT_PASSWORD_EXPIRY = parseInt(config.get<string>('forgot_password_expiration_time'));

export const AUTH_CACHE_PREFIX = 'AUTH_CACHE_PREFIX_';
export const SIGN_UP_CACHE = 'SIGN_CACHE_';
export const FORGOT_PASSWORD_CACHE = 'FORGOT_PASSWORD_CACHE_';

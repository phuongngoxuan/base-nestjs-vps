export const httpErrors = {
  // user error
  ACCOUNT_NOT_FOUND: {
    message: 'Account not found.',
    code: 'USER_00000',
  },
  ACCOUNT_EXISTED: {
    message: 'Account already existed.',
    code: 'USER_00001',
  },
  ACCOUNT_HASH_NOT_MATCH: {
    message: 'Account adress and hash message are not matched.',
    code: 'USER_00002',
  },
  UNAUTHORIZED: {
    message: 'Unauthorized user.',
    code: 'USER_00003',
  },
  LOCKED_USER: {
    message: 'User has been locked.',
    code: 'USER_00004',
  },
  VERIFY_SIGNATURE_FAIL: {
    message: 'System has been failed to verify signture.',
    code: 'USER_00005',
  },
  REFRESH_TOKEN_EXPIRED: {
    message: 'Refresh tokens is expired.',
    code: 'USER_00006',
  },
  ACCESS_TOKEN_EXPIRED: {
    message: 'Refresh tokens is expired.',
    code: 'USER_00007',
  },
  FORBIDDEN: {
    message: 'You are not authorized to access this resource.',
    code: 'USER_00008',
  },
  USER_EMAIL_EXISTED: {
    message: 'Email has been associted with an other account.',
    code: 'USER_00025',
  },
  USER_EMAIL_VERIFY_FAIL: {
    message: 'Failed to verify this email.',
    code: 'USER_00026',
  },
  EMAIL_CONFIRM_NOT_FOUND: {
    message: 'Email request not found!',
    code: 'USER_00027',
  },
  EMAIL_WAIT_TIME: {
    message: 'Too much request',
    code: 'USER_00028',
  },
  USER_WRONG_PASSWORD: {
    message: 'Password is incorrect',
    code: 'USER_00029',
  },
  USER_CODE_INVALID: {
    message: 'Verification code is invalid',
    code: 'USER_00030',
  },

  USER_EXPIRED_CODE: {
    message: `You've entered an incorrect code. Please note that current code will be expired if you enter it wrong 5 times in a row`,
    code: 'USER_00031',
  },

  // order error
  ORDER_NOT_FOUND: {
    message: 'Order not found.',
    code: 'ORDER_00001',
  },
  ORDER_CANCEL_DENIED: {
    message: 'You do not have permission to cancel this order.',
    code: 'ORDER_00002',
  },
  ORDER_ALREADY_CANCELED: {
    message: 'This order have been already canceled and waiting to confirm.',
    code: 'ORDER_00003',
  },

  // file error
  FILE_NOT_FOUND: {
    message: 'file not found.',
    code: 'FILE_00001',
  },

  // facebook error
  FACEBOOK_TOKEN_INVALID_OR_EXPIRES: {
    message: 'Access token is invalid or expires.',
    code: 'FACEBOOK_00000',
  },

  // google error
  GOOGLE_TOKEN_INVALID_OR_EXPIRES: {
    message: 'Access token is invalid or expires.',
    code: 'GOOGLE_00000',
  },
};

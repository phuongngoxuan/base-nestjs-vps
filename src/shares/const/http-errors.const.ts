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

  // setting
  SETTING_NOT_FOUND: {
    message: 'This setting does not exist.',
    code: 'SETTING_00001',
  },
  SETTING_NOT_VALID: {
    message: 'This setting does not valid.',
    code: 'SETTING_00002',
  },

  // pet
  PET_NOT_FOUND: {
    message: 'This pet does not exist.',
    code: 'PET_00001',
  },

  // pet vendor
  PET_VENDOR_NOT_FOUND: {
    message: 'This pet vendor does not exist.',
    code: 'PET_VENDOR_00001',
  },
};

export enum ErrorCode {
  Unexpected_Error = 'Unexpected_Error',
  Network_Error = 'Network_Error',
}

export enum UserStatus {
  ACTIVE = 1,
  INACTIVE = 0,
}

export enum MenuKey {
  HOME = 'Home',
  GROUP = 'Group',
  CREATE = 'Create',
  NOTIFY = 'Notify',
  MORE = 'More',
}

export const RoutePath = {
  LOGIN: '/login',
  SIGNUP: '/sign-up',
  HOME: '/home',
  GROUP: '/group',
  CREATE: '/create',
  MORE: '/more',
  NOTIFICATION: '/notification',
  SOURCE: '/source',
  CREATE_SOURCE: '/source/create',
  EDIT_SOURCE: '/source/:id',
  EDIT_SOURCE_BALANCE: '/source/:id/edit-balance',
  TRANSFER_MONEY: '/source/:id/transfer-money',
  TRANSACTION: '/transaction',
  CREATE_LEND_DEBT: '/transaction/lend-debt/:type',
  LEND: '/lend-debt',
  SAVING: '/saving',
  UPDATE_TRANSACTION: '/transaction/:id/edit',
  LEND_DEBT_DETAILS: '/lend-debt/:id',
  COLLECT_LEND_DEBT: '/lend-debt/:id/:type',
};

export enum LoginSocialType {
  GOOGLE = 'Google',
  FACEBOOK = 'Facebook',
}

export enum CommonStatus {
  ACTIVE = 1,
  INACTIVE = 0,
}

export enum TransactionType {
  EXPENSE = 1,
  INCOME = 2,
  LEND = 3,
  DEBT = 4,
  TRANSFER_MONEY = 5,
  UPDATE_BALANCE = 6,
  SAVING = 7,
}

export const MONTH_NAME = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

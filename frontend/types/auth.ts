export type AuthUser = {
  id: number;
  name: string;
  email: string;
};

export type LoginForm = {
  email: string;
  password: string;
  remember?: boolean;
};

export type RegisterForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
};

export type ForgotForm = {
  email: string;
};

export type ResetForm = {
  token: string;
  password: string;
  confirmPassword: string;
};

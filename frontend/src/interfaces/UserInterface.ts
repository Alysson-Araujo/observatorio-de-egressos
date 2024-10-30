export interface LoginUser {
  id: string;
  name: string;
  email: string;
  token: string;
}


export interface ForgotPassword{
  email: string;
}

export interface ResetPasswordForm{
  password: string;
}
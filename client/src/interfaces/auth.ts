export interface UserRegister {
  name: string;
  username: string;
  email: string;
  password: string;
  lastname: string;
  confirmPassword: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

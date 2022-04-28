export interface ISnackbarState {
  open: boolean;
  vertical: "top" | "bottom";
  horizontal: "left" | "right" | "center";
}

export interface IFormRegister {
  email: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface IFormLogin {
  email: string;
  password: string;
  remember: boolean;
}

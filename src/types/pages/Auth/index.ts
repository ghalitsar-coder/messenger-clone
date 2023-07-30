export interface PostRegister {
  data: { email: string; name: string; password: string };
  onSuccess?(): void;
  onError?(): void;
}

export interface PostSignIn {
  data: { email: string; password: string };
  onSuccess?(): void;
  onError?(): void;
}

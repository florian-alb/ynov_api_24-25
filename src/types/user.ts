export type UserCreateBody = {
  name: string;
  password: string;
  emailAddress: string;
};

export type UserLoginBody = Omit<UserCreateBody, "name">;

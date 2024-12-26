export type UserCreateBody = {
  name: string;
  password: string;
  emailAddress: string;
};

export type UserUpadateBody = {
  name?: string;
  password?: string;
};

export type UserLoginBody = Omit<UserCreateBody, "name">;

export type User = {
  _id: string;
  email: string;
  fullName: string;
  avatar: string;
  chatToken: string;
};

export type RegisterType = Pick<User, 'email' | 'fullName'> & {
  password: string;
};

export type LoginType = Pick<User, 'email'> & {
  password: string;
};

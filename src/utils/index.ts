import users from "../../users.json";

export const getUserByEmail = (email: string): boolean => {
  const user = users.find((user) => user.email === email);
  return !!user;
};

export const getUserByPassword = (password: string): boolean => {
  const user = users.find((user) => user.password === password);
  return !!user;
};

export const findUser = (email: string, password: string) => {
  const user = users.find((user) => user.email === email && user.password === password)
    return user
};

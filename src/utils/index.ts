import mockdata from "../../mockdata.json";

export const findUser = (email: string, password: string) => {
  const userExist = mockdata.find((user) => user.email === email && user.password === password)
    return userExist
};

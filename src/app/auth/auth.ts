export interface User {
  name: string;
  email: string;
  password: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

const KEY_LOGGED_USER = 'loggedUser';
const KEY_USERS = 'users';

export const getAllUsers = () => {
  const users = localStorage.getItem(KEY_USERS);
  if (users) {
    return JSON.parse(users) as User[];
  }
  return [];
};

export const addUser = (user: User) => {
  const users = getAllUsers();
  users.push(user);
  localStorage.setItem(KEY_USERS, JSON.stringify(users));
};

export const setActiveUser = (user: User) => {
  localStorage.setItem(KEY_LOGGED_USER, JSON.stringify(user));
};

export const getActiveUser = () => {
  const user = localStorage.getItem(KEY_LOGGED_USER);
  if (user) {
    return JSON.parse(user) as User;
  }
  return null;
};

export const remoreActiveUser = () => {
  localStorage.removeItem(KEY_LOGGED_USER);
};

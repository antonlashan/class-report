import { Injectable } from '@angular/core';

import {
  addUser,
  getAllUsers,
  LoginParams,
  User,
  setActiveUser,
  getActiveUser,
  remoreActiveUser,
} from './auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  register(user: User) {
    addUser(user);
  }

  authenticate({ email, password }: LoginParams) {
    const currUser = getAllUsers().find(
      (user) => user.email === email && user.password === password
    );
    if (currUser) {
      setActiveUser(currUser);
      return currUser;
    }
    return null;
  }

  deAuthenticate() {
    remoreActiveUser();
  }

  get currUser() {
    return getActiveUser();
  }
}

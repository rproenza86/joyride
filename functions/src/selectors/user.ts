import { IUserName } from '../types';

export const selectUser = (conv): IUserName => {
  const storage = conv.user.storage as any;
  let user: IUserName;

  if (storage.joyride && storage.joyride.userNameData) {
    user = storage.joyride.userNameData;
  }

  return user;
};

export const selectUserReservationDate = (conv): string => {
  const storage = conv.user.storage as any;
  let userReservationDate: 'IUserName';

  if (storage.joyride && storage.joyride.userReservationDate) {
    userReservationDate = storage.joyride.userReservationDate;
  }

  return userReservationDate;
};

export const selectUserName = (conv): string => {
  const user = selectUser(conv);
  return user ? user.display : '';
};

export const selectUserGivenName = (conv): string => {
  const user = selectUser(conv);
  return user ? user.given : '';
};

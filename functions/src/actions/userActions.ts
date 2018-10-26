import { IUserName } from '../types';

export const updateUser = (conv, user: IUserName): boolean => {
  const storage = conv.user.storage;
  let isUserSaved = false;

  if (!storage) {
    return isUserSaved;
  }

  if (storage.joyride) {
    conv.user.storage.joyride.userNameData = user;
    isUserSaved = true;
  }

  if (!storage.joyride) {
    conv.user.storage = {
      ...conv.user.storage,
      joyride: {
        userNameData: user
      }
    };
    isUserSaved = true;
  }

  return isUserSaved;
};


export const updateUserReservationDate = (conv, userReservationDate: string): boolean => {
  const storage = conv.user.storage;
  let isUserReservationDateSaved = false;

  if (!storage) {
    return isUserReservationDateSaved;
  }

  if (storage.joyride) {
    conv.user.storage.joyride.userReservationDate = userReservationDate;
    isUserReservationDateSaved = true;
  }

  if (!storage.joyride) {
    conv.user.storage = { ...conv.user.storage, joyride: { userReservationDate } };
    isUserReservationDateSaved = true;
  }

  return isUserReservationDateSaved;
};

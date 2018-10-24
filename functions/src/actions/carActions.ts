import { ICar } from '../types';
import { logger } from '../utils/logger';

export const updateSelectedCar = (conv, car: ICar): boolean => {
  const data = conv.data;
  let isSelectedCarSaved = false;

  if (!data) {
    logger('updateSelectedCar - no data object to store conv info', conv.user);
    return isSelectedCarSaved;
  }

  if (data.selectedCar) {
    conv.data.selectedCar = car;
    isSelectedCarSaved = true;
  }

  if (!data.selectedCar) {
    conv.data = { ...conv.data, selectedCar: car };
    isSelectedCarSaved = true;
  }

  return isSelectedCarSaved;
};

export const updateCurrentListedCarList = (conv, carList: ICar[]): boolean => {
  const data = conv.data;
  let isCurrentListedCarList = false;

  if (!data) {
    logger('updateCurrentListedCarList - no data object to store conv info', conv.user);
    return isCurrentListedCarList;
  }

  if (data.currentListedCars) {
    conv.data.currentListedCars = carList;
    isCurrentListedCarList = true;
  }

  if (!data.currentListedCars) {
    conv.data = { ...conv.data, currentListedCars: carList };
    isCurrentListedCarList = true;
  }

  return isCurrentListedCarList;
};

export const updateCarsListPointer = (conv, carsListPointer: number): boolean => {
  const data = conv.data;
  let isCarsListPointer = false;

  if (!data) {
    logger('updateCarsListPointer - no data object to store conv info', conv.user);
    return isCarsListPointer;
  }

  if (data.carsListPointer) {
    conv.data.carsListPointer = carsListPointer;
    isCarsListPointer = true;
  }

  if (!data.carsListPointer) {
    conv.data = { ...conv.data, carsListPointer: carsListPointer };
    isCarsListPointer = true;
  }

  return isCarsListPointer;
};

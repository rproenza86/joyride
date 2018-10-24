import { ICar } from '../types';

export const getSelectedCar = (conv): ICar => {
  let selectedCar: ICar;
  const data = conv.data;

  if (!data) {
    return selectedCar;
  }

  if (data.selectedCar) {
    selectedCar = data.selectedCar;
  }

  return selectedCar;
};

export const getCurrentListedCarList = (conv): ICar[] => {
  let currentListedCarList: ICar[];
  const data = conv.data;

  if (!data) {
    return currentListedCarList;
  }

  if (data.currentListedCars) {
    currentListedCarList = data.currentListedCars;
  }

  return currentListedCarList;
};

export const getCarsListPointer = (conv): number => {
  const data = conv.data;
  let carsListPointer: number = 0;

  if (!data) {
    return carsListPointer;
  }

  if (data.carsListPointer) {
    carsListPointer = data.carsListPointer;
  }

  return carsListPointer;
};

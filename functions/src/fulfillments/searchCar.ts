import { Image, List, Suggestions } from 'actions-on-google';
import { carsList } from './../__mock__/carsList';

const createCarList = arrayListedCars => {
  const LIST_INDEX = ['First one', 'Second one', 'Third one'];
  const carsActionList = {};
  let index = 0;

  for (const car of arrayListedCars) {
    carsActionList[car.id] = {
      synonyms: [],
      title: `${LIST_INDEX[index++]} for ${car.price}`,
      description: car.details,
      image: new Image({
        url: car.imageUrl,
        alt: `${car.make} ${car.model} image`
      })
    };
  }

  return carsActionList;
};

const getPrices = arrayListedCars => {
  let prices = '';

  for (const index in arrayListedCars) {
    if (arrayListedCars.length > Number(index) + 1) {
      prices += `$${arrayListedCars[index].price}, `;
    } else {
      prices += `$${arrayListedCars[index].price}`;
    }
  }

  return prices;
};

const initSearch = (make, model, conv) => {
  let response = `This is what I have found for ${make} ${model} car.`;
  let carsListPointer = (conv.user.storage as any).carsListPointer || 0; // pointer use for pagination
  const carsListPointerLimit = carsListPointer + 3;
  const currentListedCars = [];

  for (const car of carsList) {
    if (
      car.model.toLocaleLowerCase() === (model as any).toLocaleLowerCase() &&
      car.make.toLocaleLowerCase() === (make as any).toLocaleLowerCase()
    ) {
      if (carsListPointer < carsListPointerLimit) {
        response += `
            ${car.make} ${car.model} and the price is $${car.price}.
        `;
        carsListPointer++;
        currentListedCars.push(car);
      } else {
        break;
      }
    }
  }

  return {
    response,
    carsListPointer,
    currentListedCars
  };
};

const searchCar = (conv, { make, model }) => {
  const { response, carsListPointer, currentListedCars } = initSearch(make, model, conv);

  if (carsListPointer === ((conv.user.storage as any).carsListPointer || 0)) {
    // Respond with a list with the first cars founds by the cars browser.
    conv.ask("Sorry but we don't have that kind of car in our inventory.");
    conv.ask('Would you like to find another car?');
    // Suggestions will be placed at the end of the response
    conv.ask(new Suggestions('Yes, find a Nissan Altima', 'Find me a Honda Accord', 'Search for a Nissan Rogue'));
  } else {
    // Respond with a list with the first cars founds by the cars browser.
    (conv.user.storage as any).carsListPointer = carsListPointer; // Saving search state in the user profile storage
    (conv.user.storage as any).currentListedCars = currentListedCars;

    if (!conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT')) {
      conv.ask(response);
    } else {
      // Create a list of cars to show in the screen
      if (currentListedCars.length) {
        conv.ask(
          `Here you have a list of cars found with the price of ${getPrices(
            currentListedCars
          )} respectively.`
        );
        conv.ask(
          new List({
            title: `Best deals for ${currentListedCars[0].make} ${currentListedCars[0].model}!`,
            items: createCarList(currentListedCars)
          })
        );
      }
    }
    conv.ask(
      'Would you like to select one of this cars or do you prefer to check more cars from our search?'
    );

    // Suggestions will be placed at the end of the response
    conv.ask(new Suggestions('Select the first one', 'Second one', 'Select the third one'));
  }
};

export default searchCar;

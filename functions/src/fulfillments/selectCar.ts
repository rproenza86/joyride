import { logger } from './../utils/logger';
import { BACKGROUND_IMAGE } from './../constants';
import { BasicCard, Image, Suggestions, Button, Table } from 'actions-on-google';
import { getCurrentListedCarList } from '../selectors/car';
import { updateSelectedCar } from '../actions/carActions';
import searchCar from './searchCar';

const showCarDetailsTable = (car, conv) => {
  conv.close(
    new Table({
      title: `${car.make}  ${car.model}`,
      subtitle: 'Car details',
      image: new Image({
        url: car.imageUrl,
        alt: `${car.make}  ${car.model} image`
      }),
      columns: [
        {
          header: 'Default cash down',
          align: 'CENTER'
        },
        {
          header: 'Car external color',
          align: 'LEADING'
        },
        {
          header: 'Car  trim',
          align: 'TRAILING'
        }
      ],
      rows: [
        {
          cells: [car.cashDown, car.extColor, car.trim],
          dividerAfter: false
        }
      ],
      buttons: new Button({
        title: 'More information ... ',
        url: car.url
      })
    })
  );
};

const getCarDetails = (car, conv) => {
  const response = `Hey! Here you have more details about the ${car.make}  ${car.model}:
      Default cash down for offer: $${car.cashDown}.
      Car external color: ${car.extColor}.
      Car  trim: ${car.trim}.
    `;
  // Respond with a list with the first cars founds by the cars browser.
  conv.ask(response);
};

const showCarDetailsCard = (car, conv) => {
  conv.close(
    new BasicCard({
      title: `Check out your amazing future ${car.make}  ${car.model}`,
      text: car.details,
      image: new Image({
        url: car.imageUrl || BACKGROUND_IMAGE,
        alt: 'Selected Car Image'
      }),
      buttons: new Button({
        title: 'More information ...',
        url: car.url
      })
    })
  );
};

const askForScheduleTestDrive = conv => {
  const initialQuestion = 'Would you like to book a JOYRIDE of your dreamed car?';

  if (conv.screen) {
    conv.ask(initialQuestion);
    conv.ask(
      new Suggestions(
        'Book me a JOYRIDE',
        'Get a JOYRIDE arrangement',
        'Arrange me a JOYRIDE',
        'Finish my search'
      )
    );
  } else {
    const ssml =
      '<speak>' +
      `${initialQuestion} <break time="2" />` +
      '<p><s>Here you have some answer examples:</s></p>' +
      '<p><s>Yes please, help me to book a JOYRIDE.</s></p>' +
      '<p><s>No thanks. I want to finish my search.</s></p>' +
      '<p><s>Absolutely! Arrange me a JOYRIDE.</s></p>' +
      '</speak>';

    conv.ask(ssml);
  }
};

const selectCar = (conv, { carSelection }, option) => {
  logger('Initial params for intent: select car', { carSelection, option });
  const currentListedCars = getCurrentListedCarList(conv);
  let carSelectionIndex;
  let handledToSearch = false;

  if (option) {
    switch (option) {
      case '001':
        carSelectionIndex = 0;
        break;
      case '002':
        carSelectionIndex = 1;
        break;
      case 'Nissan Altima':
      case 'Honda Accord':
      case 'Nissan Rogue':
        const modelMakeArray: string[] = option.split(' ');
        searchCar(conv, {
          make: modelMakeArray[0],
          model: modelMakeArray[1]
        });
        handledToSearch = true;
        break;
      default:
        carSelectionIndex = 2;
        break;
    }
  } else {
    carSelectionIndex = (carSelection as any) - 1;
  }

  if (!handledToSearch) {
    const selectedCar = currentListedCars[carSelectionIndex];

    if (selectedCar) {
      getCarDetails(selectedCar, conv);

      if (conv.screen || option) {
        showCarDetailsCard(selectedCar, conv);
      }

      askForScheduleTestDrive(conv);

      updateSelectedCar(conv, selectedCar);
    } else {
      conv.close('Hey I could not find that car!');
      conv.ask('Would you like to check others cars?');
      // Suggestions will be placed at the end of the response
      conv.ask(new Suggestions('Nissan Altima', 'Honda Accord', 'Nissan Rogue'));
    }
  }
};

export default selectCar;

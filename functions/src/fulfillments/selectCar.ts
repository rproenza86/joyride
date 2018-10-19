import { logger } from './../utils/logger';
import { BACKGROUND_IMAGE } from './../constants';
import { BasicCard, Image, Suggestions, Button, Table } from 'actions-on-google';

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
        title: 'Details on dealer page',
        url: car.url
      })
    })
  );
}

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
        title: 'Details on dealer website',
        url: car.url
      })
    })
  );
};

const askForScheduleTestDrive = conv => {
  conv.ask('Would you like to schedule a test drive  appointment?');

  // Suggestions will be placed at the end of the response
  conv.ask(new Suggestions('Schedule test drive', 'Test drive appointment'));
};

const selectCar = (conv, { carSelection }) => {
  logger('Initial params for intent: select car', { carSelection });
  const currentListedCars = (conv.user.storage as any).currentListedCars;
  const selectedCar = currentListedCars[(carSelection as any) - 1];

  if (selectedCar) {
    getCarDetails(selectedCar, conv);

    if (conv.screen) {
      showCarDetailsCard(selectedCar, conv);
    }

    askForScheduleTestDrive(conv);

    (conv.user.storage as any).selectedCar = selectedCar;
  } else {
    conv.close('Hey I could not find that car!');
    conv.ask('Would you like to check others cars?');
    // Suggestions will be placed at the end of the response
    conv.ask(new Suggestions('Nissan Altima', 'Honda Accord', 'Nissan Rogue'));
  }
};

export default selectCar;

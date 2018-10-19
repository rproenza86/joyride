import { Suggestions, BasicCard, Image } from 'actions-on-google';
import { logger } from './../utils/logger';
import { JOYRIDE_BANNER } from './../constants';

const defaultWelcomeIntent = conv => {
  const { payload } = conv.user.profile;
  logger('User data', conv.user);
  const name = payload ? ` ${payload.given_name}` : '';
  conv.ask(`Welcome to Joy Ride ${name}!

    Are you ready drive your dream car in a matter of seconds?
  `);

  if (conv.screen) {
    conv.close(
      new BasicCard({
        text: 'This is a Probe of Concept with Mock Data. Do not attend to make a real car search.',
        title: 'Joy Ride Discloser',
        image: new Image({
          url: JOYRIDE_BANNER,
          alt: 'Joy Ride Discloser Image'
        })
      })
    );
  } else {
    conv.ask('This is a Probe of Concept with Mock Data. Do not attend to make a real car search');
  }

  conv.ask('Okay! What is the make and model of the car you want to find?');

  // Suggestions will be placed at the end of the response
  conv.ask(new Suggestions('Nissan Altima', 'Honda Accord', 'Nissan Rogue'));
};

export default defaultWelcomeIntent;

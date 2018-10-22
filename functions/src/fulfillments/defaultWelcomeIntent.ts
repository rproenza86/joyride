import { Suggestions, BasicCard, Image, BasicCardOptions } from 'actions-on-google';
import { logger } from './../utils/logger';
import { JOYRIDE_BANNER } from './../constants';

const getDisclaimerText = (screen): string => {
  let disclaimerText = '';

  if (!screen) {
    disclaimerText =
      'Joy Ride Disclaimer: This is a Probe of Concept with Fictitious Data. Do not attend to make a real car search.';
  }

  return disclaimerText;
};

const getDisclaimerCard = (screen): BasicCardOptions => {
  let disclaimerCard: BasicCardOptions;

  if (screen) {
    disclaimerCard = {
      text:
        'This is a Probe of Concept with Fictitious Data. Do not attend to make a real car search.',
      title: 'Joy Ride Disclaimer',
      image: new Image({
        url: JOYRIDE_BANNER,
        alt: 'Joy Ride Discloser Image'
      })
    };
  } else {
    disclaimerCard = {};
  }

  return disclaimerCard;
};

const defaultWelcomeIntent = conv => {
  const { payload } = conv.user.profile;
  logger('User data', conv.user);
  const name = payload ? ` ${payload.given_name}` : '';
  conv.ask(`Welcome to Joy Ride ${name}!

    Ready to find your dream car in a matter of seconds?
    ${getDisclaimerText(conv.screen)}
  `);

  const initialQuestion = "Let's start! What is the make and model of the car you want to find?";

  if (conv.screen) {
    conv.close(new BasicCard(getDisclaimerCard(conv.screen)));

    conv.ask(initialQuestion);

    // Suggestions will be placed at the end of the response
    conv.ask(new Suggestions('Nissan Altima', 'Honda Accord', 'Nissan Rogue'));
  } else {
    const ssml =
      '<speak>' +
      `${initialQuestion} <break time="2" />` +
      '<p><s>Here you have some search examples:</s></p>' +
      '<p><s>Nissan Altima.</s></p>' +
      '<p><s>Honda Accord.</s></p>' +
      '<p><s>Nissan Rogue.</s></p>' +
      '</speak>';
    conv.ask(ssml);
  }
};

export default defaultWelcomeIntent;

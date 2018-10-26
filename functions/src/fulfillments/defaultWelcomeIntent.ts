import {
  BasicCard,
  BasicCardOptions,
  Image,
  Suggestions,
  Carousel,
  CarouselOptionItem
} from 'actions-on-google';
import { selectUserName } from '../selectors/user';
import { JOYRIDE_BANNER } from './../constants';
import { OptionItems } from 'actions-on-google/dist/service/actionssdk/conversation/question/option/option';
import { carsList } from '../__mock__/carsList';
import { logger } from '../utils/logger';

const getDisclaimerText = (screen): string => {
  let disclaimerText = '';

  if (!screen) {
    disclaimerText =
      "Joy Ride Disclaimer: This is a Probe of Concept with fictitious cars' data. Do not attend to make a real car search.";
  }

  return disclaimerText;
};

const getDisclaimerCard = (): BasicCardOptions => {
  let disclaimerCard: BasicCardOptions;

  disclaimerCard = {
    text:
      'This is a Probe of Concept with Fictitious Data. Do not attend to make a real car search.',
    title: 'Joy Ride Disclaimer',
    image: new Image({
      url: JOYRIDE_BANNER,
      alt: 'Joy Ride Discloser Image'
    })
  };
  logger('Rendering visual disclaimer card', { disclaimerCard });

  return disclaimerCard;
};

const getCarouselOptions = (screen): OptionItems<CarouselOptionItem> => {
  const carouselOptions: OptionItems<CarouselOptionItem> = {};

  if (screen) {
    (carouselOptions as any)['Nissan Altima'] = {
      title: 'Nissan Altima',
      synonyms: ['nissan altima', 'altima'],
      image: new Image({
        url: carsList[0].imageUrl,
        alt: 'Nissan Altima, car image'
      })
    };
    (carouselOptions as any)['Honda Accord'] = {
      title: 'Honda Accord',
      synonyms: ['honda accord', 'accord'],
      image: new Image({
        url: carsList[11].imageUrl,
        alt: 'Honda Accord, car image'
      })
    };
    (carouselOptions as any)['Nissan Rogue'] = {
      title: 'Nissan Rogue',
      synonyms: ['nissan Rogue', 'Rogue'],
      image: new Image({
        url: carsList[10].imageUrl,
        alt: 'Nissan Rogue, car image'
      })
    };
  }

  return carouselOptions;
};

const fakeCarsSearchOptions = screen => {
  const carousel = new Carousel({ items: getCarouselOptions(screen) });
  return carousel;
};

const defaultWelcomeIntent = conv => {
                                       const name = selectUserName(conv);
                                       conv.ask(`<speak> Welcome to Joy Ride ${name}!

  Ready to find your dream car in a matter of seconds?  <break time="2" />

    ${getDisclaimerText(false)}</speak>
  `); // TODO: revert to getDisclaimerText(conv.screen) when solved problem issue #14

                                       const initialQuestion = "Let's start! From the suggested options, what car make and model do you want to find?";

                                       if (conv.screen) {
                                         conv.ask(new BasicCard(getDisclaimerCard()));

                                         conv.ask(initialQuestion);

                                         conv.ask(fakeCarsSearchOptions(conv.screen));

                                         // Suggestions will be placed at the end of the response
                                         conv.ask(new Suggestions('Nissan Altima', 'Honda Accord', 'Nissan Rogue'));
                                       } else {
                                         const ssml = '<speak>' + `${initialQuestion} <break time="2" />` + '<p><s>Here you have some search examples:</s></p>' + '<p><s>Nissan Altima.</s></p>' + '<p><s>Honda Accord.</s></p>' + '<p><s>Nissan Rogue.</s></p>' + '</speak>';
                                         conv.ask(ssml);
                                       }
                                     };

export default defaultWelcomeIntent;

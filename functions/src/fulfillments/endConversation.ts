import { selectUserGivenName } from '../selectors/user';

const endConversation = conv => {
  const name = selectUserGivenName(conv);

  conv.close(`I hope you enjoy your JOYRIDE ${name}. See you soon!`);
};

export default endConversation;

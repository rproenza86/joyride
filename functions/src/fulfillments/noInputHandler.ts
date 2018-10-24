
const noInputHandler = conv => {
  // Use the number of re-prompts to vary response
  const rePromptCount = parseInt(conv.arguments.get('REPROMPT_COUNT'));
  switch (rePromptCount) {
    case 0:
      conv.ask("I didn't get that.Can you say it again please?");
      break;
    case 1:
      conv.ask('I missed what you said. Say it again please?');
      break;
    default:
      conv.close(`Sorry, we're having trouble. Let's ` +
        `try this again later. Goodbye.`);
      break;
  }
};

export default noInputHandler;

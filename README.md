# JOYRIDE

Actions on Google Application to browser for cars.

> Multimodal conversational experience application which allows users participate via voice and text as well as touchscreen interactions.

## _Joyride’s_ summary

This frictionless solution **allows** clients to **find a car** to buy and to **book a test drive** in seconds 10x faster than the web or mobile application on the market.

With Joyride Cars' Dealers will have access to more than 39 millions of American’s devices, such great potential that they are missing right now.

Joyride will break the frontier of the Cars' Dealers web world creating an unprecedented revenues for the business.

## Hot features

---

`Joyride` is a Google’s Actions application which allows users interact via voice commands with Cars' Dealers and `perform the next actions`:

- Search for cars
- Select a car and submit an offer/lead
- Schedule a test drive appointment
- Receive deal detail notifications

## _Business Value_ for Cars' Dealer owners

---

- Leads increase
- Accelerate work flow optimization and simplification
- Engagement increase
- Conversion increase
- Revenue increase
- Conversion cost decrease

## Actions on Google tech conversational builded features

- Supports deep links to directly launch the user into certain points of dialog.
- Uses utilities provided by the Actions on Google platform to fetch the user's name.
- Presents users with a rich visual response.
- Remembers the user's name between conversation sessions.
- Handles user silence following a prompt for input.
- Allows users to exit the Action at any point during the conversation.
- Presents users with a visual selection response on devices with supported screens.

## Video recorded demo
Video hosted on Youtube:
https://youtu.be/xCkP9CCcKQQ

## How to test?

---

> On Google Assistance, Google Home or any other device which the same service interface.

1. Talk to Joy Ride
2. I want to find a Nissan Altima
3. Select first one
4. Book a JOYRIDE
5. Tomorrow at 12pm
6. End my search

## Project setup

### Install npm dependencies

`$ cd functions`
`$ npm run install`

### Import dialogflow project

Use the `Cars-Browser.zip` file located on the dialogflow directory to import all the project intents, entities and others configurations.

### Firebase functions environment variables config
To send sms notifications:
    `$ firebase functions:config:set twilio.sid="SID_VALUE"  --project universal-cars-browser`
    `$ firebase functions:config:set twilio.token="TOKEN_VALUE" --project universal-cars-browser`

To initialize the Actions on Google SDK:
    `$ firebase functions:config:set joyride.client_id="CLIENT_ID" --project universal-cars-browser`

To send  emails using mailgun:
    `$ firebase functions:config:set mailgun.user="CLIENT_USER_NAME" --project universal-cars-browser`
    `$ firebase functions:config:set mailgun.pass="CLIENT_PASSWORD" --project universal-cars-browser`

### Deploy your code to firebase functions
From the functions directory run :

    `$ firebase deploy --only functions --project YOUR_PROJECT_NAME`

### Update your fulfillment webhook url
On dialogflow edit  URL entry off the Fulfillment section to use your Firebase functions url.

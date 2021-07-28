# dca

## INTRO:

This is a NodeJS server I built that is set to automatically purchase $5 worth of bitcoin every N hours, indefinitely. You can change how much to buy, how often to buy, and how much to re fund your account when it runs low. Once your funds run low the app will use your first instant buy funding source to deposit more funds into your account so that it can cover the purchase.
Please note that minimum amount per buy is $5, and the minimum deposit amount is \$10

## SET UP INSTRUCTIONS:

1. login to your coinbase pro account on your desktop and create an api key (settings > api > new key). Just select all 3 of the permissions. Make sure to whitelist your ipV4 IP address of your computer
   save the passphrase and key that it gives you, you will need them later

2. clone this project on your computer

3. create a .env file in the root directory of this project and put the below in there:

```
  SECRET=your_coinbasePro_api_secret
  KEY=your_coinbasePro_api_key
  PASSPHRASE=your_coinbasePro_api_passphrase
  BUY_FREQUENCY_HOURS=2
  DOLLAR_AMOUNT_TO_BUY_PER_PURCHASE=5  <---minimum is $5
  DEPOSIT_AMOUNT=50 <---minimum is $10
  PRODUCT_ID=BTC-USD <--- buys bitcoin using USD
```

4. open a terminal on your computer, navigate to the directory, and run the following commands:
   npm i
   npm run start

### AND THAT'S IT , YOU ARE DONE.

if you want to quit just close the server

ps. I added a new function that lets you calcualte total dollars spent and total bitcoin purchased since a given date. By default this function is commented out, if you want to run it just comment out the startDCAProcess function and uncomment the calculatePurchasesSince function.

# dca

INTRO:
This is a nodeJs server I built that is set to automatically purchase $5 worth of bitcoin every 6 hours, indefinitely. You can change the amount by changing the dollarAmountToBuy variable in app.js file. You can change the frequency by changing the milliseconds that are listed in app.js around line 37.
Please note that minimum amount per buy is $5

SET UP INSTRUCTIONS:

1. login to your coinbase pro account on your desktop and create an api key (settings > api > new key). Just select all 3 of the permissions. Make sure to whitelist your ipV4 IP address of your computer
   save the passphrase and key that it gives you , you will need them later

2. clone this project on your computer

3. create a .env file in the root directory of this project and put the below in there:
   SECRET=your_coinbasePro_api_secret
   KEY=your_coinbasePro_api_key
   PASSPHRASE=your_coinbasePro_api_passphrase

4. change the dollar amount and frequency if you want something other than \$5 every 6 hours (see above intro section)

5. open a terminal on your computer, navigate to the directory, and run the following commands:
   npm i
   npm run start

AND THAT'S IT , YOU ARE DONE.

if you want to quit just close the server

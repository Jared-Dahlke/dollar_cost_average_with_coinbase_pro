# dca

INTRO:
This is a nodeJs server I built that is set to automatically purchase $5 worth of bitcoin every 3 hours, indefinitely. You can change the amount by changing the dollarAmountToBuy variable in app.js file. You can change the frequency by changing the buy_frequency_hours variable in app.js. Once your funds run low the app will use your first instant buy funding source to deposit more funds into your account so that it can cover the purchase, you can change that amount by changing the deposit_amount variable in app.js
Please note that minimum amount per buy is $5, and the minimum deposit amount is \$10

SET UP INSTRUCTIONS:

1. login to your coinbase pro account on your desktop and create an api key (settings > api > new key). Just select all 3 of the permissions. Make sure to whitelist your ipV4 IP address of your computer
   save the passphrase and key that it gives you , you will need them later

2. clone this project on your computer

3. create a .env file in the root directory of this project and put the below in there:
   SECRET=your_coinbasePro_api_secret

   KEY=your_coinbasePro_api_key

   PASSPHRASE=your_coinbasePro_api_passphrase

4. change the purchase amount, frequency, and deposit amounts if you don't like the defaults (see above intro section)

5. open a terminal on your computer, navigate to the directory, and run the following commands:
   npm i
   npm run start

AND THAT'S IT , YOU ARE DONE.

if you want to quit just close the server

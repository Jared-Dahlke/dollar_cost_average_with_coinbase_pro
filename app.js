var express = require('express')
var port = process.env.PORT
var app = express()
const CoinbasePro = require('coinbase-pro') // https://www.npmjs.com/package/coinbase-pro
require('dotenv').config()
const secret = process.env.SECRET
const key = process.env.KEY
const passphrase = process.env.PASSPHRASE
const apiURI = 'https://api.pro.coinbase.com'

const buy_frequency_hours = process.env.BUY_FREQUENCY_HOURS
const dollar_amount_to_buy = process.env.DOLLAR_AMOUNT_TO_BUY

const {
	buyBitcoin,
	makeDeposit,
	getAccount,
	getAccounts,
	calculatePurchasesSince
} = require('./services/coinbasepro')

async function startDcaProcess() {
	const authedClient = new CoinbasePro.AuthenticatedClient(
		key,
		secret,
		passphrase,
		apiURI
	)

	const accounts = await getAccounts()
	let usdAccountId = accounts.filter((account) => account.currency === 'USD')[0]
		.id
	const account = await getAccount(usdAccountId)
	if (Number(account.available) < Number(dollar_amount_to_buy)) {
		makeDeposit(authedClient)
		//note: the depositPayment method in the coinbase api works, but
		//it shows an error, there is no way of knowing when it is finished
		//depositing, hence the settimeout here:
		setTimeout(() => {
			startDcaProcess()
		}, 30000)
	} else {
		buyBitcoin(authedClient)
		setTimeout(() => {
			startDcaProcess()
		}, buy_frequency_hours * 3600000)
	}
}

app.listen(port, function () {
	console.log(`app listening on port ${7000}`)
	startDcaProcess()
	//	calculatePurchasesSince('2021-06-30')
})

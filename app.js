var express = require('express')
var port = process.env.PORT
var app = express()
require('dotenv').config()

const buy_frequency_hours = process.env.BUY_FREQUENCY_HOURS
const dollar_amount_to_buy_per_purchase =
	process.env.DOLLAR_AMOUNT_TO_BUY_PER_PURCHASE

const {
	buyBitcoin,
	makeDeposit,
	getAccount,
	getAccounts,
	calculatePurchasesSince
} = require('./services/coinbasepro')

async function startDcaProcess() {
	const accounts = await getAccounts()
	let usdAccountId = accounts.filter((account) => account.currency === 'USD')[0]
		.id
	const account = await getAccount(usdAccountId)
	if (Number(account.available) < Number(dollar_amount_to_buy_per_purchase)) {
		makeDeposit()
		//note: the depositPayment method in the coinbase api works, but
		//it shows an error, there is no way of knowing when it is finished
		//depositing, hence the settimeout here:
		setTimeout(() => {
			startDcaProcess()
		}, 30000)
	} else {
		buyBitcoin()
		setTimeout(() => {
			startDcaProcess()
		}, buy_frequency_hours * 3600000)
	}
}

app.listen(port, function () {
	console.log(`app listening on port ${7000}`)
	startDcaProcess()
	//calculatePurchasesSince('2021-07-20')
})

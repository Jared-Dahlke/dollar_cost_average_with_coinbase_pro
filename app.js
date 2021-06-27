var express = require('express')
var port = process.env.PORT
var app = express()
const CoinbasePro = require('coinbase-pro') // https://www.npmjs.com/package/coinbase-pro
require('dotenv').config()
const secret = process.env.SECRET
const key = process.env.KEY
const passphrase = process.env.PASSPHRASE
const apiURI = 'https://api.pro.coinbase.com'
const authedClient = new CoinbasePro.AuthenticatedClient(
	key,
	secret,
	passphrase,
	apiURI
)

const buy_frequency_hours = 3
const dollarAmountToBuy = 5 // min is 5
const deposit_amount = 100

async function startProcess() {
	const accounts = await authedClient.getAccounts()
	let usdAccountId = accounts.filter((account) => account.currency === 'USD')[0]
		.id
	const account = await authedClient.getAccount(usdAccountId)
	if (Number(account.available) < Number(dollarAmountToBuy)) {
		let success = await makeDeposit(authedClient)
	}
	buyBitcoin(authedClient)

	setTimeout(() => {
		startProcess()
	}, buy_frequency_hours * 3600000)
}

async function buyBitcoin(authedClient) {
	const params = {
		side: 'buy',
		type: 'market',
		product_id: 'BTC-USD',
		funds: dollarAmountToBuy
	}

	try {
		let order = await authedClient.placeOrder(params)
		console.log(
			`the bot bought ${order.specified_funds} worth of bitcoin at ${order.created_at}`
		)
	} catch (err) {
		console.log('error buying bitcoin:')
		console.log(err)
	}
}

async function makeDeposit(authedClient) {
	const paymentMethods = await authedClient.getPaymentMethods()
	let instantBuyPaymentMethodId = paymentMethods.filter(
		(methods) => methods.instant_buy === true
	)[0].id
	let deposit = await authedClient.depositPayment({
		amount: deposit_amount, // dollarAmountToBuy * 10,
		currency: 'USD',
		payment_method_id: instantBuyPaymentMethodId
	})
	console.log(`the bot deposited ${deposit.amount} USD at ${new Date()}`)
	return true
}

app.listen(port, function () {
	console.log(`app listening on port ${7000}`)
	startProcess()
})

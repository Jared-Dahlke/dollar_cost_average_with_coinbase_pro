var express = require('express')
var port = process.env.PORT
var app = express()
const CoinbasePro = require('coinbase-pro') // https://www.npmjs.com/package/coinbase-pro
require('dotenv').config()
const secret = process.env.SECRET
const key = process.env.KEY
const passphrase = process.env.PASSPHRASE
const apiURI = 'https://api.pro.coinbase.com'

const buy_frequency_hours = 0.5
const dollarAmountToBuy = 5 // min is 5
const deposit_amount = 0

async function startDcaProcess() {
	const authedClient = new CoinbasePro.AuthenticatedClient(
		key,
		secret,
		passphrase,
		apiURI
	)

	const accounts = await authedClient.getAccounts()
	let usdAccountId = accounts.filter((account) => account.currency === 'USD')[0]
		.id
	const account = await authedClient.getAccount(usdAccountId)
	if (Number(account.available) < Number(dollarAmountToBuy)) {
		makeDeposit(authedClient)
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
	authedClient.depositPayment({
		amount: deposit_amount, // dollarAmountToBuy * 10,
		currency: 'USD',
		payment_method_id: instantBuyPaymentMethodId
	})
	console.log(`the bot deposited ${deposit.amount} USD at ${new Date()}`)
}

async function calculatePurchases() {
	const start_date = '2021-06-30'
	const authedClient = new CoinbasePro.AuthenticatedClient(
		key,
		secret,
		passphrase,
		apiURI
	)

	let purchases = await authedClient.getFills({ product_id: 'BTC-USD' })

	let bitcoinPurchased = 0
	let dollarsSpent = 0
	for (const purchase of purchases) {
		if (purchase.created_at > start_date && purchase.side === 'buy') {
			bitcoinPurchased = bitcoinPurchased + Number(purchase.size)
			dollarsSpent = dollarsSpent + Number(purchase.usd_volume)
		}
	}

	console.log(dollarsSpent)
	console.log(bitcoinPurchased)
}

app.listen(port, function () {
	console.log(`app listening on port ${7000}`)
	//	startDcaProcess()
	calculatePurchases()
})

const CoinbasePro = require('coinbase-pro') // https://www.npmjs.com/package/coinbase-pro
require('dotenv').config()
const secret = process.env.SECRET
const key = process.env.KEY
const passphrase = process.env.PASSPHRASE
const apiURI = 'https://api.pro.coinbase.com'

const buy_frequency_hours = process.env.BUY_FREQUENCY_HOURS
const dollar_amount_to_buy = process.env.DOLLAR_AMOUNT_TO_BUY
const deposit_amount = process.env.DEPOSIT_AMOUNT
const product_id = process.env.PRODUCT_ID

const authedClient = new CoinbasePro.AuthenticatedClient(
	key,
	secret,
	passphrase,
	apiURI
)

async function getAccount(usdAccountId) {
	return await authedClient.getAccount(usdAccountId)
}

async function getAccounts() {
	return await authedClient.getAccounts()
}

async function buyBitcoin() {
	const params = {
		side: 'buy',
		type: 'market',
		product_id: product_id,
		funds: dollar_amount_to_buy
	}

	try {
		let order = await authedClient.placeOrder(params)
		console.log(
			`the bot bought ${order.specified_funds} worth of ${product_id} at ${order.created_at}`
		)
	} catch (err) {
		console.log('error:')
		console.log(err)
	}
}

async function makeDeposit() {
	const paymentMethods = await authedClient.getPaymentMethods()
	let instantBuyPaymentMethodId = paymentMethods.filter(
		(methods) => methods.instant_buy === true
	)[0].id
	authedClient.depositPayment({
		amount: deposit_amount,
		currency: 'USD',
		payment_method_id: instantBuyPaymentMethodId
	})
	console.log(`the bot deposited ${deposit.amount} USD at ${new Date()}`)
}

async function calculatePurchasesSince(start_date) {
	let purchases = await authedClient.getFills({ product_id: product_id })
	let bitcoinPurchased = 0
	let dollarsSpent = 0
	for (const purchase of purchases) {
		if (purchase.created_at >= start_date && purchase.side === 'buy') {
			bitcoinPurchased = bitcoinPurchased + Number(purchase.size)
			dollarsSpent = dollarsSpent + Number(purchase.usd_volume)
		}
	}

	console.log(dollarsSpent)
	console.log(bitcoinPurchased)
}

exports.buyBitcoin = buyBitcoin
exports.makeDeposit = makeDeposit
exports.calculatePurchasesSince = calculatePurchasesSince
exports.getAccount = getAccount
exports.getAccounts = getAccounts

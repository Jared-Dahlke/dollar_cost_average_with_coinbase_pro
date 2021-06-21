var express = require('express')
var port = process.env.PORT || 3000
var app = express()
const CoinbasePro = require('coinbase-pro') // https://www.npmjs.com/package/coinbase-pro
require('dotenv').config()
const secret = process.env.SECRET
const key = process.env.KEY
const passphrase = process.env.PASSPHRASE

async function buyBitcoin() {
	const apiURI = 'https://api.pro.coinbase.com'
	const authedClient = new CoinbasePro.AuthenticatedClient(
		key,
		secret,
		passphrase,
		apiURI
	)

	const params = {
		side: 'buy',
		type: 'market',
		product_id: 'BTC-USD',
		funds: 5
	}

	await authedClient.placeOrder(params, console.log('placed'))

	console.log('you just bought bitcoin!')

	// 14400000 <- 4 hours
	// 21600000 <- 6 hours
	// 43200000 <- 12 hours
	setTimeout(() => {
		buyBitcoin()
	}, 21600000)
}

app.listen(port, function () {
	console.log(`Example app listening on port !`)
	buyBitcoin()
})

const CoinGecko = require("coingecko-api");
const CoinGeckoClient = new CoinGecko();

// Get Historical Exchange price of token at given unix timestamp (in milli seconds)
export async function getTokenHistoricalExPriceInEth(tokenAddress: string, timestamp: number) {
    try {
        if(tokenAddress==="0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE".toLowerCase())
            return 1;
        const { data:coinData } = await CoinGeckoClient.coins.fetchCoinContractInfo(tokenAddress);
        const coinId = coinData.id;
        console.log(coinId);
        if(!coinId)
            return NaN;
        const date = new Date(timestamp);
        const day = `${date.getUTCDate()}-${(date.getUTCMonth()+1)}-${date.getUTCFullYear()}`;
        console.log(day);
        let { data }= await CoinGeckoClient.coins.fetchHistory(coinId, { date: day });
        if(!data || !data.market_data || !data.market_data.current_price)
            return NaN;
        else {
            const priceHistories = data.market_data.current_price;
            if(!priceHistories['eth'] && !priceHistories['usd']) 
                return NaN;
            if(!priceHistories['eth']) {
                const ethPriceInUSD = await _getEthHistoricalExPriceInUSD(day);
                return priceHistories['usd']*ethPriceInUSD;
            }
            return priceHistories['eth'];
        }
    }
    catch(err) {
        console.log(err);
        return NaN;
    }
}


// get Historical Exchange Price of ETH in USD on a given day dd-mm-yyyy format
async function _getEthHistoricalExPriceInUSD(day: string) {
    let { data } = await CoinGeckoClient.coins.fetchHistory("ethereum", { date: day });
    if(!data || !data.market_data || !data.market_data.current_price || !data.market_data.current_price['usd'])
        return NaN;
    return data.market_data.current_price['usd'];
}


// Get present Exchange price of token vs currency
export async function getExchangePrice(tokenAddress: string, vsCurrency: string) {
    try {
        const { data } = await CoinGeckoClient.simple.fetchTokenPrice({
            contract_addresses: tokenAddress,
            vs_currencies: vsCurrency,
        });
        return data[tokenAddress].usd;
    }
    catch(err) {
        console.log(err);
    }
}

// Get present Exchange price of ethereum vs usd
export async function getEthPriceInUSD() {
    try {
        const { data } = await CoinGeckoClient.simple.price({
            ids: 'ethereum',
            vs_currencies:'usd',
        });
        const ethPriceInUSD = data['ethereum'].usd;
        return ethPriceInUSD;
    }
    catch(err) {
        console.log(err);
    }
}
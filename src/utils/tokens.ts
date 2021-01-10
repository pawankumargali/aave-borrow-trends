const tokens = {
    '0x0d8775f648430679a709e98d2b0cb6250d2887ef': {
        symbol:'bat',
        // name:'Basic Attention Token',
        name:'BAT',
        decimals:18,
        ltv:0.7,
        liquidation:0.75
    },

    '0x4fabb145d64652a948d72533023f6e7a623c7c53': {
        symbol:'busd',
        name:'BUSD',
        // name:'Binance USD',
        decimals:18
    },

    '0xc00e94cb662c3520282e6f5717214004a7f26888': {
        symbol:'comp',
        name:'COMP',
        // name:'Compound',
        decimals:18
    },

    '0x6b175474e89094c44da98b954eedeac495271d0f': {
        symbol:'dai',
        name:'DAI',
        // name:'Dai',
        decimals:18,  
        ltv:0.75,
        liquidation:0.8
    },
    '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE': {
            symbol:'eth',
        name:'ETH',
        // name:'Ether',
        decimals:18,
        ltv:0.8,
        liquidation:0.825
    },
    
    '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2': {
        symbol: 'weth',
        name:'WETH',
        // name:'Wrapped Ether',
        decimals:18,
        ltv:0.8,
        liquidation:0.825
    },
    '0xdd974d5c2e2928dea5f71b9825b8b646686bd200': {
        symbol:'knc',
        name:'KNC',
        // name: 'Kyber Network Coin',
        decimals:18,
        ltv:0.6,
        liquidation:0.65
    },

    '0x80fB784B7eD66730e8b1DBd9820aFD29931aab03': {
        symbol: 'lend',
        name:'LEND',
        // name: 'EthLend',
        decimals:18
    },
    '0x514910771af9ca656af840dff83e8264ecf986ca': {
        symbol: 'link',
        name:'LINK',
        // name:'ChainLink Token',
        decimals:18,
        ltv:0.7,
        liquidation:0.75

    },
    '0x0f5d2fb29fb7d3cfee444a200298f468908cc942': {
            symbol: 'mana',
            name:'MANA',
        // name:'Decentraland',
        decimals:18,
        ltv:0.6,
        liquidation:0.65
    },
    '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2': {
        symbol:'mkr',
        name:'MKR',
        // name:'Maker',
        decimals:18,
        ltv:0.6,
        liquidation:0.65
    },
    '0xeb4c2781e4eba804ce9a9803c67d0893436bb27d': {
        symbol:'renbtc',
        name:'renBTC',
        decimals:8,
        ltv:0.55,
        liquidation:0.6
    },
    '0x221657776846890989a759ba2973e427dff5c9bb': {
        symbol:'rep',
        name:'REP',
        // name:'Augur',
        decimals:18,
        ltv:0.35,
        liquidation:0.65
    },
    '0xfe18be6b3bd88a2d2a7f928d00292e7a9963cfc6': {
        symbol:'sbtc',
        name:'SBTC',
        // name:'Synthetix BTC',
        decimals:18
    },
    '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f': {
        symbol: 'snx',
        name:'SNX',
        // name:'Synthetix Network Coin',
        decimals:18,
        ltv:0.15,
        liquidation:0.4
    },
    '0x57ab1ec28d129707052df4df418d58a2d46d5f51': {
        symbol:'susd',
        name:'SUSD',
        // name:'Synthetix USD',
        decimals:18
    },
    '0x0000000000085d4780B73119b644AE5ecd22b376': {
        symbol: 'tusd',
        name:'TUSD',
        // name:'TrueUSD',
        decimals:18,
        ltv:0.75,
        liquidation:0.8
    },
    '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48': {
        symbol: 'usdc',
        name:'USDC',
        // name:'USD Coin',
        decimals:6,
        ltv:0.8,
        liquidation:0.85

    },
    '0xdac17f958d2ee523a2206206994597c13d831ec7': {
        symbol: 'usdt',
        name:'USDT',
        // name:'Tether USD',
        decimals:6,
    },
    
    '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599': {
        symbol:'wbtc',
        name:'WBTC',
        // name:'Wrapped BTC',
        decimals:8,
        ltv:0.7,
        liquidation:0.75

    },
    '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e': {
        symbol:'yfi',
        name:'YFI',
        // name:'Yearn',
        decimals:18,
        ltv:0.4,
        liquidation:0.55
    },
    '0xe41d2489571d322189246dafa5ebde1f4699f498': {
        symbol: 'zrx',
        name:'ZRX',
        // name:'0x Protocol',
        decimals:18,
        ltv:0.6,
        liquidation:0.65
    },
    '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9': {
        symbol: 'aave',
        name:'AAVE TOKEN',
        decimals:18,
        ltv:0.5,
        liquidation:0.65
    },
    '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984': {
        symbol:'uni',
        name:'UNISWAP TOKEN',
        decimals:18,
        ltv:0.6,
        liquidation:0.65
    },
    '0xF629cBd94d3791C9250152BD8dfBDF380E2a3B9c': {
        symbol:'enjin',
        name:'Enjin Coin',
        decimals:18,
        ltv:0.55,
        liquidation:0.65
    }
}

export default tokens;
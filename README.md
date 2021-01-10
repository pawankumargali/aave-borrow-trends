### Aave Borrow Trends (From Jan 2020)
API returns aave borrow history of particular user from Jan 2020 to present
##### [ER Model Here](https://i.ibb.co/mJ8YxYX/aave-borrow.jpg)

#### Routes:
1. <b>/api/borrow/:userId?key={API_KEY} </b>
Returns borrow history of given user address
<b>Example Response</b>
/api/borrow/0xa25A9b7c73158B3B34215925796Ce6Aa8100C13a?key={API_KEY}
<code>{
		&nbsp; &nbsp; &nbsp;liquidation_history: [{
			&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;"id": "792206","time_stamp": "1608762401000",
			&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;"tx_hash": 	"0xc41f18c2965e7c8f504b50311bea58936a3f058beea89c6af6d3b4312edea037",
			&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;"tx_type": "liquidation",
			&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;"reserve": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
			&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;"liquidated_col_amt": 1006.1930552905559
		&nbsp; &nbsp; &nbsp;}],
		&nbsp; &nbsp; &nbsp;borrow_history: [{
			&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;"id": "704443",
			&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;"time_stamp": "1599174009000",
			&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;"tx_hash": "0x39b78468e3b39d46151a3f3bc3615ca26df515680930706f30d9b3f2f948809d",
			&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;"tx_type": "borrow",
			&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;"reserve": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
			&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;"amt": 60,
			&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;"borrow_bal_increase": 0,
			&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;"net_borrow": 60
		&nbsp; &nbsp; &nbsp;}],
		&nbsp; &nbsp; &nbsp;current: {
		&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;"net_col": 7792.7524138899,
		&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;"net_borrow": 3603.5086944830027,
		&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;"net_fees": 0.0001424381992,
		&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;"hf": 1.5354074221138967,
		&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;"max_liquidation": 0.71,
		&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;"ltv": 0.65
		&nbsp; &nbsp; &nbsp;}
}</code>

2. <b>/api/borrow/:userId?reserveId={reserveId}&key={API_KEY} </b>
Returns borrow history of given user address
<b>Example Response</b>
/api/borrow/0xa25A9b7c73158B3B34215925796Ce6Aa8100C13a?reserveId=0x6B175474E89094C44Da98b954EedeAC495271d0F&key={API_KEY}
<code>{
		&nbsp; &nbsp; &nbsp;liquidation_history: [{
			&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;"id": "792212","time_stamp": "1608762487000",
			&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;"tx_hash": 	"0x362a171ddd04d5855931b1ce8ebbaa269d7ed529a3e5cced05994afd8c846543",
			&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;"tx_type": "liquidation",
			&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;"reserve": "0x6B175474E89094C44Da98b954EedeAC495271d0F",
			&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;"liquidated_col_amt": 48884.989282633
		&nbsp; &nbsp; &nbsp;}],
		&nbsp; &nbsp; &nbsp;borrow_history: [{
			&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;"id": "716508",
			&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;"time_stamp": "1602105146000",
			&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;"tx_hash": "0x9a3cb7272d02f85ef8fa7f4e6727b515624124d527a31348c28caee1134a4246",
			&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;"tx_type": "borrow",
			&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;"reserve": "0x6B175474E89094C44Da98b954EedeAC495271d0F",
			&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;"amt": 89.25771422893072,,
			&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;"borrow_bal_increase": 0,
			&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;"net_borrow": 89.25771422893072
		&nbsp; &nbsp; &nbsp;}],
		&nbsp; &nbsp; &nbsp;current: {
			&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;"net_borrow": 2584813.962781859,
			&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;"last_updated": 1610260360000
		&nbsp; &nbsp; &nbsp;}
}</code>
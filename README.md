### Aave Borrow Trends (From Jan 2020)

API returns aave borrow history of particular user from Jan 2020 to present

##### [ER Model Here](https://i.ibb.co/mJ8YxYX/aave-borrow.jpg)

  

#### Routes:

1.  <b>/api/borrow/:userId?key={API_KEY} </b>

Returns borrow history of given user address

<b>Example Response</b>

/api/borrow/0xa25A9b7c73158B3B34215925796Ce6Aa8100C13a?key={API_KEY}<br/>
![user-borrow-response](https://i.ibb.co/8gvphf2/user-borrow-res.png)
  
  

2.  <b>/api/borrow/:userId?reserveId={reserveId}&key={API_KEY} </b>

Returns borrow history of given user address from a  given reserve

<b>Example Response</b>

/api/borrow/0xa25A9b7c73158B3B34215925796Ce6Aa8100C13a?reserveId=0x6B175474E89094C44Da98b954EedeAC495271d0F&key={API_KEY}<br/>

![user-borrow-reserve-response](https://i.ibb.co/1fMHxfY/user-borrow-reserve-res.png)
var defaultMinValue = 10000;
var defaultMaxValue = 20000;
var price = 0;

chrome.runtime.onInstalled.addListener(function() {
    console.log("Setting inital min-max values.");

    let userSettings ={ minBtcId: defaultMinValue, maxBtcId: defaultMaxValue};
	
    chrome.storage.sync.set(
	  	{'userSettings': userSettings}, 
	      function() {
          console.log('min value is: ' + userSettings.minBtcId);
          console.log('max value is: ' + userSettings.maxBtcId);
	  });
});

chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  chrome.declarativeContent.onPageChanged.addRules([{
    conditions: [new chrome.declarativeContent.PageStateMatcher({
      pageUrl: {hostEquals: 'developer.chrome.com'},
    })
    ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
  }]);
});


fetchBtcPrice = () =>{
  fetch("https://api.gdax.com/products/BTC-USD/book", {
    "method": "GET"
  })
  .then(response => {
     response.json()
     .then( json => {
        price = json.bids[0][0];
        console.log("Actual price is:" +price);   
      }).catch(err => {
        console.log(err);
      });
  })
  .catch(err => {
    console.log(err);
  });
}

chrome.runtime.onInstalled.addListener(() => {
  console.log('onInstalled...');
  // create alarm after extension is installed / upgraded
  chrome.alarms.create('alarm', { periodInMinutes: 1});
});


chrome.alarms.onAlarm.addListener((alarm) => {
  console.log("Checking alert:" +alarm.name); 

    chrome.storage.sync.get(['userSettings'], function(result) {

      console.log("Result:");
      console.log(result);

      console.log("The alarm price  MIN is:" +result.userSettings.minBtcId);
      console.log("The alarm price  MAX is:" +result.userSettings.maxBtcId);

      if(price && price < parseInt(result.userSettings.minBtcId)){
        console.log(`The actual price ${price} is lower than the established minimum price: ${result.userSettings.minBtcId}`);
        setTimeout(function() {alert(`The actual price ${price} is lower than the established minimum price: ${result.userSettings.minBtcId}`)}, 5000);
      }

      if(price && price > parseInt(result.userSettings.maxBtcId)){
        console.log(`The actual ${price} is higher than the established maximum price ${result.userSettings.maxBtcId}:`);
        setTimeout(function() {alert(`The actual ${price} is higher than the established maximum price ${result.userSettings.maxBtcId}:`)}, 5000);;
      }


    });


  fetchBtcPrice();
});
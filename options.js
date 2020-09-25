let button = document.getElementById('savePreferencesId');

button.addEventListener('click', function() {
  //alert("save min-max!");
  let min = document.getElementById("minBtcId").value;
  let max = document.getElementById("maxBtcId").value; 

  let userSettings ={ minBtcId: min, maxBtcId: max};

  chrome.storage.sync.set(
      {'userSettings': userSettings}, 
        function() {
          console.log('min stored value is: ' + userSettings.minBtcId);
          console.log('max stored value is: ' + userSettings.maxBtcId);
  });


  alert("The values have been saved.");
});

(actualBTCPrice = () =>{
  fetch("https://api.gdax.com/products/BTC-USD/book", {
    "method": "GET"
  })
  .then(response => {
     response.json()
     .then( json => {
        price = json.bids[0][0];

        let element = document.getElementById("actualPriceId"); 
        element.innerHTML = `${price}  $  ( ${getFormattedDate()} ) `;

      }).catch(err => {
        console.log(err);
      });
  })
  .catch(err => {
    console.log(err);
  });
})();

function getFormattedDate() {
    var date = new Date();
    var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return str;
}
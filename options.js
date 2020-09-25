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
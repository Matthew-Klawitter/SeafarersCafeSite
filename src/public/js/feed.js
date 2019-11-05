function loadFeed(callback){
  var myRequest = new Request('/feed');
  fetch(myRequest).then(function(response) {
    return response.text();
  }).then(function(response) {
    document.getElementById("feed").innerHTML = response;
    callback()
  });
}

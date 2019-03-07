function loadFeed(callback){
  var myRequest = new Request('/feed');
  fetch(myRequest).then(function(response) {
    return response.text();
  }).then(function(response) {
    console.log(response);
    document.getElementById("feed").innerHTML = response;
    callback()
  });
}

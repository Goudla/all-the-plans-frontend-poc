'use strict';

(function() {
  var xmlhttp = new XMLHttpRequest();
  var url = 'https://wt-douglasbamber-gmail_com-0.sandbox.auth0-extend.com/gjgardner';

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var plans = JSON.parse(this.responseText);
      renderPlans(plans);
    }
  };
  xmlhttp.open('GET', url, true);
  xmlhttp.send();

  function renderPlans(arr) {
    var out = "";
    var i;
    for(i = 0; i < arr.length; i++) {
      out += '<div>' + arr[i].title + '</div><br>';
    }
    document.getElementById("plans").innerHTML = out;
  }
})();

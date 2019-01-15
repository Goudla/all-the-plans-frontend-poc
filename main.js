'use strict';

(function() {
  var xmlhttp = new XMLHttpRequest();
  var url = 'https://wt-douglasbamber-gmail_com-0.sandbox.auth0-extend.com/plans';

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
      out += [
        '<a href="' + arr[i].link + '" target="_blank" >',
        '<img src="' + arr[i].thumbnailImage + '" alt="' + arr[i].title + '" width="100">',
        '<br>',
        arr[i].title,
        '<br>',
        '<small>' + arr[i].collectionTitle + '</small>',
        '<br>',
        'Floor Area' + arr[i].floorArea + ' m<sup>2</sup>',
        '</a>',
        '<br>'
      ].join('');
    }
    document.getElementById("plans").innerHTML = out;
  }
})();

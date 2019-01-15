'use strict';

function newpostReq(url, callBack) {
  var xmlhttp;
  if (window.XDomainRequest) {
    console.log(1);
    xmlhttp = new XDomainRequest();
    xmlhttp.onload = function() {
      callBack(xmlhttp.responseText)
    };
  } else if (window.XMLHttpRequest) {
    console.log(2);
    xmlhttp = new XMLHttpRequest();
  } else {
    console.log(3);
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        callBack(xmlhttp.responseText);
      }
  }
  xmlhttp.open("GET",url,true);
  xmlhttp.send();
}

(function() {
  var url = 'https://wt-douglasbamber-gmail_com-0.sandbox.auth0-extend.com/plans';

  newpostReq(url, function(data) {
    var arr = JSON.parse(data);
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
  });
})();

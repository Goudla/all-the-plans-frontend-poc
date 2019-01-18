'use strict';

(function() {
  var url = 'https://wt-douglasbamber-gmail_com-0.sandbox.auth0-extend.com/plans';

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
  }

  function newReq(url, callBack) {
    var xmlhttp;
    if (window.XDomainRequest) {
      xmlhttp = new XDomainRequest();
      xmlhttp.onload = function() {
        callBack(xmlhttp.responseText)
      };
    } else if (window.XMLHttpRequest) {
      xmlhttp = new XMLHttpRequest();
    } else {
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

  newReq(url, function(data) {
    var array = JSON.parse(data);
    var sortOrder = getQueryVariable('sortOrder');
    var sortDirection = getQueryVariable('sortDirection');
    var sortedArray;
    if (sortOrder) {
      sortedArray = array.sort(function(a, b) {
        var valueA = isNaN(a[sortOrder]) ? a[sortOrder].toUpperCase() : a[sortOrder];
        var valueB = isNaN(b[sortOrder]) ? b[sortOrder].toUpperCase() : b[sortOrder];
        if (valueA < valueB) {
          return sortDirection === 'desc' ? 1 : -1;
        }
        if (valueA > valueB) {
          return sortDirection === 'desc' ? -1 : 1;
        }
        return 0;
      });
    } else {
      sortedArray = array
    }
    var out = "";
    var i;
    for(i = 0; i < sortedArray.length; i++) {
      var value = sortedArray[i];
      out += [
        '<a class="card" href="' + value.link + '" target="_blank" >',
        '<img src="' + value.thumbnailImage + '" alt="' + value.title + '">',
        '<div class="card-body">',
        '<h4 class="card-title">' + value.title + ' - ' + value.floorArea + ' m<sup>2</sup></h5>',
        '<h6 class="card-subtitle">' + value.companyTitle + ' / ' + value.collectionTitle + '</h6>',
        '</div>',
        '</a>'
      ].join('');
    }
    document.getElementById("plans").innerHTML = out;
  });
})();

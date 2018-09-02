nt.spa.utils.storage = (function ($) {
  var webStorageAvailable = function () {
	return (typeof(Storage) !== "undefined");
  }
	
  var getLocalItem = function (key) {
    if (webStorageAvailable()) {
	  try {
	    return localStorage.getItem(key);
	  }
	  catch(error) {
	    //when running from local (file://) localStorage fails in IE
	    return null;
	  }
    }
  };

  var setLocalItem = function (key, value) {
    if (webStorageAvailable()) {
	  try {
	    localStorage.setItem(key, value);
	  }
	  catch(error) {
	    //when running from local (file://) localStorage fails in IE... do nothing
	  }
    }
  
    return true;
  };
  
  return {getItem: getLocalItem, setItem: setLocalItem};
}());
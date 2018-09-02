nt.spa.utils.settings = (function ($) {
	var storage = nt.spa.utils.storage;
	var currentLanguage = 'en'; //default
	
	var applicationMode = {
		"development" : "development",
		"test" : "test",
		"production" : "production"
	}
	
	var appPrefix = function () {
		return 'nt_spa';
	};
	
	var getCurrentMode = function () {
		return applicationMode.development;
	};
	
	var languagesDB = TAFFY([
	  {"key": "en", "desc": "English"},
	  {"key": "nl", "desc": "Nederlands"},
	  {"key": "de", "desc": "Deutsche"},
	  {"key": "es", "desc": "Español"}
	]);
	
	var items = {
	  "currentLanguage": "currentLanguage"
	};
	
	function getCurrentLanguage() {
	  var lang = currentLanguage;
	
	  var langFromStorage = storage.getItem(items.currentLanguage);
		
	  if ((langFromStorage !== null) && (langFromStorage !== undefined)) {
	    lang = langFromStorage;
	  }
	  
	  return lang;
	}
	
	var setCurrentLanguage = function (language) {
	  if (!languagesDB({key: language}).first()) {
		  return false;
	  }
	  
	  currentLanguage = language;
	  storage.setItem(items.currentLanguage, language);	  
	  return true;
	};
	
	var getLanguageDescription = function (languageKey) {
	  return languagesDB({key: languageKey}).first().desc;
	};
	
	return {
		appPrefix: appPrefix,
	  getCurrentLanguage: getCurrentLanguage,
	  setCurrentLanguage: setCurrentLanguage,
	  getCurrentMode: getCurrentMode,
	  applicationMode: applicationMode,
	  getLanguageDescription: getLanguageDescription
	};
} (jQuery));
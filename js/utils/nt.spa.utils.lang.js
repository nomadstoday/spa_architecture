nt.spa.utils.lang = (function () {
	var translationsDB = TAFFY([]);
	var default_translationsDB = TAFFY({});
	var defaultLanguage = 'en';
	var defaultTranslationsSet = false;
	var settings = nt.spa.utils.settings;
	
	var appPrefix = settings.appPrefix();
	
	var languageMap = {
  	english: 'en',
	  dutch: 'nl',
	  german: 'de',
	  spanish: 'es'
	};
	
	var getText, setTranslations;	
	
	function getTranslations (language) {
	  // TODO retrieve text from LanguageText Service
	  var textMap = {};
	  textMap[languageMap.english] = getEnglishText();
	  textMap[languageMap.dutch] = getDutchText();
	  textMap[languageMap.german] = getGermanText();
	  textMap[languageMap.spanish] = getSpanishText();
	  // End TODO retrieve text from LanguageText Service
		
	  return textMap[language];
	};
	
	var getEnglishText = function () {
      return [
	    {"key": "appTitle", "text": `${appPrefix}`},
	    {"key": "welcomeDescription", "text": "This is a template to build SPAs"}
	  ];
	};
	
	var getDutchText = function () {
      return [
	    {"key": "appTitle", "text": `${appPrefix}`},
	    {"key": "welcomeDescription", "text": "Dit is een sjabloon om SPAs te bouwen"}
	  ];
	};
	
	var getGermanText = function () {
      return [
	    {"key": "appTitle", "text": `${appPrefix}`},
	    {"key": "welcomeDescription", "text": ""}
	  ];
	};
	
	var getSpanishText = function () {
      return [
	    {"key": "appTitle", "text": `${appPrefix}`},
	    {"key": "welcomeDescription", "text": "Esta es una plantilla para construir SPAs"}
	  ];
	};
	
	// Begin public methods
	setTranslations = function () {
	  if (!defaultTranslationsSet) {
	    default_translationsDB = TAFFY(getTranslations(defaultLanguage));
			defaultTranslationsSet = true;
	  }
	  	  
	  var language = settings.getCurrentLanguage();
	  if (language === defaultLanguage) {
			translationsDB = default_translationsDB;
	  }
	  else {
			translationsDB = TAFFY(getTranslations(language));   
	  }	  
	};
	
	getText = function (key) {	  
    var textFound = true;
	  var text = translationsDB({key: key}).first().text;
	  if (!text)
	  {
			textFound = false;
			var productionMode = (settings.getCurrentMode() === settings.applicationMode.production);
		
			//translation not found... if not default language, try to get text from default language db
			var language = settings.getCurrentLanguage();
			if (productionMode && language !== defaultLanguage) {
				text = default_translationsDB({key: key}).first().text;
			}
			else {
				text = `[missing #${key}# for ${settings.getLanguageDescription(language)}]`;
			}
	  }
		
		return text;
	};
	// End public methods
	
	return {
	  getText: getText,
	  setTranslations: setTranslations
	};
} ());
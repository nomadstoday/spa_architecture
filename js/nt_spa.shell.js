nt_spa.shell = (function ($) {
  var initShell;
  var settings = nt_spa.utils.settings;
  var langUtils = nt_spa.utils.lang;
	var appPrefix = settings.appPrefix();
	
	var moduleIDs = {
		'module1': `${appPrefix}-module1`,
		'module2': `${appPrefix}-module2`
	}
  
  var configMap = {
		main_html : String()
		+ `<div class="${appPrefix}-shell-head">`
			+ `<div class="${appPrefix}-shell-head-logo">`
				+ `<h1 id="${appPrefix}-appTitle"></h1>`
				+ '<p>Logo here</p>'
			+ '</div>'			
			+ `<div class="${appPrefix}-shell-head-acct">`
				+ `<div class="${appPrefix}-shell-head-acct-lang">`
					+ `<a class="${appPrefix}-shell-lang en" style="text-decoration:none">en</a>&nbsp;&nbsp;`
					+ `<a class="${appPrefix}-shell-lang nl" style="text-decoration:none">nl</a>&nbsp;&nbsp;`
					+ `<a class="${appPrefix}-shell-lang de" style="text-decoration:none">de</a>&nbsp;&nbsp;`
					+ `<a class="${appPrefix}-shell-lang es" style="text-decoration:none">es</a>&nbsp;&nbsp;`
					+ `<a class="${appPrefix}-shell-lang unk" style="text-decoration:none">unk</a>&nbsp;&nbsp;` //unk: unknown lanugauge... for testing language validation only
				+ `</div>`
			+ `</div>`
		+ '</div>'
		+ `<div class="${appPrefix}-shell-main">`
			+ `<div class="${appPrefix}-shell-main-nav">`
				+ `<ul>`
					+ `<li class="${appPrefix}-shell-main-nav-module" data-id="${moduleIDs.module1}">Module 1</li>`
					+ `<li class="${appPrefix}-shell-main-nav-module" data-id="${moduleIDs.module2}">Module 2</li>`
				+ `</ul>`
			+ '</div>'
			+ `<div class="${appPrefix}-shell-main-content">`
				+ `<p id="${appPrefix}-welcomeDescription"></p>`
				+ `<div id="${appPrefix}-shell-moduleContainer"></div>`
			+ '</div>'
		+ '</div>'
		+ `<div class="${appPrefix}-shell-foot"></div>`
		+ `<div class="${appPrefix}-shell-modal"></div>`
  },
  
  shellMap = {
    $mainContainer  : undefined,
    anchor_map  : {},
    resize_idto : undefined
  },
  jqueryMap = {},

  copyAnchorMap,    setJqueryMap,
  changeAnchorPart, onHashchange, onResize,
  setChatAnchor,    initModule;
  
  setJqueryMap = function () {
	var $mainContainer = shellMap.$mainContainer;
	
    jqueryMap = {
			$mainContainer : $mainContainer,
			$languageSelectors : $(`.${appPrefix}-shell-lang`),
			$appTitle : $(`#${appPrefix}-appTitle`),
			$moduleSelectors : $(`.${appPrefix}-shell-main-nav-module`),
			$welcome : $(`#${appPrefix}-welcomeDescription`),
			$moduleContainer : $(`#${appPrefix}-shell-moduleContainer`)
		};
  };
  
  var languageChanged = function (selectedLanguage) {
      var languageSet = settings.setCurrentLanguage(selectedLanguage);
	
		if (languageSet) {
			langUtils.setTranslations();
			jqueryMap.$appTitle.text(langUtils.getText('appTitle'));
			jqueryMap.$welcome.text(langUtils.getText('welcomeDescription'));

			//disable all language selectors
			jqueryMap.$languageSelectors.off("click");
			jqueryMap.$languageSelectors.css({"cursor": "default", "color": "grey"});

			//now enable all language selectors except selected language
			jqueryMap.$languageSelectors.not('.' + selectedLanguage).click(languageClick);
			jqueryMap.$languageSelectors.not('.' + selectedLanguage).css({ "cursor": "pointer", "color": "blue" });
		}
  };
  
  var languageClick = function(e) {
	  e.preventDefault();
	  languageChanged($(this).text());
  };
  
  var configLanguage = function () {
		var currentLanguage = settings.getCurrentLanguage();
		languageChanged(currentLanguage);
  };
	
	var configModuleSelectors = function () {
		jqueryMap.$moduleSelectors.click(moduleClick);
	};
	
	var moduleClick = function(e) {
		e.preventDefault();
		jqueryMap.$moduleSelectors.removeClass('selected');
		$(this).addClass('selected');
		initModule($(this).attr('data-id'));
	};
	
	var initModule = function (moduleId) {
		function initModule1() {
			nt_spa.module1.initModule(jqueryMap.$moduleContainer);	
		}
		
		function initModule2() {
			nt_spa.module2.initModule(jqueryMap.$moduleContainer);	
		}
		
		var moduleLauncher = {};
		moduleLauncher[moduleIDs.module1] = initModule1;
		moduleLauncher[moduleIDs.module2] = initModule2;
		moduleLauncher['default'] = initModule1;
		
		(moduleLauncher[moduleId] || moduleLauncher['default'])();
	}
  
  var setDefaults = function () {
		jqueryMap.$languageSelectors.each(function () {
			$(this).attr('title', settings.getLanguageDescription($(this).text()));
		});  
  };
  
  initShell = function ($mainContainer) {
		shellMap.$mainContainer = $mainContainer;
    $mainContainer.html(configMap.main_html);
		setJqueryMap();	
		configLanguage();
		configModuleSelectors();
		setDefaults();
	
		//begin module initialisation ***************************************************************************
		nt_spa.module1.configModule({});
		//nt_spa.module1.initModule(jqueryMap.$moduleContainer);
		nt_spa.module2.configModule({});
		//nt_spa.module2.initModule(jqueryMap.$moduleContainer);
		//end module initialisation   ***************************************************************************
  };
  
  return {initShell: initShell};
}(jQuery));
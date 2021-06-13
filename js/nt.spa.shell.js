nt.spa.shell = (function () {
    var initShell;
    var settings = nt.spa.utils.settings;
    var langUtils = nt.spa.utils.lang;
    var appPrefix = settings.appPrefix();

    var moduleIDs = {
        'module1': `${appPrefix}-module1`,
        'module2': `${appPrefix}-module2`
    }

    var configMap = {
        main_html: String()
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
            mainContainer: undefined,
            anchor_map: {},
            resize_idto: undefined
        },
        jqueryMap = {},

        copyAnchorMap, setJqueryMap,
        changeAnchorPart, onHashchange, onResize,
        setChatAnchor, initModule;

    setJqueryMap = function () {
        var mainContainer = shellMap.mainContainer;

        jqueryMap = {
            mainContainer: mainContainer,
            languageSelectors: document.querySelectorAll(`.${appPrefix}-shell-lang`),
            appTitle: document.getElementById(`${appPrefix}-appTitle`),
            moduleSelectors: document.querySelectorAll(`.${appPrefix}-shell-main-nav-module`),
            welcome: document.getElementById(`${appPrefix}-welcomeDescription`),
            moduleContainer: document.getElementById(`${appPrefix}-shell-moduleContainer`)
        };
    };

    function toggleLanguageSelector(selector, selectedLanguage) {
        var disable = selector.classList.contains(selectedLanguage);
        var styles = {
            "cursor": disable ? "default" : "pointer",
            "color": disable ? "grey" : "blue"
        };

        Object.assign(selector.style, styles);

        if (disable) {
            selector.removeEventListener('click', languageClick);
        }
        else {
            selector.addEventListener('click', languageClick);
        }
    }

    var languageChanged = function (selectedLanguage) {
        var languageSet = settings.setCurrentLanguage(selectedLanguage);

        if (languageSet) {
            langUtils.setTranslations();
            jqueryMap.appTitle.innerText = langUtils.getText('appTitle');
            jqueryMap.welcome.innerText = langUtils.getText('welcomeDescription');

            jqueryMap.languageSelectors.forEach(function (selector) {                
                toggleLanguageSelector(selector, selectedLanguage);
            });
        }
    };

    var languageClick = function (e) {
        e.preventDefault();
        languageChanged(this.innerText);
    };

    var configLanguage = function () {
        var currentLanguage = settings.getCurrentLanguage();
        languageChanged(currentLanguage);
    };

    var configModuleSelectors = function () {
        jqueryMap.moduleSelectors.forEach(function (selector) {
            selector.addEventListener('click', moduleClick);
        });
    };

    var moduleClick = function (e) {
        e.preventDefault();
        jqueryMap.moduleSelectors.forEach(function (selector) {
            selector.classList.remove('selected');
        });

        this.classList.add('selected');
        initModule(this.getAttribute('data-id'));
    };

    var initModule = function (moduleId) {
        function initModule1() {
            nt.spa.module1.initModule(jqueryMap.moduleContainer);
        }

        function initModule2() {
            nt.spa.module2.initModule(jqueryMap.moduleContainer);
        }

        var moduleLauncher = {};
        moduleLauncher[moduleIDs.module1] = initModule1;
        moduleLauncher[moduleIDs.module2] = initModule2;
        moduleLauncher['default'] = initModule1;

        (moduleLauncher[moduleId] || moduleLauncher['default'])();
    }

    var setDefaults = function () {
        jqueryMap.languageSelectors.forEach(function (selector) {
            selector.setAttribute('title', settings.getLanguageDescription(selector.innerText));
        });
    };

    initShell = function (mainContainer) {
        shellMap.mainContainer = mainContainer;
        mainContainer.innerHTML = configMap.main_html;
        setJqueryMap();
        configLanguage();
        configModuleSelectors();
        setDefaults();

        //begin module initialisation ***************************************************************************
        nt.spa.module1.configModule({});
        //nt.spa.module1.initModule(jqueryMap.moduleContainer);
        nt.spa.module2.configModule({});
        //nt.spa.module2.initModule(jqueryMap.moduleContainer);
        //end module initialisation   ***************************************************************************
    };

    return { initShell: initShell };
}());
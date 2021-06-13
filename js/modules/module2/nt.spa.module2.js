/*
 * nt.spa.module2.js
 * Root namespace module
*/

/*jslint           browser : true,   continue : true,
  devel  : true,    indent : 2,       maxerr  : 50,
  newcap : true,     nomen : true,   plusplus : true,
  regexp : true,    sloppy : true,       vars : false,
  white  : true
*/
/*global $, nt.spa.module2 */

nt.spa.module2 = (function () {
  var configModule = function(inputMap) {
    console.log(`module 2 configuration - inputMap ${JSON.stringify(inputMap)}`);
  };
  
  var initModule = function(moduleContainer) {
		console.log('module 2 has been initialised!!!');
		moduleContainer.innerHTML = '<h4><font color="blue">Module 2 contents go here</h4>';
  };
  
  return { configModule: configModule, initModule: initModule };
}());

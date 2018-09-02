/*
 * nt.spa.module1.js
 * Root namespace module
*/

/*jslint           browser : true,   continue : true,
  devel  : true,    indent : 2,       maxerr  : 50,
  newcap : true,     nomen : true,   plusplus : true,
  regexp : true,    sloppy : true,       vars : false,
  white  : true
*/
/*global $, nt.spa.module1 */

nt.spa.module1 = (function () {
  var configModule = function(inputMap) {
    console.log(`module 1 configuration - inputMap ${JSON.stringify(inputMap)}`);
  };
  
  var initModule = function($moduleContainer) {
		console.log('module 1 initialisation - module container: ' + $moduleContainer.attr('id'));
		$moduleContainer.html('<h4><font color="blue">Module 1 contents go here!!!</h4>');
  };
  
  return { configModule: configModule, initModule: initModule };
}());

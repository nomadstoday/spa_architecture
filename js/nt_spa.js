/*
 * nt_spa.js
 * Root namespace module
*/

/*jslint           browser : true,   continue : true,
  devel  : true,    indent : 2,       maxerr  : 50,
  newcap : true,     nomen : true,   plusplus : true,
  regexp : true,    sloppy : true,       vars : false,
  white  : true
*/
/*global $, nt_spa */

var nt_spa = (function () {
  var initApp = function ( $container ) {
	nt_spa.shell.initShell($container);
  };
  
  return { initApp: initApp };
}());

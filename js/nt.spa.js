/*
 * nt.spa.js
 * Root namespace module
*/

/*jslint           browser : true,   continue : true,
  devel  : true,    indent : 2,       maxerr  : 50,
  newcap : true,     nomen : true,   plusplus : true,
  regexp : true,    sloppy : true,       vars : false,
  white  : true
*/
/*global $, nt.spa */

nt.spa = (function () {
  var initApp = function ( container ) {
	nt.spa.shell.initShell(container);
  };
  
  return { initApp: initApp };
}());

(function(root, undefined) {

  "use strict";


/* dollar main */

// Base function.
var dollar = function(selector) {
  // Add functionality here.
  if (selector) {
    console.log(selector);
  }

  var functions = {};
  functions.getName = function (name) {
    root.alert('Hello ' + name);
  };

  return functions;
};


// Version.
dollar.VERSION = '0.0.0';


// Export to the root, which is probably `window`.
root.dollar = dollar;
if (!root.$) {
  root.$ = dollar;
}


}(this));

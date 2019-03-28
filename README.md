# Application to create charts manually. Designed to draw 2 charts on 1 canvas, but can be redesigned for unlimited charts on a one canvas.

How it works:
1. Main (and the only) entry JS script is js/my_js/dist/js/bundle_js.js
2. App works on CommonJs modules. If u wish to see more simple version (in one file), view js\my_js/raw.js(for multiple lines chart) 
   or raw_RESERVED_for_1_chart_only.js(version for 1 line chart). 
   This two files are not used directly and not connected in index.html, they are just for viewing the simple variant.
   
  




========================================================

Mega Errors(fixed):
1.LineTo() method used inside for(var i = 0; i < var.length){ setTimeout(), 1000); caused wrong iteration counting(it jumped at once to last iteration). 
Fixed by (shooter army) example.
2.LineTo() method used inside for(var i = 0; i < var.length){ setTimeout(), 1000); causes in 1st iteration drawing a line from last point to 1st.
Fixed by setting the start position(c.moveTo) inside for loop in the very first iteration, all other iterations starting from 2nd, draw lines with {c.lineTo}
3.Cut overlapped tooltips in mobile version. Fixed by different css query styles for desktop/mobile(adding margin in mobile.)
========================================================





=========================================================

BROWSERIFY, for more details see {account931/git-browserify-yii_commands_manuals/npm_browserify_commands.txt}
CLI-> browserify js/my_js/common_js_modules/main.js > js/my_js/dist/js/bundle_js.js -d
CLI-> npm run watch-js    =watch changes without rebuild
                                         
add to packagist.json

 "scripts": {
    "build-js": "browserify js/my_js/common_js_modules/main.js > js/dist/js/bundle_js.js -d",
    "watch-js": "watchify js/my_js/common_js_modules/main.js -o js/dist/js/bundle_js.js -dv"
  },
 "devDependencies": {
    "browserify": "latest",
    "watchify": "latest"
  }

========================================================




=======================================================
COMMON JS MODULE variables and functions EXPORTS:
1. To export a var from module A to module B, do:
  a.)in module A, {exports.varName;}. Since u exports {varName}, u can no longer use it in module A. 
      If us till need it in Module A, u can export another copied var {exports.varName2 = varName}
  b.)in module B, {var core_var = require('./moduleA.js');}, and now in B u can use it like this{core_var.varName;}
  
2. To export a function from module A to module B, do:
  a.)in module A, as usual {module.exports = getMaxY;}
  b.)in module B, {new getMaxY_file().functionName();} or { var getMaxY = new getMaxY_file();} and use like {getMaxY.functionName();}
=======================================================














==========================================================
GIT, see {account931/git-browserify-yii_commands_manuals/README.md}
==========================================================

==========================================================
NPM packagist(and its node_modules folder), see {account931/git-browserify-yii_commands_manuals/npm_browserify_commands.txt}
==========================================================




# Application to create charts manually. Designed to draw 2 charts on 1 canvas, but can be redesigned for unlimited charts on a one canvas.
# To draw multiple chart lines(more than 2):
   -> to draw more than 2 charts onLoad: please add more objects to array this.json[] in {core.js}
   -> to draw  more than 2 charts onClick: please add more sliders class="sliderN" to index.html(N = 3 or 4,5,6 etc) +
      + edit: {core_onClick.js}: in core_onClick.createChart_onClickkk() adds new iteration over seekbars for the N-st chart and pushing values to object {whole_object3}{ for (var j = 0; j < $(".slider2").length; j++)} +
	  + edit:jsonX.push(whole_object, whole_object2, whole_objectN); 
	  
	  
	  
==============================================
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
4.Not scrolled slide panel with sliders, can't scroll to Button.
Fixed by  {max-height:900px; overflow: auto !important;padding-bottom: 370px; /* Core Scroll Fix */}
5.onClick app redraws new chart lines over the old ones.
Fixed by clearing the canvas in the beginning of script: {c.clearRect(0, 0, graph.width, graph.height);}
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




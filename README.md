# Application that makes 
How it works:
1. Main (and the only) entry JS script is js/my_js/dist/js/bundle_js.js






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




















==========================================================
GIT, see {account931/git-browserify-yii_commands_manuals/README.md}
==========================================================

==========================================================
NPM packagist(and its node_modules folder), see {account931/git-browserify-yii_commands_manuals/npm_browserify_commands.txt}
==========================================================




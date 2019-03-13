(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

var test_file = require('./modules/test.js');






$(document).ready(function(){

    var test = new test_file();
	test.loadExampleCoordinates();
	

	
	
	
	
	
	
	




// END READY
});



},{"./modules/test.js":2}],2:[function(require,module,exports){
function test(){
	
  this.coordinatesSet =	"it is test, CommonJS works",

	
  this.loadExampleCoordinates = function(){
	  //$("#coordsInput").val(this.coordinatesSet); //  was \n  in the  end 
	  alert(this.coordinatesSet);
   }
}

module.exports = test;
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImpzL215X2pzL2NvbW1vbl9qc19tb2R1bGVzL21haW4uanMiLCJqcy9teV9qcy9jb21tb25fanNfbW9kdWxlcy9tb2R1bGVzL3Rlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlxyXG52YXIgdGVzdF9maWxlID0gcmVxdWlyZSgnLi9tb2R1bGVzL3Rlc3QuanMnKTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuXHJcbiAgICB2YXIgdGVzdCA9IG5ldyB0ZXN0X2ZpbGUoKTtcclxuXHR0ZXN0LmxvYWRFeGFtcGxlQ29vcmRpbmF0ZXMoKTtcclxuXHRcclxuXHJcblx0XHJcblx0XHJcblx0XHJcblx0XHJcblx0XHJcblx0XHJcblx0XHJcblxyXG5cclxuXHJcblxyXG4vLyBFTkQgUkVBRFlcclxufSk7XHJcblxyXG5cclxuIiwiZnVuY3Rpb24gdGVzdCgpe1xyXG5cdFxyXG4gIHRoaXMuY29vcmRpbmF0ZXNTZXQgPVx0XCJpdCBpcyB0ZXN0LCBDb21tb25KUyB3b3Jrc1wiLFxyXG5cclxuXHRcclxuICB0aGlzLmxvYWRFeGFtcGxlQ29vcmRpbmF0ZXMgPSBmdW5jdGlvbigpe1xyXG5cdCAgLy8kKFwiI2Nvb3Jkc0lucHV0XCIpLnZhbCh0aGlzLmNvb3JkaW5hdGVzU2V0KTsgLy8gIHdhcyBcXG4gIGluIHRoZSAgZW5kIFxyXG5cdCAgYWxlcnQodGhpcy5jb29yZGluYXRlc1NldCk7XHJcbiAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB0ZXN0OyJdfQ==

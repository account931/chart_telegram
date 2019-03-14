(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

var test_file = require('./modules/test.js');






$(document).ready(function(){

    var test = new test_file();
	//test.loadExampleCoordinates();
	

	
	
	
	
	
	
	




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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9teV9qcy9jb21tb25fanNfbW9kdWxlcy9tYWluLmpzIiwianMvbXlfanMvY29tbW9uX2pzX21vZHVsZXMvbW9kdWxlcy90ZXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcclxudmFyIHRlc3RfZmlsZSA9IHJlcXVpcmUoJy4vbW9kdWxlcy90ZXN0LmpzJyk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgdmFyIHRlc3QgPSBuZXcgdGVzdF9maWxlKCk7XHJcblx0Ly90ZXN0LmxvYWRFeGFtcGxlQ29vcmRpbmF0ZXMoKTtcclxuXHRcclxuXHJcblx0XHJcblx0XHJcblx0XHJcblx0XHJcblx0XHJcblx0XHJcblx0XHJcblxyXG5cclxuXHJcblxyXG4vLyBFTkQgUkVBRFlcclxufSk7XHJcblxyXG5cclxuIiwiZnVuY3Rpb24gdGVzdCgpe1xyXG5cdFxyXG4gIHRoaXMuY29vcmRpbmF0ZXNTZXQgPVx0XCJpdCBpcyB0ZXN0LCBDb21tb25KUyB3b3Jrc1wiLFxyXG5cclxuXHRcclxuICB0aGlzLmxvYWRFeGFtcGxlQ29vcmRpbmF0ZXMgPSBmdW5jdGlvbigpe1xyXG5cdCAgLy8kKFwiI2Nvb3Jkc0lucHV0XCIpLnZhbCh0aGlzLmNvb3JkaW5hdGVzU2V0KTsgLy8gIHdhcyBcXG4gIGluIHRoZSAgZW5kIFxyXG5cdCAgYWxlcnQodGhpcy5jb29yZGluYXRlc1NldCk7XHJcbiAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB0ZXN0OyJdfQ==

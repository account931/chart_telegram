function test(){
	
  this.coordinatesSet =	"it is test, CommonJS works",

	
  this.loadExampleCoordinates = function(){
	  //$("#coordsInput").val(this.coordinatesSet); //  was \n  in the  end 
	  alert(this.coordinatesSet);
   }
}

module.exports = test;
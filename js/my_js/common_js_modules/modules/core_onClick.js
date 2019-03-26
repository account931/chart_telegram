//It creates 2 lines chart when user selects sliders value clicks button to draw a custom chart
//var drawChart_onClick_file = require('./draw_chartLines.js'); // include core.js which contains all logic for drawing chart
var drawChart_onClick_file = require('./core.js');


function core_onClick(){
  
 

	
//=====================================================

	
  this.createChart_onClickkk = function(){
	  $("#drawChartonClick").click(function() {  
	  
	      
		  
	      //var arr1 = [];
		  //var arr2 = [];
		  
		  var columnArr = [];
		  var columnArr2 = [];
		  
		  var whole_object = {};
		  var whole_object2 = {};
          //getting seekbar values
		  
	      //iteration over seekbars for the 1st chart
	      for (var i = 0; i < $(".slider").length; i++) {
		      //arr1.push( $("#first_chart" + i).val() ); 
			  var objectX = {}; //creates empty object
			  objectX.X = i; //adds to objectX{X: i}
			  objectX.Y =$("#first_chart" + i).val(); //adds to objectX{Y: slider value}
			  objectX.date = Math.round(+new Date(new Date().getTime() + (24 * 60 * 60 * 1000)/1000)); //gets today Unixstamp  in 1st iteration and +1 day in every iteration 
			  columnArr.push(objectX); 
			  
			  //colors: '#3DC23F';
	      }
		  whole_object.columns = columnArr;
		  whole_object.colors = '#3DC23F'; //green
		  whole_object.names = 'namesX';
		  //arr1.push(whole_object);
	
	    //console.log(arr1);
		 
		 
	
	     //iteration over seekbars for the 2nd chart
	     for (var j = 0; j < $(".slider2").length; j++) {
		     //arr2.push( $("#second_chart" + j).val() );
              var objectX= {};
			  objectX.X = j;
			  objectX.Y =  $("#second_chart" + j).val();
			  objectX.date = Math.round(+new Date(new Date().getTime() + (24 * 60 * 60 * 1000)/1000)); //gets today Unixstamp  in 1st iteration and +1 day in every iteration 
			  columnArr2.push(objectX);; 			 
	     }
	     //alert(arr2);
		  
		 whole_object2.columns = columnArr2;
		 whole_object2.colors = '#F34C44',  //red
		 whole_object2.names = 'namesX2';
	     //arr1.push(whole_object);
		 
		 
		 var jsonX = [];
		 jsonX.push(whole_object, whole_object2);
		 console.log(jsonX);
		 
		 
		document.getElementById("mySidepanel").style.width = "0"; //hides the slide panel
		 
		  //MODULE
		  var coreZZ = new drawChart_onClick_file();
	      //coreZZ.draw_lines(jsonX);
		  coreZZ.createChart();
	});
	  
	  // **                                                                                  **
      // **************************************************************************************
      // **************************************************************************************
	  
   } //end this.CreateChart
   
   

   
   
   
   
   
   
   
} //end function ALL

module.exports = core_onClick;
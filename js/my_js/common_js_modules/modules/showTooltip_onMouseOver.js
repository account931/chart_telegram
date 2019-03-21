var core_var = require('./core.js'); //IMPORT VARIABLES {c, xPadding,yPadding} from core.js
//var getMaxY_file = require('./getMaxY.js');
//var convertDate_file = require('./convertDateStamp.js');
var getYPixel_file = require('./getYPixel.js'); // Return the Y pixel for a graph point->function getXPixel(){
var getXPixel_file = require('./getXPixel.js'); // Return the X pixel for a graph point->function getXPixel(){
var convertDate_file = require('./convertDateStamp.js');


//shows tooltip onMouse over
function showTooltip_onMouseOver(){
//----------------------------------------------------------------------------------------------------------------------------	


    this.dispalyTooltips = function(toolz){   //args(tooplips array)
      // request mousemove events
      $("#graph").mousemove(function (e) {
		  var onMouseOver_file = new onMouseOver();//uses other module in this very file
          onMouseOver_file.handleMouseMoveAction(e, toolz); //args(mouse event, tooplips array)
      });

  }  
}

//----------------------------------------------------------------------------------------------------------------------------
  
  
function onMouseOver(){
	
    this.handleMouseMoveAction = function(e, tooltips){ //args(mouse event, tooplips array)
		
	     //start import Vars from core.js************
         var c = core_var.c; //IMPORT VAR {c} fom core.js
	     var offsetX = core_var.offsetX; //IMPORT VAR {offsetX} from core.js
		 var offsetY = core_var.offsetY; //IMPORT VAR {offsetX} from core.js
		 var tipCanvas = core_var.tipCanvas_2; //IMPORT VAR {tipCanvas.} from core.js
		 var tipCtx = core_var.tipCtx; //IMPORT VAR {tipCanvas.} from core.js
	     //END  import Vars from core.js*************
		 
		 //alert("off " + offsetY);
		 mouseX = parseInt(e.clientX - offsetX);
         mouseY = parseInt(e.clientY - offsetY); 

    // Put your mousemove stuff here
    var hit = false;
    for (var i = 0; i < tooltips.length; i++) { //alert(tooltips.length);
        var dot = tooltips[i];
        var dx = mouseX - dot.x;
        var dy = mouseY - dot.y; 
		//alert(dx * dx + dy * dy);
        if (dx * dx + dy * dy < tooltips[i].rXr) {
			
			//Mine
			$("#tip").show(300); //show tooltip, by default in css: display: none. Is made to fix overlaping an empty tooltip
			
            tipCanvas.style.left = (tooltips[i].x) + "px"; //tooltip margin left
            tipCanvas.style.top = (tooltips[i].y - 40) + "px";  //tooltip margin bottom
            tipCtx.clearRect(0, 0, tipCanvas.width, tipCanvas.height ); //clearRect(marginLeft, width, height)
            //                  tipCtx.rect(0,0,tipCanvas.width,tipCanvas.height);
			
			//define tooltip text
			var toolTipText_date = new convertDate_file().funct_convert_dateStamp(tooltips[i].dateZ) ; //converts dateUnix to normal
			//alert(toolTipText_date);
            var toolTipText_text = tooltips[i].tip + " " + tooltips[i].status ;  //defines tip + status, i.e "40 Left"
            if(tooltips[i].status == "Joined"){
				textcolors = "green";
			} else {
				textcolors = "red";
			}				
			
			tipCtx.fillStyle = "black"; //set initial text colors to black
			
			//in mobile only. Here we specify fonr-size and text paddings for mobile devices
			if(screen.width <= 640){ 
			    tipCtx.font = "45px Arial"; //set font size
				tipCtx.textAlign = "center"; //set text to center, in order to center horiz, there must be 150 in .fillText(text, 150, paddingTop) // 150 is the anchor point
				tipCtx.fillText(/*$(dot.tip).val()*/toolTipText_date, 150, 65); //(text, paddingLeft, paddingTop)  // Tooltip Date
				//tipCtx.fillText("______", 25, 75);
				tipCtx.fillStyle = textcolors; //set text colors
				tipCtx.font = "60px Arial"; //set font size
				tipCtx.fillText(toolTipText_text, 150, 135);  //Tooltip text, i.e "40 Left"
			} else {
				//desktop
				tipCtx.font = "40px Arial"; //set font size
				tipCtx.textAlign = "center"; //set text to center, in order to center horiz, there must be 150 in .fillText(text, 150, paddingTop) // 150 is the anchor point
                tipCtx.fillText(/*$(dot.tip).val()*/toolTipText_date, 159, 45); //(text, paddingLeft, paddingTop)(was 45, 45)
				//tipCtx.fillText("____________________", 1, 50);
				tipCtx.fillStyle = textcolors; //set text colors
				tipCtx.fillText(toolTipText_text, 150, 105); //Tooltip text, i.e "40 Left" (was 70, 105)
			}
            hit = true;
        } /*else {
			$("#tip").hide(800);
		}*/
    }
    if (!hit) {
        tipCanvas.style.left = "-1000px";  //was 200px, this solution fixes bug when tooltip appears in left empty if not mouse overed
    }
	}




  
}

module.exports = showTooltip_onMouseOver;
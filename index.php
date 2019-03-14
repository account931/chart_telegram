
<!DOCTYPE html>
<html lang="en">

<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="Chart Telegram">
  <meta name="keywords" content="registration">
  <meta name="author" content="">

  <title>Chart Telegram</title>

  <!-- Bootstrap core CSS -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">

  <!-- CSS STYLES -->
  <link href="css/my_css/mycss.css" rel="stylesheet"><!--my own css-->

  
  <!--Favicon-->
  <link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon">

</head>

<body id="page-top" >
<div class="container-fluid">
  <div class="row content">
  
    <div class="col-sm-2 sidenav">
      <h4>Chart Telegram</h4>
      <ul class="nav nav-pills nav-stacked">
        <li class="active"><a href="#section1">Show Chart</a></li>
      </ul><br>
     
    </div>

    <div class="col-sm-10 chart-main">
        <h4><small>Chart Telegram</small></h4>
        <hr>
      
	    <div class="col-sm-12" id="chart">
	        <canvas id="graph"></canvas>
	    </div>
	  
    </div><!-- END  <div class="col-sm-10 chart-main"> -->
	       
  </div>
</div>

<script>
            /*
			var a = document.getElementById("text1").value;
            var b = document.getElementById("text2").value;
            var c = document.getElementById("text3").value;
            var d = document.getElementById("text4").value;
            var e = document.getElementById("text5").value;
            var f = document.getElementById("text6").value;
            var g = document.getElementById("text7").value;
            */
            var graph;
            var xPadding = 30;
            var yPadding = 30;
            
            // Notice I changed The X values
            var data = { values:[
                { X: 0, Y: 12 },
                { X: 2, Y: 28 },
                { X: 3, Y: 18 },
                { X: 4, Y: 34 },
                { X: 5, Y: 40 },
                { X: 6, Y: 60 },
                { X: 7, Y: 70 }
            ]};

            // Returns the max Y value in our data list
            function getMaxY() {
                var max = 0;
                
                for(var i = 0; i < data.values.length; i ++) {
                    if(data.values[i].Y > max) {
                        max = data.values[i].Y;
                    }
                }
                
                max += 10 - max % 10;
                return max;
            }

            // Returns the max X value in our data list
            function getMaxX() {
                var max = 0;
                
                for(var i = 0; i < data.values.length; i ++) {
                    if(data.values[i].X > max) {
                        max = data.values[i].X;
                    }
                }
                
                // omited
              //max += 10 - max % 10;
                return max;
            }
            
            // Return the x pixel for a graph point
            function getXPixel(val) {
                // uses the getMaxX() function
                return ((graph.width - xPadding) / (getMaxX() + 1)) * val + (xPadding * 1.5);
                // was
              //return ((graph.width - xPadding) / getMaxX()) * val + (xPadding * 1.5);
            }
            
            // Return the y pixel for a graph point
            function getYPixel(val) {
                return graph.height - (((graph.height - yPadding) / getMaxY()) * val) - yPadding;
            }

                graph = document.getElementById("graph");
                var c = graph.getContext('2d');            
                
                c.lineWidth = 2;
                c.strokeStyle = '#333';
                c.font = 'italic 8pt sans-serif';
                c.textAlign = "center";
                
                // Draw the axises
                c.beginPath();
                c.moveTo(xPadding, 0);
                c.lineTo(xPadding, graph.height - yPadding);
                c.lineTo(graph.width, graph.height - yPadding);
                c.stroke();
                
                // Draw the X value texts
                var myMaxX = getMaxX();
                for(var i = 0; i <= myMaxX; i ++) {
                    // uses data.values[i].X
                    c.fillText(i, getXPixel(i), graph.height - yPadding + 20);
                }
                /* was
                for(var i = 0; i < data.values.length; i ++) {
                    // uses data.values[i].X
                    c.fillText(data.values[i].X, getXPixel(data.values[i].X), graph.height - yPadding + 20);
                }
                */
                
                // Draw the Y value texts
                c.textAlign = "right"
                c.textBaseline = "middle";
                
                for(var i = 0; i < getMaxY(); i += 10) {
                    c.fillText(i, xPadding - 10, getYPixel(i));
                }
                
                c.strokeStyle = '#f00';
                
                // Draw the line graph
                c.beginPath();
                c.moveTo(getXPixel(data.values[0].X), getYPixel(data.values[0].Y));
                for(var i = 1; i < data.values.length; i ++) {
                    c.lineTo(getXPixel(data.values[i].X), getYPixel(data.values[i].Y));
                }
                c.stroke();
                
                // Draw the dots
                c.fillStyle = '#333';
                
                for(var i = 0; i < data.values.length; i ++) {  
                    c.beginPath();
                    c.arc(getXPixel(data.values[i].X), getYPixel(data.values[i].Y), 4, 0, Math.PI * 2, true);
                    c.fill();
                }
</script>

<footer class="container-fluid">
  <p>Telegram chart</p>
</footer>


  <!------ JavaScript ------------->
  <!-- Bootstrap core JavaScript -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
   <!-- MY JS Browserify bundle-> Main (and the only) entry JS script -->
  <script src="js/my_js/dist/js/bundle_js.js"></script>

</body>

</html>

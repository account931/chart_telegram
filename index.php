
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
  
  <script type="text/javascript" src="http://code.jquery.com/jquery.min.js"></script><!-- Tempo for tooltip -->

   <meta name="viewport" content="width=device-width" />
</head>

<body id="page-top" >
<div class="container-fluid">
  <div class="row content">
  
    <!--<div class="col-sm-2 sidenav">
      <h4>Chart Telegram</h4>
      <ul class="nav nav-pills nav-stacked">
        <li class="active"><a href="#section1">Show Chart</a></li>
      </ul><br>
     
    </div>-->

    <div class="col-sm-12 chart-main">
        <h4><small>Chart Telegram</small></h4>
        <hr>
      
	    <div class="col-sm-12" id="wrapper" style="background:;">
		
	        <canvas id="graph"  ></canvas> <!-- for charts  300 150-->
			<canvas id="tip" ></canvas> <!-- For Tooltips  100 25-->
	    
		</div>
	  
    </div><!-- END  <div class="col-sm-10 chart-main"> -->
	       
  </div>
</div>



<div class="col-sm-12 for-space">
</div>


<footer class="container-fluid">
  <p>Telegram chart</p>
</footer>


  <!------ JavaScript ------------->
  <!-- Bootstrap core JavaScript -->
  
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
   <!-- MY JS Browserify bundle-> Main (and the only) entry JS script -->
  <script src="js/my_js/dist/js/bundle_js.js"></script>
  
  <script src="js/my_js/raw.js"></script> <!-- Tempo tooltip-->
  
  
  


</body>

</html>

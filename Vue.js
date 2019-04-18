<!DOCTYPE html>
<html>
   <head>
   	  <!-- <p>AIR QUALITY MAP</p> -->
      <title>Air Quality Map by Brian Cao and Mike Hawkins</title>
      <link rel = "stylesheet" href = "http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css"/>
      <link rel = "stylesheet" href = "normalize.css"/>
      <link rel = "stylesheet" href = "skeleton.css"/>
	  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
      <script src = "http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script>
	  <script src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>
      <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>

   </head>

   <body>

	   <div class ="container">
			<div class ="row" style = "background: red;">
				<div class ="six columns" style = "background: yellow; float: left;   ">
						<p style = "float: left; min-height: 70%;">
							<div id="inputbox">
								<p> Latitude: <input id = "lat1" value = "saveLat1()" v-model="latitude">
								<br>
								Longitude: <input id = "lon1" value = "saveLon1()" v-model="longitude">
								<br>
								<button style="background-color: #197519; color: white;" v-on:click="changeLatLng()"> Change Coordinates </button> </p>
								<div id = "map" style = " padding-bottom: 50%; width: 75%; height: 75%; border: 3px solid #73AD21;" ></div>
									Filter By Particle: <select v-model="filter">
									<option value="none"> All Particles </option>
									<option value="pm25"> pm25 </option>
									<option value="pm10"> pm10 </option>
									<option value="co"> co </option>
									<option value="so2"> so2 </option>
									<option value="o3"> o3 </option>
								</select>
								<br>
								<button style="background-color: #197519; color: white;" v-on:click="getData()"> Filter </button> </p>
							</div>

						</p>
				</div>
				<div class ="six columns" style = "background: green; float: left; ">
						<p style = " min-height: 50%;">
							Latitude:
							<input type="text" id = "lat2" name="lat2"  onchange ="saveLat2()" >
							<br>
							Longitude:
							<input type="text" id = "lon2" name="lon2"   onchange ="saveLon2()" >
							<br>
							<button onclick = "update2()">Submit</button>
							<div id = "map2" style = "padding-bottom: 50%; width: 75%; height: 75%;  border: 3px solid #73AD21;" onmouseup = "getCenter2()"></div>
						</p>
				</div>

			</div>
		</div>
      <script>

         //make objects
         var map = new L.map('map', {minZoom: 9, maxZoom: 16}).setView([44.9537,-93.0900], 10);
         var map2 = new L.map('map2', {minZoom: 9, maxZoom: 16}).setView([44.9537,-93.0900], 10	);
         // Creating a Layer object
         var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
         var layer2 = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
         // Adding layer to the map
         map.addLayer(layer);
         map2.addLayer(layer2);
		var inputbox = new Vue({
			el: '#inputbox',
			data: {
				latitude: '44.9537',
				longitude: '-93.0900',
				latlng: true,
				filter:'none'

			},
			methods: {
				latlngData: function (data) {

						inputbox.location = data.display_name.substr(0, data.display_name.indexOf(','));
						mymap.panTo(new L.LatLng(inputbox.latitude, inputbox.longitude));

				},
				changeLatLng: function()
				{
					document.getElementById("lat1").value = map.getCenter().lat;
					document.getElementById("lon1").value = map.getCenter().lng;
				},
				getData: function()
				{
					console.log("This function does nothing right now except print this message.");
				}
			}
		});
		/*
		//this function fetches the air data with given latitude and longitude
		function getAirData(){
			var latitude = inputbox.latitude;
			var longitude = inputbox.longitude;
			var distance1 = new L.LatLng(latitude, longitude);
			var distance2 = new L.LatLng(latitude, mymap.getBounds().getWest());
			var distance = mymap.distance(distance1, distance2);

			var radius = distance;

			var url1 = "https://api.openaq.org/v1/latest?coordinates=" + latitude + "," + longitude + "&radius=" + radius + "&limit=100";

			if(inputbox.filter!="none"){
				console.log("filtering")
				url1=url1+"&parameter="+inputbox.filter+"";
			}
			$.ajax({
				url: url1,
				type: 'get',
				dataType:'html',
				async: true,
				success: handleData
			});
		}

		*/

		function changeLatLng()
		{
			document.getElementById("lat1").value = map.getCenter().lat;
			document.getElementById("lon1").value = map.getCenter().lng;
		}


		function saveLat1(x)
		{
			if (x == undefined) {
				var lat_1=document.getElementById("lat1").value;

				return lat_1;

			}
			else{
				return map.getCenter().lat;
			}
		}
		function saveLon1(x)
		{
			if (x == undefined) {
				var lon_1=document.getElementById("lon1").value;
				return lon_1;
			}
			else{
				return map.getCenter().lng;
			}
		}
		function saveLat2(x)
		{
			if (x == undefined) {
				var lat_2=document.getElementById("lat2").value;
				return lat_2;
			}
			else{
				return map2.getCenter().lat;
			}
		}
		function saveLon2(x)
		{
			if (x == undefined) {
				var lon_2=document.getElementById("lon2").value;
				return lon_2;
			}
			else{
				return map2.getCenter().lng;
			}
		}
		 function update1()
		 {
			map.setView([saveLat1(), saveLon1()], 10);

		 }
		 function update2()
		 {
			map2.setView([saveLat2(), saveLon2()], 10);
		 }
		 function getCenter1()
		 {
			document.getElementById("latitude").value = map.getCenter().lat;
			document.getElementById("longitude").value = map.getCenter().lng;

		 }
		 function getCenter2()
		 {
		 	saveLat2(1);
		 	saveLon2(1);
			document.getElementById("lat2").value=saveLat2(1);
			document.getElementById("lon2").value=saveLon2(1);

		 }

		/*
		var xmlhttp = new XMLHttpRequest();
		var myUrl = "https://api.openaq.org/v1/latest?coordinates" + document.getElementById("lat1").value + "," + document.getElementById("lon1").value;
		console.log(document.getElementById("lat1").value);
		console.log(myUrl);
		$.ajax({
			url: myUrl,
			type: 'get',
			dataType: 'html',
			async: true,
			success: processData
		});

		function processData(airdata)
		{
			var data = JSON.parse(airdata);
			loc(data);
			//pop(data);
		}
		function loc()
		{
			console.log("getting here");
			console.log(data);
			var locLat;
			var locLon;

			for(var j = 0; j < data.results.length; j++)
			{
				locLat = data.results[j].saveLat1();
				locLon = data.results[j].saveLon1();
				var mark = L.marker(new L.LatLng(locLat, locLon)).addTo(map);
				mark;
			}
			for(var j = 0; j < data.results.length; j++)
			{
				locLat = data.results[j].saveLat2();
				locLon = data.results[j].saveLon2();
				var mark = L.marker(new L.LatLng(locLat, locLon)).addTo(map2);
				mark;
			}
		}
		function pop()
		{
		}*/
      </script>
   </body>

</html>

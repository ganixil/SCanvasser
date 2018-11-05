function generate_map() {
		var mapOptions = {
		    center: new google.maps.LatLng(51.5, 40.12),
		    zoom: 10,
		    mapTypeId: google.maps.MapTypeId.HYBRID
		}
		var map = new google.maps.Map(document.getElementById("map"), mapOptions);
	}
generate_map();
// <option value='{{show}}' selected="selected">{{show}}</option>
function displayEdit(){
	var a = document.getElementById("scampaign_name");
	document.getElementById("new_campaign_name").value = a.value; 
	document.getElementById("createCampaign").submit();

}
function a(){
	document.addEventListener("click", function(e){
		if(e.target.name == "flaskManager"){
			var value = e.target.value;
			var arr = document.getElementsByName('flaskManager');

			for(var i = 0; i < arr.length; i++){
						
				if(arr[i].value == value){
				 	arr[i].parentNode.removeChild(arr[i]);
				}
			}
		}else if(e.target.name == "flaskCanvasser"){
			var value = e.target.value;
			var arr = document.getElementsByName('flaskCanvasser');

			for(var i = 0; i < arr.length; i++){
				if(arr[i].value == value){
				 	arr[i].parentNode.removeChild(arr[i]);
				}
			}
		}else if(e.target.name == "flaskLocation"){
			var value = e.target.value;
			var arr = document.getElementsByName('flaskLocation');

			for(var i = 0; i < arr.length; i++){
				if(arr[i].value == value){
				 	arr[i].parentNode.removeChild(arr[i]);
				}
			}
		}else if(e.target.name == "flaskQuestion"){
			var value = e.target.value;
			var arr = document.getElementsByName('flaskQuestion');

			for(var i = 0; i < arr.length; i++){
				if(arr[i].value == value){
				 	arr[i].parentNode.removeChild(arr[i]);
				}
			}
		}
	});
}

function addManagerToTable(){
	console.log("Im here and b = ");
	var a = document.getElementById("manager_selector");
	var b = a.value;
	
	if(b != "null"){
		var ob = document.getElementsByName("flaskManager");
		if(ob.length == 0){
			var node = document.getElementById("insertManager");//insertManager is name of table
			var trNode = document.createElement("input");
			trNode.setAttribute("name", "flaskManager");
			trNode.setAttribute("type", "text");
			trNode.setAttribute("class", "dis");
			trNode.setAttribute("value", b)
			node.appendChild(trNode);
			console.log(node)
			
		}else{
			var bool = exists(b, ob);
			if(bool ==false){
				var node = document.getElementById("insertManager");//insertManager is name of table
				var trNode = document.createElement("input");
				trNode.setAttribute("name", "flaskManager");
				trNode.setAttribute("type", "text");
				trNode.setAttribute("class", "dis");
				trNode.setAttribute("value", b)
				node.appendChild(trNode);

			}
		}	
	}
	a.selectedIndex= -1;

}

function addCanvasserToTable(){
	var a = document.getElementById("canvasser_selector");
	var b = a.value;
	if(b != "null"){
		var ob = document.getElementsByName("flaskCanvasser");
		if(ob.length == 0){
			var node = document.getElementById("insertCanvasser");//insertManager is name of table
			var trNode = document.createElement("input");
			trNode.setAttribute("name", "flaskCanvasser");
			trNode.setAttribute("type", "text");
			trNode.setAttribute("class", "dis");
			trNode.setAttribute("value", b)
			node.appendChild(trNode);
			

		}else{
			var bool = exists(b, ob);
			if(bool == false){
				var node = document.getElementById("insertCanvasser");//insertManager is name of table
				var trNode = document.createElement("input");
				trNode.setAttribute("name", "flaskCanvasser");
				trNode.setAttribute("type", "text");
				trNode.setAttribute("class", "dis");
				trNode.setAttribute("value", b)
				node.appendChild(trNode);
				
			}
		}	
	}
	a.selectedIndex= -1;

}
function addLocationToTable(){

	var a = document.getElementById("address");
	var b = a.value;


    var mapOptions = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: new google.maps.LatLng(51.5, 40.12),
      mapTypeId: google.maps.MapTypeId.HYBRID
    });
	
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address':b},function(results,status){
    	// var marker = new google.maps.Marker({
	    //   	position: new google.maps.LatLng(results[0].geometry.location.lat(),results[0].geometry.location.lng()),
	    //   	map: mapOptions,
    	// });
    	// map.setCenter(marker.getPosition())
    	// if(status == google.maps.GeocoderStatus.OK){
	    // 	var lat = results[0].geometry.location.lat();
	    // 	var long = results[0].geometry.location.lng();
	    // 	alert("Lat is " + lat);
	    // 	alert("Long is " + long);
    	// }	

    });
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    



	if(b != "null"){
		var ob = document.getElementsByName("flaskLocation");
		if(ob.length == 0){
			var node = document.getElementById("insertLocation");
			var trNode = document.createElement("input");
			trNode.setAttribute("name","flaskLocation");
			trNode.setAttribute("type", "text");
			trNode.setAttribute("class", "dis");
			trNode.setAttribute("value", b)	
			node.appendChild(trNode);	
		}
		else{
			var bool = exists(b, ob);
			if(bool ==false){
				var node = document.getElementById("insertLocation");
				var trNode = document.createElement("input");
				trNode.setAttribute("name", "flaskLocation");
				trNode.setAttribute("type", "text");
				trNode.setAttribute("class", "dis");
				trNode.setAttribute("value", b)
				node.appendChild(trNode);
				
			}
		}
	a.selectedIndex = -1;	
	}
}

function addQuestionToTable(){
	var a = document.getElementById("questions");
	var b = a.value;
	if(b != "null"){
		var ob = document.getElementsByName("flaskQuestion");
		if(ob.length == 0){
			var node = document.getElementById("insertQuestions");
			var trNode = document.createElement("input");
			trNode.setAttribute("name","flaskQuestion");
			trNode.setAttribute("type", "text");
			trNode.setAttribute("class", "dis");
			trNode.setAttribute("value", b)	
			node.appendChild(trNode);	
		}
		else{
			var bool = exists(b, ob);
			if(bool ==false){
				var node = document.getElementById("insertQuestions");
				var trNode = document.createElement("input");
				trNode.setAttribute("name", "flaskQuestion");
				trNode.setAttribute("type", "text");
				trNode.setAttribute("class", "dis");
				trNode.setAttribute("value", b)
				node.appendChild(trNode);
				
			}
		}
	a.selectedIndex = -1;	
	}
}

function exists(text, arr ){
	for( var i = 0; i < arr.length; i++){
		if(text == arr[i].value){
			return true;
		}
	}
	return false;
}
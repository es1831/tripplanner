var tempMarkers = [];
function initialize_gmaps() {

  // initialize new google maps LatLng object
  var myLatlng = new google.maps.LatLng(40.705786,-74.007672);

  // set the map options hash
  var mapOptions = {
  	center: myLatlng,
  	zoom: 16,
  	mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  // get the maps div's HTML obj
  var map_canvas_obj = document.getElementById("map-canvas");

  // initialize a new Google Map with the options
  var map = new google.maps.Map(map_canvas_obj, mapOptions);

  // Add the marker to the map
  var marker = new google.maps.Marker({
  	position: myLatlng,
  	title:"You are here!"
  });

  // Add the marker to the map by calling setMap()
  marker.setMap(map);

  return map;
}

var map = initialize_gmaps();

var caret = '<span class="caret"></span>';




//MAP GLOBAL FUNCTIONS

function setAllTempMap(map) {
	for (var i = 0; i < tempMarkers.length; i++) {
		tempMarkers[i].setMap(map);
	}
}

function clearTempMarkers() {
	setAllTempMap(null);
}

function deleteTempMarkers() {
	clearTempMarkers();
	tempMarkers = [];
}
function setAllHotelMap(map) {
	for (var i = 0; i < days[currentIdx].hotelMarkers.length; i++) {
		days[currentIdx].hotelMarkers[i].setMap(map);
	}
}

function clearHotelMarkers() {
	setAllHotelMap(null);
}

function deleteHotelMarkers() {
	clearHotelMarkers();
	days[currentIdx].hotelMarkers = [];
}

function setAllMap(map) {
	for (var i = 0; i < days[currentIdx].markers.length; i++) {
		days[currentIdx].markers[i].setMap(map);
	}
}

function clearMarkers() {
	setAllMap(null);
}

function deleteMarkers() {
	clearMarkers();
	days[currentIdx].markers = [];
}

//DAYS
days ={
	"Day 1": {
		thingNames:[],
		restaurantNames: [],
		markers:[],
		hotelMarkers:[] 
	},	
	"Day 2": {
		thingNames:[],
		restaurantNames: [],
		markers:[],
		hotelMarkers:[] 
	},	
	"Day 3": {
		thingNames:[],
		restaurantNames: [],
		markers:[],
		hotelMarkers:[] 
	}
}

var currentIdx = "Day 1";

var daycount = 3;
$('#addADay').click( function () {

	var newday = $('<button type="button" class="btn btn-default"></button>');
	$('#dayslist').append(newday.text('Day '+ ++daycount));

	//CREATE NEW DAY OBJECT
	days[newday.text()] = {
		thingNames:[],
		restaurantNames: [],
		markers:[],
		hotelMarkers: []
	}
})


$('#dayslist').click(function (evt) {
	var target = $(evt.target);
	$(this).children().removeClass("btn-primary");
	target.addClass( "btn-primary" );
	$('#this-title').text(target.text()); //changing the title

	days[currentIdx].markers.forEach(function(marker){
		marker.setMap(null);
	});	
	days[currentIdx].hotelMarkers.forEach(function(marker){
		marker.setMap(null);
	});

	//BLANK OUT HTML
	["this-hotel", "these-things-to-do", "these-restaurants"].forEach(function(id) {
		$('#' + id + ' .list-group').html('');
	});


	//CHECK WHICH INDEX WE ARE IN
	currentIdx = target.text();

	//REPOPULATE BASED ON INDEX
	if (days[currentIdx].hotelName) {
		renderHotel(days[currentIdx].hotelName);
	}
	days[currentIdx].thingNames.forEach(function(thingName) {
		renderThing(thingName);
	});
	days[currentIdx].restaurantNames.forEach(function(restaurantName) {
		renderRestaurant(restaurantName);
	});
	days[currentIdx].markers.forEach(function(marker){
		marker.setMap(map);
	});	
	days[currentIdx].hotelMarkers.forEach(function(marker){
		marker.setMap(map);
	});

})




//HOTELS
$(".dropdown-menu-hotels li a").click(function(){
	$(this).parents(".btn-group").find('.dropdown-toggle').text($(this).text());
	$(this).parents(".btn-group").find('.dropdown-toggle').val($(this).text()).append(" " + caret);
	showMarkerHotel($(this).text());
});

function showMarkerHotel(name){
	var newObj;
	for(var i=0; i< all_hotels.length; i++){
		if (all_hotels[i].name===name){
			newObj = all_hotels[i];
		}
	}
	var newLatlng = new google.maps.LatLng(newObj.place[0].location[0], newObj.place[0].location[1])
	var marker = new google.maps.Marker({
		position: newLatlng,
		title: newObj.name
	})
	deleteTempMarkers();
	tempMarkers.push(marker);
	marker.setMap(map);
	map.setCenter(newLatlng);
}

$('#hotels .put').click( function () {

	var selectedText = $(this).prevAll('.btn').text();

	renderHotel(selectedText);
	days[currentIdx].hotelName = selectedText;
	addMarkerHotel(selectedText);
})

function renderHotel(text) {

	var newHotel = $('<li></li>')
	$('#this-hotel .list-group').html(newHotel.text(text));
}

function addMarkerHotel(name){
	deleteHotelMarkers();
	var newObj;
	for(var i=0; i< all_hotels.length; i++){
		if (all_hotels[i].name.toString().trim() == name.toString().trim()){
			newObj = all_hotels[i];
		}
	}
	var newLatlng = new google.maps.LatLng(newObj.place[0].location[0], newObj.place[0].location[1])
	var marker = new google.maps.Marker({
		position: newLatlng,
		title: newObj.name
	})

	days[currentIdx].hotelMarkers.push(marker);
	marker.setMap(map);
	map.setCenter(newLatlng);
}






//THINGS TO DO 
$(".dropdown-menu-things li a").click(function(){
	$(this).parents(".btn-group").find('.dropdown-toggle').text($(this).text());
	$(this).parents(".btn-group").find('.dropdown-toggle').val($(this).text()).append(" " + caret);
	showMarkerThings($(this).text());
});

function showMarkerThings(name){
	var newObj;
	for(var i=0; i< all_things_to_do.length; i++){
		if (all_things_to_do[i].name===name){
			newObj = all_things_to_do[i];
		}
	}
	var newLatlng = new google.maps.LatLng(newObj.place[0].location[0], newObj.place[0].location[1])
	var marker = new google.maps.Marker({
		position: newLatlng,
		title: newObj.name
	})
	deleteTempMarkers();
	tempMarkers.push(marker);
	marker.setMap(map);
	map.setCenter(newLatlng);
}

$('#things-to-do .put').click( function () {

	var selectedText = $(this).prevAll('.btn').text();

	var childrentext = $('#these-things-to-do .list-group').children().text();
	
	if(childrentext.indexOf(selectedText)=== -1) {

		renderThing(selectedText);
		days[currentIdx].thingNames.push(selectedText);
		addMarkerThing(selectedText);
	}
})

function renderThing(text) {

	var newThing = $('<li></li>')
	$('#these-things-to-do .list-group').append(newThing.text(text));
}


function addMarkerThing(name){
	var newObj;
	for(var i=0; i< all_things_to_do.length; i++){
		if (all_things_to_do[i].name.toString().trim() == name.toString().trim()){
			newObj = all_things_to_do[i];
		}
	}
	var newLatlng = new google.maps.LatLng(newObj.place[0].location[0], newObj.place[0].location[1])
	var marker = new google.maps.Marker({
		position: newLatlng,
		title: newObj.name
	})

	days[currentIdx].markers.push(marker);
	marker.setMap(map);
	map.setCenter(newLatlng);
}






//RESTAURANTS
$(".dropdown-menu-restaurants li a").click(function(){
	$(this).parents(".btn-group").find('.dropdown-toggle').text($(this).text());
	$(this).parents(".btn-group").find('.dropdown-toggle').val($(this).text()).append(" " + caret);
	showMarkerRestaurant($(this).text());
});

function showMarkerRestaurant(name){
	var newObj;
	for(var i=0; i< all_restaurants.length; i++){
		if (all_restaurants[i].name===name){
			newObj = all_restaurants[i];
		}
	}
	var newLatlng = new google.maps.LatLng(newObj.place[0].location[0], newObj.place[0].location[1])
	var marker = new google.maps.Marker({
		position: newLatlng,
		title: newObj.name
	})
	deleteTempMarkers();
	tempMarkers.push(marker);
	marker.setMap(map);
	map.setCenter(newLatlng);
}

var numRestaurants = 0;
$('#restaurants .put').click( function () {
	if(numRestaurants < 3){

		var selectedText = $(this).prevAll('.btn').text();
		var childrentext = $('#these-restaurants .list-group').children().text();

		if(childrentext.indexOf(selectedText)=== -1) {

			renderRestaurant(selectedText);
			days[currentIdx].restaurantNames.push(selectedText);
			addMarkerRestaraunts(selectedText);
			numRestaurants++;
		}
	}
})

function renderRestaurant(text) {
	var newRestaurants = $('<li></li>')
	$('#these-restaurants .list-group').append(newRestaurants.text(text));
}

function addMarkerRestaraunts(name){
	var newObj;
	for(var i=0; i< all_restaurants.length; i++){
		if (all_restaurants[i].name.toString().trim() == name.toString().trim()){
			newObj = all_restaurants[i];
		}
	}
	var newLatlng = new google.maps.LatLng(newObj.place[0].location[0], newObj.place[0].location[1])
	var marker = new google.maps.Marker({
		position: newLatlng,
		title: newObj.name
	})

	days[currentIdx].markers.push(marker);
	marker.setMap(map);
	map.setCenter(newLatlng);
}
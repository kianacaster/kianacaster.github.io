var index;
function changeWord(){
	index = Math.floor(Math.random() * words.length);
	document.getElementById("word").innerHTML = words[index][0];
	document.getElementById("def").innerHTML = words[index][1];
}

var config = {
	apiKey: "AIzaSyCWgWgpWEt9qjAV-2MBWyDOsQCUZ8Mwt04",
	authDomain: "wotd-97c52.firebaseapp.com",
	databaseURL: "https://wotd-97c52.firebaseio.com",
	projectId: "wotd-97c52",
	storageBucket: "wotd-97c52.appspot.com",
	messagingSenderId: "308942664548"
};

firebase.initializeApp(config);
var database = firebase.database();
ref = database.ref('date');
var d = new Date();

ref.on('value', function(data){
	var vals = data.val();
	var keys = Object.keys(vals);
	var day = vals[keys[keys.length - 1]].day;

	if(d.getDay() !== day){
		let rand = Math.floor(Math.random() * words.length);
		ref.push({ 
			day: d.getDay(),
			index: rand
		});
		index = rand;
	}else{
		index = vals[keys[keys.length - 1]].index;
	}	
	document.getElementById("word").innerHTML = words[index][0];
	document.getElementById("def").innerHTML = words[index][1];
}, function(error){
		console.log(error);
	}
);

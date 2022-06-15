var firstClick = true;

function open(id) {show_(id)}
function show_(id) {
	if (id == '1.16.5' && firstClick) {
		req("16", "Cardboard");
		firstClick = false;
	}
	var els = document.getElementsByClassName("ver");
	for (i = 0; i < els.length; i++) els[i].style.display = "none";
	document.getElementById(id).style.display = "block";
}
open('1.17.1')

function apex() {
  var ran = Math.floor(Math.random() * 3) + 1;
  document.getElementById("ap").src = "./apex/apex" + ran + ".png";
}
setInterval(apex, 5000);
apex();


function req_new(ver, job) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var myObj = JSON.parse(this.responseText);

			var name = myObj[0].name.split(" ")[0].replace('#','')
			var dl = myObj[0].files[0].url
			var date = new Date(myObj[0].date_published)
			var formattedTime = date.toString().split(" ")[1] + " " + date.getDate() + ", " + date.getFullYear();

			document.getElementById("txt-" + ver).innerHTML = '<span class="tspan">Download </a> #' + name + "&nbsp;<b>(for 1.18.2)</b></span>";
			document.getElementById("dl-" + ver).href = dl;

			var log = "";
			document.getElementById("info-" + ver).innerHTML = "Last update on "+formattedTime+" "+log;
		}
	};
	xmlhttp.open("GET", "https://api.modrinth.com/v2/project/cardboard/version", true);
	xmlhttp.send();
}

function req(ver, job) {
	if (ver == "17") {
		req_new(ver, job)
		return
	}
	
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var myObj = JSON.parse(this.responseText);
			var date = new Date(myObj.timestamp);
			var formattedTime = date.toString().split(" ")[1] + date.getDate() + ". ";
			var dl = (ver == "16") ?
				"https://ci.codemc.io/job/IsaiahPatton/job/"+ job +"/" + myObj.number + "/artifact/" + myObj.artifacts[0].relativePath :
				"https://cdn.modrinth.com/data/MLYQ9VGP/versions/1.17-"+ myObj.number +"/"+ myObj.artifacts[0].fileName.replace('-dev', '');

			document.getElementById("txt-" + ver).innerHTML = '<span class="tspan">Download </a> #' + myObj.number + (ver == "17" ? "&nbsp; <b>(for 1.18.2)</b>" : "") + '</span>';
			document.getElementById("dl-" + ver).href = dl;

			var items = myObj.changeSet.items;
			var log = "<a href='javascript:myFunction(" + ver + ")' style='text-decoration:underline;'>View Changelog</a><ul id='change-" + ver + "' style='font-size:0.67rem; display:none;'>";
			for (i = 0; i < items.length; i++) log += "<li>"+ items[i].comment +"</li>";
			log += "</ul>"
			document.getElementById("info-" + ver).innerHTML = "Last update on "+formattedTime+" "+log;
		}
	};
	xmlhttp.open("GET", "https://api.allorigins.win/raw?url=https%3A%2F%2Fci.codemc.io%2Fjob%2FIsaiahPatton%2Fjob%2F"+job+"%2FlastSuccessfulBuild%2Fapi%2Fjson", true);
	xmlhttp.send();
}
req("17", "Cardboard-1.17-dev");

function art(e, build, ver, job) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200)
			document.getElementById(ver + "-" + build).href = "https://ci.codemc.io/job/IsaiahPatton/job/" + job + "/" + build + "/artifact/" + (JSON.parse(this.responseText)).artifacts[0].relativePath;
	};
	xmlhttp.open("GET", "https://jsonp.afeld.me/?url=https%3A%2F%2Fci.codemc.io%2Fjob%2FIsaiahPatton%2Fjob%2F" + job + "%2F" + build + "%2Fapi%2Fjson", true);
	xmlhttp.send();
}

function myFunction(ver) {
	var x = document.getElementById("change-"+ver);
	x.style.display = (x.style.display==="none") ? "block" : "none";
}

function openCity(evt, cityName) {
	var i, x, tablinks;
	x = document.getElementsByClassName("city");
	for (i = 0; i < x.length; i++) x[i].style.display = "none";

	tablinks = document.getElementsByClassName("tablink");
	for (i = 0; i < x.length; i++)
		tablinks[i].className = tablinks[i].className.replace(" w3-blue", "");
	document.getElementById(cityName).style.display = "block";
	if (evt == null) document.getElementsByClassName(cityName)[0].className += " w3-blue";
	evt.currentTarget.className += " w3-blue";
}

if (window.location.href.toString().includes("#1.17")) openCity(open('1.17.1'));
if (window.location.href.toString().includes("#1.16")) openCity(open('1.16.5'));
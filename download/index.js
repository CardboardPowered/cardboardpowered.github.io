function $(id) {return document.getElementById(id)}

function vClk(el) {
	const els = document.querySelectorAll('#version-select .active');
	for (var i = 0; i < els.length; i++) { els[i].classList.remove('active'); }

	el.classList.add('active');
	req_new(el.innerText, el)
}

function ver_click(e) {
	for (var i = 19; i <= 25; i++) {
		if (undefined != $(i)) {
			$(i).className = $(i).className.replace(' active', '');
		}
	}

	$(e).className += ' active';
	var txt = $(e).innerText;
	req_new(txt, e)
}

var versionJson;
function req_new(ver, e) {
	ver = ver.replace('*','');
	if (undefined != versionJson) {
		doo(ver, e, 0);
		return;
	}

	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			versionJson = JSON.parse(this.responseText);
			doo(ver, e, 0);
		}
	};
	req.open("GET", "https://api.modrinth.com/v2/project/cardboard/version", true);
	req.send();
}

const snapMsg = "WARNING:\nThis version of Cardboard is an experimental snapshot release!\n\n-Not actively supported\n-Use at your own risk!";

function doo(ver, e, c) {
	var objj = versionJson[c];
	var name = objj.name.split(" ")[0].replace('#','')
	var file = objj.files[0];
	var dl = file.url;
	var vars = objj.game_versions;
	var version = ver.split(' ')[0]; 
	var updated = objj.date_published;

	if (vars.indexOf(version) == -1) {
		doo(ver, e, c + 1)
		return;
	}

	$('dlb').innerHTML = '<span class="tspan">Download </a> #' + name + "&nbsp;<b>(for " + vars + ")</b></span>";
	$('verc').innerHTML = ver; // $(e).innerText;
	$('dll').href = file.url;
	$('updated').innerText = "Last Updated: " + new Date(updated).toDateString();
	$('size').innerText = file.filename + " / " + (file.size/1024/1024).toFixed(2) + "MB";
	$('warn').innerText = (version.indexOf('w') != -1 || version.indexOf('-') != -1) ? snapMsg : "";
	
}

addEventListener("load", function(e){ req_new('1.21.10') });

setTimeout(function() { req_new('1.21.10') }, 100);
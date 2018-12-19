document.addEventListener("DOMContentLoaded", getJSON);

let dest = document.querySelector(".akt_container");
let eventJSON;
let events;
let postTemplate = document.querySelector("[data-template]");



/* Her henter jeg json ind fra det link som wordpress har givet mig*/
async function getJSON() {
	myJSON = await fetch("https://soren-remboll.com/kea/eksamen_semester_2/wordpress/wp-json/wp/v2/events");
	eventJSON = await myJSON.json();
	console.log(eventJSON);
	visevent();

}

function visevent() {
	console.log("vis event");
	eventJSON.forEach(event => {
			let klon = postTemplate.cloneNode(true).content;

			klon.querySelector(".akt_titel").textContent = event.acf.titel;
			klon.querySelector(".akt_besk").innerHTML = event.acf.beskrivelse;
			klon.querySelector("[data-img]").setAttribute("src", event.acf.billede);
			klon.querySelector("[data-link]").setAttribute("href", event.acf.link);


			dest.appendChild(klon);
		}

	);

}

function onLoad() {

	// if (window.innerWidth <= 768) {

	function toggleMenu() {
		document.querySelector(".burger").classList.toggle("change");
		document.querySelector("nav").classList.toggle("show");
	}
	document.querySelector(".burger").addEventListener("click", toggleMenu);
	document.querySelector("ul").addEventListener("click", toggleMenu);

}
//}

document.addEventListener("DOMContentLoaded", function (event) {
	onLoad();
});


let modal = document.querySelector("#modal");
let tilmeld = document.querySelector("#tilmeld");
let close = document.querySelector("#close");

//kode til at svar teksten bliver vist
let svartekst = "";
document.querySelector("#NB_Form").addEventListener("submit", ajaxCall);

//kode
async function ajaxCall(e) {
	e.preventDefault();
	let navn = this.querySelector("input[type=text]").value;
	console.log(navn);
	let url = "nyhedsbrev.php?navn=" + navn;
	let svar = await fetch(url);
	svartekst = await svar.text();
	show();
	this.querySelector("input[type=text]").value = "";
}

function show(response) {
	document.querySelector("#response").textContent = svartekst;
}

tilmeld.addEventListener("click", visModal);

function visModal() {

	//ved klik på tilmeldingsboxen vises modal vindu med indhold.
	modal.classList.add("vis");

	//ved klik på close button fjernes modal vinduet med indholdet.
	close.addEventListener("click", skjulModal);

}

function skjulModal() {
	//css med modal vis bliver skjult igen
	modal.classList.remove("vis");
}

document.addEventListener("DOMContentLoaded", getJSON);

let dest = document.querySelector(".container");
let imgJSON;
let billede;
let id;
let postTemplate = document.querySelector("[data-template]");



async function getJSON() {
	myJSON = await fetch("https://www.soren-remboll.com/kea/eksamen_semester_2/wordpress/wp-json/wp/v2/image");
	imgJSON = await myJSON.json();
	console.log(imgJSON);
	visImg();

}

function visImg() {
	console.log("vis billeder");
	imgJSON.forEach(billede => {
			let klon = postTemplate.cloneNode(true).content;

			klon.querySelector("article").addEventListener("click", () => {
				GalvisModal(billede);
				console.log("Klik på Billede");

			});
			klon.querySelector(".gal_img").innerHTML = billede.content.rendered;


			dest.appendChild(klon);
		}


	);

}

function GalvisModal(billede) {
	console.log("Åbner Modal");
	console.log(billede);

	document.querySelector("#gal_modal_fullscreen").style.display = "block";
	document.querySelector("#gal_modal_vindue").style.pointerEvents = "all";
	document.querySelector("#gal_modal_button").style.pointerEvents = "all";



	document.querySelector("#gal_modal_content").innerHTML = billede.content.rendered;

	document.querySelector("#gal_modal_button").addEventListener("click", () => {
		document.querySelector("#gal_modal_fullscreen").style.display = "none";
	});



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

// Script til Nyhedsbreve:

let modal = document.querySelector("#modal");
let tilmeld = document.querySelector("#tilmeld");
let close = document.querySelector("#close");

//kode til at svar teksten bliver vist
let svartekst = "";
document.querySelector("submit").addEventListener("submit", ajaxCall);

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

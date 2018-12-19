/*Top linie til at starte hele koden, den tjekker og ser om sitet er loaded korrekt, før det hele starter*/
document.addEventListener("DOMContentLoaded", getJSON);

/* En stribe variabler som bliver holdt globale, da de enten skal bruges senere, eller sendes videre til kloning*/
let dest = document.querySelector(".cv_container");
/* LET DEST bruges for at sætte en placering af indholdet, i dette tilfælde er det klassen container der får klonings produktet */
let cvJSON;
/*Variablen cvJSON er for at gøre json filen til et objekt som scriptet kan bruge senere, her er det for at give kloneren noget at løkke igennem*/
let tekst;
/* let tekst er for at give kloneren noget at kalde de enkelte objekter, her er det for at give segmenterne et navn og "tag"*/
let postTemplate = document.querySelector("[data-template]");
/* postTemplate er bare for at vælge et sted at klone til, misforståes ikke med DEST, da der er flere under sepererede eniteter i et klonet objekt */


/* Her henter jeg json ind fra det link som wordpress har givet mig*/
async function getJSON() {
	myJSON = await fetch("https://soren-remboll.com/kea/eksamen_semester_2/wordpress/wp-json/wp/v2/cv");
	/* her sætter jeg mit array som wordpress henter, til at være en json fil */
	cvJSON = await myJSON.json();
	console.log(cvJSON);
	visTekst();


}

function visTekst() {
	console.log("vis tekst");
	/* her er kloneren der gør at hvert element i jsonfilen bliver sat ind på den destination som er valgt */
	cvJSON.forEach(tekst => {
			let klon = postTemplate.cloneNode(true).content; /* Det siger bare ok for at klone */

			klon.querySelector("[data-titel]").textContent = tekst.acf.overskrift;
			klon.querySelector("[data-content]").innerHTML = (tekst.acf.udstillinger + "<br>");


			/*"Sæt ind på punkt dest"*/
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
// Script til Nyhedsbreve:

let modal = document.querySelector("#modal");
let tilmeld = document.querySelector("#tilmeld");
let close = document.querySelector("#close");

//kode til at svar teksten bliver vist
let svartekst = "";
document.querySelector("form").addEventListener("submit", ajaxCall);

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

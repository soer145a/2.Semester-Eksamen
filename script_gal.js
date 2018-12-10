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
				visModal(billede);
				console.log("Klik på Billede");

			});
			klon.querySelector(".gal_img").innerHTML = billede.content.rendered;

			dest.appendChild(klon);
		}

	);
}

function visModal(billede) {
	console.log("Åbner Modal");
	console.log(billede);

	document.querySelector("#modal_fullscreen").style.display = "block";
	document.querySelector("#modal_vindue").style.pointerEvents = "all";
	document.querySelector("#modal_button").style.pointerEvents = "all";



	document.querySelector("#modal_content").innerHTML = billede.content.rendered;

	document.querySelector("#modal_button").addEventListener("click", () => {
		document.querySelector("#modal_fullscreen").style.display = "none";
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

document.addEventListener("DOMContentLoaded", getJSON);

let dest = document.querySelector(".container");
let imgJSON;
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
			klon.querySelector(".gal_img").innerHTML = billede.content.rendered;

			dest.appendChild(klon);
		}

	);
}

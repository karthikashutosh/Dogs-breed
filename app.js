async function start() {
  const response = await fetch("https://dog.ceo/api/breeds/list/all");
  const data = await response.json();
  breedNameList(data.message);
}

start();

function breedNameList(breedList) {
  document.querySelector(".breed").innerHTML = `
   <select onchange="loadBreed(this.value)">
   <option>Choose a dog Breed</option>
   ${Object.keys(breedList)
     .map((breed) => {
       return `"<option>${breed}</option>"`;
     })
     .join("")}
   
   
   </select>
   `;
}

async function loadBreed(breed) {
  if (breed != "Choose a dog Breed") {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
    const data = await response.json();

    showImages(data.message);
  }
}

function showImages(images) {
  let currentPosition = 0;
  document.querySelector("#slide").innerHTML = `
  <div class="slide" style="background-image: url('${images[0]}');">
  <div class="slide" style="background-image: url('${images[0]}');">
  `;
  currentPosition += 2;
  setInterval(nextSlide, 3000);

  function nextSlide() {
    document.querySelector(".slideshow").insertAdjacentHTML(
      "beforeend",
      `  <div class="slide" style="background-image: url('${images[currentPosition]}');">
    `
    );
    setTimeout(function () {
      document.querySelector(".slide").remove();
    }, 1000);
    if (currentPosition + 1 > images.length) {
      currentPosition = 0;
    } else {
      currentPosition++;
    }
  }
}

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
  if (breed !="Choose a dog Breed") {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
    const data = await response.json();

    showImages(data.message);
  }
}

function showImages(images){
  document.querySelector("#slide").innerHTML=`
  <div class="slide" style="background-image: url('${images[0]}');">
  <div class="slide" style="background-image: url('${images[0]}');">
  `
}
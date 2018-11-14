$(document).ready(function() {
  //starting Stuff
  populateListOfBuildings();
  settingBigImage();
  countDown();

  $("#tela-10").hide();

  //buttons functionalities
  $("#left-arrow").click(() => {
    leftButton();
  });

  $("#right-arrow").click(() => {
    rightButton();
  });

  setInterval(function(e) {
    smallGallery(smallGalleryIndex);
  }, 3000);

  $("#video").mouseover(function() {
    $(".layer-video").hide();
  });
  $("#video").mouseleave(function() {
    $(".layer-video").show();
  });

  $("#map").mouseover(function() {
    $("#info-map").hide();
  });

  $("#map").mouseleave(function() {
    $("#info-map").show();
    $("#map iframe").css("pointer-events", "none");
  });

  $("#map").click(function() {
    $("#map iframe").css("pointer-events", "auto");
  });
});

function countDown() {
  // Set the date we're counting down to
  var countDownDate = new Date("Nov 22, 2018 10:00:00").getTime();

  // Update the count down every 1 second
  var x = setInterval(function() {
    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="days-missing span"
    let dm = document.querySelector("#days-missing p");
    dm.textContent = days + " dias";
    let hm = document.querySelector("#hours-missing");
    hm.textContent = hours + "h " + minutes + "m " + seconds + "s ";

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      dm.textContent = "Venha para o feirão!";
      hm.textContent = "Agora!";
    }
  }, 1000);
}

function populateListOfBuildings() {
  //selects parent container
  let bldParent = document.querySelector(".buildings-template-parent");
  //selects building template
  let buildingTemplate = document.querySelector(".buildings-template");

  //loops for each element in list_of_buildings
  for (let index = 0; index < list_of_buildings.length; index++) {
    //clones template
    let bld = buildingTemplate.cloneNode(true);

    //adds each element's info to clone
    settingBuildings(bld, index);
    //adds clone to block of code
    bldParent.appendChild(bld);
  }

  //removes template
  bldParent.removeChild(buildingTemplate);
}

//lists of all buildings objects
let list_of_buildings = [
  new Building(
    "../img/predios/predio1.jpg",
    "Condominio Maraponga",
    "2 quartos | 45m<sup>2</sup> | Condomínio: R$:200"
  ),
  new Building(
    "../img/predios/predio2.jpg",
    "Condominio Centro",
    "4 quartos | 90m<sup>2</sup> | Condomínio: R$:530"
  ),
  new Building(
    "../img/predios/predio3.jpg",
    "Residencial Aldeota",
    "2 quartos | 65m<sup>2</sup> | Condomínio: R$:780"
  ),
  new Building(
    "../img/predios/predio4.jpg",
    "Prédio Papicu",
    "4 quartos | 90m<sup>2</sup> | Condomínio: R$:530"
  ),
  new Building(
    "../img/predios/predio5.jpg",
    "Residencial Passaré",
    "3 quartos | 74m<sup>2</sup> | Condomínio: R$:340"
  ),
  new Building(
    "../img/predios/predio6.jpg",
    "Residencial Passaré",
    "2 quartos | 67m<sup>2</sup> | Condomínio: R$:740"
  )
];

//building class
function Building(image, title, description) {
  this.image = image;
  this.title = title;
  this.description = description;
}

//Random value that's going to go up and down according to inputs - sets big image
let bigImageIndex = Math.floor(Math.random() * list_of_buildings.length);

function settingBigImage() {
  let bigBuilding = document.querySelector("#big-building");
  settingBuildings(bigBuilding, bigImageIndex);
}

function settingBuildings(b, index) {
  //sets the image of a specific object
  b.children[0].style.backgroundImage =
    "url(" + list_of_buildings[index].image + ")";

  //sets the title of a specific object
  b.children[1].children[1].innerHTML = list_of_buildings[index].title;

  //sets the description of a specific object
  b.children[1].children[2].innerHTML = list_of_buildings[index].description;
}

//goes up the list - resets after reachign the edge
function rightButton() {
  console.log("bigImageIndex :", bigImageIndex);
  console.log("list_of_buildings.length :", list_of_buildings.length);

  if (bigImageIndex == list_of_buildings.length) {
    bigImageIndex = 0;
  } else {
    bigImageIndex++;
  }
  settingBigImage();
}

//goes dow the list - resets after reachign the edge
function leftButton() {
  if (bigImageIndex == 0) {
    bigImageIndex = list_of_buildings.length;
  } else {
    bigImageIndex--;
  }
  settingBigImage();
}

let randomNumbs = [];
for (let index = 0; index < 9; index++) {
  randomNumbs[index] = Math.floor(Math.random() * list_of_buildings.length);
}

let smallGalleryIndex = 0;

function smallGallery(e) {
  let sg1 = document.querySelector("#small-gallery-el1");
  let sg2 = document.querySelector("#small-gallery-el2");
  let sg3 = document.querySelector("#small-gallery-el3");

  let cirInd = document.querySelector("#circles-indicators");
  for (let o = 0; o < cirInd.children.length; o++) {
    cirInd.children[o].classList.remove("active-circle");
    cirInd.children[o].classList.remove("inactive-circle");
  }
  switch (e) {
    case 0:
      settingBuildings(sg1, randomNumbs[0]);
      settingBuildings(sg2, randomNumbs[1]);
      settingBuildings(sg3, randomNumbs[2]);
      cirInd.children[0].classList.add("active-circle");
      cirInd.children[1].classList.add("inactive-circle");
      cirInd.children[2].classList.add("inactive-circle");
      break;
    case 1:
      settingBuildings(sg1, randomNumbs[3]);
      settingBuildings(sg2, randomNumbs[4]);
      settingBuildings(sg3, randomNumbs[5]);
      cirInd.children[0].classList.add("inactive-circle");
      cirInd.children[1].classList.add("active-circle");
      cirInd.children[2].classList.add("inactive-circle");
      break;
    case 2:
      settingBuildings(sg1, randomNumbs[6]);
      settingBuildings(sg2, randomNumbs[7]);
      settingBuildings(sg3, randomNumbs[8]);
      cirInd.children[0].classList.add("inactive-circle");
      cirInd.children[1].classList.add("inactive-circle");
      cirInd.children[2].classList.add("active-circle");
      break;
    default:
      break;
  }

  smallGalleryIndex++;
  if (smallGalleryIndex > 2) {
    smallGalleryIndex = 0;
  }
}

window.onscroll = function() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.querySelector("#toTop").style.display = "block";
  } else {
    document.querySelector("#toTop").style.display = "none";
  }
};

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

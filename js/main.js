$(document).ready(function() {
  //starting Stuff
  populateListOfBuildings();
  countDown();
  console.log(list_of_buildings.length);

  $("#tela-10").hide();

  $("#video").mouseover(function() {
    $("#video-title").hide();
  });

  $("#video").mouseleave(function() {
    $("#video-title").show();
  });

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

  $(".schedule-visit-btn").click(function() {
    let title = $(this)
      .siblings(".building-title")
      .text();
    let description = $(this)
      .siblings(".building-description")
      .html();
    let image = $(this)
      .parent()
      .siblings(".building-img")
      .css("background-image")
      .replace(/^url|[\(\)]/g, "");
    let aux = new Building(image, title, description);

    settingBigImage(aux);
  });
});

function countDown() {
  // Set the date we're counting down to
  var countDownDate = new Date("Nov 22, 2018 10:00:00").getTime();
  var finishDate = new Date("Nov 26, 2018 10:00:00").getTime();

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
    if (days < 10) {
      hm.style.paddingLeft = "15px";
      hm.textContent = hours + "h " + minutes + "m " + seconds + "s ";
    } else {
      hm.textContent = hours + "h " + minutes + "m " + seconds + "s ";
    }
    let falta = document.querySelector("#days-missing");

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      dm.textContent = "";
      hm.textContent = "";
      if (finishDate - now < 0) {
        falta.textContent = "O feirão acabou.";
      } else {
        falta.textContent = "Já começou! Venha para o feirão!";
      }
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
    "../img/predios/base.jpg",
    "Essenza Residenziale Cocó",
    "• 125,29m² e 126,34m²	1 suíte (com closet ou closet e sacada ou closet casal)  <br>•	3 vagas de garagem  <br>•	Rua Batista de Oliveira, 1023 Cocó - Fortaleza/CE",
    "../img/logos/base_logo.png"
  ),
  new Building(
    "../img/predios/bspar.jpg",
    "Marzzano Premium Residence",
    "• 88m², 100m² e 117m²	2 ou 3 suítes  <br>•	2 vagas de garagem  <br>•	Rua Francisca Almeida de Souza, 255 Dunas - Fortaleza/CE",
    "../img/logos/bspar_logo.png"
  ),
  new Building(
    "../img/predios/coringa.jpg",
    "Bosque das Flores",
    "•	141,83m² e 182,32m² <br>•	3 ou 4 suítes  (1 closet, com ou sem banheira)  <br>•	3 ou 4 vagas de garagem  <br>•	Rua José Alencar Ramos, 55 Guararapes - Fortaleza/CE",
    "../img/logos/crolim_logo.png"
  ),
  new Building(
    "../img/predios/canopus.jpg",
    "Gran Village Messejana",
    "•	48,04m² <br>•	2 quartos (1 suíte)  <br>•	1 vaga de garagem  <br>•	Rua Luiz Francisco Xavier, s/n Messejana - Fortaleza/CE",
    "../img/logos/canopus_logo.png"
  ),
  new Building(
    "../img/predios/coringa.jpg",
    "CARNEIRO MELO EMPREENDIMENTO",
    "•	48,04m² <br>•	2 quartos (1 suíte)  <br>•	1 vaga de garagem  <br>•	Rua Luiz Francisco Xavier, s/n Messejana - Fortaleza/CE",
    "../img/logos/coringa-logo.png"
  ),
  new Building(
    "../img/predios/coringa.jpg",
    "CASA NOVA EMPREENDIMENTO",
    "•	00, 00 m²  <br>•	0 quartos (sendo 0 suítes)  <br>•	0 vagas de garagem <br>•	Av. Nonono Nonono Nonono, 00 - Nononono",
    "../img/logos/casa-nova-logo.png"
  ),
  new Building(
    "../img/predios/columbia.jpg",
    "Edifício Cristal XII",
    "•	96,85m² <br>•	3 suítes  <br>•	2 vagas de garagem  <br>•	Rua Conselheiro Tristão, 1479 Bairro de Fátima - Fortaleza/CE",
    "../img/logos/const-columbia-logo.png"
  ),
  new Building(
    "../img/predios/corinthus.jpg",
    "Edifício Fernando Rocha Residence",
    "• 100,30m²	4 quartos (3 suítes, sendo 1 master e 1 reversível)  <br>•	2 ou 3 vagas de garagem  <br>•	Rua Ministro Abner Vasconcelos, 979, Sapiranga",
    "../img/logos/marca-corintus-logo.png"
  ),
  new Building(
    "../img/predios/dias-de-sousa.jpg",
    "Parc Victoria",
    "•	76,50m² <br>•	3 quartos (2 suítes)  <br>•	2 vagas de garagem  <br>•	Av. Comodoro Estácio Brígido, 1999 - Guararapes Fortaleza/CE",
    "../img/logos/diasdesousa_logo.png"
  ),
  new Building(
    "../img/predios/dube.jpg",
    "Jardins de Murano",
    "• 195m² (100% Personalizado)	4 suítes (1 Suíte master com amplo closet e banheira de hidromassagem e 1 no térreo)  <br>•	3 ou 4 vagas de garagem  <br>•	Av. Eusébio de Queiroz, 5684 Centro - Eusébio/CE",
    "../img/logos/dube_logo.png"
  ),
  new Building(
    "../img/predios/enxegata.jpg",
    "Residencial Guararapes",
    "•	71,67m², 77,78m² e 78,48m² <br>•	2 suítes  <br>•	2 vagas  <br>•	Rua Jaime Pinheiro, 130, Guararapes - Fortaleza/CE",
    "../img/logos/engexata_logo.png"
  ),
  new Building(
    "../img/predios/habitus.jpg",
    "Condomínio Jacarandá",
    "• 73,5m² e 108m²	3 quartos, 2 suítes (sendo 1 reversível) <br>•	2 vagas de garagem  <br>•	Rua Bahia, 26 Parque Havaí - Eusébio/CE",
    "../img/logos/habitus-logo.png"
  ),
  new Building(
    "../img/predios/inova.jpg",
    "Sonata Residence",
    "•	62,38m² e 72,09m²  <br>•	2 e 3 quartos (1 suíte) <br>•	1 ou 2 vagas  <br>•	Rua Guaramirim, 805 Lagoinha - Eusébio/CE.",
    "../img/logos/inova-logo.png"
  ),
  new Building(
    "../img/predios/jsimoes.jpg",
    "Absoluto Parque do Cocó",
    "•	154,53m² e 158,52m²  <br>•	3 suítes <br>•	3 vagas de garagem  <br>•	Rua Israel Bezerra, 1090 Cocó - Fortaleza/CE",
    "../img/logos/jsimoes_logo.png"
  ),
  new Building(
    "../img/predios/jatahy.jpg",
    "Condomínio CN Eusébio Boulevard I",
    "•	64,09m²  <br>•	2 quartos (1 suíte) <br>•	1 vaga de garagem  <br>•	Rua Vereda Tropical, s/n Eusébio/CE",
    "../img/logos/jatahy_logo.png"
  ),
  new Building(
    "../img/predios/coringa.jpg",
    "JVS EMPREENDIMENTO",
    "•	00, 00 m²  <br>•	0 quartos (sendo 0 suítes)  <br>•	0 vagas de garagem <br>•	Av. Nonono Nonono Nonono, 00 - Nononono",
    "../img/logos/jvs_logo.png"
  ),
  new Building(
    "../img/predios/coringa.jpg",
    "Marbella Home Club",
    "•	110,03m²  <br>•	3 suítes <br>•	2 vaga de garagem  <br>•	Rua Antônio Augusto, 1700 Aldeota - Fortaleza/CE",
    "../img/logos/mendonca-logo.png"
  ),
  new Building(
    "../img/predios/monteplan.jpg",
    "Condomínio Belas Artes",
    "•	75m² e 95m²  <br>•	3 quartos (1 suíte) <br>•	2 vagas de garagem  <br>•	Rua Padre Valdevino, 714 Aldeota - Fortaleza/CE",
    "../img/logos/monteplan-logo.png"
  ),
  new Building(
    "../img/predios/mota-machado.jpg",
    "Reservatto Condomínio Parque",
    "• 74,05m²	2 ou 3 quartos (2 suítes) <br>•	2 vagas de garagem  <br>•	Rua Luíza Miranda Coelho, 1130 Guararapes - Fortaleza/CE",
    "../img/logos/mota-machado-logo.png"
  ),
  new Building(
    "../img/predios/moura-dubeaux.jpg",
    "Metropolitan Central Park",
    "• 94m², 109m² e 130m²	2 ou 3 suítes <br>•	2 vagas de garagem  <br>•	Rua Artista Plástico Joaquim de Souza, 101 Papicu - Fortaleza/CE",
    "../img/logos/moura-dubeux-engenharia-original_logo.png"
  ),
  new Building(
    "../img/predios/coringa.jpg",
    "MRV EMPREENDIMENTO",
    "•	00, 00 m²  <br>•	0 quartos (sendo 0 suítes)  <br>•	0 vagas de garagem <br>•	Av. Nonono Nonono Nonono, 00 - Nononono",
    "../img/logos/mrv_logo.png"
  ),
  new Building(
    "../img/predios/muza.jpg",
    "Residencial Villa Firenze",
    "•	59,71 m² e 65,75 m²  <br>•	2 e 3 quartos <br>•	1 vaga de garagem  <br>•	Rua Cel. João de Oliveira, 555, Cambeba - Fortaleza/CE",
    "../img/logos/muz_logo.png"
  ),
  new Building(
    "../img/predios/placic.jpg",
    "Promenade Aldeota",
    "•	158,26m²  <br>•	3 suítes + 1 gabinete com WC reversível <br>•	3 vagas de garagem  <br>•	Rua Carolina Sucupira, 400 - Aldeota Fortaleza/CE",
    "../img/logos/placic_logo.png"
  ),
  new Building(
    "../img/predios/porto-freire.jpg",
    "Villa Gaudí",
    "•	60m² e 86m²  <br>•	2 ou 3 quartos (1 ou 2 suítes) e 1 WC Social  <br>•	1 ou 2 vagas de garagem  <br>• Rua Alódia, 203 Cidade dos Funcionários Fortaleza/CE",
    "../img/logos/porto-freire-logo.png"
  ),
  new Building(
    "../img/predios/rci.jpg",
    "Reserva Castelão",
    "•	54,07m² e 60,56m²  <br>•	3 quartos (2 suítes, sendo 1 reversível)  <br>•	1 ou 2 vagas de garagem  <br>• Rua Adélia Feijó, 755 Castelão - Fortaleza/CE",
    "../img/logos/rci_logo.png"
  ),
  new Building(
    "../img/predios/riomar.jpg",
    "RIOMAR TRADE",
    "•	00, 00 m²  <br>•	0 quartos (sendo 0 suítes)  <br>•	0 vagas de garagem <br>•	Av. Nonono Nonono Nonono, 00 - Nononono",
    "../img/logos/riomar-logo.png"
  ),
  new Building(
    "../img/predios/terra-brasilis.jpg",
    "Reserva Terra Brasilis",
    "•	RODOVIA CE-040,	KM 12 (Próximo ao Circo Tupiniquim)",
    "../img/logos/terra-brasilis-logo.png"
  )
];

//building class
function Building(image, title, description, logoImg) {
  this.image = image;
  this.title = title;
  this.description = description;
  this.logoImg = logoImg;
}

//Random value that's going to go up and down according to inputs - sets big image
let bigImageIndex = Math.floor(Math.random() * list_of_buildings.length);

function settingBigImage(obj) {
  let bigBuilding = document.querySelector("#agendarModal");
  settingBigBuildings(bigBuilding, obj);
}

function settingBuildings(b, index) {
  //sets the image of a specific object
  b.children[0].style.backgroundImage =
    "url(" + list_of_buildings[index].image + ")";

  b.children[1].children[0].children[0].style.backgroundImage =
    "url(" + list_of_buildings[index].logoImg;
  +")";

  //sets the title of a specific object
  b.children[1].children[1].innerHTML = list_of_buildings[index].title;

  //sets the description of a specific object
  b.children[1].children[2].innerHTML = list_of_buildings[index].description;
}

function settingBuildingsGallery(b, index) {
  //sets the image of a specific object
  b.children[0].style.backgroundImage = "url(" + index.image + ")";

  b.children[1].children[0].children[0].style.backgroundImage =
    "url(" + index.logoImg;
  +")";

  //sets the title of a specific object
  b.children[1].children[1].innerHTML = index.title;

  //sets the description of a specific object
  b.children[1].children[2].innerHTML = index.description;
}

function settingBigBuildings(b, obj) {
  //sets the image of a specific object
  b.children[0].style.backgroundImage = "url(" + obj.image + ")";

  //sets the title of a specific object
  b.children[1].children[0].innerHTML = obj.title;

  //sets the description of a specific object
  b.children[1].children[1].innerHTML = obj.description;
}

//goes up the list - resets after reachign the edge
function rightButton() {
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

let auxList = list_of_buildings.map(x => x);
let randomNumbs = [];

let smallGalleryIndex = 0;

for (let index = 0; index < 9; index++) {
  let ran = Math.floor(Math.random() * auxList.length);
  randomNumbs[index] = auxList[ran];
  auxList.splice(ran, 1);

  console.log("randomNumbs[index] :", auxList.length);
}

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
      settingBuildingsGallery(sg1, randomNumbs[0]);
      settingBuildingsGallery(sg2, randomNumbs[1]);
      settingBuildingsGallery(sg3, randomNumbs[2]);
      cirInd.children[0].classList.add("active-circle");
      cirInd.children[1].classList.add("inactive-circle");
      cirInd.children[2].classList.add("inactive-circle");
      break;
    case 1:
      settingBuildingsGallery(sg1, randomNumbs[3]);
      settingBuildingsGallery(sg2, randomNumbs[4]);
      settingBuildingsGallery(sg3, randomNumbs[5]);
      cirInd.children[0].classList.add("inactive-circle");
      cirInd.children[1].classList.add("active-circle");
      cirInd.children[2].classList.add("inactive-circle");
      break;
    case 2:
      settingBuildingsGallery(sg1, randomNumbs[6]);
      settingBuildingsGallery(sg2, randomNumbs[7]);
      settingBuildingsGallery(sg3, randomNumbs[8]);
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

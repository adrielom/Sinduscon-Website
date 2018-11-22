$(document).ready(function() {
  //starting Stuff
  populateListOfBuildings();
  countDown();

  $("#tela-10").hide();

  $("#video").mouseover(function() {
    $("#video-title").hide();
  });

  $("#video").mouseleave(function() {
    $("#video-title").show();
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
    let formAction = $(this)
      .siblings("#formAction")
      .html();
    let submitName = $(this)
      .siblings("#subscribeName")
      .html();
    let logo = $(this)
      .siblings(".building-realstate-logo-container .building-realstate-img")
      .html();

    let aux = new Building(
      image,
      title,
      description,
      logo,
      formAction,
      submitName
    );
    console.log("aux :", aux);
    settingBigImage(aux);
  });
});

function countDown() {
  // Set the date we're counting down to
  var countDownDate = new Date(Date.parse("2018-11-22T24:00:00")).getTime(); //"2018-11-22T24:00:00"
  var finishDate = new Date(Date.parse("2018-11-26T10:00:00")).getTime();

  // Update the count down every 1 second
  var x = setInterval(function() {
    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;
    // Time calculations for days, hours, minutes and seconds

    let days = 0;
    days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="days-missing span"
    let dm = document.querySelector("#days-missing span");
    dm.textContent = days;

    let title = document.querySelector("#title-banner-final");

    if (days == 1) {
      title.innerHTML =
        '<span class="title-orange-text">COMEÇA AMANHÃ <br></span>O MAIOR FEIRÃO DE APARTAMENTOS, CASAS E LOTES QUE VOCÊ JÁ VIU.';
    }

    // If the count down is finished, write some text
    if (distance <= 0 || days <= 0) {
      clearInterval(x);
      title.innerHTML =
        "QUER UM IMÓVEL <br> PRONTO PARA  <br> MORAR JÁ? <br> A HORA É AGORA!";
      dm.textContent = "";
      $(".counter-bg").hide();
    } else {
      $("#feirao-comecou").hide();
    }
    $(".show-last-day").show();
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

//,
//  new Building(
//    "../img/predios/casa-nova.jpg",
//    "Condomínio CN Eusébio Boulevard I",
//    "•	64,09m²  <br>•	2 quartos (1 suíte)  <br>•	1 vaga de garagem <br>•	Rua Vereda Tropical, s/n   Eusébio/CE",
//    "../img/logos/casa-nova-logo.png",
//    "https://feiraosindusconce.us19.list-manage.com/subscribe/post?u=0903e427b8d22f16c7b50b0a5&amp;id=475295a7c1",
//    "b_0903e427b8d22f16c7b50b0a5_475295a7c1"
//  )

//lists of all buildings objects
let list_of_buildings = [
  new Building(
    "../img/predios/base.png",
    "Essenza Residenziale Cocó",
    "• 125,29m² e 126,34m²<br>• 1 suíte (com closet ou closet e sacada ou closet casal)  <br>•	3 vagas de garagem  <br>•	Rua Dr. Batista de Oliveira, 1023 - Cocó",
    "../img/logos/base_logo.png",
    "https://feiraosindusconce.us19.list-manage.com/subscribe/post?u=0903e427b8d22f16c7b50b0a5&amp;id=194bc9a513",
    "b_0903e427b8d22f16c7b50b0a5_194bc9a513"
  ),
  new Building(
    "../img/predios/bspar.jpg",
    "Marzzano Premium Residence",
    "• 88m², 100m² e 117m² <br>• 2 ou 3 suítes  <br>•	2 vagas de garagem  <br>•	Rua Francisca Almeida de Souza, 255 <br> Dunas",
    "../img/logos/bspar_logo.png",
    "https://feiraosindusconce.us19.list-manage.com/subscribe/post?u=0903e427b8d22f16c7b50b0a5&amp;id=8218183ef4",
    "b_0903e427b8d22f16c7b50b0a5_8218183ef4"
  ),
  new Building(
    "../img/predios/crolim.png",
    "Bosque das Flores",
    "•	141,83m² e 182,32m² <br>•	3 ou 4 suítes  (1 closet, com ou sem banheira)  <br>•	3 ou 4 vagas de garagem  <br>•	Rua José Alencar Ramos, 55 Guararapes",
    "../img/logos/crolim_logo.png",
    "https://feiraosindusconce.us19.list-manage.com/subscribe/post?u=0903e427b8d22f16c7b50b0a5&amp;id=20b104194a",
    "b_0903e427b8d22f16c7b50b0a5_20b104194a"
  ),
  new Building(
    "../img/predios/canopus.jpg",
    "Gran Village Messejana",
    "•	48,04m² <br>•	2 quartos (1 suíte)  <br>•	1 vaga de garagem  <br>•	Rua Luiz Francisco Xavier, s/n <br> Messejana",
    "../img/logos/canopus_logo.png",
    "https://feiraosindusconce.us19.list-manage.com/subscribe/post?u=0903e427b8d22f16c7b50b0a5&amp;id=997f7f96a7",
    "b_0903e427b8d22f16c7b50b0a5_997f7f96a7"
  ),
  new Building(
    "../img/predios/carneiro.png",
    "Carmel Bosque Duo",
    "•	229m² e 300m² <br>•	3 ou 4 suítes  <br>•	3 a 5 vagas de garagem  <br>•	Rua Francisco Matias, 267   Sabiaguaba",
    "../img/logos/carneiro-logo.png",
    "https://feiraosindusconce.us19.list-manage.com/subscribe/post?u=0903e427b8d22f16c7b50b0a5&amp;id=f516c5df03",
    "b_0903e427b8d22f16c7b50b0a5_f516c5df03"
  ),
  new Building(
    "../img/predios/columbia.jpg",
    "Edifício Cristal XII",
    "•	96,85m² <br>•	3 suítes  <br>•	2 vagas de garagem  <br>•	Rua Conselheiro Tristão, 1479 Bairro de Fátima",
    "../img/logos/const-columbia-logo.png",
    "https://feiraosindusconce.us19.list-manage.com/subscribe/post?u=0903e427b8d22f16c7b50b0a5&amp;id=047613aae6",
    "b_0903e427b8d22f16c7b50b0a5_047613aae6"
  ),
  new Building(
    "../img/predios/corinthus.jpg",
    "Edifício Fernando Rocha Residence",
    "• 100,30m² <br>•	4 quartos (3 suítes, sendo 1 master e 1 reversível)  <br>•	2 ou 3 vagas de garagem  <br>•	Rua Ministro Abner Vasconcelos, 979 <br> Sapiranga",
    "../img/logos/marca-corintus-logo.png",
    "https://feiraosindusconce.us19.list-manage.com/subscribe/post?u=0903e427b8d22f16c7b50b0a5&amp;id=bda7082afe",
    "b_0903e427b8d22f16c7b50b0a5_bda7082afe"
  ),
  new Building(
    "../img/predios/dias-de-sousa.jpg",
    "Parc Victoria",
    "•	76,50m² <br>•	3 quartos (2 suítes)  <br>•	2 vagas de garagem  <br>•	Av. Comodoro Estácio Brígido, 1999 - Guararapes",
    "../img/logos/diasdesousa_logo.png",
    "https://feiraosindusconce.us19.list-manage.com/subscribe/post?u=0903e427b8d22f16c7b50b0a5&amp;id=b10b3e6ecc",
    "b_0903e427b8d22f16c7b50b0a5_b10b3e6ecc"
  ),
  new Building(
    "../img/predios/dube.png",
    "Jardins de Murano",
    "• Áreas de 150m² a 240m² <br>• 10 opções de plantas <br>• 100% personalizável <br>•	3 ou 4 quartos  <br>•	3 ou 4 vagas <br>•	Av. Eusébio de Queiroz, 5684 Centro - Eusébio/CE",
    "../img/logos/dube_logo.png",
    "https://feiraosindusconce.us19.list-manage.com/subscribe/post?u=0903e427b8d22f16c7b50b0a5&amp;id=b86d301e48",
    "b_0903e427b8d22f16c7b50b0a5_b86d301e48"
  ),
  new Building(
    "../img/predios/enxegata.jpg",
    "Residencial Guararapes",
    "•	71,67m², 77,78m² e 78,48m² <br>•	3 quartos (2 suítes, sendo 1 reversível) <br>•	2 vagas  <br>•	Rua Jaime Pinheiro  130 Guararapes",
    "../img/logos/engexata_logo.png",
    "https://feiraosindusconce.us19.list-manage.com/subscribe/post?u=0903e427b8d22f16c7b50b0a5&amp;id=33fdd291ec",
    "b_0903e427b8d22f16c7b50b0a5_33fdd291ec"
  ),
  new Building(
    "../img/predios/habitus.jpg",
    "Condomínio Jacarandá",
    "• 73,5m² e 108m²	<br>• 3 quartos (2 suítes e 1 quarto gabinete) <br>•	2 vagas de garagem  <br>•	Rua Bahia, 26 Parque Havaí   Eusébio/CE",
    "../img/logos/habitus-logo.png",
    "https://feiraosindusconce.us19.list-manage.com/subscribe/post?u=0903e427b8d22f16c7b50b0a5&amp;id=d25a6b5706",
    "b_0903e427b8d22f16c7b50b0a5_d25a6b5706"
  ),
  new Building(
    "../img/predios/inova.jpg",
    "Sonata Residence",
    "•	62,38m² e 72,09m²  <br>•	2 e 3 quartos (1 suíte) <br>•	1 ou 2 vagas de garagem <br>•	Rua Guaramirim, 805 Lagoinha - Eusébio/CE.",
    "../img/logos/inova-logo.png",
    "https://feiraosindusconce.us19.list-manage.com/subscribe/post?u=0903e427b8d22f16c7b50b0a5&amp;id=3e0012d900",
    "b_0903e427b8d22f16c7b50b0a5_3e0012d900"
  ),
  new Building(
    "../img/predios/jsimoes.jpg",
    "Absoluto Parque do Cocó",
    "•	154,53m² e 158,52m²  <br>•	3 suítes <br>•	3 vagas de garagem  <br>•	Rua Israel Bezerra, 1090 <br>Cocó",
    "../img/logos/jsimoes_logo.png",
    "https://feiraosindusconce.us19.list-manage.com/subscribe/post?u=0903e427b8d22f16c7b50b0a5&amp;id=3aa1a86a77",
    "b_0903e427b8d22f16c7b50b0a5_3aa1a86a77"
  ),
  new Building(
    "../img/predios/jatahy.jpg",
    "Edifício Cidade",
    "•	53,44m² e 64,72m² <br>• 2 ou 3 quartos (1 suíte) <br>• 1 ou 2 vagas de garagem <br>• Rua Guilherme Rocha, 1299 Centro ",
    "../img/logos/jatahy-logo.png",
    "https://feiraosindusconce.us19.list-manage.com/subscribe/post?u=0903e427b8d22f16c7b50b0a5&amp;id=b834f9e89f",
    "b_0903e427b8d22f16c7b50b0a5_b834f9e89f"
  ),
  new Building(
    "../img/predios/jvs.png",
    "Monte Olimpo 2",
    "•	De 145,28m² até 210,61m²  <br>•	3 ou 4 quartos (3 ou 4 suítes)  <br>•	2 a 4 vagas de garagem<br>•	Rua Melo César, 801 <br> Cidade dos Funcionários",
    "../img/logos/jvs_logo.png",
    "https://feiraosindusconce.us19.list-manage.com/subscribe/post?u=0903e427b8d22f16c7b50b0a5&amp;id=42c409853d",
    "b_0903e427b8d22f16c7b50b0a5_42c409853d"
  ),
  new Building(
    "../img/predios/magis.png",
    "Talassa Dunas Residence",
    "•	61,86m² e 75,23m²  <br>•	2 ou 3 quartos (1 suíte)  <br>•	2 vagas de garagem<br>•	Av. Engenheiro Luís Vieira, 800 - Dunas",
    "../img/logos/magis-logo.png",
    "https://feiraosindusconce.us19.list-manage.com/subscribe/post?u=0903e427b8d22f16c7b50b0a5&amp;id=7294698160",
    "b_0903e427b8d22f16c7b50b0a5_7294698160"
  ),
  new Building(
    "../img/predios/mendoca-marbella.png",
    "Marbella Home Club",
    "•	110,03m²  <br>•	3 suítes (varanda gourmet) <br>•	2 vagas de garagem  <br>•	Rua Antônio Augusto, 1700 Aldeota",
    "../img/logos/mendonca-logo.png",
    "https://feiraosindusconce.us19.list-manage.com/subscribe/post?u=0903e427b8d22f16c7b50b0a5&amp;id=6b5a71793e",
    "b_0903e427b8d22f16c7b50b0a5_6b5a71793e"
  ),
  new Building(
    "../img/predios/monteplan.jpg",
    "Condomínio Belas Artes",
    "•	75m² e 95m²  <br>•	3 quartos (1 suíte) <br>•	2 vagas de garagem  <br>•	Rua Padre Valdevino, 714 Aldeota",
    "../img/logos/monteplan-logo.png",
    "https://feiraosindusconce.us19.list-manage.com/subscribe/post?u=0903e427b8d22f16c7b50b0a5&amp;id=ce49469977",
    "b_0903e427b8d22f16c7b50b0a5_ce49469977"
  ),
  new Building(
    "../img/predios/mota-machado.jpg",
    "Reservatto Condomínio Parque",
    "• 74,05m²	<br>• 2 ou 3 quartos (2 suítes) <br>•	2 vagas de garagem  <br>•	Rua Luíza Miranda Coelho, 1130 <br> Guararapes",
    "../img/logos/mota-machado-logo.png",
    "https://feiraosindusconce.us19.list-manage.com/subscribe/post?u=0903e427b8d22f16c7b50b0a5&amp;id=73c24a94bf",
    "b_0903e427b8d22f16c7b50b0a5_73c24a94bf"
  ),
  new Building(
    "../img/predios/moura-dubeaux.jpg",
    "Metropolitan Central Park",
    "• 94m², 109m² e 130m² <br>•	2 ou 3 suítes <br>•	2 vagas de garagem  <br>•	Rua Artista Plástico Joaquim de Souza, 101<br> Papicu",
    "../img/logos/moura-dubeux-engenharia-original_logo.png",
    "https://feiraosindusconce.us19.list-manage.com/subscribe/post?u=0903e427b8d22f16c7b50b0a5&amp;id=05b49c9091",
    "b_0903e427b8d22f16c7b50b0a5_05b49c9091"
  ),
  new Building(
    "../img/predios/mhr.png",
    "Fonte das Artes Parque Michelangelo",
    "•	41,85m², 44,12m² e 47,69m²   <br>•	2 quartos  <br>•	1 vaga de garagem <br>•	Rua A - Messejana",
    "../img/logos/mrv_logo.png",
    "https://feiraosindusconce.us19.list-manage.com/subscribe/post?u=0903e427b8d22f16c7b50b0a5&amp;id=5595ee9a31",
    "b_0903e427b8d22f16c7b50b0a5_5595ee9a31"
  ),
  new Building(
    "../img/predios/muza.jpg",
    "Residencial Villa Firenze",
    "•	59,71 m² e 65,75 m²  <br>•	2 e 3 quartos <br>•	1 vaga de garagem  <br>•	Rua Cel. João de Oliveira, 555  Cambeba",
    "../img/logos/muz_logo.png",
    "https://feiraosindusconce.us19.list-manage.com/subscribe/post?u=0903e427b8d22f16c7b50b0a5&amp;id=3630f2a797",
    "b_0903e427b8d22f16c7b50b0a5_3630f2a797"
  ),
  new Building(
    "../img/predios/novaes.jpg",
    "Viva La Vida Park Residence",
    "•	95,10m², 116,44m², 126,09m² e 126,73m² <br>• 3 ou 4 quartos	(3 suítes) <br>•	2 vagas de garagem  <br>•	Rua Evaristo da Veiga 140 Parque Del Sol<br> Cidade dos Funcionários",
    "../img/logos/novaes-logo.png",
    "https://feiraosindusconce.us19.list-manage.com/subscribe/post?u=0903e427b8d22f16c7b50b0a5&amp;id=f20f01c8fc",
    "b_0903e427b8d22f16c7b50b0a5_f20f01c8fc"
  ),
  new Building(
    "../img/predios/placic.jpg",
    "Promenade Aldeota",
    "•	158,26m²  <br>•	3 suítes + 1 gabinete com WC reversível <br>•	3 vagas de garagem  <br>•	Rua Carolina Sucupira, 400   Aldeota",
    "../img/logos/placic_logo.png",
    "https://feiraosindusconce.us19.list-manage.com/subscribe/post?u=0903e427b8d22f16c7b50b0a5&amp;id=6594f50c5c",
    "b_0903e427b8d22f16c7b50b0a5_6594f50c5c"
  ),
  new Building(
    "../img/predios/porto-freire.jpg",
    "Villa Gaudí",
    "•	60m² e 86m²  <br>•	2 ou 3 quartos (1 ou 2 suítes) e 1 WC Social  <br>•	1 ou 2 vagas de garagem  <br>• Rua Alódia, 203 <br>Cidade dos Funcionários",
    "../img/logos/porto-freire-logo.png",
    "https://feiraosindusconce.us19.list-manage.com/subscribe/post?u=0903e427b8d22f16c7b50b0a5&amp;id=bff604599f",
    "b_0903e427b8d22f16c7b50b0a5_bff604599f"
  ),
  new Building(
    "../img/predios/rci.jpg",
    "Reserva Castelão",
    "•	54,07m² e 60,56m²  <br>•	3 quartos (2 suítes, sendo 1 reversível)  <br>•	1 ou 2 vagas de garagem  <br>• Rua Adélia Feijó, 755 Castelão",
    "../img/logos/rci_logo.png",
    "https://feiraosindusconce.us19.list-manage.com/subscribe/post?u=0903e427b8d22f16c7b50b0a5&amp;id=e75c3f499c",
    "b_0903e427b8d22f16c7b50b0a5_e75c3f499c"
  ),
  new Building(
    "../img/predios/riomar.jpg",
    "Empresarial RioMar Trade Center ",
    "•	Empreendimento pronto  <br>• Integrado do Shopping  <br>•	302 unidades <br>•	Salas a partir de 33m²<br>•	Rua Desembargador Lauro Nogueira, 1500 <br>Papicu",
    "../img/logos/riomar-logo.png",
    "https://feiraosindusconce.us19.list-manage.com/subscribe/post?u=0903e427b8d22f16c7b50b0a5&amp;id=368aae53f7",
    "b_0903e427b8d22f16c7b50b0a5_368aae53f7"
  ),
  new Building(
    "../img/predios/terra-brasilis.jpg",
    "Reserva Terra Brasilis",
    "•	Lotes a partir de 300m²<br>•	Loteamento fechado de alto padrão <br>•	Rodovia CE-040,	Km 12 (Próximo ao Circo Tupiniquim) Aquiraz/CE ",
    "../img/logos/terra-brasilis-logo.png",
    "https://feiraosindusconce.us19.list-manage.com/subscribe/post?u=0903e427b8d22f16c7b50b0a5&amp;id=bbb6912260",
    "b_0903e427b8d22f16c7b50b0a5_bbb6912260"
  )
];

//building class
function Building(image, title, description, logoImg, formAction, submitName) {
  this.image = image;
  this.title = title;
  this.description = description;
  this.logoImg = logoImg;
  this.formAction = formAction;
  this.submitName = submitName;
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

  b.children[1].children[5].innerHTML = list_of_buildings[index].submitName;
  b.children[1].children[5].style.display = "none";
  b.children[1].children[4].innerHTML = list_of_buildings[index].formAction;
  b.children[1].children[4].style.display = "none";

  console.log("submitName :", b.children[1].children[5].innerHTML);
  console.log("formAction :", b.children[1].children[4].formAction);
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

  b.children[1].children[5].innerHTML = index.submitName;
  b.children[1].children[5].style.display = "none";
  b.children[1].children[4].innerHTML = index.formAction;
  b.children[1].children[4].style.display = "none";
}

function settingBigBuildings(b, obj) {
  //sets the image of a specific object
  b.children[0].style.backgroundImage = "url(" + obj.image + ")";

  //sets the title of a specific object
  b.children[1].children[0].innerHTML = obj.title;

  console.log("obj.formAction :", obj.formAction);
  console.log("obj.submitName :", obj.submitName);

  //sets the description of a specific object
  b.children[1].children[1].innerHTML = obj.description;
  //sets the form action to work with mailchimp
  b.children[1].children[2].children[0].action = obj.formAction;
  //Sets the id of submit button
  b.children[1].children[2].children[0].elements[3].name = obj.submitName;
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

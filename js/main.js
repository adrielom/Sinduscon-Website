$(document).ready(function() {
  let bldParent = document.querySelector(".buildings-template-parent");
  let buildingTemplate = document.querySelector(".buildings-template");

  for (let index = 0; index < list_of_buildings.length; index++) {
    let bld = buildingTemplate.cloneNode(true);

    bld.children[0].style.backgroundImage =
      "url(" + list_of_buildings[index].image + ")";
    bld.children[1].children[1].innerHTML = list_of_buildings[index].title;
    bld.children[1].children[2].innerHTML =
      list_of_buildings[index].description;
    bldParent.appendChild(bld);
  }

  bldParent.removeChild(buildingTemplate);
});

let list_of_buildings = [
  new Building("../img/photo-5.png", "tá", "oi"),
  new Building("../img/photo-4.png", "funcionando", "oi"),
  new Building("../img/photo-1.png", "Dan", "ai"),
  new Building("../img/photo-2.png", "tudo", "uia"),
  new Building("../img/photo-6.png", "bem", "ai"),
  new Building("../img/photo-3.png", "dinamico", "ai"),
  new Building("../img/photo-2.png", "xD", "ai")
];

function Building(image, title, description) {
  this.image = image;
  this.title = title;
  this.description = description;
}

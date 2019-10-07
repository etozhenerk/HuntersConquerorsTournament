function getData() {
  const hunters = document.querySelector(".hunters");
  return fetch(
    "https://sheets.googleapis.com/v4/spreadsheets/1QrnkLy5pG3UUfRLRTx3ELjeFxZiKUn1odc9fVjSRNcU/values/B:G?key=AIzaSyBcgKLrhDrhOC6Y0sZcDNuJ0ut_Sx_EkR8"
  )
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Данные не были получены , ошибка: " + response.status);
      }
    })
    .then(data => {
      return data;
    })
    .catch(err => {
      console.warn(err);
      hunters.innerHTML =
        '<div style ="color:red; font-size: 30px">Упс, что-то пошло не так! </div>';
    });
}

function renderCards(data) {
  const hunters = document.querySelector(".hunters");
  const platinum = document.querySelector(".all-count_platinum");
  const diamond = document.querySelector(".all-count_diamond");


  platinum.innerHTML = `<img src="./dist/img/title/platinum.png" alt="Платина"> : ${data.values[1][3]}`;
  diamond.innerHTML = `<img src="./dist/img/title/diamond.png" alt="Алмаз"> : ${data.values[1][4]}`;

  const huntersList = [];

  data.values.forEach((item, i) => {
    if (i > 1 && i < 211 && item.length !== 0) {
      huntersList.push([item[3], item[4], item[5], item[0], item[1]]);
    }
  });

  huntersList.sort(function(a,b){ 
    return (b[2] - a[2]);
  }).sort(function(a,b){ 
    return (b[1] - a[1]);
  }).sort(function(a,b){ 
    return (b[0] - a[0]);
  });

  const icons = {
    воин: "./dist/img/class/0.png",
    маг: "./dist/img/class/1.png",
    шаман: "./dist/img/class/2.png",
    друид: "./dist/img/class/3.png",
    оборотень: "./dist/img/class/4.png",
    убийца: "./dist/img/class/5.png",
    лучник: "./dist/img/class/6.png",
    жрец: "./dist/img/class/7.png",
    страж: "./dist/img/class/8.png",
    мистик: "./dist/img/class/9.png",
    призрак: "./dist/img/class/10.png",
    жнец: "./dist/img/class/11.png",
    стрелок: "./dist/img/class/12.png",
    паладин: "./dist/img/class/13.png"
  };

  huntersList.forEach((member) => {
      const card = document.createElement("div");
      card.className = "col-12";
      card.innerHTML = `<div class="card" data-class = "${member[4][0].toUpperCase() +
        member[4].slice(1).replace(/\s/g, "")}">
      <div class="card-body row align-items-center">
        <h5 class="card-title col-3 col-md-4 col-lg-7">${member[3]}</h5>
        <div class="card-class col-3 col-md-2"><img src="${
          icons[member[4].replace(/\s/g, "")]
        }" alt="${member[1]}" width="32px" height="32px"></div>
        <div class="card-platinum col-2  col-lg-1">${member[0]}</div>
        <div class="card-diamond col-2  col-lg-1">${member[1]}</div>
        <div class="card-item col-2  col-lg-1">${member[2]}</div>
      </div>
    </div>`;

      hunters.appendChild(card);

  });
}

function toggleCheckbox() {
  const onePlatinum = document.querySelector("#one-platinum");
  const twoPlatinum = document.querySelector("#two-platinum");

  const oneDiamond = document.querySelector("#one-diamond");
  const twoDiamond = document.querySelector("#two-diamond");

  const oneItem = document.querySelector("#one-item");
  const twoItem = document.querySelector("#two-item");

  onePlatinum.checked = false;
  twoPlatinum.checked = false;
  oneDiamond.checked = false;
  twoDiamond.checked = false;
  oneItem.checked = false;
  twoItem.checked = false;

  onePlatinum.addEventListener("change", () => {
    if (onePlatinum.checked === true) {
      twoPlatinum.checked = false;
      twoPlatinum.nextElementSibling.classList.remove("checked");
      onePlatinum.nextElementSibling.classList.add("checked");
    } else {
      onePlatinum.nextElementSibling.classList.remove("checked");
    }
  });

  twoPlatinum.addEventListener("change", () => {
    if (twoPlatinum.checked === true) {
      onePlatinum.checked = false;
      onePlatinum.nextElementSibling.classList.remove("checked");
      twoPlatinum.nextElementSibling.classList.add("checked");
    } else {
      twoPlatinum.nextElementSibling.classList.remove("checked");
    }
  });

  oneDiamond.addEventListener("change", () => {
    if (oneDiamond.checked === true) {
      twoDiamond.checked = false;
      twoDiamond.nextElementSibling.classList.remove("checked");
      oneDiamond.nextElementSibling.classList.add("checked");
    } else {
      oneDiamond.nextElementSibling.classList.remove("checked");
    }
  });

  twoDiamond.addEventListener("change", () => {
    if (twoDiamond.checked === true) {
      oneDiamond.checked = false;
      oneDiamond.nextElementSibling.classList.remove("checked");
      twoDiamond.nextElementSibling.classList.add("checked");
    } else {
      twoDiamond.nextElementSibling.classList.remove("checked");
    }
  });

  oneItem.addEventListener("change", () => {
    if (oneItem.checked === true) {
      twoItem.checked = false;
      twoItem.nextElementSibling.classList.remove("checked");
      oneItem.nextElementSibling.classList.add("checked");
    } else {
      oneItem.nextElementSibling.classList.remove("checked");
    }
  });

  twoItem.addEventListener("change", () => {
    if (twoItem.checked === true) {
      oneItem.checked = false;
      oneItem.nextElementSibling.classList.remove("checked");
      twoItem.nextElementSibling.classList.add("checked");
    } else {
      twoItem.nextElementSibling.classList.remove("checked");
    }
  });
}

function renderCatalog() {
  const cards = document.querySelectorAll(".hunters .card"),
    catalogList = document.querySelector(".catalog-list"),
    catalogBtn = document.querySelector(".catalog-button"),
    catalogWrapper = document.querySelector(".catalog");

  const category = new Set();

  const icons = {
    Воин: "./dist/img/class/0.png",
    Маг: "./dist/img/class/1.png",
    Шаман: "./dist/img/class/2.png",
    Друид: "./dist/img/class/3.png",
    Оборотень: "./dist/img/class/4.png",
    Убийца: "./dist/img/class/5.png",
    Лучник: "./dist/img/class/6.png",
    Жрец: "./dist/img/class/7.png",
    Страж: "./dist/img/class/8.png",
    Мистик: "./dist/img/class/9.png",
    Призрак: "./dist/img/class/10.png",
    Жнец: "./dist/img/class/11.png",
    Стрелок: "./dist/img/class/12.png",
    Паладин: "./dist/img/class/13.png"
  };

  cards.forEach(card => {
    category.add(card.dataset.class);
  });

  category.forEach(elem => {
    const li = document.createElement("li");
    li.classList.add("col-3");
    li.classList.add("col-sm-2");
    li.classList.add("col-xl-1");
    li.innerHTML = `<img class="catalog-img" src="${icons[elem]}" alt="">${elem}`;
    catalogList.appendChild(li);
  });

  const allLi = catalogList.querySelectorAll("li");

  catalogBtn.addEventListener("click", e => {
    if (catalogWrapper.style.display) {
      catalogWrapper.style.display = "";
    } else {
      catalogWrapper.style.display = "block";
    }

    if (e.target.tagName === "LI" || e.target.tagName === "IMG") {
      allLi.forEach(elem => {
        if (
          elem === e.target ||
          (elem.firstChild === e.target && !elem.classList.contains("active"))
        ) {
          elem.classList.add("active");
        } else {
          elem.classList.remove("active");
        }
      });
      filter();
    }
  });
}

function filter() {
  const cards = document.querySelectorAll(".hunters .card"),
    activeLi = document.querySelector(".catalog-list li.active");

  const onePlatinum = document.querySelector("#one-platinum");
  const twoPlatinum = document.querySelector("#two-platinum");

  const oneDiamond = document.querySelector("#one-diamond");
  const twoDiamond = document.querySelector("#two-diamond");

  const oneItem = document.querySelector("#one-item");
  const twoItem = document.querySelector("#two-item");

  cards.forEach(elem => {
    const cardPlatinum = elem.querySelector(".card-platinum").textContent;
    const cardDiamond = elem.querySelector(".card-diamond").textContent;
    const cardItem = elem.querySelector(".card-item").textContent;
    const search = document.querySelector(".form__input");
    const title = elem.querySelector(".card-title");

    elem.parentNode.style.display = "";
    const searchText = new RegExp(search.value.trim(), "i");

    if (!searchText.test(title.textContent)) {
      elem.parentNode.style.display = "none";
    } else if (onePlatinum.checked && Number(cardPlatinum) !== 1) {
      elem.parentNode.style.display = "none";
    } else if (twoPlatinum.checked && Number(cardPlatinum) < 2) {
      elem.parentNode.style.display = "none";
    } else if (oneDiamond.checked && Number(cardDiamond) !== 1) {
      elem.parentNode.style.display = "none";
    } else if (twoDiamond.checked && Number(cardDiamond) < 2) {
      elem.parentNode.style.display = "none";
    } else if (oneItem.checked && Number(cardItem) !== 1) {
      elem.parentNode.style.display = "none";
    } else if (twoItem.checked && Number(cardItem) !== 2) {
      elem.parentNode.style.display = "none";
    } else if (activeLi) {
      if (elem.dataset.class !== activeLi.textContent) {
        elem.parentNode.style.display = "none";
      }
    }
  });
}

function actionPage() {
  const form = document.querySelector(".form"),
    search = document.querySelector(".form__input");

  const onePlatinum = document.querySelector("#one-platinum");
  const twoPlatinum = document.querySelector("#two-platinum");

  const oneDiamond = document.querySelector("#one-diamond");
  const twoDiamond = document.querySelector("#two-diamond");

  const oneItem = document.querySelector("#one-item");
  const twoItem = document.querySelector("#two-item");

  const openPlatinum = document.querySelector("#platinum");
  const openPlatinumAfter = document.querySelector("#platinum-after");
  const platinumLabel = document.querySelector("#platinum-label");

  const openDiamond = document.querySelector("#diamond");
  const openDiamondAfter = document.querySelector("#diamond-after");
  const diamondLabel = document.querySelector("#diamond-label");

  const openItem = document.querySelector("#item");
  const openItemAfter = document.querySelector("#item-after");
  const itemLabel = document.querySelector("#item-label");



  openPlatinum.addEventListener("click", () =>{
    if(!platinumLabel.classList.contains("filter-check_container_active")){
      animateCSS(platinumLabel, "fadeInDown");
      platinumLabel.classList.add("filter-check_container_active");
      openPlatinumAfter.classList.add("filter-check_title_after_active");
    } else{
      platinumLabel.classList.remove("filter-check_container_active");
      openPlatinumAfter.classList.remove("filter-check_title_after_active");
    }
  });

  openDiamond.addEventListener("click", () =>{
    if(!diamondLabel.classList.contains("filter-check_container_active")){
      animateCSS(diamondLabel, "fadeInDown");
      diamondLabel.classList.add("filter-check_container_active");
      openDiamondAfter.classList.add("filter-check_title_after_active");
    } else{
      diamondLabel.classList.remove("filter-check_container_active");
      openDiamondAfter.classList.remove("filter-check_title_after_active");
    }
  });

  openItem.addEventListener("click", () =>{
    if(!itemLabel.classList.contains("filter-check_container_active")){
      animateCSS(itemLabel, "fadeInDown");
      itemLabel.classList.add("filter-check_container_active");
      openItemAfter.classList.add("filter-check_title_after_active");
    } else{
      itemLabel.classList.remove("filter-check_container_active");
      openItemAfter.classList.remove("filter-check_title_after_active");
    }
  });

  onePlatinum.addEventListener("change", filter);
  twoPlatinum.addEventListener("change", filter);
  oneDiamond.addEventListener("change", filter);
  twoDiamond.addEventListener("change", filter);
  oneItem.addEventListener("change", filter);
  twoItem.addEventListener("change", filter);

  form.addEventListener("submit", e => {
    e.preventDefault();
    filter();
    search.value = "";
  });
}

function animateCSS(element, animationName, callback) {
  const node = element;
  node.classList.add("animated", animationName);

  function handleAnimationEnd() {
    node.classList.remove("animated", animationName);
    node.removeEventListener("animationend", handleAnimationEnd);

    if (typeof callback === "function") callback();
  }

  node.addEventListener("animationend", handleAnimationEnd);
}

getData().then(data => {
  renderCards(data);
  toggleCheckbox();
  renderCatalog();
  actionPage();
});

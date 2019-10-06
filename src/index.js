function getData() {
  const hunters = document.querySelector(".hunters");
  return fetch("https://sheets.googleapis.com/v4/spreadsheets/1QrnkLy5pG3UUfRLRTx3ELjeFxZiKUn1odc9fVjSRNcU/values/B:G?key=AIzaSyBcgKLrhDrhOC6Y0sZcDNuJ0ut_Sx_EkR8")
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

  data.values.forEach((member,i) => {
    if (i > 1 && i < 211 && member.length !== 0) {
      const card = document.createElement("div");
      card.className = "col-12";
      card.innerHTML = `<div class="card">
      <div class="card-body row align-items-center">
        <h5 class="card-title col-3 col-md-4 col-lg-7">${member[0]}</h5>
        <div class="card-class col-3 col-md-2"><img src="${icons[member[1]]}" alt="${member[1]}" width="32px" height="32px"></div>
        <div class="card-platinum col-2  col-lg-1">${member[3]}</div>
        <div class="card-diamond col-2  col-lg-1">${member[4]}</div>
        <div class="card-item col-2  col-lg-1">${member[5]}</div>
      </div>
    </div>`;
    hunters.appendChild(card);
    }
  });
}

function toggleCheckbox() {
  const onePlatinum = document.querySelector('#one-platinum');
  const twoPlatinum = document.querySelector('#two-platinum');

  const oneDiamond = document.querySelector('#one-diamond');
  const twoDiamond = document.querySelector('#two-diamond');

  const oneItem = document.querySelector('#one-item');
  const twoItem = document.querySelector('#two-item');

  
    onePlatinum.addEventListener("change", () => {
      if(onePlatinum.checked === true){
        twoPlatinum.checked = false;
        twoPlatinum.nextElementSibling.classList.remove("checked");
        onePlatinum.nextElementSibling.classList.add("checked");
      }else{
        onePlatinum.nextElementSibling.classList.remove("checked");
      }
    });
    twoPlatinum.addEventListener("change", () => {
      if(twoPlatinum.checked === true){
        onePlatinum.checked = false;
        onePlatinum.nextElementSibling.classList.remove("checked");
        twoPlatinum.nextElementSibling.classList.add("checked");
      }else{
        twoPlatinum.nextElementSibling.classList.remove("checked");
      }
    });

    oneDiamond.addEventListener("change", () => {
      if(oneDiamond.checked === true){
        twoDiamond.checked = false;
        twoDiamond.nextElementSibling.classList.remove("checked");
        oneDiamond.nextElementSibling.classList.add("checked");
      }else{
        oneDiamond.nextElementSibling.classList.remove("checked");
      }
    });
    twoDiamond.addEventListener("change", () => {
      if(twoDiamond.checked === true){
        oneDiamond.checked = false;
        oneDiamond.nextElementSibling.classList.remove("checked");
        twoDiamond.nextElementSibling.classList.add("checked");
      }else{
        twoDiamond.nextElementSibling.classList.remove("checked");
      }
    });

    oneItem.addEventListener("change", () => {
      if(oneItem.checked === true){
        twoItem.checked = false;
        twoItem.nextElementSibling.classList.remove("checked");
        oneItem.nextElementSibling.classList.add("checked");
      }else{
        oneItem.nextElementSibling.classList.remove("checked");
      }
    });
    twoItem.addEventListener("change", () => {
      if(twoItem.checked === true){
        oneItem.checked = false;
        oneItem.nextElementSibling.classList.remove("checked");
        twoItem.nextElementSibling.classList.add("checked");
      }else{
        twoItem.nextElementSibling.classList.remove("checked");
      }
    });
}

getData().then (data => {
  renderCards(data);
  toggleCheckbox();

});
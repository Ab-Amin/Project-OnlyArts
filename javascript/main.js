let swiper = new Swiper(".mySwiper", {
  direction: "vertical",
  slidesPerView: 1,
  mousewheel: true,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

let swiperWrapper = document.querySelector('.swiper-wrapper')
let selectCategory = document.querySelector('.select-category')
let selectCountry = document.querySelector('.select-country')
let selectDate = document.querySelector('.select-dates')
let selectBox = document.querySelector('.selections')


  // **** POPUP ****
  function togglePopup(artIndex) {
    let popup = document.querySelector(".popup-overlay");
    popup.classList.toggle("open");
  }

// image --> https://www.artic.edu/iiif/2 + image_id + /full/843,/0/default.jpg
fetch(`https://api.artic.edu/api/v1/artworks?page=1&limit=100`)
.then(response => response.json())
.then(data => {
  console.log(data);

  for (let i = 0; i < data.data.length; i++) {
    let artImg = `https://www.artic.edu/iiif/2/${data.data[i].image_id}/full/843,/0/default.jpg`
    
    swiperWrapper.innerHTML += `
    <div class="swiper-slide" data-art="${i}" data-category="${data.data[i].category_titles}">
      <img src="${artImg}" alt="${data.data[i].artist_title}">
      <div class="buttons">
        <button type="button" title="add to Favorits" class="add-to-fav">
          <i class="fa-solid fa-heart"></i>
        </button>
        <button onclick="togglePopup(${i})" type="button" title="Read More..." class="read-more">
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>
      <div class="desc">
        <p>${data.data[i].title}</p>
        <p>by ${data.data[i].artist_title}</p>
      </div>
    </div>
    `
    
  }
  
  function togglePopup(artIndex) {
    let popup = document.querySelector(".popup-overlay");
    popup.classList.toggle("open");
  
    // Sélectionner et afficher l'image correspondante dans le popup
    if (popup.classList.contains("open")) {
      let swiperImages = document.querySelector(".img-up")
      let dataImages = document.querySelectorAll('.swiper-image');
      
      for (let i = 0; i < dataImages.length; i++) {
        dataImages[i].addEventListener('click', () => togglePopup(i))
        const indiceArt = this.closest(".swiper-slide").dataset.art;
        const imgArt = `https://www.artic.edu/iiif/2/${data.data[indiceArt].image_id}/full/843,/0/default.jpg`;
        swiperImages.innerHTML = 
        `
        <img src="${imgArt}" class="swiper-image">
        `
        console.log(imgArt);
      }
    }
  }
})
.catch(error => {console.log("Erreur lors de la récup des données :", error);
})
  

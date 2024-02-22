// key = tiondernse
// processEuropeanaSearch({
  //   "apikey":"tiondernse",
  //   "action":"record.json",
  //   "success":true,
//   "statsDuration":22,
//   "requestNumber":8,
// })

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
let selectCategory = document.querySelector('#select-category')
let selectBox = document.querySelector('.selections')


// image --> https://www.artic.edu/iiif/2 + image_id + /full/843,/0/default.jpg
fetch(`https://api.artic.edu/api/v1/artworks?page=1&limit=20`)
.then(response => response.json())
.then(data => {
  console.log(data);
  // data.data[i].
  console.log(selectCategory.value);
  
  let categoryList = []
  

  for (i = 0; i < data.data[i].category_titles.length; i++) {
    if (categoryList[i] === data.data[i].category_titles) {
    } else {
      categoryList.push(data.data[i].category_titles)
    }
  }
 
  console.log(categoryList);

  for (let i = 0; i < data.data.length; i++) {
    let artImg = `https://www.artic.edu/iiif/2/${data.data[i].image_id}/full/843,/0/default.jpg`
    

    
    
    swiperWrapper.innerHTML += `
    <div class="swiper-slide" data-art="${i}" data-category="${data.data[i].category_titles}">
    <img src="${artImg}" alt="">
    <button type="button" title="add to favorits" class="add-to-list">
    <i class="fa-solid fa-plus"></i>
    </button>
    <div class="desc">
    <p>${data.data[i].title}</p>
    <p>by ${data.data[i].artist_title}</p>
    </div>
    </div>
    `
  }
  
  
})
.catch(error => {console.log("Erreur lors de la récup des données :", error);
})

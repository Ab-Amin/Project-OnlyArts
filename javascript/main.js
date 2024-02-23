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
let selectCategory = document.querySelector('.select-category')
let selectCountry = document.querySelector('.select-country')
let selectDate = document.querySelector('.select-dates')
let selectBox = document.querySelector('.selections')


// image --> https://www.artic.edu/iiif/2 + image_id + /full/843,/0/default.jpg
fetch(`https://api.artic.edu/api/v1/artworks?page=1&limit=100`)
.then(response => response.json())
.then(data => {
  console.log(data);
  // data.data[i].
  // console.log(data.data.department_title);

  // let categoryListOnebyOne = []
  // let count = [];
  // for (i = 0; i < data.data.length; i++) {
  //     categoryListOnebyOne.push(`${data.data[i].department_title}`)
  // }
  // console.log(categoryListOnebyOne);
  // for (i = 0; i < categoryListOnebyOne.length; i++) {
  //   const element = categoryListOnebyOne[i];
  //   count[element] = (count[element] || 0) + 1;
  // }
  // console.log(count);


  let categoryList = []
  function sortByCategory() {
    for (let i = 0; i < data.data.length; i++) {
      if (categoryList.includes(data.data[i].department_title) == false) {
        categoryList.push(`${data.data[i].department_title}`)
      
      } else if (data.data[i].department_title == null){
        console.log(`obj ${i} doesn't have a category`);
      
      }
    }
    // console.log(categoryList);
    for (let i = 0; i < categoryList.length; i++) {
      if (categoryList[i] != "null"){
        selectCategory.innerHTML += `
        <option value="${categoryList[i]}">${categoryList[i]}</option>`

      }
    }
  }
  sortByCategory()

  let contryOfOrigin = []
  function sortByContry() {
    for (let i = 0; i < data.data.length; i++) {
      if (contryOfOrigin.includes(data.data[i].place_of_origin) == false) {
        contryOfOrigin.push(`${data.data[i].place_of_origin}`)
      
      } else if (data.data[i].place_of_origin == null){
        console.log(`country of origin of ${i} is unknown`);
      
      }
    }
    // console.log(contryOfOrigin);
    for (let i = 0; i < contryOfOrigin.length; i++) {
      if (contryOfOrigin[i] != "null"){
        selectCountry.innerHTML += `
        <option value="${contryOfOrigin[i]}">${contryOfOrigin[i]}</option>`
      
      }
    }
  }
  sortByContry()

  let byDate = []
  function sortByDate() {
    for (let i = 0; i < data.data.length; i++) {
      if (byDate.includes(data.data[i].date_end) == false) {
        byDate.push(`${data.data[i].date_end}`)
      
      } else if (data.data[i].date_end == null){
        console.log(`Date of end of ${i} is unavailable`);
      
      }
    }
    // console.log(byDate);
    for (let i = 0; i < byDate.length; i++) {
      if (byDate[i] != "null"){
        selectDate.innerHTML += `
        <option value="${byDate[i]}">${byDate[i]}</option>`
      
      }
    }
  }
  sortByDate()


  for (let i = 0; i < data.data.length; i++) {
    let artImg = `https://www.artic.edu/iiif/2/${data.data[i].image_id}/full/843,/0/default.jpg`
    
    swiperWrapper.innerHTML += `
    <div class="swiper-slide" data-art="${i}" data-category="${data.data[i].category_titles}">
      <img src="${artImg}" alt="">
      <div class="buttons">
        <button type="button" title="add to Favorits" class="add-to-fav">
          <i class="fa-solid fa-heart"></i>
        </button>
        <button type="button" title="Read More..." class="read-more">
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
  
  
})
.catch(error => {console.log("Erreur lors de la récup des données :", error);
})

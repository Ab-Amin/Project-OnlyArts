

let swiperWrapper = document.querySelector('.swiper-wrapper')
let swiperSlide = document.querySelector('.swiper-slide')
let swiper = new Swiper(".mySwiper", {
  direction: "vertical",
  observer: true,
  observeParents: true,
  slidesPerView: 1,
  mousewheel: true,
  spaceBetween: 30,
  parallax: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
let selectBox = document.querySelector('.selections')
    selectSelect = document.querySelectorAll('.select')
    selectCategory = document.querySelector('.select-category')
    selectCountry = document.querySelector('.select-country')
    selectDate = document.querySelector('.select-dates')
    selectArtist = document.querySelector('.select-artist')

let nextPage = document.querySelector('.next--page')
    prevPage = document.querySelector('.previous--page')
    pagesInfo = document.querySelector('.pagesInfo')
    pageSelect = document.querySelector('.pageSelect')
    currentPage = document.querySelector('.currentPage')
    nextPageSelect = document.querySelector('.nextPageSelect')

let pageNbr = 1

function onlyArts(pageNbr) {
  // image --> https://www.artic.edu/iiif/2 + image_id + /full/843,/0/default.jpg
  fetch(`https://api.artic.edu/api/v1/artworks?page=${pageNbr}&limit=100`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    
    let nowPage = data.pagination.current_page
    let lastPage = data.pagination.total_pages
  
    // Next/Prev Page =-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=--=
    console.log(`current page : ${nowPage}`);
    console.log(`total pages : ${lastPage}`);
  
    currentPage.innerHTML = `(${lastPage})`
    nextPageSelect.innerHTML = `${lastPage}`

  
    // Si total des page >= 2 --> affiche boutton nextPage dans page 1
    // Sinon les bouttons restent cachés
    if (lastPage >= 2){
      nextPage.classList.remove('hidden')
    } else {
      nextPage.classList.add('hidden')
      prevPage.classList.add('hidden')
      pagesInfo.classList.add('hidden')
    }
  
    // Si current page == 1 --> cacher boutton prevPage (pour pas allez dans les négatif et tout faire buggé)
    // Et Si current page >= 2 --> affiche les 2 bouttons
    if (nowPage == 1){
      prevPage.classList.add('hidden')
      pagesInfo.classList.add('hidden')
    } else if (nowPage >= 2) {
      nextPage.classList.remove('hidden')
      prevPage.classList.remove('hidden')
      pagesInfo.classList.remove('hidden')
    }
    
    // Si on est arrivé à la page max --> cache le boutton nextPage 
    if (nowPage == lastPage) {
      nextPage.classList.add('hidden')
    }
    // Popup =-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=--=
    
    // **** POPUP ****
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
    
    // Sort types =-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=--=
    
    // By category --> data.data[i].department_title
    // By country --> data.data[i].place_of_origin
    // (by date --> data.data[i].date_end)
  
    let categoryList = []
    function sortByCategory() {
      for (let i = 0; i < data.data.length; i++) {
        if (categoryList.includes(data.data[i].department_title) == false) {
          
          // console.log(data.data[i].department_title);
  
          // const categName = data.data[i].department_title
          
          // console.log(categName.replace(/ /g, "-"));
          
          categoryList.push(`${data.data[i].department_title}`)
          
          
        } else if (data.data[i].department_title == null){
          console.log(`obj ${i} doesn't have a category`);
        
        }
      }
  
      console.log(categoryList);
  
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
                
    let artistName = []
    function sortByartistName() {
      for (let i = 0; i < data.data.length; i++) {
        if (artistName.includes(data.data[i].artist_title) == false) {
          artistName.push(`${data.data[i].artist_title}`)
        
        } else if (data.data[i].artist_title == null){
          console.log(`Name of Artist n°${i} is unknown`);
        
        }
      }
      // console.log(artistName);
      for (let i = 0; i < artistName.length; i++) {
        if (artistName[i] != "null"){
          selectArtist.innerHTML += `
          <option value="${artistName[i]}">${artistName[i]}</option>`
        
        }
      }
    }
    sortByartistName()


    // Main Swiper =-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=--=
    function swiperDefaultHtml() {
      for (let i = 0; i < data.data.length; i++) {
        
        let artImg = `https://www.artic.edu/iiif/2/${data.data[i].image_id}/full/843,/0/default.jpg`
          swiperWrapper.innerHTML += `
            <div class="swiper-slide" data-art="${i}" data-category="${data.data[i].category_titles}" data-country="${data.data[i].place_of_origin}" data-artist="${data.data[i].artist_title}" >
              <img src="${artImg}" alt="" >
              <div class="buttons">
                <button type="button" title="add to Favorits" class="round-buttons add-to-fav" >
                  <i class="fa-regular fa-heart"></i>
                </button>
                <button type="button" title="Read More..." class="round-buttons read-more" >
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>
              <div class="desc">
                <p class="art-title">${data.data[i].title}</p>
                <p class="art-artist">by ${data.data[i].artist_title}</p>
              </div>
            </div>
          `
        // <img> --> data-swiper-parallax="-300"
        // <div class="buttons"> --> data-swiper-parallax="-200"
        // <div class="desc"> -->  data-swiper-parallax="-100"
      }
    }
    swiperDefaultHtml()
  
    // Function to sort by category of country =-=-=-=-=-=-=-=--=-=-=-=-=-=-=
    function swiperSort(sort) {
      swiperWrapper.innerHTML = ``
  
      console.log(`select : ${sort}`);
      
      for (let i = 0; i < data.data.length; i++) {
        let artImg = `https://www.artic.edu/iiif/2/${data.data[i].image_id}/full/843,/0/default.jpg`
  
        function swiperSortHtml() {
          swiperWrapper.innerHTML += `
            <div class="swiper-slide" data-art="${i}" data-category="${data.data[i].category_titles}" data-country="${data.data[i].place_of_origin}" data-artist="${data.data[i].artist_title}">
              <img src="${artImg}" alt="" >
              <div class="buttons">
                <button type="button" title="add to Favorits" class="round-buttons add-to-fav" >
                  <i class="fa-solid fa-heart"></i>
                </button>
                <button type="button" title="Read More..." class="round-buttons read-more" >
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>
              <div class="desc" >
                <p>${data.data[i].title}</p>
                <p> (${data.data[i].category_titles})</p>
                <p> (${data.data[i].place_of_origin} : country)</p>
                <p>by ${data.data[i].artist_title}</p>
              </div>
            </div>
          `
        }
  
        if (data.data[i].place_of_origin == sort){
          swiperSortHtml()
  
        } else if (data.data[i].department_title == sort) {
          swiperSortHtml()
  
        } else if (data.data[i].artist_title == sort) {
          swiperSortHtml()
        }
      }
    }
    
    selectBox.addEventListener('change', function(e){
      if (e.target.hasAttribute('data-select')){
  
        let dataSelect = e.target.value
        console.log(dataSelect);
  
        // selectCountry.selectedIndex = "country" // reset the <select> to the <option> that has value="country"
  
        if (e.target.getAttribute('data-select') == "select-category"){
          selectCountry.selectedIndex = "country"
          selectArtist.selectedIndex = "artist"
          swiperSort(dataSelect)
  
        } else if (e.target.getAttribute('data-select') == "select-country"){
          selectCategory.selectedIndex = "category"
          selectArtist.selectedIndex = "artist"
          swiperSort(dataSelect)
        } else if (e.target.getAttribute('data-select') == "select-artist"){
          selectCategory.selectedIndex = "category"
          selectCountry.selectedIndex = "country"
          swiperSort(dataSelect)
        }
      }
    });


    // Fav List =-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=--=-=-=-=

    let favButton = document.querySelectorAll('.add-to-fav')
    let favListHtml = document.querySelector('.favorite-lists')
    const favlist = [];
    // const favList = {}

    // full heart : <i class="fa-solid fa-heart"></i> 
    // empty heart : <i class="fa-regular fa-heart"></i>

    favButton.forEach(fav => {
      fav.addEventListener('click', function(){
        if (fav.closest('.swiper-slide').hasAttribute('data-art')){
  
          let dataArt = fav.closest('.swiper-slide').getAttribute('data-art')
          console.log(dataArt);
  
  
          if (favlist.includes(data.data[dataArt].title) == false){
          // if (Object.values(favList).indexOf('test1') < -1) {


            console.log(favlist.includes(data.data[dataArt].title));
            fav.innerHTML = `<i class="fa-solid fa-heart"></i>`
  
            favListHtml.innerHTML += `
            <div class="fav-list" data-art2="${dataArt}">
              <button class="delete">X</button>
              <div class="art-name">${data.data[dataArt].title}</div>
            </div>
          `
            // favlist.create({artName : `${data.data[dataArt].title}`,  listNbr : `${dataArt}`})
            favlist.push( {'artName' : `${data.data[dataArt].title}`,  'listNbr' : `${dataArt}`})

          } else {
            if (fav.classList.contains('.add-to-fav')){
              fav.innerHTML = `<i class="fa-regular fa-heart"></i>`
            }
          }
        }
        console.log(favlist);

      })
    });




    // delete from fav List =-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=--=

    let Xbutton = document.querySelector('.delete')    

    addEventListener('click', function(e){
      if (e.target.classList.contains("delete")) {
        let dataArt2 = e.target.closest('.fav-list').getAttribute('data-art2')
        
        console.log(dataArt2);
        // Obj.hasOwnProperty() -> true/false
        // console.log(favlist[listNbr])

        if (favlist.hasOwnProperty('listNbr') == true) {
          console.log(favlist['listNbr'] + "==" + dataArt2);
        } else {
          console.log(`nope`);
        }

        if (e.target.parentElement.hasAttribute('data-art2')){
          e.target.parentElement.remove()
        }
      }

      // deleteButton.parentElement.remove()
      // deleteButton.parentElement.
      
      // // delete un item random de l'Array, comme ca on sais quand la liste est vide et doitramener le message 'liste de course vide' dans liste
      // nameNbrItems.splice(0, 1)
      
      // // ramene message 'liste de course vide' si nameNbrItems est vide
      // if (nameNbrItems.length == 0){
      //   console.log(`list is empty! ${nameNbrItems.length}`);
      //   document.querySelector('.vide').classList.remove("remove")
      // }
    })




  })
  .catch(error => {console.log("Erreur lors de la récup des données :", error);
  
  })
  
}
onlyArts()


// Go back to first slide button =--=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=--=-=-=
let backTop = document.querySelector('.back-up')
backTop.addEventListener('click', function () {
  swiper.slideTo(0)
  console.log('return to top');
})


// Page Navigation =--=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=--==--=-=-=-=-=-=-=-=
nextPage.addEventListener('click', function (){
  swiperWrapper.innerHTML = ''
  pageNbr++
  onlyArts(pageNbr)
})
prevPage.addEventListener('click', function (){
  swiperWrapper.innerHTML = ''
  pageNbr--
  onlyArts(pageNbr)
})

nextPageSelect.addEventListener('click', function () {
  swiperWrapper.innerHTML= ''
  onlyArts(1247)
})

pageSelect.addEventListener('keypress', function (e){
  if (e.key === 'Enter') {
    swiperWrapper.innerHTML = ""
    pageNbr = pageSelect.value
    pageSelect.value = ""
    onlyArts(pageNbr)
  }
})

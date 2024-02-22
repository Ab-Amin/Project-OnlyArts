let swiper = new Swiper(".mySwiper", {
  direction: "vertical",
  slidesPerView: 1,
  mousewheel: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
// key = tiondernse

// processEuropeanaSearch({
//   "apikey":"tiondernse",
//   "action":"record.json",
//   "success":true,
//   "statsDuration":22,
//   "requestNumber":8,
// })

// image --> https://www.artic.edu/iiif/2 + image_id + /full/843,/0/default.jpg

/*fetch(`https://api.artic.edu/api/v1/artworks?page=1&limit=100`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {console.log("Erreur lors de la récup des données :", error);
}*/
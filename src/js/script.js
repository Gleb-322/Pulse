/* slick slider */
// $(document).ready(function(){
//     $('.carousel__inner').slick({
//         speed: 1200,
//         // adaptiveHeight: true,
//         prevArrow: '<button type="button" class="slick-prev"><img src="icons/chevron-left-solid.svg"></button>',
//         nextArrow: '<button type="button" class="slick-next"><img src="icons/chevron-right-solid.svg"></button>',
//         responsive: [
//             {
//                 breakpoint: 992,
//                 settings: {
//                   dots: true,
//                   arrows: false
//                 }
//             }
//         ]
//       });
//   });


/* tiny slider */
const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: false,
    // responsive: {

    // }
});

document.querySelector('.prev').addEventListener ('click', function () {  /* document.querySelector('.prev') обращение к первому элементу на странице с классом .prev */
    slider.goTo('prev');
});

document.querySelector('.next').addEventListener ('click', function () {  /* document.querySelector('.prev') обращение к первому элементу на странице с классом .prev */
    slider.goTo('next');
});
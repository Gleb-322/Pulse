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
    nav: true,
    navPosition: "bottom",
    controls: false,
    preventScrollOnTouch: "force"
});

document.querySelector('.prev').addEventListener ('click', function () {  /* document.querySelector('.prev') обращение к первому элементу на странице с классом .prev */
    slider.goTo('prev');
});

document.querySelector('.next').addEventListener ('click', function () {  /* document.querySelector('.prev') обращение к первому элементу на странице с классом .prev */
    slider.goTo('next');
});

$(document).ready(function() { /* универсальный скрипт для табов */
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });


    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__block').eq(i).toggleClass('catalog-item__block_active');
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__block__back');

    // Modal 
    /* fadeOut(); позволяет анимированно скрыть какие-то элементы на странице */
    $('[data-modal="consultation"]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    }); 
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });
    
    /* each(function(i)) перебор по всем элементам с этим тегом*/
    /* .text() получает текст которые есть внутри .modal__descr , .text('eewfwf') заменяет текст в .modal__descr на то что в скобках*/
    /* eq(i) позволяет получать определенный элемент по порядку */
    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        })
    });
    /* валидация форм заполнения */
    /* validate() работает для первой формы в feed-form , поэтому используют обращение по уникальному индификатору*/
    /* ('#consultation form') если есть уже индификатор, то чтобы обратиться к нужному блоку можно использовать вложенность элементов */
    
    function validateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 4
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите {0} символа!")
                },
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                    required: "Пожалуйста, введите свою почту",
                    email: "Неправильно введен адрес почты"
                }
            }
        });
    }
     
    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    /* маска ввода , этот плагин не воспринимает type в html*/
    $('input[name=phone]').mask("+34(999) 999-999");

    /* отправка писем с помощью локального сервера 
    submit() это и есть сама отправка
    e.preventDefault(); - отмена стандартного действия браузера
    $.ajax - метод отправки данных на сервер!
    type: "POST" настраиваю на то что я хочу стелать, отдать серверу или получить с сервера данные, в данном случае отдавать данные "POST"
    url: "mailer/smart.php" - здесь мы говорим какой обработчик будет делать все это, куда будем отправлять наш запрос
    data: $(this).serialize() - тут прописываю те данные которые я хочу отправить на сервер
    .done(function() { - обрабатываем ответ от сервера!
        $(this).find("input").val(""); - после отправки формы очистим все инпуты
        $('form').trigger('reset'); - этот метод очищает все формы
    });*/
    
    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
            $('form').trigger('reset');
        });
        return false;
    });

    // скрол по всей странице smooth scroll and pageup
    // если во время прокрутки значение пикселей сверху от страницы в браузере привысило 1600 то появляется стрелка

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });
    // универсальный скрипт плавной прокрутки
    $("a[href='#up']").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    new WOW().init();

});

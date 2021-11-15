jQuery('document').ready(function($){
    var menu_icon = $('#menu-icon'),
        menu = $('.navigation ul');

    menu_icon.click(function(){
        if ( menu.hasClass('show') ) {
            menu.removeClass('show');
        } else {
            menu.addClass('show');
        }
    })


    $('.main').css({
        height:$(window).height(),
        width:$(window).width()
    });

	$(window).resize(function(){
        $('.main').css({
            height:$(window).height(),
            width:$(window).width()
        });
    });

    var typed = new Typed('.typed', {
        strings: [
            'FRONTEND',
            'BACKEND',
            'FRONTEND'
        ],
        typeSpeed: 100,
        backSpeed: 60,
        backDelay: 2000,
        loop: true,
    })


})

document.getElementById("year").innerHTML = new Date().getFullYear();

const sliders = document.querySelector(".carouselbox")
var scrollPerClick
var ImagePadding = 20

showData()
var scrollAmount = 0;

function sliderLeft () {
    sliders.scrollTo({
        top: 0,
        left: (scrollAmount -= scrollPerClick),
        behavior: "smooth"
    })

    if ( scrollAmount < 0 ){
        scrollAmount = 0
    }
}

function sliderRight () {
    if ( scrollAmount <= sliders.scrollWidth - sliders.clientWidth ){
        sliders.scrollTo({
            top: 0,
            left: (scrollAmount += scrollPerClick),
            behavior: "smooth"
        })
    }
}

function showData () {

    var logos = [
        "./img/css.png",
        "./img/php.png" ,
        "./img/laravel.png",
        "./img/angular.png",
        "./img/java.png",
        "./img/js.png" ,
        "./img/python.png",
        "./img/html.png"
    ]
    logos.map( function ( logo, index )  {
        sliders.insertAdjacentHTML(
            "beforeend",
            `<img class="img-${index}"  src="${logo}" alt="" ></img>`
        )
    })

    scrollPerClick = 420
    // scrollPerClick = document.querySelector(".img-1").clientWidth + ImagePadding

}



// select()
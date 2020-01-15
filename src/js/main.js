





var footer = $('.hero');
var footerTop = footer.offset().top;
$(window).bind('scroll', function () {
  var windowTop = $(this).scrollTop();
  if (windowTop > footerTop) {
    $('#map').html(`<script src="https://api-maps.yandex.ru/2.1/?apikey=9f8323ef-e27b-4e4b-89ea-47fb0a6dcc52&lang=ru_RU" type ="text/javascript"></script>`);

    $(window).unbind('scroll');
    setTimeout(() => {
      ymaps.ready(function () {
        var myMap = new ymaps.Map('map', {
            center: [51.146348, 71.389538],
            zoom: 18
          });
          destinations = {
              'QSI': [51.146348, 71.389538],
              'Дворец «Жастар»': [51.170107, 71.427752],
              'Тарлан АРЕНА': [51.151359, 71.454036],
              'Ташенова 16А': [51.149851, 71.438361]
            },

            $('.map-link').on('click', function (e) {
              e.preventDefault();

              var pos = $(this).data('map');

              console.log(pos);

              // переходим по координатам
              myMap.panTo(destinations[pos], {
                flying: 1
              });
            });


          var myPlacemark = new ymaps.Placemark(destinations['QSI'], {

          }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/map.svg',
            iconImageSize: [30, 30],
            iconImageOffset: [-50, -50],
          });
          

          myMap.geoObjects
            .add(myPlacemark);
          }
      );
    }, 1500)
  }
});
  

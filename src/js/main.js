$(document).ready(function () {
  var modal = $('.modal'),
    modalBtn = $('[data-toggle=modal]'),
    closeBtn = $('.modal__close'),
    windowModal = $('.window'),
    closeWBtn = $('.window__close'),
    modalRemove = function () {
      modal.toggleClass('modal_visible');
    };

  modalBtn.on('click', function (e) {
    modal.toggleClass('modal_visible');
  });
  closeBtn.on('click', function (e) {
    modal.toggleClass('modal_visible');
  });
  closeWBtn.on('click', function (e) {
    windowModal.toggleClass('window_visible');
  });


  $(document).on('click', function (e) {
    if (modal.is(e.target)) {
      modal.toggleClass('modal_visible');
    }
  });
  $(document).on('click', function (e) {
    if (windowModal.is(e.target)) {
      windowModal.toggleClass('window_visible');
    }
  });
  var footer = $('.header');
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
        });
      }, 1500)
    }
  });

  $('[type=tel]').mask('+7(000) 000-00-00', {
    placeholder: "+7(___) ___-__-__"
  });

  $('.modal__form').validate({
    errorClass: "invalid",
    rules: {
      // строчное правило
      policy: {
        required: true,
      },
      userName: {
        required: true,
        minlength: 2,
        maxlength: 15
      },
      userPhone: {
        required: true,
        minlength: 10,

      },
      // правило-объект
      userEmail: {
        required: true,
        email: true
      }
    }, // сообщения
    errorElement: "div",
    messages: {
      policy: {
        required: "подтвердите обработку данных",
      },
      userName: {
        required: "Заполните поле",
        minlength: "Имя не короче двух букв",
        maxlength: "Имя не больше 15 букв"
      },
      userPhone: {
        required: "Неправильный номер",
        minlength: " Введите телефон корректно",
      },
      userEmail: {
        required: "Заполните поле",
        email: "Введите корректный email"
      }
    },


    submitHandler: function (form) {
      $.ajax({
        type: "POST",
        url: "send.php",
        data: $(form).serialize(),
        success: function (response) {
          $(form)[0].reset();
          modal.removeClass('modal_visible');
          windowModal.toggleClass('window_visible');
          ym('65028103', 'reachGoal', 'form');
          return true;
        }
      });
    },

  });

  $('.header__form').validate({
    errorClass: "invalid",
    rules: {

      // строчное правило
      userName: {
        required: true,
        minlength: 2,
        maxlength: 15
      },
      userPhone: {
        required: true,
        minlength: 10,

      },
      // правило-объект
      userQuestion: {
        required: true,
        minlength: 5,
        maxlength: 40
      }
    }, // сообщения
    errorElement: "div",
    messages: {
      policy: {
        required: "подтвердите обработку данных",
      },
      userName: {
        required: "Заполните поле",
        minlength: "Имя не короче двух букв",
        maxlength: "Имя не больше 15 букв"
      },
      userPhone: {
        required: "Неправильный номер",
        minlength: " Введите телефон корректно",
      },

    },

    submitHandler: function (form) {
      $.ajax({
        type: "POST",
        url: "send.php",
        data: $(form).serialize(),
        success: function (response) {

          $(form)[0].reset();
          windowModal.toggleClass('window_visible');
          ym('65028103', 'reachGoal', 'form');
          return true;
        }

      });
    }
  });

  $('.question__form').validate({
    errorClass: "invalid",
    rules: {

      // строчное правило
       policy: {
         required: true,
       },
      userName: {
        required: true,
        minlength: 2,
        maxlength: 15
      },
      userPhone: {
        required: true,
        minlength: 10,

      }, // правило-объект
      userEmail: {
        required: true,
        email: true
      },
      // правило-объект
      userQuestion: {
        required: true,
        minlength: 5,
        maxlength: 40
      }
      
    }, // сообщения
    errorElement: "div",
    messages: {
      policy: {
        required: "галочка",
      },
      userName: {
        required: "Заполните поле",
        minlength: "Имя не короче двух букв",
        maxlength: "Имя не больше 15 букв"
      },
      userPhone: {
        required: "Заполните поле",
        minlength: " Введите телефон корректно",
      },
       userEmail: {
         required: "Заполните поле",
         email: "Введите email"
       },
      userQuestion: {
        required: "Заполните поле",
        minlength: "Не короче 5 букв",
        maxlength: "Не больше 40 букв"
      }
    },
    errorPlacement: function (error, element) {
      if (element.attr("type") == "checkbox") {
        return element.next('label').append(error);
      }

      error.insertAfter($(element));
    },
    submitHandler: function (form) {
      $.ajax({
        type: "POST",
        url: "send.php",
        data: $(form).serialize(),
        success: function (response) {

          $(form)[0].reset();
          windowModal.toggleClass('window_visible');
          ym('65028103', 'reachGoal', 'form');
          return true;
        }

      });
    }
  });
  // маска для телефона







});

const buttonlist = document.querySelector('.logo__city');
buttonlist.addEventListener('click', function () {
  buttonlist.classList.toggle('show')
});
const buttonfooter = document.querySelector('.logo__city_footer');
buttonfooter.addEventListener('click', function () {
  buttonfooter.classList.toggle('show')
});
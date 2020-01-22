$(document).ready(function () {
  var modal = $('.modal'),
      groupmodal = $('.modalgroup'),
      abonomentmodal = $('.modalabonoment'),
    modalBtn = $('[data-toggle=modal]'),
    modalBtnAbonement = $('[data-toggle=modalabonoment]'),
    modalBtnGroup = $('[data-toggle=modalgroup]'),
    closeBtn = $('.modal__close'),
    closeBtnAbonement = $('.modalabonoment__close'),
    closeBtnGroup = $('.modalgroup__close'),
    windowModal = $('.window'),
    closeWBtn = $('.window__close'),
    text = $('.news__text'),
    column = $('.news__board'),
    columnbtn = $('.newcolumn'),
    modalRemove = function () {
      modal.toggleClass('modal_visible');
    };
  columnbtn.on('click', function (e) {
    column.toggleClass('grid');
    text.toggleClass('.text');
  });
  modalBtnAbonement.on('click', function (e) {
    abonomentmodal.toggleClass('modalabonoment_visible');
  });
  modalBtnGroup.on('click', function (e) {
     groupmodal.toggleClass('modalgroup_visible');
  });
  modalBtn.on('click', function (e) {
    modal.toggleClass('modal_visible');
  });
  closeBtn.on('click', function (e) {
    modal.toggleClass('modal_visible');
  });
  closeBtnAbonement.on('click', function (e) {
    abonomentmodal.toggleClass('modalabonoment_visible');
  });
  closeBtnGroup.on('click', function (e) {
     groupmodal.toggleClass('modalgroup_visible');
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
          var mytwoPlacemark = new ymaps.Placemark(destinations['Дворец «Жастар»'], {

          }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/map.svg',
            iconImageSize: [30, 30],
            iconImageOffset: [-50, -50],
          });
          var mythreePlacemark = new ymaps.Placemark(destinations['Тарлан АРЕНА'], {

          }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/map.svg',
            iconImageSize: [30, 30],
            iconImageOffset: [-50, -50],
          });
          var myfourPlacemark = new ymaps.Placemark(destinations['Ташенова 16А'], {

          }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/map.svg',
            iconImageSize: [30, 30],
            iconImageOffset: [-50, -50],
          });

           myMap.behaviors
             // Отключаем часть включенных по умолчанию поведений:
             //  - drag - перемещение карты при нажатой левой кнопки мыши;
             //  - magnifier.rightButton - увеличение области, выделенной правой кнопкой мыши.
             .disable(['rightMouseButtonMagnifier', 'scrollZoom'])
             // Включаем линейку.
             .enable('ruler');

           // Изменяем свойство поведения с помощью опции:
           // изменение масштаба колесом прокрутки будет происходить медленно,
           // на 1/2 уровня масштабирования в секунду.
           myMap.options.set('scrollZoomSpeed', 0.5);
           myMap.geoObjects
             .add(myPlacemark);
            myMap.geoObjects
             .add(mytwoPlacemark);
            myMap.geoObjects
              .add(mythreePlacemark);
            myMap.geoObjects
              .add(myfourPlacemark);
            
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
        required: "Ваше имя",
        minlength: "Ваше имя",
        maxlength: "Ваше имя"
      },
      userPhone: {
        required: "Неправильный номер",
        minlength: "Неправильный номер",
      },
      userEmail: {
        required: "Введите email",
        email: "Введите email"
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
  $('.modalabonoment__form').validate({
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
        required: "Ваше имя",
        minlength: "Ваше имя",
        maxlength: "Ваше имя"
      },
      userPhone: {
        required: "Неправильный номер",
        minlength: "Неправильный номер",
      },
      userEmail: {
        required: "Введите email",
        email: "Введите email"
      }
    },


    submitHandler: function (form) {
      $.ajax({
        type: "POST",
        url: "send.php",
        data: $(form).serialize(),
        success: function (response) {
          $(form)[0].reset();
          abonomentmodal.removeClass('modalabonoment_visible');
          windowModal.toggleClass('window_visible');
          ym('65028103', 'reachGoal', 'form');
          return true;
        }
      });
    },

  });
  $('.modalgroup__form').validate({
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
        required: "Ваше имя",
        minlength: "Ваше имя",
        maxlength: "Ваше имя"
      },
      userPhone: {
        required: "Неправильный номер",
        minlength: "Неправильный номер",
      },
      userEmail: {
        required: "Введите email",
        email: "Введите email"
      }
    },


    submitHandler: function (form) {
      $.ajax({
        type: "POST",
        url: "send.php",
        data: $(form).serialize(),
        success: function (response) {
          $(form)[0].reset();
          groupmodal.removeClass('modalgroup_visible');
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
        required: "Ваше имя",
        minlength: "Ваше имя",
        maxlength: "Ваше имя"
      },
      userPhone: {
        required: "Неправильный номер",
        minlength: "Неправильный номер",
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
        required: "Ваше имя",
        minlength: "Ваше имя",
        maxlength: "Ваше имя"
      },
      userPhone: {
        required: "Ваш телефон",
        minlength: "Ваш телефон",
      },
       userEmail: {
         required: "Введите email",
         email: "Введите email"
       },
      userQuestion: {
        required: "Ваш вопрос",
        minlength: "Ваш вопрос",
        maxlength: "Ваш вопрос"
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

$(".button-burger").click(function () {
  $(this).closest("body").toggleClass("active");
});
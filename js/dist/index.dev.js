"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// prayer times
var prayerTimesBox = document.querySelectorAll(".box p");

function getPrayerTimes() {
  var convertTo12Hour, responsee, _data, timings;

  return regeneratorRuntime.async(function getPrayerTimes$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;

          // تحويل الوقت من 24 ساعة إلى 12 ساعة
          convertTo12Hour = function convertTo12Hour(time) {
            var _time$split$map = time.split(":").map(Number),
                _time$split$map2 = _slicedToArray(_time$split$map, 2),
                hours = _time$split$map2[0],
                minutes = _time$split$map2[1];

            var period = hours >= 12 ? "م" : "ص"; // تحديد AM أو PM

            hours = hours % 12 || 12; // تحويل 0 إلى 12

            return "".concat(hours, ":").concat(minutes, " ").concat(period);
          }; // عرض البيانات في الصفحة


          _context.next = 4;
          return regeneratorRuntime.awrap(fetch("https://api.aladhan.com/v1/timingsByCity?city=Cairo&country=Egypt&method=5"));

        case 4:
          responsee = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(responsee.json());

        case 7:
          _data = _context.sent;
          timings = _data.data.timings;
          prayerTimesBox.forEach(function (box) {
            if (box.classList.contains("one")) {
              box.textContent = "".concat(convertTo12Hour(timings.Fajr));
            } else if (box.classList.contains("two")) {
              box.textContent = "".concat(convertTo12Hour(timings.Dhuhr));
            } else if (box.classList.contains("three")) {
              box.textContent = "".concat(convertTo12Hour(timings.Asr));
            } else if (box.classList.contains("four")) {
              box.textContent = "".concat(convertTo12Hour(timings.Maghrib));
            } else {
              box.textContent = "".concat(convertTo12Hour(timings.Isha));
            }
          });
          _context.next = 14;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
}

getPrayerTimes(); // Azkar

var azkar1 = document.getElementById("azkar1");
var azkar2 = document.getElementById("azkar2");
var azkar3 = document.getElementById("azkar3");
var azkar4 = document.getElementById("azkar4");
var azkar5 = document.getElementById("azkar5");
var azkar6 = document.getElementById("azkar6");
var azkarcontent = document.getElementById("azkar-content");
var azkartitle = document.getElementById("azkar-title");
var numberOfRepetition = document.getElementById("numberOfRepetition");
var number = document.getElementById("number");
var number1 = document.getElementById("number1");
var previous = document.getElementById("previous");
var next = document.getElementById("next");
var data = {};
var AzkarTobeDisplayed;
var count = 0; // تحميل البيانات من ملف JSON

document.addEventListener("DOMContentLoaded", function _callee() {
  var data;
  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(fetch("./azkar.json"));

        case 2:
          data = _context2.sent;
          _context2.next = 5;
          return regeneratorRuntime.awrap(data.json());

        case 5:
          data = _context2.sent;
          azkar = {
            morning: data["أذكار الصباح"],
            night: data["أذكار المساء"],
            sleep: data["أذكار النوم"],
            pray: data["أذكار بعد السلام من الصلاة المفروضة"],
            wakeup: data["أذكار الاستيقاظ"],
            ayat: data["ايه الكرسي والمعوذتين"]
          };

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // فتح اذكار الصباح عند تحميل الصفحة

window.onload = function () {
  AzkarTobeDisplayed = azkar.morning;
  azkartitle.innerHTML = "اذكار الصباح";
  number1.innerHTML = AzkarTobeDisplayed.length;
  updatezkr(); // فتح الادعية عند تحميل الصفحة

  hadithTobeDisplayed = hadith.seer;
  hadithtitle.innerHTML = "السيرة النبوية";
  number11.innerHTML = hadithTobeDisplayed.length;
  updatehadith();
}; // عرض الاذكار داخل الصفحة


azkar1.addEventListener("click", function () {
  AzkarTobeDisplayed = azkar.morning;
  azkartitle.innerHTML = "اذكار الصباح";
  number1.innerHTML = AzkarTobeDisplayed.length;
  updatezkr();
});
azkar2.addEventListener("click", function () {
  AzkarTobeDisplayed = azkar.wakeup;
  azkartitle.innerHTML = "اذكار الاستيقاظ";
  number1.innerHTML = AzkarTobeDisplayed.length;
  updatezkr(count);
});
azkar3.addEventListener("click", function () {
  AzkarTobeDisplayed = azkar.pray;
  azkartitle.innerHTML = "اذكار بعد الصلاة";
  number1.innerHTML = AzkarTobeDisplayed.length;
  updatezkr(count);
});
azkar4.addEventListener("click", function () {
  AzkarTobeDisplayed = azkar.night;
  azkartitle.innerHTML = "اذكار المساء";
  number1.innerHTML = AzkarTobeDisplayed.length;
  updatezkr(count);
});
azkar5.addEventListener("click", function () {
  AzkarTobeDisplayed = azkar.sleep;
  azkartitle.innerHTML = "اذكار النوم";
  number1.innerHTML = AzkarTobeDisplayed.length;
  updatezkr(count);
});
azkar6.addEventListener("click", function () {
  AzkarTobeDisplayed = azkar.ayat;
  azkartitle.innerHTML = "اَيه الكرسي والمعوذتين";
  number1.innerHTML = AzkarTobeDisplayed.length;
  updatezkr(count);
});
next.addEventListener("click", function () {
  if (count < AzkarTobeDisplayed.length - 1) {
    count++;
    updatezkr();
  }
});
previous.addEventListener("click", function () {
  if (count > 0) {
    count--;
    updatezkr();
  }
});

function updatezkr() {
  azkarcontent.innerHTML = AzkarTobeDisplayed[count].content;
  numberOfRepetition.innerHTML = AzkarTobeDisplayed[count].count;
  number.innerHTML = count + 1;
} // quran


var ul = document.getElementById("ul");
var ayat = document.getElementById("ayat");
var alsurah = document.getElementById("alsurah");
var countt = 0;

function quran() {
  var response, _data2, surahs, loadSurah;

  return regeneratorRuntime.async(function quran$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          loadSurah = function _ref(surahNumber) {
            fetch("https://api.alquran.cloud/v1/surah/".concat(surahNumber)).then(function (response) {
              return response.json();
            }).then(function (data) {
              var ayahs = data.data.ayahs;
              var filteredAyahs = ayahs.filter(function (ayah) {
                return !ayah.text.includes("بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ");
              });
              var ayahText = filteredAyahs.map(function (ayah) {
                return "<span class='ayah'>".concat(ayah.text, "<span class='ayah-number'>").concat(ayah.numberInSurah, "</span></span>");
              }).join(" ");
              ayat.innerHTML = ayahText;
            });
          };

          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(fetch("https://api.alquran.cloud/v1/surah"));

        case 4:
          response = _context3.sent;
          _context3.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          _data2 = _context3.sent;
          surahs = _data2.data;
          surahs.forEach(function (surah) {
            var listItem = document.createElement("li");
            var surahname = document.createElement("p");
            var numberofsurah = document.createElement("p");
            surahname.textContent = " ".concat(surah.name, " ");
            numberofsurah.textContent = " \u0622\u064A\u0629 ".concat(surah.numberOfAyahs, " ");
            listItem.addEventListener("click", function () {
              alsurah.textContent = surah.name;
              loadSurah(surah.number);
            });
            ul.appendChild(listItem);
            listItem.appendChild(numberofsurah);
            listItem.appendChild(surahname);
            loadSurah(1);
          });
          _context3.next = 14;
          break;

        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](1);

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 12]]);
}

quran(); // // اعمل كل واحدة من جدييييييد
// // Azkar

var hadith1 = document.getElementById("hadith1");
var hadith2 = document.getElementById("hadith2");
var hadith3 = document.getElementById("hadith3");
var hadith4 = document.getElementById("hadith4");
var hadithcontent = document.getElementById("hadith-content");
var hadithtitle = document.getElementById("hadith-title");
var numberr = document.getElementById("numberr");
var number11 = document.getElementById("number11");
var previouss = document.getElementById("previouss");
var nextt = document.getElementById("nextt");
var dataa = {};
var hadithTobeDisplayed;
var counttt = 0; // تحميل البيانات من ملف JSON

document.addEventListener("DOMContentLoaded", function _callee2() {
  var aaa;
  return regeneratorRuntime.async(function _callee2$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(fetch("./hadith.json"));

        case 2:
          aaa = _context4.sent;
          _context4.next = 5;
          return regeneratorRuntime.awrap(aaa.json());

        case 5:
          dataaa = _context4.sent;
          hadith = {
            seer: dataaa["seer"],
            sabr: dataaa["sabr"],
            zekr: dataaa["zekr"],
            abdat: dataaa["abdat"]
          };

        case 7:
        case "end":
          return _context4.stop();
      }
    }
  });
});

hadith1.onclick = function () {
  hadithTobeDisplayed = hadith.seer;
  hadithtitle.innerHTML = "السيرة النبوية";
  number11.innerHTML = hadithTobeDisplayed.length;
  updatehadith();
};

hadith2.onclick = function () {
  hadithTobeDisplayed = hadith.sabr;
  hadithtitle.innerHTML = "الصبر والاحتساب";
  number11.innerHTML = hadithTobeDisplayed.length;
  updatehadith(count);
};

hadith3.onclick = function () {
  hadithTobeDisplayed = hadith.zekr;
  hadithtitle.innerHTML = "الذكر والدعاء";
  number11.innerHTML = hadithTobeDisplayed.length;
  updatehadith(count);
};

hadith4.onclick = function () {
  hadithTobeDisplayed = hadith.abdat;
  hadithtitle.innerHTML = "العبادات";
  number11.innerHTML = hadithTobeDisplayed.length;
  updatehadith(count);
};

nextt.onclick = function () {
  if (counttt < hadithTobeDisplayed.length - 1) {
    counttt++;
    updatehadith();
  }
};

previouss.onclick = function () {
  if (counttt > 0) {
    counttt--;
    updatehadith();
  }
};

function updatehadith() {
  hadithcontent.innerHTML = hadithTobeDisplayed[counttt].name;
  numberr.innerHTML = counttt + 1;
} //


var ull = document.getElementById("ull");
var navv = document.getElementById("navv");

navv.onclick = function () {
  ull.classList.toggle("block");
};
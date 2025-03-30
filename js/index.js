// prayer times
let prayerTimesBox = document.querySelectorAll(".box p");

async function getPrayerTimes() {
  try {
    // استدعاء مواقيت الصلاة بتوقيت القاهرة
    const responsee = await fetch(
      "https://api.aladhan.com/v1/timingsByCity?city=Cairo&country=Egypt&method=5"
    );
    const data = await responsee.json();

    const timings = data.data.timings;

    // تحويل الوقت من 24 ساعة إلى 12 ساعة
    function convertTo12Hour(time) {
      let [hours, minutes] = time.split(":").map(Number);
      let period = hours >= 12 ? "م" : "ص"; // تحديد AM أو PM
      hours = hours % 12 || 12; // تحويل 0 إلى 12
      return `${hours}:${minutes} ${period}`;
    }

    // عرض البيانات في الصفحة
    prayerTimesBox.forEach((box) => {
      if (box.classList.contains("one")) {
        box.textContent = `${convertTo12Hour(timings.Fajr)}`;
      } else if (box.classList.contains("two")) {
        box.textContent = `${convertTo12Hour(timings.Dhuhr)}`;
      } else if (box.classList.contains("three")) {
        box.textContent = `${convertTo12Hour(timings.Asr)}`;
      } else if (box.classList.contains("four")) {
        box.textContent = `${convertTo12Hour(timings.Maghrib)}`;
      } else {
        box.textContent = `${convertTo12Hour(timings.Isha)}`;
      }
    });
  } catch (eror) {}
}

getPrayerTimes();

// Azkar
let azkar1 = document.getElementById("azkar1");
let azkar2 = document.getElementById("azkar2");
let azkar3 = document.getElementById("azkar3");
let azkar4 = document.getElementById("azkar4");
let azkar5 = document.getElementById("azkar5");
let azkar6 = document.getElementById("azkar6");
let azkarcontent = document.getElementById("azkar-content");
let azkartitle = document.getElementById("azkar-title");
let numberOfRepetition = document.getElementById("numberOfRepetition");
let number = document.getElementById("number");
let number1 = document.getElementById("number1");
let previous = document.getElementById("previous");
let next = document.getElementById("next");

let data = {};
let AzkarTobeDisplayed;
let count = 0;

// تحميل البيانات من ملف JSON
document.addEventListener("DOMContentLoaded", async () => {
  let data = await fetch("./azkar.json");
  data = await data.json();
  azkar = {
    morning: data["أذكار الصباح"],
    night: data["أذكار المساء"],
    sleep: data["أذكار النوم"],
    pray: data["أذكار بعد السلام من الصلاة المفروضة"],
    wakeup: data["أذكار الاستيقاظ"],
    ayat: data["ايه الكرسي والمعوذتين"],
  };
});

// فتح اذكار الصباح عند تحميل الصفحة
window.onload = function () {
  AzkarTobeDisplayed = azkar.morning;
  azkartitle.innerHTML = "اذكار الصباح";
  number1.innerHTML = AzkarTobeDisplayed.length;
  updatezkr();
  // فتح الادعية عند تحميل الصفحة
  hadithTobeDisplayed = hadith.seer;
  hadithtitle.innerHTML = "السيرة النبوية";
  number11.innerHTML = hadithTobeDisplayed.length;
  updatehadith();
};

// عرض الاذكار داخل الصفحة
azkar1.addEventListener("click", () => {
  AzkarTobeDisplayed = azkar.morning;
  azkartitle.innerHTML = "اذكار الصباح";
  number1.innerHTML = AzkarTobeDisplayed.length;
  updatezkr();
});

azkar2.addEventListener("click", () => {
  AzkarTobeDisplayed = azkar.wakeup;
  azkartitle.innerHTML = "اذكار الاستيقاظ";
  number1.innerHTML = AzkarTobeDisplayed.length;
  updatezkr(count);
});

azkar3.addEventListener("click", () => {
  AzkarTobeDisplayed = azkar.pray;
  azkartitle.innerHTML = "اذكار بعد الصلاة";
  number1.innerHTML = AzkarTobeDisplayed.length;
  updatezkr(count);
});

azkar4.addEventListener("click", () => {
  AzkarTobeDisplayed = azkar.night;
  azkartitle.innerHTML = "اذكار المساء";
  number1.innerHTML = AzkarTobeDisplayed.length;
  updatezkr(count);
});

azkar5.addEventListener("click", () => {
  AzkarTobeDisplayed = azkar.sleep;
  azkartitle.innerHTML = "اذكار النوم";
  number1.innerHTML = AzkarTobeDisplayed.length;
  updatezkr(count);
});

azkar6.addEventListener("click", () => {
  AzkarTobeDisplayed = azkar.ayat;
  azkartitle.innerHTML = "اَيه الكرسي والمعوذتين";
  number1.innerHTML = AzkarTobeDisplayed.length;
  updatezkr(count);
});

next.addEventListener("click", () => {
  if (count < AzkarTobeDisplayed.length - 1) {
    count++;
    updatezkr();
  }
});

previous.addEventListener("click", () => {
  if (count > 0) {
    count--;
    updatezkr();
  }
});

function updatezkr() {
  azkarcontent.innerHTML = AzkarTobeDisplayed[count].content;
  numberOfRepetition.innerHTML = AzkarTobeDisplayed[count].count;
  number.innerHTML = count + 1;
}

// quran
let ul = document.getElementById("ul");
let ayat = document.getElementById("ayat");
let alsurah = document.getElementById("alsurah");
let countt = 0;

async function quran() {
  try {
    const response = await fetch("https://api.alquran.cloud/v1/surah");
    const data = await response.json();
    const surahs = data.data;

    surahs.forEach((surah) => {
      const listItem = document.createElement("li");
      let surahname = document.createElement("p");
      let numberofsurah = document.createElement("p");
      surahname.textContent = ` ${surah.name} `;
      numberofsurah.textContent = ` آية ${surah.numberOfAyahs} `;

      listItem.addEventListener("click", () => {
        alsurah.textContent = surah.name;
        loadSurah(surah.number);
      });

      ul.appendChild(listItem);
      listItem.appendChild(numberofsurah);
      listItem.appendChild(surahname);

      loadSurah(1);
    });
  } catch (eror) {}

  function loadSurah(surahNumber) {
    fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}`)
      .then((response) => response.json())
      .then((data) => {
        let ayahs = data.data.ayahs;
        let filteredAyahs = ayahs.filter(
          (ayah) =>
            !ayah.text.includes("بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ")
        );
        let ayahText = filteredAyahs
          .map(
            (ayah) =>
              `<span class='ayah'>${ayah.text}<span class='ayah-number'>${ayah.numberInSurah}</span></span>`
          )
          .join(" ");
        ayat.innerHTML = ayahText;
      });
  }
}

quran();

// // اعمل كل واحدة من جدييييييد

// // Azkar
let hadith1 = document.getElementById("hadith1");
let hadith2 = document.getElementById("hadith2");
let hadith3 = document.getElementById("hadith3");
let hadith4 = document.getElementById("hadith4");
let hadithcontent = document.getElementById("hadith-content");
let hadithtitle = document.getElementById("hadith-title");
let numberr = document.getElementById("numberr");
let number11 = document.getElementById("number11");
let previouss = document.getElementById("previouss");
let nextt = document.getElementById("nextt");

let dataa = {};
let hadithTobeDisplayed;
let counttt = 0;

// تحميل البيانات من ملف JSON
document.addEventListener("DOMContentLoaded", async () => {
  let aaa = await fetch("./hadith.json");
  dataaa = await aaa.json();
  hadith = {
    seer: dataaa["seer"],
    sabr: dataaa["sabr"],
    zekr: dataaa["zekr"],
    abdat: dataaa["abdat"],
  };
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
}

//
let ull = document.getElementById("ull");
let navv = document.getElementById("navv");

navv.onclick = function () {
  ull.classList.toggle("block");
};

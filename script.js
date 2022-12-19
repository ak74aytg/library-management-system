const username = document.querySelector("#username");
const userpin = document.querySelector("#userpin");
const submit = document.querySelector("#subm");
const bookID = document.querySelector("#bookID");
const issueDuration = document.querySelector("#issueDuration");
const bookName = document.querySelector("#bookName");
const issueBook = document.querySelector(".submit-book");
let curUser = "a";
let curEl = document.querySelector("#homepage");
const extra = document.querySelector(".navbar-toggler");
const newExtra = document.querySelector(".collapse:not(.show)");

const iss = document.querySelector('.iss');
const ret = document.querySelector('.ret');
const dir = document.querySelector('.dir');
const log = document.querySelector('.log');

const issue = document.querySelector('#issue-sel');
const retun = document.querySelector('#return-sel');
const directory = document.querySelector('#directory-sel');

iss.addEventListener('click', ()=>{
  iss.classList.add('active');
  ret.classList.remove('active');
  dir.classList.remove('active');
  log.classList.remove('active');
})
issue.addEventListener('click', ()=>{
  iss.classList.add('active');
  ret.classList.remove('active');
  dir.classList.remove('active');
  log.classList.remove('active');
})
ret.addEventListener('click', ()=>{
  ret.classList.add('active');
  iss.classList.remove('active');
  dir.classList.remove('active');
  log.classList.remove('active');
})
retun.addEventListener('click', ()=>{
  ret.classList.add('active');
  iss.classList.remove('active');
  dir.classList.remove('active');
  log.classList.remove('active');
})
dir.addEventListener('click', ()=>{
  dir.classList.add('active');
  ret.classList.remove('active');
  iss.classList.remove('active');
  log.classList.remove('active');
})
directory.addEventListener('click', ()=>{
  dir.classList.add('active');
  ret.classList.remove('active');
  iss.classList.remove('active');
  log.classList.remove('active');
})
log.addEventListener('click', ()=>{
  log.classList.add('active');
  ret.classList.remove('active');
  dir.classList.remove('active');
  iss.classList.remove('active');
})

window.addEventListener("load", function () {
  newExtra.style.display = "none";
});

extra.addEventListener("click", function () {
  if (newExtra.style.display == "none") {
    newExtra.style.display = "block";
  } else {
    newExtra.style.display = "none";
  }
});



let database = {
  a: {
    pin: "1111",
    books: ["harry potter", "stranger"],
    bookid: ["1111", "2222"],
    issueFor: [31, 1],
    date: [new Date(), new Date()],
  },
};

const displayBooks = function () {
  for (i in database[curUser].books) {
    let date = new Date();
    let retDate = database[curUser].date[i];
    let rdate = new Date(retDate.getTime() + 5 * 24 * 60 * 60 * 1000);
    date = new Date();
    let fine =
      (date - rdate) / (1000 * 3600 * 24) > 0
        ? Math.abs((date - rdate) / (1000 * 3600 * 24))
        : 0;
    document.querySelector(".tble").insertAdjacentHTML(
      "beforeend",
      `<div class="col-sm-4 mb-5">
            <div class="card mb-3" style="max-width: 22rem">
                <div class="card-header h5">${database[curUser].bookid[i]}</div>
                <div class="card-body">
                    <h4 class="card-title">${database[curUser].books[i]}</h3>
                    <h6>ISSUE DATE</h6>
                    <p class="card-text">${database[curUser].date[i]}</p>
                    <h6>RETURN DATE</h6>
                    <p class="card-text">${rdate}</p>
                    <h6>FINE</h6>
                    <p class="card-text">${fine * 25}</p>
                </div>
            </div>
        </div>`
    );
  }
};

const clearDisplay = function () {
  document.querySelector(".tble").innerHTML = " ";
};

const isEmp = function (a) {
  if (!a.value) {
    return true;
  } else {
    return false;
  }
};

const handleLength = function (el) {
  if (el.value.length > 4) {
    el.value = el.value.slice(0, 4);
  }
};

document.querySelectorAll("input").forEach((el) =>
  el.addEventListener("input", function (e) {
    document
      .querySelectorAll(".popup")
      .forEach((el) => el.classList.add("hidden"));
  })
);

submit.addEventListener("click", function (e) {
  e.preventDefault();
  if (isEmp(username) || isEmp(userpin)) {
    document.querySelector(".err").classList.remove("hidden");
    return;
  }

  curUser = username.value;
  if (Object.keys(database).includes(username.value)) {
    if (database[curUser].pin !== userpin.value) {
      document.querySelector(".err").classList.remove("hidden");
      return;
    }
  } else {
    database[curUser] = {
      pin: `${userpin.value}`,
      books: [],
      bookid: [],
      issueFor: [],
      date: [],
    };
  }
  clearDisplay();
  displayBooks();
  document
    .querySelectorAll(".hidden-p")
    .forEach((el) => el.classList.remove("hidden"));
  displayManager(document.querySelector("#crud"));
  document.querySelectorAll("input").forEach((el) => (el.value = ""));
});

issueBook.addEventListener("click", function () {
  if (isEmp(bookID) && isEmp(issueDuration) && isEmp(bookName)) {
    document.querySelector(".err-issue").classList.remove("hidden");
    return;
  }
  if (issueDuration.value > 50 || issueDuration.value < 0) {
    document.querySelector(".err-issue").classList.remove("hidden");
    return;
  }
  database[curUser].books.push(`${bookName.value}`);
  database[curUser].bookid.push(`${bookID.value}`);
  database[curUser].issueFor.push(`${issueDuration.value}`);
  let date = new Date();
  database[curUser].date.push(date);
  clearDisplay();
  displayBooks();
  displayManager(document.querySelector("#crud"));
  document.querySelectorAll("input").forEach((el) => (el.value = ""));
  store();
});

userpin.addEventListener("input", function () {
  handleLength(userpin);
});
bookID.addEventListener("input", function () {
  handleLength(bookID);
});

document.querySelector(".submit-return").addEventListener("click", function () {
  if (
    !database[curUser].bookid.includes(
      document.querySelector("#returnId").value
    )
  ) {
    document.querySelector(".err-return").classList.remove("hidden");
    return;
  }
  let index = database[curUser].bookid.indexOf(returnId.value);
  ["bookid", "books", "issueFor", "date"].forEach((el) =>
    database[curUser][el].splice(index, 1)
  );
  document.querySelectorAll("input").forEach((el) => (el.value = ""));
  displayManager(document.querySelector("#crud"));
  document
    .querySelector(".return-form")
    .insertAdjacentHTML(
      "beforeend",
      `<p class="white popup">book submitted </p>`
    );
  store();
});

const displayManager = function (el) {
  curEl.classList.add("hidden");
  curEl = el;
  if (el == document.querySelector("#directory")) {
    clearDisplay();
    displayBooks();
  }
  curEl.classList.remove("hidden");
};

document.querySelector("#issue-sel").addEventListener("click", function () {
  displayManager(document.querySelector("#issue-form"));
});
document.querySelector("#return-sel").addEventListener("click", function () {
  displayManager(document.querySelector("#return-form"));
});
document.querySelector("#directory-sel").addEventListener("click", function () {
  displayManager(document.querySelector("#directory"));
});
document.querySelector("nav").addEventListener("click", function (e) {
  if (!e.target.dataset.page) return;
  displayManager(document.querySelector(e.target.dataset.page));
});

const store = function () {
  localStorage.setItem("data", JSON.stringify(database));
};
const localData = JSON.parse(localStorage.getItem("data"));
database = localData ? localData : database;
for (i in database) {
  for (j in database[i].date) {
    database[i].date[j] = new Date(database[i].date[j]);
  }
}
database["a"] = {
  pin: "1111",
  books: ["harry potter", "stranger"],
  bookid: ["1111", "2222"],
  issueFor: [31, 1],
  date: [new Date(), new Date()],
};

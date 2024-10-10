let siteName = document.getElementById("siteName");
let siteURL = document.getElementById("siteURL");
let submit = document.getElementById("submit");
let delete_all_btn = document.getElementById("DeleteAll");
let all_book_marks;

if (localStorage.book_Mark != null) {
  all_book_marks = JSON.parse(localStorage.book_Mark);
} else {
  all_book_marks = [];
}

// when the button is clicked it runs all the functions
submit.onclick = function () {
  let bookMarks = {
    siteName: siteName.value,
    siteURL: siteURL.value,
  };
  // if user input validate it will be stored to local storage
  if (checkSiteName() && isValidURL()) {
    all_book_marks.push(bookMarks);
    localStorage.setItem("book_Mark", JSON.stringify(all_book_marks));
    clear();
  }

  displayBookMarks();
};

// check site url value
function isValidURL() {
  try {
    new URL(siteURL.value);
    // siteURL.style.boxShadow = "0px 0px 15px 1px #4BB543";
    return true;
  } catch (e) {
    // siteURL.style.boxShadow = "0px 0px 14px 1px #c90000";
    return false;
  }
}

// check site name value add box shadow to name field
function checkSiteName() {
  if (siteName.value !== "" && siteName.value.trim().length > 2) {
    siteName.style.boxShadow = "0px 0px 15px 1px #4BB543";
    return true;
  } else if (siteName.value === "") {
    siteName.style.boxShadow = "none";
    return false;
  } else {
    siteName.style.boxShadow = "0px 0px 14px 1px #c90000";
    return false;
  }
}

//add box shadow to  url field
siteURL.onkeyup = function () {
  if (siteURL.value !== "" && isValidURL()) {
    siteURL.style.boxShadow = "0px 0px 15px 1px #4BB543";
  } else if (siteURL.value === "") {
    siteURL.style.boxShadow = "none";
  } else {
    siteURL.style.boxShadow = "0px 0px 14px 1px #c90000";
  }
};

// clears the input fields
function clear() {
  siteName.value = "";
  siteURL.value = "";
  siteName.style.boxShadow = "none";
  siteURL.style.boxShadow = "none";
}

// display the data in the table
function displayBookMarks() {
  let table = "";
  for (let i = 0; i < all_book_marks.length; i++) {
    table += `
        <tr>
            <td>${i + 1}</td>
            <td>${all_book_marks[i].siteName}</td>
            <td><button type="submit" onclick="window.open(all_book_marks[${i}].siteURL, '_blank');" id="visit"class="btn   px-3 rounded-pill  btn-style">visit</button></td>
            <td><button type="submit" id="delete" onclick="DeleteRow(${i})" class="btn   px-3 rounded-pill  btn-style">delete</button></td>
        </tr>
        `;
  }
  document.getElementById("tbody").innerHTML = table;

  // siteURL.value
  // all_book_marks[${i}].siteURL

  if (all_book_marks.length > 0) {
    delete_all_btn.innerHTML = `
    <button type="submit" onclick="DeleteAll()" class="btn  px-5 rounded-pill fs-4 mt-5 btn-style">Delete All</button>
    `;
  } else {
    delete_all_btn.innerHTML = "";
  }
}
displayBookMarks();

// delete a row
function DeleteRow(i) {
  all_book_marks.splice(i, 1);
  localStorage.book_Mark = JSON.stringify(all_book_marks);
  displayBookMarks();
}

// delete all rows
function DeleteAll() {
  all_book_marks.splice(0);
  localStorage.clear();
  displayBookMarks();
}

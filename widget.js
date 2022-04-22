"use strict";
lpTag.agentSDK.init({});

////////////////////////////////////////////////////////////////////////////
// Elements
const inputTitle = document.getElementById("input-movie");
const inputYear = document.getElementById("input-year");
const selectType = document.getElementById("select-type");
const message = document.getElementById("message");
const btnSearch = document.getElementById("search-btn");
const btnBack = document.getElementById("back-btn");

const boxSearch = document.getElementById("search-box");
const boxResult = document.getElementById("result-box");

const titleResult = document.getElementById("result-title");
const yearResult = document.getElementById("result-year");
const imgResult = document.getElementById("result-img");
const descResult = document.getElementById("result-description");

let data;
////////////////////////////////////////////////////////////////////////////
// Buttons
btnSearch.addEventListener("click", function (e) {
  e.preventDefault();
  if (inputTitle.value === "") {
    message.innerHTML = "Enter a valid title!";
    inputTitle.classList.add("invalid-movie");
  } else {
    const myKey = "af43f787";
    const url = `/?type=${encodeURIComponent(
      selectType.value
    )}&t=${encodeURIComponent(inputTitle.value)}&y=${encodeURIComponent(
      inputYear.value
    )}&apikey=${myKey}&`;

    // API
    axios({
      baseURL: "https://www.omdbapi.com/",
      url,
      method: "post",
      responseType: "json",
    }).then(function (res) {
      data = res.data;
      console.log(data);
      if ("Error" in data) {
        descResult.innerHTML = data.Error;
      } else {
        titleResult.innerHTML = data.Title;
        yearResult.innerHTML = data.Year;
        imgResult.src = data.Poster;
        descResult.innerHTML = `<b>Genre</b>: ${data.Genre}</br>
        <b>Country</b>: ${data.Country}</br>
        <b>Language</b>: ${data.Language}</br>
        <b>Director</b>: ${data.Director}</br>
        <b>Writer</b>: ${data.Writer}</br>
        <b>Actors</b>: ${data.Actors}</br>
        <b>Awards</b>: ${data.Awards}</br>
        </br>${data.Plot}`;
      }
    });

    // show Result box
    boxSearch.classList.add("inactive");
    boxResult.classList.remove("inactive");
  }
});

btnBack.addEventListener("click", function (e) {
  e.preventDefault();
  // go back to default settings
  message.innerHTML = "Click to search:";
  inputTitle.classList.remove("invalid-movie");
  inputTitle.value = "";
  inputYear.value = "";
  selectType.value = "movie";

  titleResult.innerHTML = "";
  yearResult.innerHTML = "";
  imgResult.src = "";
  descResult.innerHTML = "";

  // show Search box
  boxResult.classList.add("inactive");
  boxSearch.classList.remove("inactive");
});

////////////////////////////////////////////////////////////////////////////
// SDK
const updateCallback = function (data) {
  var newLine = data.newValue;
  console.log("nep line is", newLine);
  if (newLine[0].by == "Visitor") {
    console.log("new Visitor's line value", newLine[0].text);
  }
};

const notifyWhenDone = function (err) {
  if (err) {
    console.log(err);
  }
  console.log("set the value");
};

const pathToData = "chatTranscript.lines";
lpTag.agentSDK.bind(pathToData, updateCallback, notifyWhenDone);

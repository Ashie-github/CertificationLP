"use strict";
lpTag.agentSDK.init({});

let data;
let visitorsLine = "";
let movieMentioned = false;
let seriesMentioned = false;

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

////////////////////////////////////////////////////////////////////////////
// Showing API result
const showApiResult = function (type, title, year) {
  console.log("Inside of showApiResult function");

  const myKey = "af43f787";
  const url = year
    ? `/?type=${encodeURIComponent(type)}&t=${encodeURIComponent(
        title
      )}&y=${encodeURIComponent(year)}&apikey=${myKey}&`
    : `/?type=${encodeURIComponent(type)}&t=${encodeURIComponent(
        title
      )}&apikey=${myKey}&`;

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
};

////////////////////////////////////////////////////////////////////////////
// Buttons
btnSearch.addEventListener("click", function (e) {
  e.preventDefault();
  if (inputTitle.value === "") {
    message.innerHTML = "Enter a valid title!";
    inputTitle.classList.add("invalid-movie");
  } else {
    showApiResult(selectType.value, inputTitle.value, inputYear.value);
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
    visitorsLine = newLine[0].text;
    console.log("new Visitor's line value", visitorsLine);

    // calling API when previously visitor mentioned a movie or a series
    if (movieMentioned) {
      showApiResult("movie", visitorsLine);
    }
    if (seriesMentioned) {
      showApiResult("series", visitorsLine);
    }

    // setting up context for the next message
    // (nex msg will be the title of the movie or a title of a series?)
    if (visitorsLine.toLowerCase().includes("movie")) {
      movieMentioned = true;
      seriesMentioned = false;
      console.log("Movie mentioned!");
    } else if (visitorsLine.toLowerCase().includes("series")) {
      movieMentioned = false;
      seriesMentioned = true;
      console.log("Series mentioned!");
    } else {
      movieMentioned = false;
      seriesMentioned = false;
    }
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

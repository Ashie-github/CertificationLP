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
    // callApi(inputTitle.value, selectType.value, inputYear.value);
    // console.log("AFTER CALLING FUNCTION");
    // console.log(data);

    // //
    // titleResult.innerHTML = "Dune";
    // yearResult.innerHTML = "2021";
    // imgResult.src =
    //   "https://m.media-amazon.com/images/M/MV5BN2FjNmEyNWMtYzM0ZS00NjIyLTg5YzYtYThlMGVjNzE1OGViXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg";
    // descResult.innerHTML =
    //   "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset while its heir becomes troubled by visions of a dark future.";
    const myKey = "af43f787";
    const url = `/?type=${encodeURIComponent(
      selectType.value
    )}&t=${encodeURIComponent(inputTitle.value)}&y=${encodeURIComponent(
      inputYear.value
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
// // API
// async function callApi(title, type, year) {
//   const myKey = "af43f787";
//   const url = `/?type=${encodeURIComponent(type)}&t=${encodeURIComponent(
//     title
//   )}&y=${encodeURIComponent(year)}&apikey=${myKey}&`;

//   await axios({
//     baseURL: "http://www.omdbapi.com/",
//     url,
//     method: "post",
//     responseType: "json",
//   }).then(function (res) {
//     data = res.data;
//     console.log("IN FUNCTION");
//     console.log(data);
//   });
//   return await data;
// }

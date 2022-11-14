async function renderSuperhero(superheroName, superheroesWrapper) {
  superheroesData = await fetchSuperheroAPI(superheroName);

  const searchPagesEl = document.querySelector(".pages--wrapper");
  const pagesHTMLStr = pagesHTML(superheroesData.results.length / 6);
  searchPagesEl.innerHTML = pagesHTMLStr;

  let pages = Math.floor(superheroesData.results.length / 6);
  let pagesCount = 1;
  let superheroesRemStarPos = 0;
  let superheroesRem = superheroesData.results.length;
  let remaningSuperheroes = false;
  let counterRemainder = 0;

  try {
    for (let i = 0; i < superheroesData.results.length; i++) {
      if (pages >= 1) {
        let pageHTML = `<div class="superhero-page page-${pagesCount}">`;
        if (i % 5 == 0 || i == 0) {
          let iVal = i;
          if (counterRemainder == 0) {
            for (let x = iVal; x < iVal + 6; x++) {
              pageHTML += superheroHTML(superheroesData.results[x]);
            }
          } else {
            iVal = i + counterRemainder;
            for (let x = iVal; x < iVal + 6; x++) {
              pageHTML += superheroHTML(superheroesData.results[x]);
            }
          }
          pageHTML += `</div>`;
          pagesCount += 1;
          pages -= 1;
          superheroesWrapper.innerHTML += pageHTML;
          superheroesRemStarPos = iVal + 7;
          superheroesRem = superheroesData.results.length - (iVal + 6);
          remaningSuperheroes = true;
          counterRemainder += 1;
        }
      } else {
        if (superheroesRem != 0) {
          if (remaningSuperheroes == false) {
            for (
              let y = superheroesRemStarPos;
              y < superheroesRemStarPos + superheroesRem;
              y++
            ) {
              superheroesWrapper.innerHTML += superheroHTML(
                superheroesData.results[y]
              );
            }
          }
          else {
            for (
              let y = superheroesRemStarPos-1;
              y < superheroesRemStarPos + superheroesRem-1;
              y++
            ) {
              superheroesWrapper.innerHTML += superheroHTML(
                superheroesData.results[y]
              );
            }
          }
          
        }
        break;
      }
    }
  } catch (error) {
    console.log(error);
  }
}

async function fetchSuperheroAPI(superheroName) {
  const superheroes = await fetch(
    `https://www.superheroapi.com/api.php/1397871417408568/search/${superheroName}`
  );
  const superheroesData = await superheroes.json();
  return superheroesData;
}

function superheroSearch() {
  const input = document.querySelector(".search-bar");
  const superheroesWrapper = document.querySelector(".superheroes");
  superheroesWrapper.innerHTML = "";
  renderSuperhero(input.value, superheroesWrapper);
}

function superheroHTML(superhero) {
  return `<div class="superhero--wrapper">
            <div class="superhero">
                <figure class="superhero__img--wrapper">
                    <img src="${
                      superhero.image.url
                    }" alt="" class="superhero__img">
                </figure>
                <h3 class="superhero__name">${superhero.name}</h3>
                <div class="superhero__stats">
                    <h4 class="superhero__stat">Intelligence: ${superheroHTMLstat(
                      superhero.powerstats.intelligence
                    )}</h4>
                    <h4 class="superhero__stat">Strength: ${superheroHTMLstat(
                      superhero.powerstats.strength
                    )}</h4>
                    <h4 class="superhero__stat">Speed: ${superheroHTMLstat(
                      superhero.powerstats.speed
                    )}</h4>
                    <h4 class="superhero__stat">Durability: ${superheroHTMLstat(
                      superhero.powerstats.durability
                    )}</h4>
                    <h4 class="superhero__stat">Power: ${superheroHTMLstat(
                      superhero.powerstats.power
                    )}</h4>
                    <h4 class="superhero__stat">Combat: ${superheroHTMLstat(
                      superhero.powerstats.combat
                    )}</h4>
                </div>
            </div>
        </div>`;
}

function superheroHTMLstat(stat) {
  if (stat !== "null") {
    return stat;
  }
  return "0";
}

function toggalResultsOpen() {
  document.body.classList += " show-results";
}

function toggalResultsClose() {
  document.body.classList.remove("show-results");
}

async function resultsRender() {
  const inputEl = document.querySelector(".search-bar");
  superheroesData = await fetchSuperheroAPI(inputEl.value);

  const searchResultsEl = document.querySelector(".search-results");

  let resultsHTMLStr = "";

  try {
    for (let i = 0; i < 5; i++) {
      resultsHTMLStr += resultsHTML(superheroesData.results[i].name);
      searchResultsEl.innerHTML = resultsHTMLStr;
    }
  } catch (error) {
    console.log(error);
  }
}

function resultsHTML(superheroName) {
  return `<div class="search-result__suggestion">${superheroName}</div>`;
}

function pagesHTML(pagesNum) {
  pagesHTMLStr = `<button class="page page-button arrow-left"><<</button>`;

  let flooredPagesNum = Math.ceil(pagesNum);
  if (pagesNum > 1 && pagesNum < 6) {
    for (let i = 0; i < flooredPagesNum; i++) {
      // 3 pages if if then else. 2 pages if else. 1 page, none.
      if (i !== flooredPagesNum - 1) {
        pagesHTMLStr += `<button class="page page-button">${i + 1}</button>`;
      } else {
        pagesHTMLStr += `<button class="page page-last page-button">${
          i + 1
        }</button>`;
      }
    }
  }
  else if (pagesNum > 6) {
      
  }

  pagesHTMLStr += `<button class="page-button arrow-right">>></button>`;

  return pagesHTMLStr;
}

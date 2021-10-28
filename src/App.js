import logo from "./logo.svg";
import "./App.css";
import counter from "./performance/collectMetrics";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Performance homework</p>
        <button className="App-link" onClick={onClick}>
          Load planets
        </button>

        <div className="planets"></div>
      </header>
    </div>
  );

  function onClick() {
    let timeStart = Date.now();

    fetch("https://swapi.dev/api/planets")
      .then((response) => response.json())
      .then((data) => {
        counter.send("load", Date.now() - timeStart);
        drawData(data.results);
      })
      .catch((err) => console.error("couldn't fetch", err));
  }

  function drawData(planets) {
    let html = "",
      count = 500,
      genStart = Date.now();

    for (let i = 2; i < count; i++) {
      if (i < 10) {
        const img = `https://starwars-visualguide.com/assets/img/planets/${i}.jpg`;
        const name = planets[i].name;
        html += `<div class="row"><p>${name}</p><img
        class="planet-image"
        src=${img} /></div>`;
      }
    }
    counter.send("generate", Date.now() - genStart);

    let drawStart = Date.now();

    document.querySelector(".planets").innerHTML = html;

    requestAnimationFrame(function () {
      counter.send("draw", Date.now() - drawStart);
    });
  }
}

export default App;

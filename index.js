// === State ===
let parties = [];
let selectedParty;

// === Utility Functions ===
/** Updates state with all parties from the API */
const getParties = async () => {
  try {
    const response = await fetch(
      "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2507-Kevin/events"
    );
    const data = await response.json();
    parties = data.data;
    console.log(parties);
    // render();
    return parties;
  } catch (error) {
    console.error(error);
  }
};

/** Updates state with a single party from the API */
const getSingleParty = async (id) => {
  try {
    const response = await fetch(
      `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2507-Kevin/events/${id}`
    );
    const data = await response.json();
    selectedParty = data.data;
    render();
    return selectedParty;
  } catch (error) {
    console.error(error);
  }
};

// === Components ===
/** Artist name that shows more details about the artist when clicked */
const displayPartyBoxes = (party) => {
  const $li = document.createElement("li");
  const $a = document.createElement("a");
  $a.href = "#selected";
  $a.textContent = party.name;
  $li.append($a);

  $a.addEventListener("click", function (event) {
    event.preventDefault();
    console.log(party.id);
    getSingleParty(party.id);
    render();
  });
  return $li;
};

/** A list of names of all artists */
const displayParties = () => {
  const $ul = document.createElement("ul");
  for (const party of parties) {
    const $li = displayPartyBoxes(party);
    $ul.appendChild($li);
  }
  return $ul;
};

/** Detailed information about the selected artist */
const displayPartyDetails = () => {
  if (!selectedParty) {
    const $p = document.createElement("p");
    $p.textContent = "Please select a party to see details.";
    return $p;
  }

  const $section = document.createElement("section");
  $section.classList.add("details-container");
  const $h3 = document.createElement("h3");
  $h3.textContent = `${selectedParty.name} #${selectedParty.id}`;
  const $div = document.createElement("div");
  $div.innerHTML = `${selectedParty.date}<br><em>${selectedParty.location}`;
  const $p = document.createElement("p");
  $p.textContent = `${selectedParty.description}`;
  const $ul = document.createElement("ul");
  const $li1 = document.createElement("li");
  $li1.textContent = "Elisabeth Farrel";
  const $li2 = document.createElement("li");
  $li2.textContent = "Casper Rogahn";
  const $li3 = document.createElement("li");
  $li3.textContent = "Gisselle Ziemann";

  $section.appendChild($h3);
  $section.appendChild($div);
  $section.appendChild($p);
  $section.appendChild($ul);
  $ul.appendChild($li1);
  $ul.appendChild($li2);
  $ul.appendChild($li3);

  return $section;
};

// === Render ===
const render = () => {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Party Planner</h1>
    <main>
      <section>
        <h2>Upcoming Parties</h2>
        <PartiesList></PartiesList>
      </section>
      <section id="selected">
        <h2>Party Details</h2>
        <PartyDetails></PartyDetails>
      </section>
    </main>
  `;
  $app.querySelector("PartiesList").replaceWith(displayParties());
  $app.querySelector("PartyDetails").replaceWith(displayPartyDetails());
};

const init = async () => {
  await getParties();
  render();
};

init();

const urlParams = new URLSearchParams(window.location.search);
const countryName = urlParams.get("name"); // Extracting country name from URL
const singleMain = document.querySelector(".single-container");

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then((data) => {
    if (data[0]) {
      const countryData = data[0]; // The specific country data from the URL
      const img = countryData.flags.svg || "flag image";
      const name = countryData.name.common || "-";
      const region = countryData.region || "-";
      const capital = countryData.capital?.[0] || "-";
      const area = countryData.area ? countryData.area.toLocaleString() : "-";
      const currencies = countryData.currencies ? Object.values(countryData.currencies).map(curr => curr.name).join(", ") : "-";
      
      const bordersContainer = document.createElement("p");
      bordersContainer.innerHTML = "<b>Borders:</b> ";

      if (countryData.borders && countryData.borders.length > 0) {
        countryData.borders.forEach((borderCode) => {
          fetch(`https://restcountries.com/v3.1/alpha/${borderCode}`)
            .then((res) => res.json())
            .then((borderData) => {
              const borderCountryAnchor = document.createElement("a");
              borderCountryAnchor.innerText = borderData[0].name.common;
              borderCountryAnchor.href = `single.html?name=${borderData[0].name.common}`;
              borderCountryAnchor.className = "border-btn"; // Add a class for styling if needed
              bordersContainer.appendChild(borderCountryAnchor);
            });
        });
      } else {
        bordersContainer.innerHTML += "N/A";
      }

      singleMain.innerHTML = `
        <div class="single1">
          <img src="${img}" alt="Flag of ${name}">
        </div>
        <div class="single2">
          <h2><b>Name:</b> ${name}</h2>
          <p><b>Capital:</b> ${capital}</p>
          <p><b>Region:</b> ${region}</p>
          <p><b>Currencies:</b> ${currencies}</p>
          <p><b>Area:</b> ${area} sq km</p>
        </div>`;
        
      singleMain.querySelector(".single2").appendChild(bordersContainer);
    }
  })
  .catch((error) => console.error("Error fetching country data:", error));




  
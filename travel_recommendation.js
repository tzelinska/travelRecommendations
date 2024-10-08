
const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');

function searchDestination() {
    const input = document.getElementById('destinationInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    if (!input) {
        resultDiv.innerHTML = 'Please enter a keyword to search.';
        return;
    }

    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        let found = false;
        console.log(data);

        if (input === 'beach' || input === 'beaches') {
            found = true;
            console.log("beach detected")

            data.beaches.forEach(destination => {
                resultDiv.innerHTML += `<div>
                                            <img src="${destination.imageUrl}" alt="${destination.name}" />
                                            <h2>${destination.name}</h2>
                                            <p>${destination.description}</p>
                                        </div>`;
            });
        } else if (input === 'temple' || input === 'temples') {
            found = true;
            console.log("temple detected")

            data.temples.forEach(destination => {
                resultDiv.innerHTML += `<div>
                                            <img src="${destination.imageUrl}" alt="${destination.name}" />
                                            <h2>${destination.name}</h2>
                                            <p>${destination.description}</p>
                                        </div>`;
            });
        } else if (input === 'country' || input === 'countries') {
            found = true;
            console.log("country detected")
            data.countries.forEach(country => {

                    country.cities.forEach(destination => {
                        resultDiv.innerHTML += `<div>
                                                    <img src="${destination.imageUrl}" alt="${destination.name}" />
                                                    <h2>${destination.name}</h2>
                                                    <p>${destination.description}</p>
                                                </div>`;

                    })
                        
                });
        }
        if (!found) {
            resultDiv.innerHTML = 'Destination not found.';
        }

      })
      .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
      });
}

btnSearch.addEventListener('click', searchDestination);

document.getElementById('btnClear').addEventListener('click', function() {
    document.getElementById('result').innerHTML = '';
});

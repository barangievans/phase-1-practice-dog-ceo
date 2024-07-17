document.addEventListener("DOMContentLoaded", function() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";

    // Fetch dog images
    fetchDogImages(imgUrl);

    // Fetch all dog breeds
    fetch(breedUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const dogBreedsList = document.getElementById("dog-breeds");

            // Populate dog breeds list
            Object.keys(data.message).forEach(breed => {
                const listItem = document.createElement("li");
                listItem.textContent = breed;
                dogBreedsList.appendChild(listItem);
            });

            // Add event listener to breed dropdown
            const breedDropdown = document.getElementById("breed-dropdown");
            breedDropdown.addEventListener("change", function() {
                const selectedLetter = this.value;
                filterBreedsByLetter(selectedLetter);
            });
        })
        .catch(error => {
            console.error('Error fetching dog breeds:', error);
        });

    function fetchDogImages(imgUrl) {
        fetch(imgUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const dogImageContainer = document.getElementById("dog-image-container");

                data.message.forEach(imageUrl => {
                    const img = document.createElement("img");
                    img.src = imageUrl;
                    img.alt = "Dog Image";
                    dogImageContainer.appendChild(img);
                });
            })
            .catch(error => {
                console.error('Error fetching dog images:', error);
            });
    }

    function filterBreedsByLetter(letter) {
        const dogBreeds = document.querySelectorAll("#dog-breeds li");
        dogBreeds.forEach(breed => {
            const breedName = breed.textContent.toLowerCase();
            if (breedName.startsWith(letter)) {
                breed.style.display = "block"; // Show breeds starting with selected letter
            } else {
                breed.style.display = "none"; // Hide breeds that do not start with selected letter
            }
        });
    }
});

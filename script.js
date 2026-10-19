const apikey = "live_56CH1uSpdE076ssvIKBq7CA5aMzZUdUYTafJYuwP3aUzjDE2AEnYjjDGVfzGrhDm";
const btngen = document.getElementById("btn");
const breedselect = document.getElementById("breed-select");
const catimg = document.getElementById("cat-image");
const errormsg = document.getElementById("error-message");
const catInfo = document.getElementById("cat-info");
const breedName = document.getElementById("breed-name");
const breedTemperament = document.getElementById("breed-temperament");
const breedDescription = document.getElementById("breed-description");
btngen.addEventListener("click", async () => {
    btngen.disabled = true;
    btngen.innerText = "Loading.....";
    errormsg.style.display = "none";
    let url = "https://api.thecatapi.com/v1/images/search";
    const selectedbreed = breedselect.value;
    if (selectedbreed) {
        url += `?breed_ids=${selectedbreed}`;
    }
    try {
        const response = await fetch(url, {
            headers: {
                "x-api-key": apikey
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`); 
        }
        const data = await response.json();
        if (data.length > 0) {
            catimg.src = data[0].url;
            catimg.style.display = "block";
             if (data[0].breeds && data[0].breeds.length > 0) {
                const breed = data[0].breeds[0];
                
                breedName.innerText = breed.name;
                breedTemperament.innerText = `🧠 Temperament: ${breed.temperament}`;
                breedDescription.innerText = breed.description;
                
                catInfo.style.display = "block"; // Display description pane
            }
        }else {
            throw new Error("No images found for selected breed.");
        }
    } catch (error) {
        console.error("Fetch failure:", error);
        errormsg.innerText = "failed to load cat image please try again";
        errormsg.style.display = "block";
    } finally {
        btngen.disabled = false;
        btngen.innerText = "Get Cat Image";
    }
})
const apikey = "live_56CH1uSpdE076ssvIKBq7CA5aMzZUdUYTafJYuwP3aUzjDE2AEnYjjDGVfzGrhDm";
const btngen = document.getElementById("btn");
const breedselect = document.getElementById("breed-select");
const catimg = document.getElementById("cat-image");
const errormsg = document.getElementById("error-message");

const catnnfo = document.getElementById("cat-info");
const breedname = document.getElementById("breedname");
const breedang = document.getElementById("breeddang");
const breeddescription = document.getElementById("breeddescription");
btngen.addEventListener("click", async () => {
    btngen.disabled = true;
    btngen.innerText = "Loading.....";
    errormsg.style.display = "none";
    let url = "https://api.thecatapi.com/v1/images/search";const selectedbreed = breedselect.value;
    if (selectedbreed) {
        url += `?breed_ids=${selectedbreed}`;
    }
    try {
        const response = await fetch(url, {
            headers: {
                "x-api-key": apikey}
        });if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`); 
        }
        const data = await response.json();
        if (data.length > 0) {
            catimg.src = data[0].url;
            catimg.style.display = "block";
             if (data[0].breeds && data[0].breeds.length > 0) {
                const breed = data[0].breeds[0];
                
                breedname.innerText = breed.name;
                breedang.innerText = `behavious: ${breed.temperament}`;
                breeddescription.innerText = breed.description;
                
                catnnfo.style.display = "block";
            }
        }else {
            throw new Error("your breed not in info bro say another breed.");
        }
    } catch (error) {
        console.error("Fetch failure:", error);
        errormsg.innerText = "failed to load your stuff cat image please try again later hmm";
        errormsg.style.display = "block";
    } finally {
        btngen.disabled = false;
        btngen.innerText = "Get Cat Image";
    }
})
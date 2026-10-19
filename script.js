const apikey = "live_56CH1uSpdE076ssvIKBq7CA5aMzZUdUYTafJYuwP3aUzjDE2AEnYjjDGVfzGrhDm";
const url = "https://api.thecatapi.com/v1/images/search";
const btngen = document.getElementById("btn");
const img = document.querySelector("img");
btngen.addEventListener("click", async () => {
    try {
        const response = await fetch(url, {
            headers:{
                "x-api-key": apikey
            }
        })
        const data = await response.json();
        img.src = data[0].url;
    } catch (error) {
        console.log(error);
    }
})
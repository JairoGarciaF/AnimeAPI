import express from "express";	
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");	
app.use("/assets", express.static("assets"));


app.get("/", async (req, res) => {
    try {
        
        const quoteSrc = await axios.get("https://animechan.xyz/api/random");
        const quote = quoteSrc.data.quote;
        const name = quoteSrc.data.character;
        const imageSrc = await axios.get(`https://api.jikan.moe/v4/characters?q=${name}`);
        const imagerResult = imageSrc.data;
        const url = imagerResult.data[0].images.jpg.image_url;
        
        
        res.render("index.ejs", { 
            "url": url,
            "quote": quote,
            "name": name,
        });
    } catch (error) {
        console.error(error.message);
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
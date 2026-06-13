import { URLS} from "./urls.js";
import map from "./urls.js";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());



app.get('/health', (req, res) => {
    res.status(200).json({ message: "OK" });
});

app.get("/",(req,res)=>{
    res.send(map);
})



const id=setInterval(() => {
    URLS.forEach(url => {
        check(url);
    });
}, 1000 * 60*15);



async function check(url){
   fetch(url).then(update).catch(update);
}


function update(res){
    map[res.url]=res.status==200?"up":"down";
 console.log(map);
}


app.listen(3000, () => {
    console.log("Server started on port 3000");
});
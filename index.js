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
    console.log(map);
    res.send(map);
})



const id=setInterval(() => {
    URLS.forEach(url => {
        check(url);
    });
}, 10*60*1000);



async function check(url){
   fetch(url).then(update).catch(update);
}


function update(res){
    if(res.status===200){
        console.log(res.url);
        map.set(res.url,"up");
    }
    else{
        map.set(res.url,"down");
    }
}


app.listen(3000, () => {
    console.log("Server started on port 3000");
});
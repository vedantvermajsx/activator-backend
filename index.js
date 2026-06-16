import { URLS } from "./urls.js";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

const map = new Map();

app.get("/health", (req, res) => {
    res.status(200).json({ message: "OK" });
});

app.get("/", (req, res) => {
    console.log(Object.fromEntries(map));
    res.json(Object.fromEntries(map));
});

async function check(url) {
    try {
        const res = await fetch(url);

        if (res.status === 200) {
            console.log(`${url} is UP`);
            map.set(url, "up");
        } else {
            console.log(`${url} is DOWN`);
            map.set(url, "down");
        }
    } catch (err) {
        console.log(`${url} is DOWN`);
        map.set(url, "down");
    }
}

setInterval(() => {
    URLS.forEach((url) => {
        check(url);
    });
}, 1000*60*10);

app.listen(3000, () => {
    console.log("Server started on port 3000");
});

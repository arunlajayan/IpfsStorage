import express from "express";
import bodyParser from 'body-parser';
import fs from "fs";
import cors from 'cors';
const app = express();
const port = process.env.PORT || "3001";
app.use(cors())



//app.use(express.bodyParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/', async (req, res) => {
    console.log('body', req.body)
    var fileContent = req.body;

    fs.writeFile("cid.json", JSON.stringify(fileContent), (err) => {
        if (err){
            console.log(err);
            return;
        }
        console.log("File has been created");    
    })
    res.end();
})
app.get('/', (req, res) => {
    fs.readFile('cid.json', 'utf8', (err,data) => {
        if (err) throw err;
        res.send(data)
        res.end();
    });

})
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});
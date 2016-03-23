var express = require("express"),
    http = require("http"),
    app;
var bodyParser = require("body-parser");
var stats = {
    "wins": 0,
    "losses": 0
};

// Create our Express-powered HTTP server
// and have it listen on port 3000
app = express();
// tell Express to parse incoming
// JSON objects
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

http.createServer(app).listen(3000);
// set up our routes
//GET /stats
app.get("/stats", function(req, res) {
    res.json(stats);
});
//POST /flip
app.post("/flip", function(req, res) {
    var choice = req.body;
    console.log("user choice:" + choice.call);
    var compare = (Math.floor(Math.random() * 2) === 0) ? "heads" : "tails"; //choose random
    console.log("system choice: " + compare);
    if (choice.call === compare) {
        stats.wins += 1;
        res.json({
            "result": "win"
        });
    } else {
        stats.losses += 1;
        res.json({
            "result": "lose"
        });
    }
    console.log("_____________________________________");
});

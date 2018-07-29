var express = require("express");
var path = require("path");
var router = express.Router();

var burger = require(path.join(__dirname, '../models/burger'));

function booleanValue(value) {
    if (typeof (value) === 'string') {
        value = value.trim().toLowerCase();
    }

    switch (value) {
        case true: case "true": case 1: case "1": case "on": case "yes":
            return true;
        case false: case "false": case 0: case "0": case "off": case "no":
            return false;
        default:
            return undefined;
    }
}

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
    burger.all(function (result) {
        var eatenBurgers = [];
        var uneatenBurgers = [];
        for (item of result) {
            if (item.devoured) {
                eatenBurgers.push(item);
            } else {
                uneatenBurgers.push(item);
            }
        }

        var hbsObject = {
            eatenBurgers: eatenBurgers,
            uneatenBurgers: uneatenBurgers
        };
        res.render("index", hbsObject);
    });
});

router.post("/api/burger", function (req, res) {
    var devoured = booleanValue(req.body.devoured);
    var obj = {
        burger_name: req.body.name,
        devoured: devoured
    };
    burger.create(obj, function (result) {
        res.json({ id: result.id });
    })
});

router.put("/api/burger/:id", function (req, res) {
    var devoured = booleanValue(req.body.devoured);
    burger.update(req.params.id, devoured, function (result) {
        res.status(200).end();
    })
});

// Export routes for server.js to use.
module.exports = router;

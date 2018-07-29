var express = require("express");
var path = require("path");
var router = express.Router();

var db = require("../models");

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
    db.Burger.findAll({}).then(function (result) {
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
    db.Burger.create({
        burger_name: req.body.name,
        devoured: devoured
    }).then(function (burger) {
        res.json({ id: burger.id });
    });
});

router.put("/api/burger/:id", function (req, res) {
    var devoured = booleanValue(req.body.devoured);
    db.Burger.update({
        devoured: devoured
    }, {
            where: {
                id: req.params.id
            }
        }).then(function (burger) {
            res.json(burger);
        });
});

// Export routes for server.js to use.
module.exports = router;

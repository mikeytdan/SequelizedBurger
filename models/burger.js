var orm = require("../config/orm");

var burger = {
    all: function (callback) {
        // table
        orm.all("burgers", function (res) {
            callback(res);
        });
    },

    create: function (obj, callback) {
        // table, burger name
        orm.insert("burgers", obj, function (res) {
            callback(res);
        });
    },
    
    update: function (id, devoured, callback) {
        // table, column: value, condition, callback
        orm.update("burgers", { devoured: devoured }, { id: id }, function (res) {
            callback(res);
        });
    }
};

module.exports = burger;

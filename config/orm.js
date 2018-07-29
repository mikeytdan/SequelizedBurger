var connection = require("./connection");

module.exports = {

    all: function (table, callback) {
        console.log("SELECT all burgers");
        connection.query("SELECT * FROM burgers", function (err, res) {
            if (err) throw err;
            callback(res)
        });
    },

    insert: function (table, obj, callback) {
        console.log("INSERT burger: " + JSON.stringify(obj));
        connection.query(`INSERT INTO ${table} SET ?`, obj, function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " product inserted!\n");
            callback(res)
        }
        );
    },

    update: function (table, columnsValues, condition, callback) {
        console.log("UPDATE Devour burger: " + columnsValues);
        connection.query(`UPDATE ${table} SET ? WHERE ?`,
            [columnsValues, condition],
            function (err, res) {
                if (err) throw err;
                callback(res)
            })
    }

}
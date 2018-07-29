$(function () {
    $("#undevour-btn, #devour-btn").on("click", function (event) {
        event.preventDefault();
        var id = $(this).val();
        var newDevouredState = {
            devoured: event.target.id == "devour-btn" ? true : false
        };

        $.ajax("./api/burger/" + id, {
            type: "PUT",
            data: newDevouredState
        }).then(
            function () {
                location.reload();
            }
        );
    });

    $("#add-burger-btn").on("click", function (event) {
        event.preventDefault();
        var name = $("#burger-textarea").val().trim();
        if (name.length == 0) {
            return;
        }

        var data = {
            name: name,
            devoured: false
        }

        $.ajax("./api/burger/", {
            type: "POST",
            data: data
        }).then(
            function () {
                location.reload();
            }
        );
    });
});
$(function() {
    var socket = io.connect();

    var $messageForm = $("#messageForm"),
        $message = $("#message"),
        $chatbox = $("#chatWindow");

    var $usernameForm = $("#usernameForm"),
        $users = $("#users"),
        $username = $("#username"),
        $error = $("#error");

    $usernameForm.submit(function(event) {
        event.preventDefault();
        socket.emit("new-user", $username.val(), function(data) {
            if (data) {
                $("#usernameContainer").hide();
                $("#mainContainer").show();
            } else {
                $error.html("Username not available!");
            }
        });
    });

    socket.on("usernames", function(data) {
        var html = "";
        for (let i = 0; i < data.length; i++) {
            html += data[i] + "<br>";
        }
        $users.html(html);
    });

    $messageForm.submit(function(event) {
        event.preventDefault();
        socket.emit("send-message", $message.val());
        $message.val("");
    });

    socket.on("new-message", function(data) {
        $chatbox.append("<strong>" + data.user + "</strong> : " + data.msg + "<br>");
    });
});
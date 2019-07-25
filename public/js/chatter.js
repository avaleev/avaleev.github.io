$(function(){
    var socket = io();

    getMessages();

    $("form#chatnode").submit(function(e){
        e.preventDefault();

        sendMessage({
            sender: $("#u").val(),
            message: $("#m").val()
        });
        getMessages();
        $("#m").val('');

        return false;
    });

    socket.on("message", function(msg){
        addMessage(msg);
    });
});

function addMessage(message) {
    $("#messages").append(`<li class="chat-bubble"><span class="chat-nickname">${message.sender}</span><span class="chat-message">${message.message}</span></li>`);
}

function getMessages() {
    $("#messages").html('');
    $.get("http://127.0.0.1:3000/messages", (data) => {
        data.forEach(addMessage);
    });
}

function sendMessage(message) {
    $.post("http://127.0.0.1:3000/messages", message);
}
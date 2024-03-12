$(document).ready(function() {
    if ((window.location.href).includes("127.0.0") || (window.location.href).includes("192.168")) {
        for (i = 0; i < $("#nav a").length; i++) {
            $("#nav a").eq(i).attr("href", $("#nav a").eq(i).attr("href") + ".html");
        };
    };

    var ver = "BETA v0.4.240312";

    $("body").append('<span id="version">' + ver + '</span>')
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min; // incluye min pero no max
}

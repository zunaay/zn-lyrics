var data = [];

$(document).ready(function() {
    const requestDB = new XMLHttpRequest();requestDB.open("GET", "data/db.json");
    requestDB.responseType = "json";requestDB.send();requestDB.onload = function() {
        data = requestDB.response;
        checkSearch((window.location.search));
    };
});

// Chequear URL
function checkSearch(url) {
    if (url != "") {
        url = url.split("&");
        var artist = "", song = "";
    
        for (i = 0; i < url.length; i++) {
            if (url[i].includes("a=")) {
                // Obtener artista
                var temp = url[i].split("=");
                artist = temp[1];
    
            } else if (url[i].includes("s=")) {
                // Obtener canción
                var temp = url[i].split("=");
                song = temp[1];
            } else if (url[i].includes("v=")) { // Versiones diferentes con la misma letra (sta_wolf2)
                // pendiente
            };
        };
    
        if (artist != "" && song != "") {
            // Cargar letras
            showLyrics(artist, song);
    
        } else {
            // Falta canción o artista
        }
    } else {
        // No hay canción seleccionada
        window.location.href = (window.location.href).replace("/lyrics", "/search");
    }


}

function showLyrics(artist, song) {
    var fullName = artist + "_" + song + ".txt";

    // Cargar info de canción
    var cancion = "";
    var artista = "";
    var album = "";
    var anio = "";
    var cover = "";

    try {

        // Artista
        var tempArtist = data.filter(v => {return v.id == artist.toUpperCase()});
        artista = tempArtist[0].band;

        // Buscar album + Año + Cover + cancion
        var tempTrack = [];
        for (i = 0; i <= tempArtist[0].album.length; i++) {
            tempTrack = tempArtist[0].album[i].tracklist.filter(v => (v.src).includes(fullName));
            if (tempTrack.length >= 1) {
                album = tempArtist[0].album[i].name;
                anio = tempArtist[0].album[i].year;
                cover = tempArtist[0].album[i].cover;
                cancion = tempTrack[0].name;

                break;
            };
        };


        // Dibujar todo !
        $("body").css("background-image", "url(" + cover + ")");

        $("title").html(cancion + " - " + artista + " | j u s t • l y r i c s");
        $("#cover-container img").attr("src", cover);
        $("#info-container span").eq(0).append(cancion);
        $("#info-container span").eq(1).append(artista);
        $("#info-container span").eq(2).append(album);
        $("#info-container span").eq(3).append(anio);

        // Cargar letra
        $.get('data/files/' + fullName, function(txt) {
            $("pre").html(txt);
        });

    } catch (error) {
        alert("La canción no existe!");
    };
};

$(function() {
    $("#show-info").click(function() {
        var clase = $(this).attr("class");
        if (clase == "disabled") {
            // habilitar
            $("#show-info i").css("transform", "rotate(360deg)");
            $(this).attr("class", "enabled");
            $("#general-info").css("transform", "translateX(0)");
            $("body").css("overflow", "hidden");


        } else {
            // desabilitar
            $("#show-info i").css("transform", "rotate(45deg)");
            $(this).attr("class", "disabled");
            $("#general-info").css("transform", "translateX(-150%)");
            $("body").css("overflow", "auto");
        };
    });


    $(window).resize(function() {
        var ancho = $(this).width();
        if (ancho > 640) {
            $("#general-info").removeAttr("style");
        }
    })

})


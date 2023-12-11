$(document).ready(function() {
    $.get("data/artist.json", artist => {
        $.get("data/music.json", song => {
            var [a, s] = checkSearch((window.location.search));
            showLyrics(a, s, artist, song);
        });
    });
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
            return [artist, song];
    
        } else {
            // Falta canción o artista
        }
    } else {
        // No hay canción seleccionada
        window.location.href = (window.location.href).replace("/lyrics", "/search");
    }

}

function showLyrics(a, s, artist, song) {
    var fullName = "data/files/" + a + "_" + s + ".txt";
    var goSearch = (window.location.href).replace(window.location.search, "").replace("/lyrics", "/search");

    // Cargar info de canción
    var cancion = "";
    var artista = "";
    var searchArtist = "";
    var album = "";
    var anio = "";
    var cover = "";

    try {

        // Cancion
        var tempTrack = song.filter(v => {return v.src == fullName});
        cancion = tempTrack[0].name;

        var tempInfo = (tempTrack[0].id).split("-");

        // Artista        
        var tempArtist = artist.filter(v => {return v.id == tempInfo[0] && v.date == tempInfo[1]});
        artista = tempArtist[0].name;

        // Album
        album = tempArtist[0].album;

        // Año
        anio = (tempArtist[0].date).slice(0, 4);

        // Portada
        cover = tempArtist[0].cover;

        // Dibujar todo !
        $("body").css("background-image", "url(" + cover + ")");

        $("title").html(cancion + " - " + artista + " | z n • l y r i c s");
        $("#cover-container img").attr("src", cover);
        $("#info-container .track-info").eq(0).append(cancion);
        $("#info-container .track-info").eq(1).append('<a href="' + goSearch + "?artist=" + (tempArtist[0].id).toLowerCase() + '">' + artista + '</a>');
        $("#info-container .track-info").eq(2).append(album);
        $("#info-container .track-info").eq(3).append(anio);

        // Cargar letra
        $.get(fullName, function(txt) {
            $("pre").html(txt);
        });

    } catch (error) {
        alert("La canción no existe!");
        window.location.href = (window.location.href).replace("/lyrics", "/search");
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
            // deshabilitar
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
    });

});

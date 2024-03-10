$(document).ready(function() {
    $.get("data/artist.json", artist => {
        $.get("data/music.json", song => {
            var id = checkSearch((window.location.search));
            showLyrics(id, artist, song);
        });
    });
});

// Chequear URL
function checkSearch(url) {
    if (url != "") {
        if (url.includes("&")) url = url.split("&")[0];
        var id = url.replace("?s=", "");
        return id;

    } else {
        // No hay canción seleccionada
        window.location.href = (window.location.href).replace("/lyrics", "/search");
    }

}

function showLyrics(id, artist, song) {
    var goSearch = (window.location.href).replace(window.location.search, "").replace("/lyrics", "/search");
    id = id.toUpperCase();

    // Cargar info de canción
    var s = song.filter(v => {return v.id == id});
    var a = artist.filter(v => {return v.date == id.split("-")[1]});

    try {
        var cancion = s[0].name;
        var artista = a[0].name;
        var album = a[0].album;
        var anio = (a[0].date).slice(0, 4);
        var cover = a[0].cover;

        var [prevSong, nextSong] = getPrevNext(id);  

        // Dibujar todo !
        $("body").css("background-image", "url(" + cover + ")");

        $("title").html(cancion + " - " + artista + " | z n • l y r i c s");
        $("#cover-container img").attr("src", cover);
        $("#info-container .track-info").eq(0).append(cancion);
        $("#info-container .track-info").eq(1).append('<a href="' + goSearch + "?artist=" + (a[0].id).toLowerCase() + '">' + artista + '</a>');
        $("#info-container .track-info").eq(2).append(album);
        $("#info-container .track-info").eq(3).append(anio);

        // Cargar link a canción anterior
        if (prevSong != null) {
            var ps = song.filter(v => {return v.id == prevSong});
            if (ps.length == 1 && (ps[0].src).includes(".txt")) {
                var enlace = (window.location.href).replace(window.location.search, "?s=" + prevSong.toLowerCase());
                $(".prev-song").attr("href", enlace);
                $(".prev-song").removeClass("disabled");
            };
        };

        // Cargar link a canción siguiente
        var ns = song.filter(v => {return v.id == nextSong});
        if (ns.length == 1 && (ns[0].src).includes(".txt")) {
            var enlace = (window.location.href).replace(window.location.search, "?s=" + nextSong.toLowerCase());
            $(".next-song").attr("href", enlace);
            $(".next-song").removeClass("disabled");
        };

        // Cargar letra
        $.get(s[0].src, function(txt) {
            $("pre").html(txt);
        });

    } catch (error) {
        alert("La canción no existe!");
        window.location.href = (window.location.href).replace("/lyrics", "/search");
    };
};

function getPrevNext(currentID) {
    var artist = currentID.split("-")[0] + "-" + currentID.split("-")[1] ;
    var track = parseInt(currentID.split("-")[2]);
    
    var p = track - 1; var n = track + 1;

    p < 10 ? p = artist + "-0" + p : p = artist + "-" + p;
    n < 10 ? n = artist + "-0" + n : n = artist + "-" + n;

    if (p.includes("-00")) p = null;

    return [p, n];
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

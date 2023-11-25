var data = [];

$(document).ready(function() {
    const requestDB = new XMLHttpRequest();requestDB.open("GET", "data/db.json");
    requestDB.responseType = "json";requestDB.send();requestDB.onload = function() {
        data = requestDB.response;
        checkSearch((window.location.search));
    };
});

function checkSearch(search) {

    if (search.includes("artist")) {
        // Mostrar lista de artistas ?

        
    } else if (search.includes("album")) {
        // Mostrar album ?

    } else {


        // Cargar todo
        if ((window.location.href).includes("127.0.0.1") || (window.location.href).includes("192.168")) {
            history.replaceState(null, "", "search.html");
        } else {
            history.replaceState(null, "", "search");
        };

        // Crear temporal
	    var tempData = [];
	    for (x = 0; x < data.length; x++) {tempData.push(data[x])};

        // Ordena bandas alfabéticamente
        tempData.sort((a, b) => {
            const nameA = a.band.toUpperCase();
            const nameB = b.band.toUpperCase();
            if (nameA < nameB) { return -1; }
            if (nameA > nameB) { return 1; }
            return 0; // iguales
        });

        for (i = 0; i < tempData.length; i++) {
            // Ordenar álbumes de más recientes a más antiguos
            tempData[i].album.sort((a, b) => {
                const nameA = a.year;
                const nameB = b.year;
                if (nameA > nameB) { return -1; }
                if (nameA < nameB) { return 1; }
                return 1; // iguales (debe retornar el ultimo)
            });        
        };


        // Dibujar ?
        $("#main-container").html("");
        for (a = 0; a < tempData.length; a++) {

            $("#main-container").append('<div class="artist-container"></div>');
            $(".artist-container").eq(a).append('<h2 class="artist-name">' + tempData[a].band + '</h2>');
            $(".artist-container").eq(a).append('<div class="album-carousel"></div>');


            for (d = 0; d < tempData[a].album.length; d++) {
                let cover = tempData[a].album[d].cover;
                let album = tempData[a].album[d].name;
                let year = tempData[a].album[d].year;

                $('.album-carousel').eq(a).append('<div class="album-container"><div>');
                $('.album-carousel').eq(a).find('.album-container').eq(d).append('<div class="album-info"></div><ul class="tracklist"></ul>');
                
                $('.album-carousel').eq(a).find('.album-info').eq(d).append('<img src="' + cover + '">');
                $('.album-carousel').eq(a).find('.album-info').eq(d).append('<div class="album-name">' + album + '</div>');
                $('.album-carousel').eq(a).find('.album-info').eq(d).append('<div class="album-year">' + year + '</div>');


                for (t = 0; t < tempData[a].album[d].tracklist.length; t++) {
                    let track = tempData[a].album[d].tracklist[t].name;
                    let src = tempData[a].album[d].tracklist[t].src;
                    let url = (window.location.href).includes("html") ? "lyrics.html" : "lyrics";
                    let filename = src.replace("data/files/","").replace(".txt","").replace((tempData[a].id).toLowerCase() + "_", "");
                    url += "?a=" + (tempData[a].id).toLowerCase() + "&s=" + filename;

                    // Comprobar si el archivo existe

                    if ((window.location.href).includes("127.0.0") || (window.location.href).includes("192.168")) {
                        // Local 
                        jQuery.ajaxSetup({async:false});
                    
                        var existe = $.get(src).done(function() {
                            // Insertar link
                            $('.album-carousel').eq(a).find('.tracklist').eq(d).append('<a href="' + url + '"><li class="track">' + track + '</li></a>');
                        })
                
                        .fail(function(){
                            // No insertar link
                            $('.album-carousel').eq(a).find('.tracklist').eq(d).append('<li class="track">' + track + '</li>');
                        });

                    } else {

                        // Insertar link
                        $('.album-carousel').eq(a).find('.tracklist').eq(d).append('<a href="' + url + '"><li class="track">' + track + '</li></a>');
                    };
                };                
            };
        };
    };
};

$(function() {

    $("body").on("mouseenter", ".album-container", function() {
        var img = $(this).find("img").attr("src");
        $("body").css("background-image", "url(" + img + ")")
    }).on("mouseleave", ".album-container", function() {

    });
});
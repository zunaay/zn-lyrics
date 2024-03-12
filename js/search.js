$(document).ready(function() {
    $.get("data/artist.json", artist => {
        $.get("data/music.json", song => {
            var filtro = checkSearch(window.location.search, artist);
            drawContent(filtro, artist, song);
        });
    });
});

/* SEARCH
?q=general
OVERVIEW - MUESTRA ALBUM MAS RECIENTE DE ALGUNAS BANDAS (?

?artist=ID
MUESTRA TODO DEL ARTISTA

?q=songlist
TODAS LAS CANCIONES DISPONIBLES EN ORDEN ALFABETICO
*/

function checkSearch(search, artist) {
    if (search == "?q=general" || search == "?q=songlist" || search == "?q=artist") {
        return (search.slice(3));

    } else if (search.includes("?artist=")) {
        // obtener id de artista
        if (search.includes("&")) {
            search = search.split ("&");
            search = search[0];
        };
        var a = search.split("=")[1].toUpperCase();

        // buscar si el artista existe
        var check = artist.filter(v => {return v.id == a});
        if (check.length != 0) {
            return a;
        };
    };

    // Si llega hasta aqui hay un error, reiniciar
    window.location.search = "?q=songlist";
};

function drawContent(q, artist, song) {
    $("#main-container").html("");
    var base = (window.location.href).replace(window.location.search, "");
    
    if (q == "general") {
        // Overview
        $("body").css("background-image", "url(" + artist[0].cover + ")");
        $("#main-container").append('<div class="artist-container"></div>');
        $(".artist-container")
            .append('<h2 class="artist-title">Últimos lanzamientos</h2>')
            .append('<div class="album-carousel"></div>');
        $('.album-carousel').append('<div class="carousel-container"><div>');
            

        var listedArtists = "", albumN = 0;
        for (i = 0; i < artist.length; i++) {

            // Comprobar si el artista está en la lista
            if (!listedArtists.includes(artist[i].name)) {

                // Comprobar si el album está completo, sino skipear
                if (artist[i].full == false) continue;

                listedArtists += artist[i].name; // Añadir artista a la lista

                let artista = artist[i].name;
                let id = artist[i].id;
                let album = artist[i].album;
                let cover = artist[i].cover;
                let anio = (artist[i].date).slice(0,4);

                $('.carousel-container').append('<div class="album-container"></div>');
                    
                $('.album-container').eq(albumN)
                    .append('<h3 class="artist-name"></h3>')
                    .append('<div class="album-info"></div>')
                    .append('<ul class="tracklist"></ul>');

                $('.artist-name').eq(albumN).append('<a href="' + base + '?artist=' + id.toLowerCase() + '" class="artist-link">' + artista + '</a>')
                
                $('.album-info').eq(albumN)
                    .append('<img src="' + cover + '">')
                    .append('<div class="album-name">' + album + '</div>')
                    .append('<div class="album-year">' + anio + '</div>');

                // Obtener tracklist
                let albumID = id + "-" + artist[i].date; + "-";
                var tracklist = song.filter(v => {return v.id.includes(albumID)});

                drawTracklist(tracklist, base, albumN);

                albumN++;
            };
        };

    } else if (q == "artist") {
        // Lista de artistas
    
    } else if (q == "songlist") {
        // Lista de canciones
        $("body").css("background-image", "url(" + artist[getRandomInt(0, artist.length)].cover + ")"); // Custom bg
        
        // Obtener y ordenar artistas
        var artistArray = [];
        for (a = 0; a < artist.length; a++) { artistArray.push(artist[a].name); };
        artistArray = unique(artistArray);
        artistArray.sort();

        var d = 0;
        for (a = 0; a < artistArray.length; a++) {
            var artistID = artist.filter(v => {return v.name == artistArray[a]})[0].id;

            // Obtener y ordenar canciones disponibles
            var track = song.filter(v => {return (v.src).includes(".txt") && (v.id).split("-")[0] == artistID});

            
            if (track.length > 0) {
                track.sort((a, b) => {
                    const nameA = a.name.toUpperCase();
                    const nameB = b.name.toUpperCase();
                    if (nameA < nameB) { return -1; }
                    if (nameA > nameB) { return 1; }
                    return 0;
                });

                $("#main-container").append('<div class="artist-container"></div>');
                $(".artist-container").eq(d)
                .append('<h2 class="artist-title">' + artistArray[a] + '</h2>')
                .append('<div class="artist-discography">( <a href="' + (window.location.href).replace(window.location.search, "") + '?artist=' + artistID.toLowerCase() + '">ver discografía</a> )</div>')
                .append('<div class="songlist"></div>');

                for (s = 0; s < track.length; s++) {
                    var trackArtist = track[s].id.split("-")[0];
                   
                    if (trackArtist == artistID) {
                        // var href = "?a=" + artistID.toLowerCase() + "&s=" + (track[s].src).split("_")[1].replace(".txt", ""); // OLD
                        var href = "?s=" + (track[s].id).toLowerCase();
                        var enlace = base.replace("search", "lyrics") + href;
    
                        $(".songlist").eq(d).append('<a class="sl-name" href="' + enlace +'"><span> ' + track[s].name + ' </span></a>');
    
                    };
                };
                d++;
            }


            

        };

    } else {
        // Filtrar por artista
        var artista = artist.filter(v => {return v.id == q.toUpperCase()});
        $("body").css("background-image", "url(" + artista[0].cover + ")"); // Custom bg

        $("#main-container").append('<div class="artist-container"></div>');
        $(".artist-container")
            .append('<h2 class="artist-title">' + artista[0].name + '</h2>')
            .append('<div class="album-carousel"></div>');

        for (a = 0; a < artista.length; a++) {
            let id = artista[a].id;
            let cover = artista[a].cover;
            let album = artista[a].album;
            let anio = (artista[a].date).slice(0,4);

            $('.album-carousel').append('<div class="album-container"></div>');
            $('.album-container').eq(a)
                .append('<div class="album-info"></div>')
                .append('<ul class="tracklist"></ul>');

            $('.album-info').eq(a)
                .append('<img src="' + cover + '">')
                .append('<div class="album-name">' + album + '</div>')
                .append('<div class="album-year">' + anio + '</div>');

            // Obtener tracklist
            let albumID = id + "-" + artista[a].date; + "-";
            var tracklist = song.filter(v => {return v.id.includes(albumID)});

            drawTracklist(tracklist, base, a);
        }
    };
};

function drawTracklist(tracklist, base, i) {

    for (t = 0; t < tracklist.length; t++) {
        var enlace = (base).replace("/search", "/lyrics");
        let track = tracklist[t].name;
        let src = tracklist[t].src;

        // Comprobar si el archivo existe 
        if (src.includes(".txt")) {
            // Existe
            //enlace += '?a=' + src.split("_")[0].replace("data/files/", "") + '&s=' + src.split("_")[1].replace(".txt", ""); OLD
            enlace += '?s=' + (tracklist[t].id).toLowerCase(); // NEW
            $('.tracklist').eq(i).append('<a href="' + enlace + '"><li class="track">' + track + '</li></a>');
        } else {
            // No existe
            $('.tracklist').eq(i).append('<li class="track">' + track + '</li>');
        }
    };

};

function unique(list) {
    var result = [];
    $.each(list, function(i, e) {
      if ($.inArray(e, result) == -1) result.push(e);
    });
    return result;
};

$(function() {

    $("body").on("mouseenter", ".album-container", function() {
        var img = $(this).find("img").attr("src");
        $("body").css("background-image", "url(" + img + ")")
    }).on("mouseleave", ".album-container", function() {

    });
});
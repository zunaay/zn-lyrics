jQuery.ajaxSetup({async:false});

$(document).ready(function() {
    $.get("data/music.json", song => {

        var existe = false;
        do {
            var s = getRandomSong(song);
            existe = isAvailable(s, song);

        } while (existe == false);

        var url = makeURL(song, s);
        window.location.href = url;
    });
});

function getRandomSong(song) {
    return getRandomInt(0, song.length);
};

function isAvailable(s, db) {
    if ((db[s].src.includes(".txt"))) return true;
    return false;

    /* LOCAL ASYNC
    src = db[s].src;
    var value = null;

    $.get(src)
    .done(() => { value = true })
    .fail(() => { value = false });

    return value;
    */
};

function makeURL(db, s) {
    var page = (window.location.href).replace("random", "lyrics");
    return page + "?s=" + db[s].id;
};
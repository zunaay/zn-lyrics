jQuery.ajaxSetup({async:false});

$(document).ready(function() {

    $.get("data/db.json", json => {
        var existe = false;

        do {
            var a = getArtist(json);
            var d = getAlbum(json, a);
            var s = getSong(json, a, d);
            
            existe = isAvailable(json, a, d, s);
        } while (existe == false);

        var url = makeURL(json, a, d, s);
        window.location.href = url;
    });
});

function getArtist(db) {
    return getRandomInt(0, db.length);
}

function getAlbum(db, a) {
    return getRandomInt(0, db[a].album.length);
}

function getSong(db, a, d) {
    return getRandomInt(0, db[a].album[d].tracklist.length);
}

function isAvailable(db, a, d, s) {
    src = db[a].album[d].tracklist[s].src;

    var value = null;

    $.get(src)
    .done(() => { value = true })
    .fail(() => { value = false });

    return value;
;}

function makeURL(db, a, d, s) {
    src = db[a].album[d].tracklist[s].src;

    src = src.replace("data/files/", "");
    src = src.replace(".txt", "");

    var data = src.split("_");
    var page = (window.location.href).replace("random", "lyrics");

    return page + "?a=" + data[0] + "&s=" + data[1];
};
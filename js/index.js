var images = [
    "https://64.media.tumblr.com/cfb33c478530bb346e678807ab6579dd/0e285aca1b1a5d69-3f/s2048x3072/c4dda5de77d158d013f84024925dd3d2274f6a00.jpg",
    "https://www.nme.com/wp-content/uploads/2022/05/My_Chemical_Romance_Eden_Frances_Beach_For_NME-11.jpg",
    "https://i.pinimg.com/originals/b6/d9/62/b6d96298847d992cb62a38b6a0384de3.jpg",
    "https://i.pinimg.com/originals/5f/be/79/5fbe79831f1cc8c58d7d94b5a11bba80.jpg",
    "https://www.metalzone.fr/wp-content/uploads/2022/07/BFMV_HF22_1500-4-1200x800.jpg",
    //"https://i.imgur.com/dpcctTk.jpeg",
    "https://raidertimes.com/wp-content/uploads/2017/05/IMG_4372-copy.jpg",
    "https://www.lavanguardia.com/files/og_thumbnail/uploads/2017/12/06/5fa3e3d0b697a.jpeg"
]

$(document).ready(function() {
    $("body").css("background-image", "url(" + images[getRandomInt(0,images.length)] + ")" );

    //if((window.location.href).includes("index") ) window.location.href = (window.location.href).replace("index", "search");
});

/*
shadows
https://64.media.tumblr.com/cfb33c478530bb346e678807ab6579dd/0e285aca1b1a5d69-3f/s2048x3072/c4dda5de77d158d013f84024925dd3d2274f6a00.jpg

gerard
https://www.nme.com/wp-content/uploads/2022/05/My_Chemical_Romance_Eden_Frances_Beach_For_NME-11.jpg

adam
https://i.pinimg.com/originals/b6/d9/62/b6d96298847d992cb62a38b6a0384de3.jpg

beau
https://i.pinimg.com/originals/5f/be/79/5fbe79831f1cc8c58d7d94b5a11bba80.jpg
https://64.media.tumblr.com/a97c0f4439f109fc9ac08c339c8b09cd/tumblr_o86cu4JvDO1s25nopo1_1280.jpg

matt F
https://www.metalzone.fr/wp-content/uploads/2022/07/BFMV_HF22_1500-4-1200x800.jpg
*/
const Product = require('../models/product');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shopping', {useNewUrlParser: true});

const products = [
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f8/Injustice_Gods_Among_Us_Cover_Art.jpg/220px-Injustice_Gods_Among_Us_Cover_Art.jpg',
        title: 'Injustice: Gods Among Us',
        description: 'Awesome Game! It\'s all about immortality!!!!',
        price: 1000
    }),
    new Product({
        imagePath: 'http://eu.blizzard.com/static/_images/games/wow/wallpapers/wall2/wall2-1440x900.jpg',
        title: 'World of Warcraft',
        description: 'Also awesome? But of course it was better in vanilla!',
        price: 2000
    }),
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/Call_of_Duty_Black_Ops_4_official_box_art.jpg/220px-Call_of_Duty_Black_Ops_4_official_box_art.jpg',
        title: 'Call of Duty: Black Ops 4',
        description: 'Enjoyable shooter experience like never before!!!',
        price: 4000
    }),
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/Resident_Evil_2_Remake.jpg/220px-Resident_Evil_2_Remake.jpg',
        title: 'Resident Evil 2',
        description: 'Survival of the fittest, not fainthearted!',
        price: 1500
    }),
    new Product({
        imagePath: 'https://d1r7xvmnymv7kg.cloudfront.net/sites_products/darksouls3/assets/img/DARKSOUL_facebook_mini.jpg',
        title: 'Dark Souls 3',
        description: 'Become a hero and fight demons!',
        price: 5000
    }),
    new Product({
        imagePath: 'https://images-na.ssl-images-amazon.com/images/I/71unWeOXWlL._SX522_.jpg',
        title: 'FIFA 19',
        description: 'EA sports, it\'s in the game!!!',
        price: 8000
    }),
    new Product({
        imagePath: 'https://i.ytimg.com/vi/4484xdymZOo/maxresdefault.jpg',
        title: 'Need for Speed',
        description: 'Speed is good, baby! Let\'s go for a ride!!!!!',
        price: 4000
    }),
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b1/Mortal_Kombat_Logo.svg/250px-Mortal_Kombat_Logo.svg.png',
        title: 'Mortal Kombat X',
        description: 'Fighting is an art. Be an artist today!!!!!',
        price: 3500
    }),
    new Product({
        imagePath: 'https://4.bp.blogspot.com/-qEE4Wmt1PrI/VstiOGuvd2I/AAAAAAAAAH4/WxPIMTHVVyA/s1600/Download-Hitman-Agent-47-Full-PC-Game%2B%25281%2529.jpg',
        title: 'Hitman: Agent 47',
        description: 'It\'s fun doing some shady missions!!!!!',
        price: 2800
    })
];

let done = 0;
for (let i = 0; i < products.length; i++) {
    products[i].save(function (err, result) {
        done++;
        if (done === products.length) {
            exit()
        }
    });
}

function exit() {
    mongoose.disconnect()
}

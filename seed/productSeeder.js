const Product = require('../models/product');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shopping', {useNewUrlParser: true});

const products = [
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
        title: 'Gothic Video Game',
        description: 'Awesome Game!!!!!',
        price: 1000
    }),
    new Product({
        imagePath: 'http://eu.blizzard.com/static/_images/games/wow/wallpapers/wall2/wall2-1440x900.jpg',
        title: 'World of Warcraft Video Game',
        description: 'Also awesome? But of course it was better in vanilla!',
        price: 2000
    }),
    new Product({
        imagePath: 'https://support.activision.com/servlet/servlet.FileDownload?file=00PU000000Rq6tz',
        title: 'Call of Duty Video Game',
        description: 'Meh ... nah, it\'s okay I guess',
        price: 4000
    }),
    new Product({
        imagePath: 'https://pmcdeadline2.files.wordpress.com/2014/02/minecraft__140227211000.jpg',
        title: 'Minecraft Video Game',
        description: 'Now that is super awesome!',
        price: 1500
    }),
    new Product({
        imagePath: 'https://d1r7xvmnymv7kg.cloudfront.net/sites_products/darksouls3/assets/img/DARKSOUL_facebook_mini.jpg',
        title: 'Dark Souls 3 Video Game',
        description: 'I died!',
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
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/6/62/Agent_47_in_Hitman_Absolution.png',
        title: 'Hitman: Agent 47',
        description: 'It\'s fun kicking some ass!!!!!',
        price: 2800
    })
];

let done = 0;
for (let i = 0; i < products.length; i++) {
    products[i].save(function (err, result) {
        if (err) {
            return console.error(err)
        }

        done++;
        if (done === products.length) {
            exit()
        }
        console.log('Data saved.', result);
    });
}

function exit() {
    mongoose.disconnect()
}

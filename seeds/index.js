const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6934543e3da2282824293a5c',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
                geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images:[
    {

         url: 'https://res.cloudinary.com/dhgy7wm7q/image/upload/v1765042308/YelpCamp/l5srmv9wvmxvanqmtjy5.jpg',
        filename: 'YelpCamp/l5srmv9wvmxvanqmtjy5'
    },
    {

         url: 'https://res.cloudinary.com/dhgy7wm7q/image/upload/v1765042310/YelpCamp/owseaviinkw6iayclth2.jpg',
        filename: 'YelpCamp/owseaviinkw6iayclth2'
    },
    {

        url: 'https://res.cloudinary.com/dhgy7wm7q/image/upload/v1765042311/YelpCamp/jrqwfokgxgd5mcpiqi8r.jpg',
        filename: 'YelpCamp/jrqwfokgxgd5mcpiqi8r'
    }
  ],
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
const mongoose = require("mongoose");
const User = require("../models/user");

const users = [
    new User({
        "name": "John Doe",
        "username": "johndoe123",
        "password": "password@123",
        "image": "profile_pic.jpg",
        "contact": { "phone": 1234567890, "email": "johndoe@example.com" }
    }),
    new User({
        "name": "Alice Smith",
        "username": "alicesmith22",
        "password": "password@123",
        "image": "avatar.png",
        "contact": { "phone": 9876543210, "email": "alice.smith@example.com" }
    }),
    new User({
        "name": "Michael Johnson",
        "username": "mikejohn",
        "password": "password@123",
        "image": "michaelpic.png",
        "contact": { "phone": 5555555555, "email": "michael.j@example.com" }
    }),
    new User({
        "name": "Emily Brown",
        "username": "emilybrown789",
        "password": "password@123",
        "image": "emily_pic.jpg",
        "contact": { "phone": 1212121212, "email": "emily.b@example.com" }
    }),
    new User({
        "name": "David Clark",
        "username": "davidc",
        "password": "password@123",
        "image": "david_profile.png",
        "contact": { "phone": 9191919191, "email": "david.clark@example.com" }
    }),
    new User({
        "username": "avamart",
        "name": "Ava Martinez",
        "password": "password@123",
        "image": "",
        "contact": { "phone": 4040404040, "email": "ava.m@example.com" },
    })
]

// User.insertMany(users, { timeout: false })
//     .then((docs) => {
//         console.log("Users inserted successfully");
//     })
//     .catch((err) => {
//         console.error(err);
//     });

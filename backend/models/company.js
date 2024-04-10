const mongoose = require('mongoose');
const { Schema } = mongoose;
const formatDate = require('../utils/formatDate');

const companySchema = new Schema({
    company: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dateJoined: {
        type: String,
        default: formatDate
    },
    hiring: {
        type: Boolean,
        default: false
    }
});

const Interview = mongoose.model("Company", companySchema);

module.exports = Interview;
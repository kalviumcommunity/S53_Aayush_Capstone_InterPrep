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
    password: {
        type: String,
        required: true,
        select: false
    },
    website: {
        type: String,
        required: true
    },
    description: {
        culture: {
            type: String,
            required: true
        },
        values: {
            type: String,
            required: true
        }
    },
    jobs: [{
        type: Schema.Types.ObjectId,
        ref: "Jobs"
    }],
    hiring: {
        type: Boolean,
        default: false
    },
    image: {
        type: String,
        required: true
    },
    dateJoined: {
        type: String,
        default: formatDate
    },
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
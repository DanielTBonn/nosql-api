const { Schema, Types } = require('mongoose');
const { reformatDate } = require('../utils/helpers');

// schema for the reactions to thoughts
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: reformatDate,
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false
    }
);


module.exports = reactionSchema;
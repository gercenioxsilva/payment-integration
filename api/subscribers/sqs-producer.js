const { Producer } = require("sqs-producer");
require("dotenv").config();

const producer = Producer.create({
    queueUrl: process.env.AWS_QUEUE_SUBSCRIPTIONSTATUS_URL,
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

module.exports = producer;

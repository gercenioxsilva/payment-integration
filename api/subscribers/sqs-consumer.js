const { Consumer } = require("sqs-consumer");
const AWS = require("aws-sdk");
require("dotenv").config();
const SubscriptionService = require("../services/subscription");

AWS.config.update({ region: process.env.AWS_REGION });

const consumer = Consumer.create({
    queueUrl: process.env.AWS_QUEUE_URL,
    attributeNames: ["SentTimestamp"],
    messageAttributeNames: ["All"],
    visibilityTimeout: 20,
    waitTimeSeconds: 0,
    handleMessage: async (message) => {
        console.log(JSON.stringify(message));

        if (message.Body) {
            const result = JSON.parse(message.Body);
            await SubscriptionService.checkStatusByEmail(result.email);
        }
    },
    sqs: new AWS.SQS(),
});

consumer.on("error", (err) => {
    console.error(err.message);
});

consumer.on("processing_error", (err) => {
    console.error(err.message);
});

module.exports = consumer;

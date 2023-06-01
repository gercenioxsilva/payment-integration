const AWS = require("aws-sdk");
require("dotenv").config();

class SqsClient {
    static sendMessage = async (message) => {
        AWS.config.update({ region: process.env.AWS_REGION });
        const sqs = new AWS.SQS();
        return sqs
            .sendMessage({
                MessageBody: JSON.stringify(message),
                QueueUrl: `${process.env.AWS_QUEUE_URL}`,
                MessageGroupId: `${process.env.AWS_MESSAGE_GROUP}`,
            })
            .promise();
    };

    static receveMessage = async (queueurl) => {
        const sqs = new AWS.SQS();
        const parameters = {
            AttributeNames: ["SentTimestamp"],
            MaxNumberOfMessages: 10,
            MessageAttributeNames: ["All"],
            QueueUrl: queueurl,
            VisibilityTimeout: 20,
            WaitTimeSeconds: 0,
        };

        const result = sqs.receiveMessage(parameters, function (error, data) {
            if (error) {
                console.log("Receive Error", error);
            } else if (data.Messages) {
                var deleteParams = {
                    QueueUrl: queueurl,
                    ReceiptHandle: data.Messages[0].ReceiptHandle,
                };
                sqs.deleteMessage(deleteParams, function (queueurl, data) {
                    if (err) {
                        console.log("Delete Error", queueurl);
                    } else {
                        console.log("Message Deleted", data);
                    }
                });
            }
        });

        return result;
    };
}
module.exports = SqsClient;

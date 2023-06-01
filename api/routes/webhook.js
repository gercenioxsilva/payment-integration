const WebhookController = require("../controllers/webhook");
const url = "/v1/webhook";

module.exports = (fastify) => {
    fastify.post(
        url,
        {
            schema: {
                description: "Create webhook",
                tags: ["Webhook"],
                params: {},
                body: {
                    amount: { type: "number" },
                    productId: { type: "string" },
                    dueDate: { type: "string", format: "date" },
                    dueSinceDate: { type: "string", format: "date" },
                    expirationDate: { type: "string", format: "date" },
                    currency: { type: "string" },
                    card: {
                        type: "object",
                        properties: {
                            number: { type: "integer" },
                            expMonth: { type: "integer" },
                            expYear: { type: "integer" },
                            cvc: { type: "integer" },
                        },
                    },
                    customer: {
                        type: "object",
                        properties: {
                            name: { type: "string" },
                            email: { type: "string" },
                        },
                    },
                },
                response: {
                    201: {
                        description: "Subscription was created",
                        type: "string",
                    },
                    409: {
                        description: "Subscription already exists",
                        type: "string",
                    },
                },
            },
        },
        WebhookController.create
    );
};

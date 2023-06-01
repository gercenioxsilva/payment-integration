const SubscriptionController = require("../controllers/subscription");
const url = "/v1/subscription";

module.exports = (fastify) => {
    fastify.post(
        url,
        {
            schema: {
                description: "Create Subscription",
                tags: ["Subscription"],
                params: {},
                body: {
                    amount: { type: "number" },
                    productId: { type: "string" },
                    dueDate: { type: "string", format: "date" },
                    dueSinceDate: { type: "string", format: "date" },
                    expirationDate: { type: "string", format: "date" },
                    currency: { type: "string" },
                    interval: { type: "string" },
                    coupon: { type: "string" },
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
        SubscriptionController.create
    );
    fastify.get(
        url,
        {
            schema: {
                description: "Find All Subscription",
                tags: ["Subscription"],
                params: {},
                response: {
                    200: {
                        description: "Subscription were found",
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                id: { type: "integer" },
                                amount: { type: "number" },
                                productId: { type: "string" },
                                duedate: { type: "string", format: "date" },
                                dueSinceDate: {
                                    type: "string",
                                    format: "date",
                                },
                                expirationDate: {
                                    type: "string",
                                    format: "date",
                                },
                                currency: { type: "string" },
                                customerId: { type: "integer" },
                                customer: {
                                    type: "object",
                                    properties: {
                                        name: { type: "string" },
                                        email: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        SubscriptionController.findAll
    );
    fastify.get(
        `${url}/:id`,
        {
            schema: {
                description: "Find Subscription By Id",
                tags: ["Subscription"],
                params: {
                    type: "object",
                    properties: {
                        id: {
                            type: "integer",
                            description: "Subscription ID",
                        },
                    },
                },
                response: {
                    200: {
                        description: "Subscription was found",
                        type: "object",
                        properties: {
                            id: { type: "integer" },
                            amount: { type: "number" },
                            productId: { type: "string" },
                            dueDate: { type: "string", format: "date" },
                            dueSinceDate: { type: "string", format: "date" },
                            expirationDate: { type: "string", format: "date" },
                            currency: { type: "string" },
                            paymentMethodId: { type: "integer" },
                            customerId: { type: "integer" },
                        },
                    },
                },
            },
        },
        SubscriptionController.findOne
    );
    fastify.put(
        `${url}/:id`,
        {
            schema: {
                description: "Update Subscription",
                tags: ["Subscription"],
                params: {
                    type: "object",
                    properties: {
                        id: {
                            type: "integer",
                            description: "Subscription ID",
                        },
                    },
                },
                body: {
                    amount: { type: "number" },
                    productId: { type: "string" },
                    dueDate: { type: "string", format: "date" },
                    dueSinceDate: { type: "string", format: "date" },
                    expirationDate: { type: "string", format: "date" },
                    currency: { type: "string" },
                    paymentMethodId: { type: "integer" },
                    customerId: { type: "integer" },
                },
                response: {
                    200: {
                        description: "Subscription has been updated",
                        type: "object",
                        properties: {
                            id: { type: "integer" },
                            amount: { type: "number" },
                            productId: { type: "string" },
                            dueDate: { type: "string", format: "date" },
                            dueSinceDate: { type: "string", format: "date" },
                            expirationDate: { type: "string", format: "date" },
                            currency: { type: "string" },
                            paymentMethodId: { type: "integer" },
                            customerId: { type: "integer" },
                        },
                    },
                    204: {
                        description: "Missing Subscription content",
                        type: "string",
                    },
                },
            },
        },
        SubscriptionController.update
    );
    fastify.delete(
        `${url}/:id`,
        {
            schema: {
                description: "Delete Subscription By Id",
                tags: ["Subscription"],
                params: {
                    type: "object",
                    properties: {
                        id: {
                            type: "integer",
                            description: "Subscription ID",
                        },
                    },
                },
                response: {
                    200: {
                        description: "Subscription has been deleted",
                        type: "string",
                    },
                    204: {
                        description: "Missing Subscription identifier",
                        type: "string",
                    },
                },
            },
        },
        SubscriptionController.delete
    );
    /*fastify.delete(
        `${url}`,
        {
            schema: {
                description: "Delete all Subscription",
                tags: ["Subscription"],
                response: {
                    200: {
                        description: "All Subscription have been deleted",
                        type: "string",
                    },
                },
            },
        },
        SubscriptionController.deleteAll
    );*/
};

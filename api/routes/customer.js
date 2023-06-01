const CustomerController = require("../controllers/customer");
const url = "/v1/customer";

module.exports = (fastify) => {
    fastify.get(
        url,
        {
            schema: {
                description: "Find All Customer",
                tags: ["Customer"],
                params: {},
                response: {
                    200: {
                        description: "Customer were found",
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                id: { type: "integer" },
                                name: { type: "string" },
                                email: { type: "string" },
                            },
                        },
                    },
                },
            },
        },
        CustomerController.findAll
    );
    fastify.get(
        `${url}/:email`,
        {
            schema: {
                description: "Find Customer By Id",
                tags: ["Customer"],
                params: {
                    type: "object",
                    properties: {
                        email: {
                            type: "string",
                            description: "Customer E-mail",
                        },
                    },
                },
                response: {
                    200: {
                        description: "Customer was found",
                        type: "object",
                        properties: {
                            id: { type: "integer" },
                            name: { type: "string" },
                            email: { type: "string" },
                            subscriptions: {
                                type: "array",
                                properties: {
                                    id: { type: "integer" },
                                    currency: { type: "string" },
                                    productId: { type: "string" },
                                    status: { type: "string" },
                                },
                            },
                        },
                    },
                },
            },
        },
        CustomerController.findByEmail
    );
    fastify.put(
        `${url}/:id`,
        {
            schema: {
                description: "Update Customer",
                tags: ["Customer"],
                params: {
                    type: "object",
                    properties: {
                        id: {
                            type: "integer",
                            description: "Example ID",
                        },
                    },
                },
                body: {
                    name: { type: "string" },
                    document: { type: "string" },
                    email: { type: "string" },
                },
                response: {
                    200: {
                        description: "Customer has been updated",
                        type: "object",
                        properties: {
                            id: { type: "integer" },
                            name: { type: "string" },
                            email: { type: "string" },
                        },
                    },
                    204: {
                        description: "Missing Customer content",
                        type: "string",
                    },
                },
            },
        },
        CustomerController.update
    );
    fastify.delete(
        `${url}/:id`,
        {
            schema: {
                description: "Delete Customer By Id",
                tags: ["Customer"],
                params: {
                    type: "object",
                    properties: {
                        id: {
                            type: "integer",
                            description: "Customer ID",
                        },
                    },
                },
                response: {
                    200: {
                        description: "Customer has been deleted",
                        type: "string",
                    },
                    204: {
                        description: "Missing Customer identifier",
                        type: "string",
                    },
                },
            },
        },
        CustomerController.delete
    );
    fastify.delete(
        url,
        {
            schema: {
                description: "Delete all Customer",
                tags: ["Customer"],
                response: {
                    200: {
                        description: "All Customer have been deleted",
                        type: "string",
                    },
                },
            },
        },
        CustomerController.deleteAll
    );
};

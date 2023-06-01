const ProductController = require("../controllers/product");
const url = "/v1/product";

module.exports = (fastify) => {
    fastify.get(
        `${url}`,
        {
            schema: {
                description: "Find All Product",
                tags: ["Product"],
                params: {},
                schema: {
                    queryString: {
                        type: "object",
                        properties: {
                            currency: {
                                type: "string",
                                description: "Products Currency",
                            },
                        },
                    },
                },
                response: {
                    200: {
                        description: "Products were found",
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                id: { type: "string" },
                                active: { type: "boolean" },
                                description: { type: "string" },
                                name: { type: "string" },
                                images: {
                                    type: "array",
                                    items: { type: "string" },
                                },
                                metadata: { type: "object" },
                                prices: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            id: { type: "string" },
                                            object: { type: "string" },
                                            active: { type: "boolean" },
                                            currency: { type: "string" },
                                            billing_scheme: { type: "string" },
                                            type: { type: "string" },
                                            unit_amount: { type: "number" },
                                            unit_amount_decimal: { type: "string" },
                                            recurring: {
                                                type: "object",
                                                properties: {
                                                    interval: { type: "string" },
                                                }
                                            }
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        ProductController.findAll
    );
    fastify.get(
        `${url}/:id`,
        {
            schema: {
                description: "Find All Product",
                tags: ["Product"],
                params: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            description: "Product ID",
                        },
                    },
                },
                response: {
                    200: {
                        description: "Products were found",
                        type: "object",
                        properties: {
                            id: { type: "string" },
                            active: { type: "boolean" },
                            description: { type: "string" },
                            name: { type: "string" },
                            images: { type: "array" },
                        },
                    },
                },
            },
        },
        ProductController.findOne
    );
};

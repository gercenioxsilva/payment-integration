const CouponsController = require("../controllers/coupons");
const url = "/v1/counpons";

module.exports = (fastify) => {
    fastify.get(
        url,
        {
            schema: {
                description: "Find All Coupons",
                tags: ["Coupons"],
                params: {},
                response: {
                    200: {
                        description: "Coupons were found",
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                id: { type: "string" },
                                name: { type: "string" },
                                currency: { type: "string" },
                            },
                        },
                    },
                },
            },
        },
        CouponsController.findAll
    );
    fastify.get(
        `${url}/:id`,
        {
            schema: {
                description: "Find All Coupons",
                tags: ["Coupons"],
                params: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            description: "Coupons ID",
                        },
                    },
                },
                response: {
                    200: {
                        description: "Coupons were found",
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                id: { type: "string" },
                                name: { type: "string" },
                                currency: { type: "string" },
                            },
                        },
                    },
                },
            },
        },
        CouponsController.findOne
    );
};

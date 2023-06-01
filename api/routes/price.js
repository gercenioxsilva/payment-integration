const PriceController = require("../controllers/price");
const url = "/v1/price";

module.exports = (fastify) => {
    fastify.get(
        `${url}/:id`,
        {
            schema: {
                description: "Find Price by Product",
                tags: ["Price"],
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
                            currency: { type: "string" },
                            product: { type: "string" },
                            unit_amount: { type: "number" },
                            unit_amount_decimal: { type: "string" },
                        },
                    },
                },
            },
        },
        PriceController.findByProduct
    );
};

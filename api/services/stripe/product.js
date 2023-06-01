"use strict";
const stripe = require("../../config/stripe");

class ProductStripeService {
    static create = async (product) => {
        const stripeProduct = await stripe.products.create(product);
        return stripeProduct;
    };

    static retrieve = async (id) => {
        const stripeProduct = await stripe.products.retrieve(id);
        return stripeProduct;
    };

    static update = async (id, product) => {
        const stripeProduct = await stripe.products.update(id, product);
        return stripeProduct;
    };

    static list = async (filter) => {
        const stripeProducts = await stripe.products.list(filter);
        return stripeProducts.data;
    };

    static delete = async (id) => {
        const stripeProduct = await stripe.products.del(id);
        return stripeProduct;
    };
}
module.exports = ProductStripeService;

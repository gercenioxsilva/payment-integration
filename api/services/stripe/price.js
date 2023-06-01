"use strict";
const stripe = require("../../config/stripe");

class PriceStripeService {
    static create = async (price) => {
        const stripePrice = await stripe.prices.create({
            unit_amount: price.unit_amount,
            currency: price.currency,
            recurring: { interval: price.interval },
            product: price.product,
        });
        return stripePrice;
    };

    static list = async (filter) => {
        const stripePrice = await stripe.prices.list(filter);
        return stripePrice.data;
    };
}

module.exports = PriceStripeService;

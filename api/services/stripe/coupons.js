"use strict";
const stripe = require("../../config/stripe");

class CouponsStripeService {

    static list = async(filter) => {
        const stripeCoupons = await stripe.coupons.list(filter);
        return stripeCoupons.data;
    };

    static retrieve = async(id) => {
        const stripeCoupons = await stripe.coupons.retrieve(id);
        return stripeCoupons;
    };

};

module.exports = CouponsStripeService;

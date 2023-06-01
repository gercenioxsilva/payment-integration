"use strict";
const stripe = require("../../config/stripe");

class CustomerStripeService {
    static created = async (customer) => {
        const { email, name } = customer;
        const stripeCustomer = await stripe.customers.create({
            email: email,
            description: name,
            name: name,
        });
        return stripeCustomer;
    };

    static update = async (customerId, paymentMethodId) => {
        const stripeCustomer = await stripe.customers.update(customerId, {
            invoice_settings: { default_payment_method: paymentMethodId },
        });
        return stripeCustomer;
    };
}

module.exports = CustomerStripeService;

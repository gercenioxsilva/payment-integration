"use strict";
const stripe = require("../../config/stripe");

class PaymentMethodStripeService {
    
    static create = async (card) => {
        const stripePayment = await stripe.paymentMethods.create(
            {
                type: 'card',
                card: {
                    number: card.number,
                    exp_month: card.exp_month,
                    exp_year: card.exp_year,
                    cvc: card.cvc,
                  },

            });
        return stripePayment;
    };

    static attach = async(paymentMethodId,customerId) => {
        const stripePayment = await stripe.paymentMethods.attach(
            paymentMethodId,
            {customer: customerId}
          );
        return stripePayment;  
    };
}

module.exports = PaymentMethodStripeService;


const stripe = require("../../config/stripe");

class CardStripeService {
    static create = async (card) => {
        const { number, expMonth, expYear, cvc } = card;

        const stripeCard = await stripe.tokens.create({
            card: {
                number: number,
                exp_month: expMonth,
                exp_year: expYear,
                cvc: cvc,
            },
        });

        return stripeCard;
    };
}
module.exports = CardStripeService;

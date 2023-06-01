const stripe = require("../../config/stripe");

class SubscriptionStripeService {
    static create = async (signature) => {
        const stripeSubscription = await stripe.subscriptions.create(signature);
        return stripeSubscription;
    };

    static retrieve = async (id) => {
        const stripeSubscription = await stripe.subscriptions.retrieve(id);
        return stripeSubscription;
    };

    static update = async (id, signature) => {
        const stripeSubscription = await stripe.subscriptions.update(
            id,
            signature
        );
        return stripeSubscription;
    };

    static cancel = async (id) => {
        const stripeSubscription = await stripe.subscriptions.del(id);
        return stripeSubscription;
    };

    static list = async (filter) => {
        const stripeSubscriptions = await stripe.subscriptions.list(filter);
        return stripeSubscriptions;
    };
}

module.exports = SubscriptionStripeService;

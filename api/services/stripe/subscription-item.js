const stripe = require("../../config/stripe");

class SubscriptionItemStripeService {
    static create = async (signatureItem) => {
        const stripeSubscriptionItem = await stripe.subscriptionItems.create(
            signatureItem
        );
        return stripeSubscriptionItem;
    };

    static retrieve = async (id) => {
        const stripeSubscriptionItem = await stripe.subscriptionItems.retrieve(
            id
        );
        return stripeSubscriptionItem;
    };

    static update = async (id, signatureItem) => {
        const stripeSubscriptionItem = await stripe.subscriptionItems.update(
            id,
            signatureItem
        );
        return stripeSubscriptionItem;
    };

    static delete = async (id) => {
        const stripeSubscriptionItem = await stripe.subscriptionItems.del(id);
        return stripeSubscriptionItem;
    };

    static list = async (filter) => {
        const stripeSubscriptionItems = await stripe.subscriptionItems.list(
            filter
        );
        return stripeSubscriptionItems;
    };
}

module.exports = SubscriptionItemStripeService;

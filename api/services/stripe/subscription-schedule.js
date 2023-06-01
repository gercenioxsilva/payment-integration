const stripe = require("../../config/stripe");

class SubscriptionScheduleStripeService {
    static create = async (subscriptionSchedule) => {
        const stripeSubscriptionSchedule = await stripe.subscriptionSchedules.create(
            subscriptionSchedule
        );
        return stripeSubscriptionSchedule;
    };

    static retrieve = async (id) => {
        const stripeSubscriptionSchedule = await stripe.subscriptionSchedules.retrieve(
            id
        );
        return stripeSubscriptionSchedule;
    };

    static update = async (id, subscriptionSchedule) => {
        const stripeSubscriptionSchedule = await stripe.subscriptionSchedules.update(
            id,
            subscriptionSchedule
        );
        return stripeSubscriptionSchedule;
    };

    static cancel = async (id) => {
        const stripeSubscriptionSchedule = await stripe.subscriptionSchedules.cancel(
            id
        );
        return stripeSubscriptionSchedule;
    };

    static release = async (id) => {
        const stripeSubscriptionSchedule = await stripe.subscriptionSchedules.release(
            id
        );
        return stripeSubscriptionSchedule;
    };

    static list = async (filter) => {
        const stripeSubscriptionSchedules = await stripe.subscriptionSchedules.list(
            filter
        );
        return stripeSubscriptionSchedules;
    };
}

module.exports = SubscriptionScheduleStripeService;

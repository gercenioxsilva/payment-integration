const WebHookService = require("../services/webhook");
const InvoiceService = require("../services/invoice");
const TransactionService = require("../services/transaction");
const StatusInvoice = require("../constants/status-invoice");
const { v4: uuidv4 } = require("uuid");

class WebhookController {
    static create = async (req, res) => {
        const event = req.body;

        await WebHookService.create(event.data);

        switch (event.type) {
            case "invoice.created":
                const invoiceCreate = event.data.object;
                await InvoiceService.create(invoiceCreate);
                break;
            case "invoice.paid":
                const invoicePaid = event.data.object;
                await InvoiceService.update(invoicePaid);
                break;
            case "invoice.payment_failed":
                const invoicePaymentFailed = event.data.object;
                await InvoiceService.update(invoicePaymentFailed);
                break;
            case "invoice.finalized":
                const invoiceFinalized = event.data.object;
                await InvoiceService.create(invoiceFinalized);
                break;
            case "invoice.updated":
                const invoiceUpdate = event.data.object;
                await InvoiceService.update(invoiceUpdate);
                break;
            default:
                // Unexpected event type
                console.log(`Unhandled event type ${event.type}.`);
        }

        res.send();
    };
}

module.exports = WebhookController;

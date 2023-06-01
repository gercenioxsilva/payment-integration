const database = require("../config/database");
const Invoice = database["invoice"];
const CustomerParameters = database["customer-parameter"];
const KeysParameters = require("../constants/keys-parameter");
const StatusInvoice = require("../constants/status-invoice");

class InvoiceService {
    static create = async (invoice) => {
        const invoiceLegacy = await Invoice.findOne({
            where: { code: invoice.id },
            attributes: ["code", "amount", "currency", "customerId", "id"],
        });

        if (!invoiceLegacy) {
            const customerParameters = await CustomerParameters.findOne({
                where: {
                    value: invoice.customer,
                    key: KeysParameters.STRIPE_CUSTOMER_KEY,
                },
                attributes: ["customerId"],
            });

            if (customerParameters) {
                const invoiceNew = {
                    code: invoice.id,
                    amount: invoice.amount_paid,
                    url: invoice.hosted_invoice_url,
                    pdf: invoice.invoice_pdf,
                    currency: invoice.currency,
                    customerId: customerParameters.customerId,
                    status: invoice.paid
                        ? StatusInvoice.PAID
                        : StatusInvoice.OPEN,
                };

                return Invoice.create(invoiceNew).then((data) => {
                    return data;
                });
            }
        }
    };
    static update = async (invoice) => {
        const invoiceLegacy = await Invoice.findOne({
            where: { code: invoice.id },
            attributes: ["code", "amount", "currency", "customerId", "id"],
        });

        if (invoiceLegacy) {
            const invoiceUpdate = {
                code: invoiceLegacy.code,
                amount: invoiceLegacy.amount,
                currency: invoiceLegacy.currency,
                customerId: invoiceLegacy.customerId,
                status: invoice.paid ? StatusInvoice.PAID : StatusInvoice.OPEN,
            };

            return Invoice.update(invoiceUpdate, {
                where: { id: invoiceLegacy.id },
            }).then((data) => {
                return data;
            });
        }
    };
}

module.exports = InvoiceService;

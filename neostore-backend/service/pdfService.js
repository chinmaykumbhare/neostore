const PDF = require("pdfkit");
const fs = require("fs");

// function buildPDF(order, dataCallback, endCallback) {
//     const doc = new PDF();
//     doc.on("data", dataCallback);
//     doc.on("end", endCallback);
//     doc.fontSize(24).text("Invoice", {underline: true});
//     doc.end();
// }

function buildPDF(order) {
    const doc = new PDF();
    doc.pipe(fs.createWriteStream("E:\\Assignments\\neostore\\neostore-backend\\invoice\\invoice.pdf"));
    doc.fontSize(24).text("Invoice");
    doc.text("                                                                      ", { underline: true });
    order.map((item) => {
        doc.fontSize(18).text("" + item.product.name + ": ", { continued: true }).text("Qty: " + item.quantity);
    })
    doc.text("                                                                                             ", { underline: true });
    doc.end();
}

module.exports = { buildPDF };
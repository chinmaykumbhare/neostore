const pdfService = require("../service/pdfService");

const router = require("express").Router();

router.post("/", async (request, response) => {
    // const stream = response.writeHead(200, {
    //     "Content-Type": "application/pdf",
    //     "Content-Disposition": "attachment;filename=invoice.pdf"
    // });

    // // console.log(request.query.order);

    // pdfService.buildPDF(JSON.parse(request.body.order),
    //     chunk => stream.write(chunk),
    //     () => stream.end()
    // );

    const order = JSON.parse(request.query.order);

    pdfService.buildPDF(order);
    response.send("hit");

});

router.get("/", async (request, response) => {
    const stream = response.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment;filename=invoice.pdf"
    });

    pdfService.buildPDF(request.body.order,
        chunk => stream.write(chunk),
        () => stream.end()
    );

});

module.exports = router;
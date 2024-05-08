const express = require('express');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs').promises;

const app = express();
const PORT = 5000;

app.use(express.json());

app.post('/fill-pdf', async (req, res) => {
    try {
        const formData = req.body;

        // Load existing PDF file
        const pdfBytes = await fs.readFile('existing-pdf.pdf');
        const pdfDoc = await PDFDocument.load(pdfBytes);

        // Fill form fields with formData
        const form = pdfDoc.getForm();
        for (const [fieldName, fieldValue] of Object.entries(formData)) {
            const field = form.getField(fieldName);
            if (field) {
                field.setText(fieldValue);
            }
        }

        // Send the filled PDF as response
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="filled-pdf.pdf"');
        res.send(await pdfDoc.save());
    } catch (error) {
        console.error('Error filling PDF:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

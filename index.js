const {PDFDocument} = require('pdf-lib')

const {readFile, writeFile} = require('fs/promises')
async function createPdf(input, output){
    
    try{
        const pdfDoc = await PDFDocument.load(await readFile(input))

        const form = pdfDoc.getForm()
        const fields = form.getFields()
        const fieldNames = fields.map(field => field.getName())
        console.log('Field Names:', fieldNames)
        
        form.getTextField(fieldNames[0]).setText("123345")
        form.getCheckBox(fieldNames[4]).check()
        form.getRadioGroup(fieldNames[1]).select("M")
        form.getTextField(fieldNames[6]).setText("")
        form.getTextField(fieldNames[7]).setText("NGK")
        form.getTextField(fieldNames[8]).setText("NGK")
        form.getTextField(fieldNames[9]).setText("631027")
        form.getTextField(fieldNames[10]).setText("shyam@gmail.com")
        form.getTextField(fieldNames[11]).setText("Sundaar")
        form.getTextField(fieldNames[12]).setText("Shyam")
        
        const pdfBytes = await pdfDoc.save()
        await writeFile(output, pdfBytes)
    }catch(error){
        console.log(error)
    }
}


createPdf("inputpdf.pdf", "output.pdf");

import prisma from '../../../packages/db/index'
import express from 'express'
import PDFParser from 'pdf-parse'
import cors from 'cors'
const app = express();
const fs = require('fs');
app.use(express.json());
function extractTextFromPDF(pdfPath: any) {
  return new Promise((resolve, reject) => {
      // Read PDF file

      const pdfBuffer = fs.readFileSync(pdfPath);

      // Parse PDF
      PDFParser(pdfBuffer).then((data : any)=> {
          // Extracted text
          const text = data.text;
          resolve(text);
      }).catch((error: any) => {
          reject(error);
      });
  });
}

app.use(cors());

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req:any, file: any, cb: any) {
    cb(null, './files')
  },
  filename: function (req: any, file: any, cb: any) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname)
  }
})
const upload = multer({storage})
app.get('/', (req: any, res: any) => {
  res.send('hello world')
})
app.post('/upload-file', upload.single('file'), async (req: any, res: any) => {
  console.log(req.file);
  const pdfPath =  req.file.path
extractTextFromPDF(pdfPath)
    .then(text => {
        console.log('Text extracted from PDF:');
        console.log(text);
        res.json({text})
    })
    .catch(error => {
        console.error('Error extracting text from PDF:', error);
    });
})

app.listen(3001, () => {
  console.log('server running on port 3001');
})

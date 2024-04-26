const express = require('express')
const PDFParser = require('pdf-parse')
const cors = require('cors')
const multer = require('multer');
const app = express();
const fs = require('fs');
app.use(express.json());

function extractTextFromPDF(pdfPath) {
  return new Promise((resolve, reject) => {
      // Read PDF file

      const pdfBuffer = fs.readFileSync(pdfPath);

      // Parse PDF
      PDFParser(pdfBuffer).then((data)=> {
          // Extracted text
          const text = data.text;
          resolve(text);
      }).catch((error) => {
          reject(error);
      });
  });
}

app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});
const upload = multer({storage})
app.get('/', (req, res) => {
  res.send('hello world')
})
app.post('/upload-file', upload.single('file'), async (req, res) => {
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

const Tesseract = require('tesseract.js');
const fs = require('fs');

// Define the path to your image file
const imagePath = 'siam.jpg';

// Initialize Tesseract.js with the English language
const { createWorker } = Tesseract;
const worker = createWorker({
  logger: m => console.log(m),
});

(async () => {
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');

  try {
    const { data: { text } } = await worker.recognize(imagePath);
    console.log('Text extracted from the image:');
    console.log(text);

    // Optionally, you can save the extracted text to a file
    fs.writeFileSync('extracted_text.txt', text);

    await worker.terminate();
  } catch (error) {
    console.error('Error:', error);
    await worker.terminate();
  }
})();

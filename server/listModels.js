const dotenv = require('dotenv');
dotenv.config();

const key = process.env.GEMINI_API_KEY;

async function listModels() {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1/models?key=${key}`);
    const data = await res.json();
    if (data.error) {
        console.error('Error:', data.error.message);
        return;
    }
    const supported = data.models.filter(m =>
        m.supportedGenerationMethods?.includes('generateContent')
    );
    console.log('Available models for generateContent:');
    supported.forEach(m => console.log(' -', m.name));
}

listModels().catch(console.error);

const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const geminiKey = process.env.GEMINI_API_KEY ||
    process.env.GEMINI_API_URL ||
    process.env.GEMINI_APT_KEY ||
    process.env.GEMINT_APT_KEY;

const genAI = new GoogleGenerativeAI(geminiKey);

const systemInstruction = `You are an expert SQL tutor helping students learn SQL. 
Your role is to provide helpful hints WITHOUT giving away the full answer.
- Keep responses to 2-3 sentences max.
- Never provide the complete SQL solution.
- Point out what clause or concept they might be missing.
- Be encouraging and educational.`;

// Simple cache to avoid repeat API hits
const hintCache = new Map();

const getHint = async (req, res) => {
    const { query, assignment, error: clientError } = req.body;

    if (!assignment) {
        return res.status(400).json({ error: 'Assignment context is required' });
    }

    const cacheKey = `${assignment._id}-${query}`;
    if (hintCache.has(cacheKey)) {
        return res.json({ hint: hintCache.get(cacheKey) });
    }

    try {
        // Use gemini-2.0-flash which was confirmed in listModels.js
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.0-flash',
            systemInstruction: systemInstruction
        });

        const prompt = `Assignment Question: ${assignment.question}
Available Tables: ${assignment.sampleTables?.map(t => t.tableName).join(', ')}
Student's Current Query: ${query || 'Nothing written yet'}
Error they are seeing: ${clientError || 'None'}

Give a short hint to guide them.`;

        const result = await model.generateContent(prompt);
        const hint = result.response.text();

        hintCache.set(cacheKey, hint);
        res.json({ hint });

    } catch (err) {
        console.error('Gemini error:', err.message || err);

        // Check for rate limit / quota issues
        if (err.message?.includes('429') || err.message?.toLowerCase().includes('quota') || err.message?.includes('limit')) {
            return res.status(429).json({ error: 'Gemini rate limit reached. Please wait a minute and try again.' });
        }

        res.status(500).json({ error: `Gemini error: ${err.message || 'Unknown error'}` });
    }
};

module.exports = { getHint };

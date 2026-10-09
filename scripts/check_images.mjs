import { GoogleGenAI } from '@google/genai';
import fs from 'fs';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const files = fs.readdirSync('/tmp/karun_images').filter(f => f.endsWith('.jpeg') && fs.statSync('/tmp/karun_images/' + f).size > 100000);

for (const f of files) {
  if (f === 'c-1753029864076-1753029863223_barbara_pavez_1929b60b-7863-4359-91c6-566cd0932fdb.jpeg') continue;
  const data = fs.readFileSync('/tmp/karun_images/' + f);
  let success = false;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      await new Promise(r => setTimeout(r, 2000));
      const resp = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [
          {
            role: 'user',
            parts: [
              { inlineData: { mimeType: 'image/jpeg', data: data.toString('base64') } },
              { text: 'What is shown in this picture? Focus on: is it a woman/barista smiling, coffee trailer, cups/sunflowers? Max 15 words.' }
            ]
          }
        ]
      });
      const line = `${f}: ${resp.text?.trim()}`;
      console.log(line);
      fs.appendFileSync('/tmp/results.txt', line + '\n');
      success = true;
      break;
    } catch (e) {
      console.log(`Retry ${attempt} for ${f}: ${e.message}`);
      await new Promise(r => setTimeout(r, 3000));
    }
  }
}

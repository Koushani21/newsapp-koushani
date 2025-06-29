// src/utils/summarize.js

export const summarizeArticle = async (title, description, url) => {
  const GEMINI_API_KEY = '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';

  let articleText = '';

  try {
    const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
    const data = await res.json();

    const parser = new DOMParser();
    const doc = parser.parseFromString(data.contents, 'text/html');
    const paragraphs = Array.from(doc.querySelectorAll('p'));
    articleText = paragraphs.map(p => p.textContent).join('\n').slice(0, 3500);

    if (!articleText || articleText.length < 100) {
      throw new Error('Too short, using fallback.');
    }
  } catch (err) {
    console.warn('⚠ Failed to fetch article body. Using title and description instead.');
    articleText = `${title}\n\n${description}`;
  }

  const initialPrompt = `
Summarize the following news article in exactly 3 clear bullet points.

• Each point should be 20–30 words.
• Avoid copying the article verbatim.
• Capture the main ideas.

Article:
${articleText}
`;

  let roughSummary = '';

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GEMINI_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://localhost:3000',
      },
      body: JSON.stringify({
        model: 'google/gemini-pro',
        messages: [{ role: 'user', content: initialPrompt }],
        temperature: 0.6,
      }),
    });

    const data = await response.json();
    roughSummary = data.choices?.[0]?.message?.content?.trim();

    if (!roughSummary || roughSummary.length < 10) throw new Error('Empty Gemini summary');
  } catch (err) {
    console.warn('❌ Stage 1 (summary) failed:', err.message);
    return [
      `• Summary of the article is:`,
      `• Title: ${title}`,
      `• Description: ${description}`,
    ].join('\n');
  }

  const rewordPrompt = `
Rephrase the following 3 bullet points using:

• Passive voice (where possible)
• Different vocabulary (synonyms)
• Short, clear sentence structure

Keep the same meaning, but make the phrasing original.

Original:
${roughSummary}
`;

  try {
    const response2 = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GEMINI_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://localhost:3000',
      },
      body: JSON.stringify({
        model: 'google/gemini-pro',
        messages: [{ role: 'user', content: rewordPrompt }],
        temperature: 0.5,
      }),
    });

    const final = await response2.json();
    const finalSummary = final.choices?.[0]?.message?.content?.trim();

    if (!finalSummary || finalSummary.length < 10) throw new Error('Final Gemini response failed');
    return finalSummary;
  } catch (err) {
    console.warn('❌ Stage 2 (rewording) failed:', err.message);
    return roughSummary;
  }
};

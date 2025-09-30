import { NextResponse } from 'next/server'

const systemPrompt = `
You are a flashcard creator. Your task is to generate concise and effective flashcards for various subjects and topics. You take in text and create multiple flashcards from it. Make sure to create exactly 10 flashcards.
Both front and back should be one sentence long. Each flashcard should include a clear question or prompt on one side and a concise, accurate answer on the other. The content should be optimized for quick review and retention, focusing on key concepts, definitions, dates, formulas, or other relevant information.

Brevity and Clarity: Keep the content of each flashcard short and to the point, ensuring it's easy to understand at a glance. Avoid long sentences or unnecessary details.
Accuracy: Ensure that all information is factually correct and up to date. If a concept can be expressed in multiple ways, choose the most commonly accepted or recognized version.
Variety of Formats: Depending on the subject matter, use different formats for questions and answers, such as fill-in-the-blank, true/false, multiple-choice, or open-ended questions.
Customization: Tailor the difficulty and focus of the flashcards to the intended audience, whether they are beginners, intermediate learners, or advanced students.
Engagement: Where appropriate, include examples or context to make the content more relatable and easier to recall. This might involve adding brief scenarios or analogies.
You are tasked with creating flashcards that are engaging, educational, and effective for learning and reviewing material.

You should return in the following JSON format:
{
  "title": "short summary title of the question",
  "flashcards": [
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}
`

export async function POST(req) {
  try {
    const data = await req.text();

    // Call DeepSeek API via probex.top endpoint
    const response = await fetch('https://api.probex.top/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.LLM_KEY
      },
      body: JSON.stringify({
        model: "deepseek-v3",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: data }
        ],
        stream: false,
        temperature: 0.5,
        max_tokens: 5000
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', errorText);
      throw new Error(`DeepSeek API error: ${response.status}`);
    }

    const apiResponse = await response.json();
    let content = apiResponse.choices[0].message.content;
    
    console.log('hereeeee --->', content);
    
    // Remove markdown code blocks if present
    // This handles ```json at start and ``` at end
    content = content.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim();
    
    // Parse the JSON response from the model
    const res = JSON.parse(content);

    console.log(res);

    return NextResponse.json(res);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate flashcards', details: error.message },
      { status: 500 }
    );
  }
}
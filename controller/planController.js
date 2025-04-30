// // controllers/planController.js
// import { ChatOpenAI } from "@langchain/openai";
// import { HumanMessage } from "@langchain/core/messages";

// export const generateFitnessPlan = async (req, res) => {
//     try {
//         const { prompt } = req.body;

//         if (!prompt) {
//             return res.status(400).json({ error: "Prompt is required." });
//         }

//         const finalPrompt = `${prompt}\n\nPlease make the program key and put all prompt format data in JSON format for parsing make sure during parse it should not give error and i need full user defind week data with user defind structure structured data for all weeks understand the user prompt and give result.    
//            `;

//         const chat = new ChatOpenAI({
//             temperature: 0.7,
//             modelName: "gpt-4",
//             openAIApiKey: process.env.OPENAI_API_KEY,
//         });

//         const response = await chat.call([new HumanMessage(finalPrompt)]);

//         res.status(200).json({ result: response.text });
//     } catch (error) {
//         console.error("Error generating fitness plan:", error.message);
//         res.status(500).json({ error: "Failed to generate plan." });
//     }
// };

import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

export const generateFitnessPlan = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required." });
    }

    const systemPrompt = `
You are a professional fitness assistant. 
Your task is to generate a detailed and structured workout plan based on user input. 

You must strictly follow this format in your response:
- Return a single JSON object with the following structure:
{
  "name": string,
  "level": string,
  "training_style": string[],
  "focus": {
    "primary": string[],
    "secondary": string[]
  },
  "frequency": number,
  "session_duration": string,
  "equipment": string[],
  "training_intensifiers": string[],
  "progressive_overload": boolean,
  "program_structure": {
    "week1": {
      "day1": {
       "A": {
                "exercise1": "A1",
                "equipment" : "Barbell and rack"
                "sets": 3,
                "reps" : "12,10,8",
                "rest-time" : "12,23,12",
                "Note" : "1-3-1 tempo"
            },
            "B": {
                "exercise1": "A1",
                "equipment" : "Barbell and rack"
                "sets": 3,
                "reps" : "12,10,8",
                "rest-time" : "12,23,12",
                "Note" : "1-3-1 tempo"
            },
            ...
      },
      "day2": { ... },
      ...
    },
    "week2": { ... },
    ...
  }
}

Rules:
- Ensure the JSON is **valid and directly parsable** — no markdown, no code blocks, no extra text.
- The "program_structure" must reflect the full multi-week, multi-day plan with user-defined splits.
- No explanations, just the pure JSON result.
`;

    const userPrompt = `
${prompt}

Please generate a complete weekly workout program based on my goals.
`;

    const chat = new ChatOpenAI({
      temperature: 0.7,
      modelName: "gpt-4",
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    const response = await chat.call([
      new SystemMessage(systemPrompt),
      new HumanMessage(userPrompt),
    ]);

    res.status(200).json({ result: response.text });
  } catch (error) {
    console.error("Error generating fitness plan:", error.message);
    res.status(500).json({ error: "Failed to generate plan." });
  }
};

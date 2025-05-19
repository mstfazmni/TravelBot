import axios from 'axios';

const apiKey = process.env.REACT_APP_OPENAI_API_KEY; 

export const getBotResponse = async (userMessage) => {
    try{
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1s delay

        const response = await axios.post(
             'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: userMessage }]
            },
            {
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
                },
            }
        );
        
    return response.data.choices[0].message.content;


    } catch (error) {
        if (error.response && error.response.status === 429) {
            return "⚠️ Rate limit reached. Please wait a few seconds and try again.";
        }
        console.error("OpenAI API error:", error);
        return "Sorry, something went wrong.";


    }
};
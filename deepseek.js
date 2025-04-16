const fetchAIResponse = async (input) => {
    const apiKey = 'sk-72a70fe166544bc0a3a551d94808915d'; // Replace with your API key securely
    const apiUrl = 'https://api.deepseek.com/v1/chat/completions'; // Replace with the actual API endpoint

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input }),
    });

    const data = await response.json();
    console.log(data); // Use this data on your page
};

fetchAIResponse("Hello! How may I assist you today");

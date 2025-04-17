document.getElementById('sendButton').addEventListener('click', async () => {
    const userInput = document.getElementById('userInput').value;
    const messagesDiv = document.getElementById('messages');

    // Display user message
    messagesDiv.innerHTML += `<div>User: ${userInput}</div>`;

    // Fetch AI response
    const aiResponse = await fetchAIResponse(userInput);

    // Display AI response
    messagesDiv.innerHTML += `<div>AI: ${aiResponse.message}</div>`;
});

try {
    const response = await fetchAIResponse(userInput);
    if (response.error) throw new Error(response.error);
    // Display the response
} catch (error) {
    console.error('Error fetching AI response:', error);
    messagesDiv.innerHTML += `<div>Error: Unable to fetch response.</div>`;
}

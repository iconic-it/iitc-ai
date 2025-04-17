document.getElementById('sendButton').addEventListener('click', async () => {
    const userInput = document.getElementById('userInput').value;
    const messagesDiv = document.getElementById('messages');

    // Check if input is empty
    if (!userInput.trim()) {
        messagesDiv.innerHTML += `<div style="color: red;">Error: Please enter a message.</div>`;
        return;
    }

    // Display user message
    messagesDiv.innerHTML += `<div><b>User:</b> ${userInput}</div>`;

    try {
        // Fetch AI response
        const aiResponse = await fetchAIResponse(userInput);

        // Display AI response
        if (aiResponse && aiResponse.message) {
            messagesDiv.innerHTML += `<div><b>AI:</b> ${aiResponse.message}</div>`;
        } else {
            messagesDiv.innerHTML += `<div><b>AI:</b> Error: Received an invalid response.</div>`;
        }
    } catch (error) {
        console.error('Error fetching AI response:', error);
        messagesDiv.innerHTML += `<div><b>Error:</b> Unable to fetch response.</div>`;
    }

    // Clear user input
    document.getElementById('userInput').value = '';
});

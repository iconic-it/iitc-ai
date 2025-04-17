document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('sendButton');
    const userInput = document.getElementById('userInput');
    const messagesDiv = document.getElementById('messages');

    // Handle send button click
    sendButton.addEventListener('click', sendMessage);

    // Handle Enter key press
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    async function sendMessage() {
        const message = userInput.value.trim();

        // Check if input is empty
        if (!message) {
            displayMessage('Error: Please enter a message.', 'error');
            return;
        }

        // Display user message
        displayMessage(message, 'user');

        try {
            // Show typing indicator
            const typingIndicator = displayMessage('AI is typing...', 'ai-typing');
            
            // Fetch AI response
            const aiResponse = await fetchAIResponse(message);
            
            // Remove typing indicator and show actual response
            messagesDiv.removeChild(typingIndicator);
            displayMessage(aiResponse, 'ai');
        } catch (error) {
            console.error('Error:', error);
            displayMessage(`Error: ${error.message}`, 'error');
        }

        // Clear user input
        userInput.value = '';
        
        // Scroll to bottom
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    function displayMessage(content, type) {
        const messageElement = document.createElement('div');
        messageElement.style.margin = '5px 0';
        messageElement.style.padding = '8px';
        messageElement.style.borderRadius = '5px';
        
        switch(type) {
            case 'user':
                messageElement.innerHTML = `<b>You:</b> ${content}`;
                messageElement.style.backgroundColor = '#e3f2fd';
                messageElement.style.textAlign = 'right';
                break;
            case 'ai':
                messageElement.innerHTML = `<b>AI:</b> ${content}`;
                messageElement.style.backgroundColor = '#f5f5f5';
                break;
            case 'ai-typing':
                messageElement.innerHTML = `<b>AI:</b> <i>${content}</i>`;
                messageElement.style.color = '#666';
                return messagesDiv.appendChild(messageElement);
            case 'error':
                messageElement.innerHTML = `<b>Error:</b> ${content}`;
                messageElement.style.color = 'red';
                break;
        }
        
        messagesDiv.appendChild(messageElement);
        return messageElement;
    }
});

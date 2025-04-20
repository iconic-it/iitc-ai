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
            displayMessage('Please enter a message.', 'error');
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
        messageElement.style.maxWidth = '80%';
        messageElement.style.padding = '12px 16px';
        messageElement.style.borderRadius = '18px';
        messageElement.style.wordWrap = 'break-word';
        messageElement.style.boxShadow = '0 1px 2px rgba(0,0,0,0.2)';
        messageElement.style.transition = 'all 0.3s ease';
        messageElement.style.lineHeight = '1.5';
        messageElement.style.opacity = '0';
        messageElement.style.animation = 'fadeIn 0.3s ease-out forwards';
        
        // Process content to handle paragraphs and line breaks
        let processedContent = content;
        if (typeof content === 'string') {
            processedContent = content.replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>');
        }

        switch(type) {
            case 'user':
                messageElement.innerHTML = processedContent;
                messageElement.style.backgroundColor = '#2a3f5f';
                messageElement.style.color = '#ffffff';
                messageElement.style.marginLeft = 'auto';
                messageElement.style.borderBottomRightRadius = '4px';
                break;
            case 'ai':
                messageElement.innerHTML = processedContent;
                messageElement.style.backgroundColor = '#3a3a3a';
                messageElement.style.color = '#e0e0e0';
                messageElement.style.marginRight = 'auto';
                messageElement.style.borderBottomLeftRadius = '4px';
                messageElement.style.border = '1px solid #4a4a4a';
                break;
            case 'ai-typing':
                messageElement.innerHTML = `<div style="display: flex; align-items: center; gap: 8px;">
                    <div class="typing-dot" style="width: 8px; height: 8px; background-color: #7a7a7a; border-radius: 50%; animation: typingAnimation 1.4s infinite ease-in-out;"></div>
                    <div class="typing-dot" style="width: 8px; height: 8px; background-color: #7a7a7a; border-radius: 50%; animation: typingAnimation 1.4s infinite ease-in-out 0.2s;"></div>
                    <div class="typing-dot" style="width: 8px; height: 8px; background-color: #7a7a7a; border-radius: 50%; animation: typingAnimation 1.4s infinite ease-in-out 0.4s;"></div>
                </div>`;
                messageElement.style.backgroundColor = 'transparent';
                messageElement.style.color = '#7a7a7a';
                messageElement.style.marginRight = 'auto';
                messageElement.style.boxShadow = 'none';
                messageElement.style.fontStyle = 'italic';
                messageElement.style.animation = 'none';
                messageElement.style.opacity = '1';
                
                return messagesDiv.appendChild(messageElement);
            case 'error':
                messageElement.innerHTML = `<span style="color: #ff6b6b;">⚠️</span> ${processedContent}`;
                messageElement.style.backgroundColor = '#3a1e1e';
                messageElement.style.color = '#ff6b6b';
                messageElement.style.margin = '8px auto';
                messageElement.style.textAlign = 'center';
                messageElement.style.maxWidth = '90%';
                break;
        }
        
        messagesDiv.appendChild(messageElement);
        return messageElement;
    }
});

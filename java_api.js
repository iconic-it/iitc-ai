// java_api.js
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
            const typingIndicator = displayMessage('AI is processing...', 'ai-typing');
            
            // Fetch AI response
            const aiResponse = await fetchAIResponse(message);
            
            // Remove typing indicator and show actual response
            messagesDiv.removeChild(typingIndicator);
            displayMessage(aiResponse, 'ai');
        } catch (error) {
            console.error('Error:', error);
            displayMessage(`System Error: ${error.message}`, 'error');
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
        messageElement.style.borderRadius = '4px';
        messageElement.style.wordWrap = 'break-word';
        messageElement.style.boxShadow = '0 1px 3px rgba(0,0,0,0.3)';
        messageElement.style.transition = 'all 0.3s ease';
        messageElement.style.lineHeight = '1.5';
        messageElement.style.opacity = '0';
        messageElement.style.animation = 'fadeIn 0.3s ease-out forwards';
        messageElement.style.fontFamily = "'Courier New', monospace";
        messageElement.style.border = '1px solid';
        
        // Process content to handle paragraphs and line breaks
        let processedContent = content;
        if (typeof content === 'string') {
            processedContent = content.replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>');
        }

        switch(type) {
            case 'user':
                messageElement.innerHTML = processedContent;
                messageElement.style.backgroundColor = 'rgba(75, 0, 130, 0.2)';
                messageElement.style.color = '#d8bfd8';
                messageElement.style.marginLeft = 'auto';
                messageElement.style.borderColor = '#6a0dad';
                messageElement.style.borderLeft = '3px solid #9b30ff';
                messageElement.style.textAlign = 'right';
                break;
            case 'ai':
                messageElement.innerHTML = processedContent;
                messageElement.style.backgroundColor = 'rgba(11, 0, 22, 0.8)';
                messageElement.style.color = '#b19cd9';
                messageElement.style.marginRight = 'auto';
                messageElement.style.borderColor = '#4b0082';
                messageElement.style.borderRight = '3px solid #9b30ff';
                break;
            case 'ai-typing':
                messageElement.innerHTML = `<div style="display: flex; align-items: center; gap: 8px;">
                    <span style="color: #9b30ff;">SYSTEM:</span>
                    <div class="typing-dot" style="width: 8px; height: 8px; background-color: #9b30ff; border-radius: 50%; animation: typingAnimation 1.4s infinite ease-in-out;"></div>
                    <div class="typing-dot" style="width: 8px; height: 8px; background-color: #9b30ff; border-radius: 50%; animation: typingAnimation 1.4s infinite ease-in-out 0.2s;"></div>
                    <div class="typing-dot" style="width: 8px; height: 8px; background-color: #9b30ff; border-radius: 50%; animation: typingAnimation 1.4s infinite ease-in-out 0.4s;"></div>
                </div>`;
                messageElement.style.backgroundColor = 'transparent';
                messageElement.style.color = '#9b30ff';
                messageElement.style.marginRight = 'auto';
                messageElement.style.boxShadow = 'none';
                messageElement.style.fontStyle = 'italic';
                messageElement.style.animation = 'none';
                messageElement.style.opacity = '1';
                messageElement.style.border = 'none';
                
                return messagesDiv.appendChild(messageElement);
            case 'error':
                messageElement.innerHTML = `<span style="color: #ff3864;">⚠️ SYSTEM ALERT:</span> ${processedContent}`;
                messageElement.style.backgroundColor = 'rgba(40, 0, 20, 0.8)';
                messageElement.style.color = '#ff3864';
                messageElement.style.margin = '8px auto';
                messageElement.style.textAlign = 'center';
                messageElement.style.maxWidth = '90%';
                messageElement.style.border = '1px solid #ff3864';
                messageElement.style.borderLeft = '3px solid #ff3864';
                break;
        }
        
        messagesDiv.appendChild(messageElement);
        return messageElement;
    }
});

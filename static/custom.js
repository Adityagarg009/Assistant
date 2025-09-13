document.getElementById('target').onsubmit = async function(e) {
    e.preventDefault();

    const inputBox = document.getElementById('input_message');
    const userMessage = inputBox.value.trim();

    if (!userMessage) return; // Ignore empty messages

    // Display user message in chat
    addMessageToChat(userMessage, 'user');

    // Clear input box
    inputBox.value = '';

    try {
        // Send user message to backend /send_message
        const response = await fetch('/send_message', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({message: userMessage})
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Display bot reply in chat
        addMessageToChat(data.reply, 'bot');
    } catch (error) {
        addMessageToChat("Sorry, there was an error. Please try again later.", 'bot');
        console.error('Error in fetching bot response:', error);
    }
};


// Helper function: add message to chat window with CSS classes
function addMessageToChat(message, sender) {
    const chatContainer = document.querySelector('.message-area');

    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;

    // Add CSS classes for styling
    messageDiv.classList.add('message');
    if (sender === 'user') {
        messageDiv.classList.add('user');
    } else {
        messageDiv.classList.add('bot');
    }

    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to bottom
}


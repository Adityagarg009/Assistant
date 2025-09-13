document.getElementById('target').onsubmit = async function(e) {
    e.preventDefault();

    const inputBox = document.getElementById('input_message');
    const userMessage = inputBox.value.trim();

    if (!userMessage) return; 

    
    addMessageToChat(userMessage, 'user');

    
    inputBox.value = '';

    try {
       
        const response = await fetch('/send_message', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({message: userMessage})
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        
        addMessageToChat(data.reply, 'bot');
    } catch (error) {
        addMessageToChat("Sorry, there was an error. Please try again later.", 'bot');
        console.error('Error in fetching bot response:', error);
    }
};



function addMessageToChat(message, sender) {
    const chatContainer = document.querySelector('.message-area');

    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;

   
    messageDiv.classList.add('message');
    if (sender === 'user') {
        messageDiv.classList.add('user');
    } else {
        messageDiv.classList.add('bot');
    }

    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight; 
}


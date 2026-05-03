document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    // --- IMPORTANT: Apna Render Backend URL yahan daalein ---
    // Example: "https://my-backend-app.onrender.com"
    // Agar local par test kar rahe hain, toh isko "http://localhost:5000" rakhein.
    
    const API_URL = "https://chatbot-xpnd.onrender.com"; 

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        
        if (sender === 'user') {
            messageDiv.classList.add('user-message');
        } else {
            messageDiv.classList.add('bot-message');
        }
        
        messageDiv.textContent = text;
        chatBox.appendChild(messageDiv);
        
        // Auto-scroll to bottom
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function addTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('message', 'bot-message', 'typing-container');
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="typing-indicator">
                <span></span><span></span><span></span>
            </div>
        `;
        chatBox.appendChild(typingDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function removeTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }

    async function handleSend() {
        const text = userInput.value.trim();
        if (!text) return;

        // 1. Show user message
        addMessage(text, 'user');
        userInput.value = '';

        // 2. Show typing animation
        addTypingIndicator();

        try {
            // 3. Send to API
            const response = await fetch(`${API_URL}/ask`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ query: text })
            });

            const data = await response.json();
            
            // 4. Remove typing animation and show response
            removeTypingIndicator();
            
            if (response.ok) {
                addMessage(data.response, 'bot');
            } else {
                addMessage("Sorry, I encountered an error. Please try again.", 'bot');
                console.error("Server Error:", data);
            }

        } catch (error) {
            removeTypingIndicator();
            addMessage("Network error. Please check your connection to the server.", 'bot');
            console.error("Fetch Error:", error);
        }
    }

    // Event Listeners
    sendBtn.addEventListener('click', handleSend);
    
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    });
});
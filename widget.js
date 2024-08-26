console.log('Chat widget loading1...');
document.addEventListener('DOMContentLoaded', function() {
    console.log('Chat widget loading...');
        const chatWidget = document.querySelector('.chat-widget');
        
        // Delay the addition of the class to start the animation
        setTimeout(() => {
            chatWidget.classList.add('visible');
        }, 1000); // 1-second delay

    const characters = 
        [
            {
                id: '66ccb49b40f10c50bdee37d6',
                name: 'Legend Bot',
                title: 'Support Bot',
                description: `A simple bot to help you.`,
                image: '/images/mage_square.jpg'
            }
        ]
    ;

    const characterMessages = {
        '66ccb49b40f10c50bdee37d6': []
    };

    const chatMessages = document.querySelector('#chatMessages');
    const messageInput = document.querySelector('#messageInput');
    const sendMessageBtn = document.querySelector('#sendMessageBtn');
    const characterInfo = document.getElementById('characterInfo');
    let scrollContainer = document.getElementById('chatMessagesContainer');

    // Display welcome message
    displayWelcomeMessage();

    // Function to display a welcome message
    function displayWelcomeMessage() {

        const warning = document.createElement('div');
        warning.classList.add('warning-text');
        warning.textContent = `This is a bot. Information provided may be inaccurate. Verify independently.`;
        chatMessages.appendChild(warning);


        const div = document.createElement('div');
        div.classList.add('received');
        div.classList.add('message');
        const message = document.createElement('div');
        message.classList.add('message-content');
        message.textContent = `Hey there! Need some help? Ask me anything!`;
        div.appendChild(message);
        chatMessages.appendChild(div);
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }

    // Function to send a message
    sendMessageBtn.addEventListener('click', () => {

        const prompt = messageInput.value.trim();
        if (prompt) {

            const div = document.createElement('div');
            div.classList.add('sent')
            div.classList.add('message')
            const message = document.createElement('div');
            message.classList.add('message-content')
            message.textContent = `You: ${prompt}`;
            div.appendChild(message);
            chatMessages.appendChild(div);
            messageInput.value = ''; // Clear input

            scrollContainer.scrollTop = scrollContainer.scrollHeight;

            const characterId = '66ccb49b40f10c50bdee37d6';
            console.log(characterId)

            // Attach previous messages
            const previousMessages = characterMessages[characterId].map(message => {
                return `### ${message.sender}: ${message.text}`;
            }).join('\n');
            // Add message to characterMessages
            let textMessage = prompt
            const newMessage = { sender: 'User', text: textMessage };
            characterMessages[characterId].push(newMessage); 
                fetch(`https://www.faeframeworks.com/characters/response`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ characterId, prompt: `${previousMessages}\n${prompt}` })
            
            })
            
            .then(response => response.json())
            .then(data => {
                console.log(data)
                // Assume successful response, update UI as needed
                const character = characters.find(c => c.id === characterId);

                const newMessage = { sender: character.name, text: data };
                characterMessages[characterId].push(newMessage);
                
                if (character) {
                    const div2 = document.createElement('div');
                    div2.classList.add('message')
                    div2.classList.add('received')
                    const message2 = document.createElement('div');
                    message2.classList.add('message-content')
                    message2.textContent = `${character.name}: ${data}`;
                    div2.appendChild(message2);

                    chatMessages.appendChild(div2);
                    scrollContainer.scrollTop = scrollContainer.scrollHeight;
                }

            })
            .catch(error => console.error('Error sending message:', error));
        }
    });
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessageBtn.click();
        }
    });

    // Toggle chat content visibility
    const chatHeader = document.querySelector('.chat-header');
    const chatContent = document.querySelector('.chat-content');
    let isChatOpen = false;

chatHeader.addEventListener('click', () => {
    console.log('Clicked');
    isChatOpen = !isChatOpen;
    chatContent.style.display = isChatOpen ? 'block' : 'none';

    // Adjust header background and text based on chat state
    if (isChatOpen) {
        chatHeader.style.backgroundImage = 'linear-gradient(315deg, var(--metallic-gold) 0%, var(--gold)74%)';
        chatHeader.textContent = 'X';
    } else {
        chatHeader.style.backgroundImage = 'linear-gradient(315deg, transparent 0%, transparent 74%)'; // Reset to default
        chatHeader.innerHTML = `                <div class="profile-image">
                    <img id="profile-image" src="./images/mage_square.jpg" alt="Profile Picture">
                </div>    
                
                <div class="received message"><div class="message-content">Hey there! Need some help? Ask me anything!</div></div>
                
                `;
    }
});

});

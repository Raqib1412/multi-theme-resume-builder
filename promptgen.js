const userInput = document.getElementById('userInput');
const generateBtn = document.getElementById('generateBtn');
const chatMessages = document.getElementById('chatMessages');
const generatedPrompt = document.getElementById('generatedPrompt');
const copyPromptBtn = document.getElementById('copyPromptBtn');

generateBtn.addEventListener('click', () => {
    const description = userInput.value.trim();
    if (description !== '') {
        addMessage(description, 'user');
        const prompt = `Suggest 3 professional resume bullet points for: ${description}`;
        generatedPrompt.textContent = prompt;
    }
});

copyPromptBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(generatedPrompt.textContent).then(() => {
        alert('Prompt copied! Paste it into ChatGPT to get suggestions.');
    });
});

function addMessage(text, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', sender);
    messageElement.innerText = text;

    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

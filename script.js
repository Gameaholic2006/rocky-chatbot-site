async function sendMessage() {
  const inputField = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const userMessage = inputField.value.trim();
  if (userMessage === "") return;

  // Show user message
  const userDiv = document.createElement("div");
  userDiv.className = "user-message";
  userDiv.innerText = userMessage;
  chatBox.appendChild(userDiv);

  inputField.value = "";

  // Show "Typing..." placeholder
  const botDiv = document.createElement("div");
  botDiv.className = "bot-message";
  botDiv.innerText = "Rocky is typing...";
  chatBox.appendChild(botDiv);

  chatBox.scrollTop = chatBox.scrollHeight;

  // Fetch response from OpenAI API
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessage }]
      })
    });

    const data = await response.json();
    const botReply = data.choices[0].message.content;

    botDiv.innerText = botReply;
    chatBox.scrollTop = chatBox.scrollHeight;

  } catch (error) {
    botDiv.innerText = "⚠️ Oops! Something went wrong.";
    console.error("API Error:", error);
  }
}

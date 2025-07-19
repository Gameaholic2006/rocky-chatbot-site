document.addEventListener("DOMContentLoaded", function () {
  const sendButton = document.getElementById("send-button");
  const userInput = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  sendButton.addEventListener("click", sendMessage);

  function appendMessage(sender, text) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    messageDiv.innerText = `${sender === "user" ? "You" : "Rocky"}: ${text}`;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    appendMessage("user", message);
    userInput.value = "";

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer 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",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: message }],
        }),
      });

      const data = await response.json();
      const botReply = data.choices?.[0]?.message?.content || "Rocky didn't reply.";
      appendMessage("bot", botReply);
    } catch (error) {
      appendMessage("bot", "Oops! Something went wrong.");
      console.error(error);
    }
  }
});

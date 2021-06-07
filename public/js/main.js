const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".message");

const socket = io();

//Message from server
socket.on("message", (message) => {
  outputMessage(message);

  //Scroll down after every message
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

//message submit
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const msg = e.target.elements.msg.value;

  //Emit message to server
  socket.emit("chatMessage", msg);

  //clear input
  e.target.elements.msg.value = "";
  e.target.elements.msg.value.focus();
});

//output message to DOM
function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="meta">Dennis <span>4:13pm</span></p>
  <p class="text">${message}</p>`;
  document.querySelector(".chat").appendChild(div);
}

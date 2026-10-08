const token=localStorage.getItem("token");
const username=localStorage.getItem("username");
if(!token||!username) location.href="login.html";
const socket=io();
const messagesContainer=document.getElementById("messages");
const messageForm=document.getElementById("messageForm");
const messageInput=document.getElementById("messageInput");
document.getElementById("currentUser").innerText=`Logged in as ${username}`;
socket.emit("join",username);

function addMessage(data){
 const el=document.createElement("div"); el.className="message";
 const name=document.createElement("strong"); name.innerText=data.username;
 const text=document.createElement("p"); text.innerText=data.message;
 const time=document.createElement("small");
 if(data.createdAt) time.innerText=new Date(data.createdAt).toLocaleTimeString();
 el.append(name,text,time); messagesContainer.appendChild(el);
 messagesContainer.scrollTop=messagesContainer.scrollHeight;
}
async function loadMessages(){
 try{const response=await fetch("/api/messages"); const messages=await response.json(); messages.forEach(addMessage);}
 catch(error){console.error(error);}
}
socket.on("chatMessage",addMessage);
socket.on("systemMessage",data=>{
 const el=document.createElement("div"); el.className="system-message"; el.innerText=data.message;
 messagesContainer.appendChild(el); messagesContainer.scrollTop=messagesContainer.scrollHeight;
});
messageForm.addEventListener("submit",e=>{
 e.preventDefault(); const message=messageInput.value.trim(); if(!message)return;
 socket.emit("chatMessage",{username,message}); messageInput.value=""; messageInput.focus();
});
document.getElementById("logoutButton").addEventListener("click",()=>{
 localStorage.removeItem("token");localStorage.removeItem("username");socket.disconnect();location.href="login.html";
});
loadMessages();
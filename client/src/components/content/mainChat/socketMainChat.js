export const websocket = (b) => {
  const socket = new WebSocket("ws://localhost:8080/api/mainchat");

  console.log("Attempting Connection...");

  socket.onopen = () => {
    console.log("Successfully Connected");
    const u = JSON.parse(localStorage.getItem("user_data"));
    socket.send(
      JSON.stringify({ Name: u.username, Text: "onopen", Register: 1,clients : [] })
    );
  };
  
  socket.onmessage = (msg) => {
    console.log("onmessage ",msg);
    b(msg);
  };

  socket.onclose = (event) => {
    console.log("Socket close: ", event);
    const u = JSON.parse(localStorage.getItem("user_data"));
    socket.send(
      JSON.stringify({ Name: u.username, Text: "onclose", Register: 2 , clients : []})
    );
  };

  socket.onerror = (error) => {
    console.log("Socket error: ", error);
  };

  let sendMsg = (msg) => {
    console.log("sending msg: ", msg);
    socket.send(JSON.stringify(msg));
  };
const res ={
  socket:socket,
  sendMsg:sendMsg,
}
  return res;
};

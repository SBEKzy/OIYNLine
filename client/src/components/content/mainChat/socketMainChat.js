export const websocket = (b) => {
  const socket = new WebSocket("ws://localhost:8080/api/mainchat");

  console.log("Attempting Connection...");

  socket.onopen = () => {
    console.log("Successfully Connected");
    const u = JSON.parse(localStorage.getItem("user_data"));
    socket.send(
      JSON.stringify({ Name: u.username, Text: "sdfs", Register: 1 })
    );
  };

  socket.onmessage = (msg) => {
    console.log(msg);
    b(msg);
  };

  socket.onclose = (event) => {
    console.log("Socket Error: ", event);
  };

  socket.onerror = (error) => {
    console.log("Cosket error: ", error);
  };

  let sendMsg = (msg) => {
    console.log("sending msg: ", msg);
    socket.send(JSON.stringify(msg));
  };

  return sendMsg;
};

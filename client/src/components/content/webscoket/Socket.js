export var ggg;
export var gggg;
export var hhh = (msg) => {
  console.log(msg);
  // cb(msg);
};
export var socket ;
export const sockett = (cb, type, name) => {
  if (type === "create") {
    console.log(name)
    socket = new WebSocket(
      "ws://localhost:8080/api/tictactoe-menu/"+name+"?type=" + type
    );
  } else if (type === "join") {
    socket = new WebSocket(
      "ws://localhost:8080/api/tictactoe-menu/" + name + "?type=" + type
    );
  }

  console.log("Attempting Connection...");

  socket.onopen = () => {
    console.log("Successfully Connected");
    const u = JSON.parse(localStorage.getItem("user_data"));
    socket.send(JSON.stringify({ name: u.username }));
  };

  socket.onmessage = (msg) => {
    console.log(msg);
    // cb(msg);
  };
  socket.onclose = (event) => {
    console.log("Socket Error: ", event);
  };

  socket.onerror = (error) => {
    console.log("Cosket error: ", error);
  };

  let sendMsg = (msg) => {
    console.log("sending msg: ", msg);
    socket.send(msg);
  };

  const res = {
    socket: socket,
    sendMsg: sendMsg,
  };
  ggg = sendMsg;
  gggg = socket.onmessage;
  return res;
};

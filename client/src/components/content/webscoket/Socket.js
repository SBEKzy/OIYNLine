export const sockett = (cb) => {
  var socket = new WebSocket("ws://localhost:8080/api/tictactoe-menu/game/ws");

    console.log("Attempting Connection...");

    socket.onopen = () => {
      console.log("Successfully Connected");
      const u = JSON.parse(localStorage.getItem("user_data"));
    socket.send(
      JSON.stringify({ name: u.username, type: "register"})
    );
    };

    socket.onmessage = (msg) => {
      console.log(msg);
      cb(msg);
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
  return res;
};

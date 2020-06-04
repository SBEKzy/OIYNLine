// export const sockett = (cb) => {
   
//         "ws://localhost:8080/api/tictactoe-menu/" + name + "?type=" + type
      
  
//     console.log("Attempting Connection...");
  
//     socket.onopen = () => {
//       console.log("Successfully Connected");
//       const u = JSON.parse(localStorage.getItem("user_data"));
//       socket.send(JSON.stringify({ name: u.username }));
//     };
  
//     socket.onmessage = (msg) => {
//       console.log(msg);
//       cb(msg);
//     };
  
//     socket.onclose = (event) => {
//       console.log("Socket Error: ", event);
//     };
  
//     socket.onerror = (error) => {
//       console.log("Cosket error: ", error);
//     };
  
//     let sendMsg = (msg) => {
//       console.log("sending msg: ", msg);
//       socket.send(msg);
//     };
  
//     const res = {
//       socket: socket,
//       sendMsg: sendMsg,
//     };
//     return res;
//   };
  
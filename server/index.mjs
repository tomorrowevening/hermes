import { WebSocketServer } from 'ws';

const users = new Map();
const server = new WebSocketServer({ port: 8080 });
let totalUsers = 0;

function createNewUser(ws) {
  const userID = `user_${totalUsers}`;
  totalUsers++;

  // Create user
  const newUser = {
    userID: userID,
    socket: ws,
  };
  users.set(userID, newUser);
  console.log('User connected:', userID);

  return newUser;
}

server.on('connection', (ws) => {
  const newUser = createNewUser(ws);
  ws.on('message', (message) => {
    const content = JSON.parse(message);
    ws.send(JSON.stringify(content));
  });

  // User left
  ws.on('close', () => {
    users.delete(newUser.userID);
    console.log('User disconnected:', newUser.userID, 'Total left:', users.size);
  });
});

const ws = require("ws");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const Message = require("./models/messageModel");
const { User } = require("./models/userModel");
const mongoose = require("mongoose");

const createWebSocketServer = (server) => {
  const wss = new ws.WebSocketServer({ server });

  wss.on("connection", (connection, req) => {
    const notifyAboutOnlinePeople = async () => {
      try {
        const onlineUsers = await Promise.all(
          Array.from(wss.clients).map(async (client) => {
            const { userId, username } = client;
            if (!userId) return null;

            const user = await User.findById(userId);
            return {
              userId,
              username,
              avatarLink: user?.avatarLink || null,
            };
          })
        );

        const filteredUsers = onlineUsers.filter(user => user !== null);
        console.log("Online Users:", filteredUsers);

        [...wss.clients].forEach((client) => {
          client.send(
            JSON.stringify({
              type: 'online',
              online: filteredUsers,
            })
          );
        });
      } catch (error) {
        console.error('Error in notifyAboutOnlinePeople:', error);
      }
    };

    // Keep-alive mechanism
    connection.isAlive = true;

    connection.timer = setInterval(() => {
      if (!connection.isAlive) {
        clearInterval(connection.timer);
        connection.terminate();
        notifyAboutOnlinePeople();
        return;
      }

      connection.isAlive = false;
      connection.ping();
      connection.deathTimer = setTimeout(() => {
        connection.terminate();
        notifyAboutOnlinePeople();
        console.log("Connection terminated due to timeout");
      }, 1000);
    }, 5000);

    connection.on("pong", () => {
      connection.isAlive = true;
      clearTimeout(connection.deathTimer);
    });

    // Auth handling
    const cookies = req.headers.cookie;
    if (cookies) {
      try {
        const tokenString = cookies
          .split(";")
          .map(cookie => cookie.trim())
          .find(cookie => cookie.startsWith("authToken="));

        if (tokenString) {
          const token = tokenString.split("=")[1];
          jwt.verify(token, process.env.JWTPRIVATEKEY, {}, (err, userData) => {
            if (err) {
              console.error("JWT verification error:", err);
              connection.send(JSON.stringify({ type: 'error', message: 'Authentication failed' }));
              return;
            }

            const { _id, firstName, lastName } = userData;
            connection.userId = _id;
            connection.username = `${firstName} ${lastName}`;
            notifyAboutOnlinePeople();
          });
        }
      } catch (error) {
        console.error("Cookie parsing error:", error);
      }
    }

    // Message handling
    connection.on("message", async (message) => {
      try {
        const messageData = JSON.parse(message.toString());
        const { recipient, text } = messageData;

        if (!connection.userId) {
          connection.send(JSON.stringify({
            type: 'error',
            message: 'Not authenticated'
          }));
          return;
        }

        if (!text?.trim()) {
          connection.send(JSON.stringify({
            type: 'error',
            message: 'Message text is required'
          }));
          return;
        }

        if (!mongoose.Types.ObjectId.isValid(recipient)) {
          connection.send(JSON.stringify({
            type: 'error',
            message: 'Invalid recipient ID format'
          }));
          return;
        }

        const msgDoc = await Message.create({
          sender: connection.userId,
          recipient: new mongoose.Types.ObjectId(recipient),
          text: text.trim(),
        });

        // Send to recipient
        [...wss.clients].forEach((client) => {
          if (client.userId === recipient) {
            client.send(
              JSON.stringify({
                type: 'message',
                sender: connection.username,
                senderId: connection.userId, // add this field
                text: text.trim(),
                id: msgDoc._id,
                timestamp: msgDoc.createdAt
              })
            );
          }
        });

        // Confirm to sender
        connection.send(JSON.stringify({
          type: 'messageConfirm',
          messageId: msgDoc._id,
          recipient,
          timestamp: msgDoc.createdAt
        }));

      } catch (error) {
        console.error("Message handling error:", error);
        connection.send(JSON.stringify({
          type: 'error',
          message: 'Failed to process message'
        }));
      }
    });

    // Handle disconnection
    connection.on("close", () => {
      clearInterval(connection.timer);
      clearTimeout(connection.deathTimer);
      notifyAboutOnlinePeople();
    });

    // Initial notification of online users
    notifyAboutOnlinePeople();
  });

  return wss;
};

module.exports = createWebSocketServer;
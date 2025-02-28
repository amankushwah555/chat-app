import React, { useEffect, useState } from "react";
import { useProfile } from "../context/profileContext";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { socketUrl } from "../../apiConfig";
import ChatMessages from "../components/Chat/ChatMessages";
import MessageInputForm from "../components/Chat/MessageInputForm";
import Nav from "../components/Chat/Nav";
import OnlineUsersList from "../components/Chat/OnlineUserList";
import TopBar from "../components/Chat/TopBar";

const ChatHome = () => {
  const [ws, setWs] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState({});
  const [offlinePeople, setOfflinePeople] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const { userDetails } = useProfile();
  const { isAuthenticated, checkAuth } = useAuth();
  const navigate = useNavigate();

  // 1. Connect to WebSocket
  const connectToWebSocket = () => {
    const wsInstance = new WebSocket(socketUrl);

    wsInstance.addEventListener("open", () => {
      console.log("WebSocket connected");
      setWs(wsInstance);
      // Ping to keep connection alive
      const pingInterval = setInterval(() => {
        if (wsInstance.readyState === WebSocket.OPEN) {
          wsInstance.send(JSON.stringify({ type: "ping" }));
        }
      }, 30000);

      wsInstance.pingInterval = pingInterval;
    });

    wsInstance.addEventListener("message", handleMessage);

    wsInstance.addEventListener("error", (err) => {
      console.error("WebSocket error:", err);
      setWs(null);
    });

    wsInstance.addEventListener("close", () => {
      console.log("WebSocket closed, reconnecting...");
      if (wsInstance.pingInterval) {
        clearInterval(wsInstance.pingInterval);
      }
      setWs(null);
      setTimeout(connectToWebSocket, 1000);
    });

    return wsInstance;
  };

  // 2. Initialize WebSocket connection if authenticated
  useEffect(() => {
    if (!isAuthenticated) return;
    const wsInstance = connectToWebSocket();

    return () => {
      if (wsInstance) {
        if (wsInstance.pingInterval) {
          clearInterval(wsInstance.pingInterval);
        }
        wsInstance.close();
      }
    };
  }, [isAuthenticated]);

  // 3. Check auth on load
  useEffect(() => {
    checkAuth();
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, checkAuth, navigate]);

  // 4. Fetch messages for the selected user
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUserId) {
        setMessages([]);
        return;
      }
      try {
        const res = await axios.get(`/api/user/messages/${selectedUserId}`, {
          withCredentials: true,
        });
        setMessages(res.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setMessages([]);
      }
    };
    fetchMessages();
  }, [selectedUserId]);

  // 5. Fetch people (to get offlinePeople list) 
  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const res = await axios.get("/api/user/people", {
          withCredentials: true,
        });
        const offlinePeopleArr = res.data
          .filter((p) => p._id !== userDetails?._id)
          .filter((p) => !onlinePeople[p._id]);

        setOfflinePeople(
          offlinePeopleArr.reduce((acc, p) => {
            acc[p._id] = { ...p, avatarLink: p.avatarLink };
            return acc;
          }, {})
        );
      } catch (error) {
        console.error("Error fetching people:", error);
        setOfflinePeople({});
      }
    };
    if (userDetails?._id) {
      fetchPeople();
    }
  }, [onlinePeople, userDetails?._id]);

  // 6. Handle incoming WebSocket messages
  const handleMessage = (ev) => {
    const messageData = JSON.parse(ev.data);
    console.log("Received WebSocket message:", messageData);

    if (messageData.type === "online") {
      showOnlinePeople(messageData.online);
    } else if (messageData.type === "message" || messageData.type === "messageConfirm") {
      // Only add message if it belongs to the current chat
      if (selectedUserId) {
        const isFromSelectedUser = messageData.senderId === selectedUserId;
        const isFromMe = messageData.senderId === userDetails?._id;

        if (isFromSelectedUser || isFromMe) {
          setMessages((prev) => [
            ...prev,
            {
              _id: messageData.id || Date.now().toString(),
              text: messageData.text,
              // Always store the sender’s ID in "sender"
              sender: messageData.senderId,
              // If needed, store the "sender" name in a separate field
              senderName: messageData.sender,
              recipient: messageData.recipient,
              timestamp: messageData.timestamp || new Date().toISOString(),
            },
          ]);
        }
      }
    }
  };

  // 7. Show online people
  const showOnlinePeople = (peopleArray) => {
    const people = {};
    peopleArray.forEach(({ userId, username, avatarLink }) => {
      if (userId !== userDetails?._id) {
        people[userId] = { username, avatarLink };
      }
    });
    setOnlinePeople(people);
  };

  // 8. Send a message
  const sendMessage = (ev) => {
    if (ev) ev.preventDefault();
    if (!ws || ws.readyState !== WebSocket.OPEN || !newMessage.trim() || !selectedUserId) {
      console.log("Cannot send message:", {
        wsReady: ws?.readyState,
        newMessage,
        selectedUserId,
      });
      return;
    }

    const messageToSend = {
      text: newMessage,
      recipient: selectedUserId,
      timestamp: new Date().toISOString(),
    };

    // Send the message over WS
    ws.send(JSON.stringify(messageToSend));

    // Clear the input
    setNewMessage("");

    // Optimistic update
    setMessages((prev) => [
      ...prev,
      {
        _id: Date.now().toString(),  // temporary ID
        text: newMessage,
        sender: userDetails._id,
        recipient: selectedUserId,
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Nav />

      <OnlineUsersList
        onlinePeople={onlinePeople}
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
        offlinePeople={offlinePeople}
      />

      <section className="w-[71%] lg:w-[62%] relative pb-10">
        {selectedUserId && (
          <TopBar
            selectedUserId={selectedUserId}
            setSelectedUserId={setSelectedUserId}
            offlinePeople={offlinePeople}
            onlinePeople={onlinePeople}
          />
        )}

        <ChatMessages
          messages={messages}
          userDetails={userDetails}
          selectedUserId={selectedUserId}
        />

        <div className="absolute w-full bottom-0 flex justify-center items-center">
          <MessageInputForm
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            sendMessage={sendMessage}
            selectedUserId={selectedUserId}
          />
        </div>
      </section>
    </div>
  );
};

export default ChatHome;

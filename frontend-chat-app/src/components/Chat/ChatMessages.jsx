import React, { useEffect, useRef } from "react";

const ChatMessages = ({ messages, userDetails, selectedUserId }) => {
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    // Auto-scroll to bottom whenever messages change
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const isMyMessage = (message) => {
    // We consistently store the sender's ID in `message.sender`
    const myId = userDetails?._id?.toString();
    const senderId = message.sender?.toString();
    return senderId === myId;
  };

  if (!selectedUserId) {
    return (
      <div className="text-gray-500 flex items-end justify-center h-full">
        Select a contact to start a conversation
      </div>
    );
  }

  return (
    <div className="absolute bottom-24 w-full px-7 lg:px-20 left-1/2 transform -translate-x-1/2 overflow-auto max-h-[90vh] pt-28 h-full">
      <div className="flex flex-col gap-2">
        {messages.map((message) => {
          const isMine = isMyMessage(message);

          return (
            <div
              key={message._id}
              className={`
                text-white 
                ${isMine
                  ? "bg-primarySecond self-end rounded-l-2xl"
                  : "bg-primary self-start rounded-r-2xl"
                } 
                relative group rounded-b-2xl px-5 py-3
              `}
            >
              <div className="flex flex-col gap-1">
                <div
                  style={{ wordWrap: "break-word" }}
                  className="flex flex-wrap max-w-[500px] overflow-auto"
                >
                  {message.text}
                </div>
                {/* Display timestamp if it exists */}
                {message.timestamp && (
                  <div className="text-xs opacity-70">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </div>
                )}
              </div>

              {/* Chat bubble arrow */}
              <div
                className={`
                  absolute top-0 w-0 h-0 
                  ${isMine
                    ? "rounded-l-lg -right-4 border-l-primarySecond border-l-[20px]"
                    : "border-r-primary -left-4 border-r-[20px]"
                  } 
                  border-b-[20px] border-b-transparent
                `}
              />
            </div>
          );
        })}
        <div ref={endOfMessagesRef} />
      </div>
    </div>
  );
};

export default ChatMessages;

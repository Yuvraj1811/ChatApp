import { useAppStore } from "@/store";
import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { HOST } from "../../utils/constants";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

const SocketProvider = ({ children }) => {
  const socket = useRef(null);
  const { userInfo,  selectedChatType, selectedChatData, addMessage  } = useAppStore();

  const chatDataRef = useRef({selectedChatType, selectedChatData, addMessage})


  useEffect(() => {
    chatDataRef.current = { selectedChatType, selectedChatData, addMessage };
  }, [selectedChatType, selectedChatData, addMessage]);


  useEffect(() => {
    if (userInfo) {
      socket.current = io(HOST, {
        withCredentials: true,
        query: { userId: userInfo.id },
      });
      socket.current.on("connect", () => {
        console.log("Connected to socket server");
      });
      socket.current.on("disconnect", () => {
        console.log("Disconnected to socket server");
      });

      const handleReceiveMessage = (message) => {
        const { selectedChatType, selectedChatData, addMessage } = chatDataRef.current;
        if (
          selectedChatType !== undefined &&
          (selectedChatData._id === message.sender._id ||
            selectedChatData._id === message.recipient._id)
        ) {
          console.log("message rcieved", message);
          addMessage(message);
        }
      };

      socket.current.on("receiveMessage", handleReceiveMessage);

      return () => {
        if (socket.current) {
          socket.current.disconnect();
          console.log("Socket disconnected");
        }
      };
    }
  }, [userInfo]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

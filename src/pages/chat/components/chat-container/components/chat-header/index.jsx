import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAppStore } from "@/store";
import React, { useEffect, useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import { HOST } from "../../../../../../../utils/constants";
import { getColor } from "@/lib/utils";

const ChatHeader = () => {
  const { closeChat, selectedChatData, selectedChatType } = useAppStore();

  useEffect(() => {
    console.log(selectedChatType);
  }, [selectedChatData, selectedChatType]);

  const [selectedColor, setSelectedColor] = useState(0);

  return (
    <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-20">
      <div className="flex gap-5 items-center w-full justify-between">
        <div className="flex gap-3 items-center justify-center">
          <div className="w-12 h-12 relative">
            <Avatar className="h-12 w-12 rounded-full overflow-hidden">
              {selectedChatData.image ? (
                <AvatarImage
                  src={`${HOST}/${selectedChatData.image}`}
                  alt="profile"
                  className="object-cover w-full h-full bg-black"
                />
              ) : (
                <AvatarImage
                src={
                  "https://img.freepik.com/premium-photo/3d-avatar-cartoon-character_113255-92134.jpg"
                }
                alt="profile"
                className="object-cover w-full h-full bg-black"
              />
              )}
            </Avatar>
          </div>
          <div>
            {selectedChatType === "contatc" && selectedChatData.firstName
              ? `${selectedChatData.firstName} ${selectedChatData.lastName}`
              : selectedChatData.email}
          </div>
        </div>
        <div className="flex items-center justify-center gap-5">
          <button
            className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
            onClick={closeChat}
          >
            <RiCloseFill className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;

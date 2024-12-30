import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaPlus } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { animationDefaultOptions, getColor } from "@/lib/utils";
import Lottie from "react-lottie";
import apiClient from "@/lib/api-client";
import {
  HOST,
  SEARCH_CONTACTS_ROUTES,
} from "../../../../../../../utils/constants";
import { useAppStore } from "@/store";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const NewDM = () => {
  const { setSelectedChatData, setSelectedChatType } = useAppStore();
  const [openNewContactModal, setOpenNewContactModel] = useState(false);
  const [searchContact, setSearchContact] = useState([]);
  const [selectedColor, setSelectedColor] = useState(0);

  const searchContacts = async (searchTerm) => {
    try {
      const token = localStorage.getItem("token");
      if (searchTerm.length > 0) {
        const response = await apiClient.post(
          SEARCH_CONTACTS_ROUTES,
          { searchTerm },
          {
            headers: {
              Authorization: `Beare ${token}`,
            },
            withCredentials: true,
          }
        );
        if (response.status === 200 && response.data.contacts) {
          setSearchContact(response.data.contacts);
        } else {
          setSearchContact([]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const selectNewContact = (contact) => {
    setOpenNewContactModel(false);
    setSelectedChatType("contatc");
    setSelectedChatData(contact);
    setSearchContact([]);
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300"
              onClick={() => setOpenNewContactModel(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
            Select New Contact
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModel}>
        {/* <DialogTrigger>Open</DialogTrigger> */}
        <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex-col">
          <DialogHeader>
            <DialogTitle>Please select a contact</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <Input
              placeholder="Search Contacts"
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              onChange={(e) => searchContacts(e.target.value)}
            />
          </div>
          {searchContact.length > 0 && (
            <ScrollArea className="h-[250px]">
              <div className="flex flex-col gap-5">
                {searchContact.map((contact) => (
                  <div
                    key={contact._id}
                    className="felx gap-3 items-center cursor-pointer"
                    onClick={() => selectNewContact(contact)}
                  >
                    <div className="w-12 h-12 relative">
                      <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                        {contact.image ? (
                          <AvatarImage
                            src={`${HOST}/${contact.image}`}
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
                    <div className="flex flex-col">
                      <span>
                        {contact.firstName && contact.lastName
                          ? `${contact.firstName} ${contact.lastName}`
                          : contact.email}
                      </span>
                      <span className="text-xs">{contact.email}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
          {searchContact.length <= 0 && (
            <div className="flex-1 md:flex flex-col justify-center items-center duration-1000 transition-all">
              <Lottie
                isClickToPauseDisabled={true}
                height={100}
                width={100}
                options={animationDefaultOptions}
              />
              <div className="text-opacity-80 text-white flex flex-col gap-5 items-center mt-5 lg:text-2xl text-xl transition-all duration-300 text-center">
                <h3 className="poppins-medium">
                  Hi <span className="text-purple-500">!</span> Search new
                  <span className="text-purple-500"> Contact.</span>
                </h3>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewDM;

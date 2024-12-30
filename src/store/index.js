import { create } from "zustand";
import { creatAuthSlice } from "./slices/auth-slice";
import { createChatSlice } from "./slices/chat-slice";

export const useAppStore = create()((...a) => ({
    ...creatAuthSlice(...a),
    ...createChatSlice(...a),
}))
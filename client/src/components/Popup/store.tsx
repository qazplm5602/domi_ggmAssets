import { PopupStoreType } from "@domiTypes/popup";
import { create } from "zustand";

export const usePopupStore = create<PopupStoreType>()(set => ({
    show: true,
    title: "domi - default value",
    content: <h1>Hello Domi!</h1>,
    interaction: [],

    openPopup(title, content, interactions) {
        set({ show: true, title, content, interaction: interactions });
    },
    closePopup() {
        set({ show: false });
    },
    clickButton(idx) {
        this.closePopup();
        const cb = this.interaction[idx];
        
        if (!cb) {
            throw new Error(`popup 버튼을 찾을 수 없습니다. idx: ${idx}`);
        }

        cb.callback();
    }
}));
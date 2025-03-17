import { UserDTO } from '@domiTypes/user';
import { create } from 'zustand'

interface LoginStoreType extends UserDTO {
    logined: boolean,
    loading: boolean,
    setLogin: (email: string, name: string) => void,
    setFail: () => void,
    forceRefresh: () => void
}

const useLoginStore = create<LoginStoreType>()((set) => ({
    email: "unknown",
    name: "unknown",
    logined: false,
    loading: true,
    setLogin(email, name) {
        set({ loading: false, logined: true, email, name });
    },
    setFail() {
        set({ loading: false, logined: false });
    },
    forceRefresh() {
        set({ loading: true }); // 강제적으로 로딩중으로 바꿈
    }
}));

export default useLoginStore;
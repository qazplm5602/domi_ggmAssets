import { UserAdminDTO } from '@domiTypes/user';
import { create } from 'zustand'

interface LoginStoreType extends UserAdminDTO {
    logined: boolean,
    loading: boolean,
    setLogin: (email: string, name: string, admin: boolean) => void,
    setFail: () => void,
    forceRefresh: () => void
}

const useLoginStore = create<LoginStoreType>()((set) => ({
    email: "unknown",
    name: "unknown",
    admin: false,
    logined: false,
    loading: true,
    setLogin(email, name, admin) {
        set({ loading: false, logined: true, email, name, admin });
    },
    setFail() {
        set({ loading: false, logined: false, admin: false });
    },
    forceRefresh() {
        set({ loading: true }); // 강제적으로 로딩중으로 바꿈
    }
}));

export default useLoginStore;
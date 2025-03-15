import { UserDTO } from '@domiTypes/user';
import { create } from 'zustand'

interface LoginStoreType extends UserDTO {
    logined: boolean,
    loading: boolean,
    setLogin: (email: string, name: string) => void
}

const useLoginStore = create<LoginStoreType>()((set) => ({
    email: "unknown",
    name: "unknown",
    logined: false,
    loading: true,
    setLogin(email, name) {
        set({ loading: false, logined: true, email, name });
    }
}));

export default useLoginStore;
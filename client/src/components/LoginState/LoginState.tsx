import { request } from "@utils/request";
import { useEffect } from "react";
import useLoginStore from "./store";
import { AliveType } from "@domiTypes/alive";
import { UserDTO } from "@domiTypes/user";

export default function LoginState() {
    const loginStore = useLoginStore();

    const onLoad = async function(aliveRef: AliveType) {
        const { data } = await request<UserDTO>('user/@me');
        if (!aliveRef.alive) return;

        loginStore.setLogin(data.email, data.name);
    }

    useEffect(() => {
        const aliveRef = { alive: true };

        onLoad(aliveRef);

        return () => {
            aliveRef.alive = false;
        }
    }, []);
    
    return null;
}
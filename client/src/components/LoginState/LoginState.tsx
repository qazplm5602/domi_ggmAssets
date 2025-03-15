import { request } from "@utils/request";
import { useEffect } from "react";
import useLoginStore from "./store";

export default function LoginState() {
    const loginStore = useLoginStore();

    const onLoad = async function() {
        const result = await request<string>('user/@me');
        console.log(result);
    }

    useEffect(() => {
        onLoad();
    }, []);
    
    return null;
}
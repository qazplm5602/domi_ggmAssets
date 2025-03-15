import { request } from "@utils/request";
import { useEffect } from "react";

export default function LoginState() {
    const onLoad = async function() {
        const result = await request<string>('user/@me');
        console.log(result);
    }

    useEffect(() => {
        onLoad();
    }, []);
    
    return null;
}
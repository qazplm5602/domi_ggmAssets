import { request } from "@utils/request";
import { useEffect } from "react";
import useLoginStore from "./store";
import { AliveType } from "@domiTypes/alive";
import { UserAdminDTO } from "@domiTypes/user";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

export default function LoginState() {
    const loginStore = useLoginStore();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const onLoad = async function(aliveRef: AliveType) {
        const result = await request<UserAdminDTO>('user/@me').catch(e => e as AxiosError);
        if (!aliveRef.alive) return;

        // 오류남
        if (result instanceof AxiosError) {
            if (result.status === 401) {
                loginStore.setFail(); // 로그인 실패패
            }

            return;
        }

        const { data } = result;
        loginStore.setLogin(data.email, data.name, data.admin);
    }

    useEffect(() => {
        if (!loginStore.loading) return;

        const aliveRef = { alive: true };

        onLoad(aliveRef);

        return () => {
            aliveRef.alive = false;
        }
    }, [loginStore.loading]);

    // url 막기
    useEffect(() => {
        if (loginStore.loading) return; // 아직 불러오는중이면 아무것도 못함 ㅅㄱ

        const isLoginPath = pathname.startsWith("/login");
        const logined = loginStore.logined;

        if (logined && isLoginPath) {
            navigate("/");
        } else if (!logined && !isLoginPath) {
            navigate("/login");
        }

    }, [loginStore, pathname]);
    
    return null;
}
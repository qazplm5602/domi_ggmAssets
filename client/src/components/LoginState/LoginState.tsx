import { request } from "@utils/request";
import { useEffect } from "react";
import useLoginStore from "./store";
import { UserAdminDTO } from "@domiTypes/user";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import useSWR from 'swr';

const fetcher = function(uri: string) {
    return request<UserAdminDTO>(uri).then(res => res.data);
}

export default function LoginState() {
    const loginStore = useLoginStore();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { data, error, isLoading } = useSWR("user/@me", fetcher);

    useEffect(() => {
        if (isLoading) {
            loginStore.forceRefresh();
            return;
        }

        if (error || !data) {
            loginStore.setFail();

            if (error instanceof AxiosError) {
                // console.log(error, path.pathname);
                // if (error.response?.data?.code === "TOKEN3") // 이거 만료임임
                //     navigate("/login");
            }
            return;
        }

        loginStore.setLogin(data.email, data.name, data.admin);
    }, [ data, error, isLoading ]);

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
import { useEffect } from "react"

export function useBodyClickEvent(cb?: () => void) {
    useEffect(() => {
        if (!cb) return;

        document.body.addEventListener("click", cb);
        return () => document.body.removeEventListener("click", cb);
    }, []);
}
import { AliveType } from "@domiTypes/alive";
import { useEffect } from "react";

type HandleType = (aliveRef: AliveType) => void | Promise<any>;

export function useHandleAlive(handle: HandleType, deps?: React.DependencyList) {
    useEffect(() => {
        const aliveRef = { alive: true };
        handle(aliveRef);

        return () => {
            aliveRef.alive = false;
        }
    }, deps);
}
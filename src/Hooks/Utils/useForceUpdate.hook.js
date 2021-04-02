import { useReducer } from "react";

//https://reactjs.org/docs/hooks-faq.html#is-there-something-like-forceupdate

export const useForceUpdate = () => {
    return useReducer(x => x + 1, 0);
}


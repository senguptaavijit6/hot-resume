'use client'
import React from "react";
import { Provider } from "react-redux";
import { userStore } from "../_redux/store/user.store";

export default function ReduxStoreProvider({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={userStore}>
            {children}
        </Provider>
    )
}
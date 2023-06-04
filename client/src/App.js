import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

/* eslint-disable import/first */

import LoadingPanel from "./components/LoadingPanel";
import LoadingContext from "./store/LoadingContext";

import UserContext from "./store/UserContext";

import AnimatedRoutes from "./components/AnimatedRoutes";

import "./App.css";

function App() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const isLoadingContextValue = useMemo(
        () => ({ isLoading, setIsLoading }),
        [isLoading, setIsLoading]
    );

    const [user, setUser] = useState(null);
    const userContextValue = useMemo(
        () => ({ user, setUser }),
        [user, setUser]
    );

    const [isStartup, setIsStartup] = useState(true); // only call once

    const getUser = useCallback(async () => {
        setIsLoading(true);

        const response = await fetch("/api/user", {
            headers: { "Content-Type": "application/json" },
            method: "GET",
        });
        const data = await response.json();

        if (data.status === "ERROR") navigate("/landing", { replace: true });

        setUser(data.user);
        setIsLoading(false);
    }, [navigate]);

    useEffect(() => {
        if (isStartup) {
            getUser();
            setIsStartup(false);
        }
    }, [getUser, isStartup]);

    return (
        <div>
            <LoadingContext.Provider value={isLoadingContextValue}>
                <UserContext.Provider value={userContextValue}>
                    <AnimatedRoutes />
                </UserContext.Provider>
            </LoadingContext.Provider>

            {isLoading && <LoadingPanel />}
        </div>
    );
}

export default App;

import { useEffect } from "react";
import * as WebBrowser from 'expo-web-browser'

export const userWarmUpBrowser = () => {
    useEffect(() => {
        void WebBrowser.warmUpAsync();
        return () => {
            void WebBrowser.coolDownAsync();
        };
    }, []);
};
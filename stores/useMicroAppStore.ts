// stores/microAppsStore.js
import create from 'zustand';

interface AppProps {
    id: number;
    name: String;
    description: String;
    url: String;
    imageSrc: String;
    category: String;
    status: number;
}

interface State {
    microApps: AppProps[];
    myMicroApps: AppProps[];
    setMicroApps: (microApps: AppProps[]) => void;
    setMyMicroApps: (myMicroApps: AppProps[]) => void;
    fetchMicroApps: () => Promise<void>;
    fetchMyMicroApps: (userId: string) => Promise<void>;
}

export const useMicroAppsStore = create<State>((set) => ({
    microApps: [],
    myMicroApps: [],
    setMicroApps: (microApps) => set({ microApps }),
    setMyMicroApps: (myMicroApps) => set({ myMicroApps }),
    fetchMicroApps: async () => {
        try {
            const response = await fetch("/api/appInfo");
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            set({ microApps: data });
        } catch (error) {
            console.error("Error in fetchMicroApps:", error);
        }
    },
    fetchMyMicroApps: async (userId) => {
        try {
            const response = await fetch("/api/myAppInfo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId }),
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            set({ myMicroApps: data });
        } catch (error) {
            console.error("Error in fetchMyMicroApps:", error);
        }
    },
}));

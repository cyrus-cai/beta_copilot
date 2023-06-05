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
    setMicroApps: (microApps: AppProps[]) => void;
    fetchMicroApps: () => Promise<void>;
}

export const useMicroAppsStore = create<State>((set) => ({
    microApps: [],
    setMicroApps: (microApps) => set({ microApps }),
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
}));

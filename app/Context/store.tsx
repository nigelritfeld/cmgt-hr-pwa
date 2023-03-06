'use client';

import {createContext, useContext, Dispatch, SetStateAction, useState, PropsWithChildren, FC, useEffect} from "react";
import {CMGTProject, ProjectCardProps, Tag} from "@/types/cmgt";
import {transaction} from "@/utils/indexDB";

type appState = "offline" | "online"

interface ContextProps {
    userId: string,
    setUserId: Dispatch<SetStateAction<string>>,
    projects: ProjectCardProps[],
    setProjects: Dispatch<SetStateAction<ProjectCardProps[]>>
    openSlide: boolean
    selectedProject: CMGTProject | null
    setSelectedProject: Dispatch<SetStateAction<CMGTProject | null>>
    appState: appState
    setAppState: Dispatch<SetStateAction<appState>>
    searchQuery: string
    setSearchQuery: Dispatch<SetStateAction<string>>
    appInstalled: boolean
    setAppInstalled: Dispatch<SetStateAction<boolean>>
    deferredPrompt: any
    setDeferredPrompt: Dispatch<SetStateAction<any>>
    categoryFilter: Array<Tag>
    setCategoryFilter: Dispatch<SetStateAction<Array<Tag>>>
}

const GlobalContext = createContext<ContextProps>({
    userId: '',
    setUserId: (): string => '',
    projects: [],
    setProjects: (): CMGTProject[] => [],
    openSlide: false,
    selectedProject: null,
    setSelectedProject: (): null => null,
    appState: 'online',
    setAppState: (): appState => "online",
    searchQuery: '',
    setSearchQuery: (): string => "online",
    appInstalled: false,
    setAppInstalled: (): boolean => false,
    deferredPrompt: undefined,
    setDeferredPrompt: () => null,
    categoryFilter: [],
    setCategoryFilter: () => []
})

export const GlobalContextProvider: FC<PropsWithChildren> = ({children}) => {
    const [openSlide, setOpenSlide] = useState(false);
    const [selectedProject, setSelectedProject] = useState<CMGTProject | null>(null);
    const [userId, setUserId] = useState('');
    const [projects, setProjects] = useState<[] | ProjectCardProps[]>([]);
    const [appState, setAppState] = useState<appState>('online');
    const [appInstalled, setAppInstalled] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [deferredPrompt, setDeferredPrompt] = useState<any>()
    const [categoryFilter, setCategoryFilter] = useState<Array<Tag>>([])
    const notifyWorkerBackgroundSync = async () => {
        setAppState('online')
        if (window.navigator.serviceWorker.controller != undefined) {
            const messageChannel = new MessageChannel();

//Init port
            window.navigator.serviceWorker.controller.postMessage({type: 'PORT_INITIALIZATION'}, [
                messageChannel.port2,
            ]);

//Listen to messages
            messageChannel.port1.onmessage = (event) => {
                window.alert(event)
                // Process message
            };
        }
    }
    const registerServiceWorker = async () => {
        if ("serviceWorker" in navigator) {
            try {
                const registration = await navigator.serviceWorker.register("/sw.js", {
                    scope: "/",
                });

                if (registration.installing) {
                    console.log("Service worker installing");
                } else if (registration.waiting) {
                    console.log("Service worker installed");
                } else if (registration.active) {
                    console.log("Service worker active");
                }
            } catch (error) {
                console.error(`Registration failed with ${error}`);
            }
        }
    };

    useEffect(() => {
        registerServiceWorker()
            .then(r => console.log('Registered serviceworker'))
        // console.log(window.navigator.standalone)
        window.addEventListener('offline', () => setAppState('offline'))
        window.addEventListener('online', () => notifyWorkerBackgroundSync())
        window.addEventListener('beforeinstallprompt', (e) => {
            setDeferredPrompt(e)
            setAppInstalled(false)
        });
        addEventListener('appinstalled', (event) => setAppInstalled(true));
    }, [])

    useEffect( () => {
        if (projects.length === 0) return
        transaction('cmgt', 1, 'projects', 'project', 'readwrite')
            .then(store => {
                projects.forEach(function (project) {
                    const db_op_req = store.add(project); // IDBRequest
                });
            })
    }, [])

    return (
        <GlobalContext.Provider value={{
            userId, setUserId,
            projects, setProjects,
            openSlide, selectedProject,
            setSelectedProject,
            appState, setAppState,
            searchQuery, setSearchQuery,
            appInstalled, setAppInstalled,
            deferredPrompt, setDeferredPrompt,
            categoryFilter, setCategoryFilter
        }}>
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext);
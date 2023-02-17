'use client';

import {createContext, useContext, Dispatch, SetStateAction, useState, PropsWithChildren, FC, useEffect} from "react";
import {CMGTProject, ProjectCardProps} from "@/types/cmgt";
import {bool} from "prop-types";
import {open} from "@/utils/indexDB";

type appState = "offline" | "online"

interface ContextProps {
    userId: string,
    setUserId: Dispatch<SetStateAction<string>>,
    projects: ProjectCardProps[],
    setProjects: Dispatch<SetStateAction<CMGTProject[]>>
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
    setDeferredPrompt: () => null
})

export const GlobalContextProvider: FC<PropsWithChildren> = ({children}) => {
    const [openSlide, setOpenSlide] = useState(false);
    const [selectedProject, setSelectedProject] = useState<CMGTProject | null>(null);
    const [userId, setUserId] = useState('');
    const [projects, setProjects] = useState<[] | CMGTProject[]>([]);
    const [appState, setAppState] = useState<appState>('online');
    const [appInstalled, setAppInstalled] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [deferredPrompt, setDeferredPrompt] = useState<any>()
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
    useEffect(() => {

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(res => {
                    const item = res[0]
                    if (!item) {
                        navigator.serviceWorker.register("/sw.js")
                            .then(result => {
                                console.log(result)
                                open('projects', 1)
                                    .then(database => {
                                        const transaction = database.transaction('projects', 'readwrite');
                                        transaction.onsuccess = function (event) {
                                            console.log('[Transaction] ALL DONE!');
                                        };
// get store from transaction
                                        // returns IDBObjectStore instance
                                        const productsStore = transaction.objectStore('projects');
// put products data in productsStore
                                        projects.forEach(function (project) {
                                            const db_op_req = productsStore.add(project); // IDBRequest
                                        });

                                    })
                                    .catch(e => console.error(e))
                            })
                            .catch()
                        navigator.serviceWorker.onmessage = (event) => {
                            window.alert(event)
                        };
                    }
                }
            )
        }

        window.addEventListener('offline', () => setAppState('offline'))
        window.addEventListener('online', () => notifyWorkerBackgroundSync())
        window.addEventListener('beforeinstallprompt', (e) => setDeferredPrompt(e));
        addEventListener('appinstalled', (event) => setAppInstalled(true));


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
            deferredPrompt, setDeferredPrompt
        }}>
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext);
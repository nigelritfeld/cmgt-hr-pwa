'use client';

import {createContext, useContext, Dispatch, SetStateAction, useState, PropsWithChildren, FC, useEffect} from "react";
import {CMGTProject, ProjectCardProps} from "@/types/cmgt";
import {bool} from "prop-types";

type appState =  "offline" | "online"
interface ContextProps {
    userId: string,
    setUserId: Dispatch<SetStateAction<string>>,
    projects: ProjectCardProps[],
    setProjects: Dispatch<SetStateAction<CMGTProject[]>>
    openSlide: boolean
    selectedProject: CMGTProject | null
    setSelectedProject:  Dispatch<SetStateAction<CMGTProject| null>>
    appState:  appState
    setAppState: Dispatch<SetStateAction<appState>>
    searchQuery: string
    setSearchQuery: Dispatch<SetStateAction<string>>
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
    setAppState:  (): appState => "online",
    searchQuery: '',
    setSearchQuery:  (): string => "online"
})

export const GlobalContextProvider: FC<PropsWithChildren> = ({children}) => {
    const [openSlide, setOpenSlide] = useState(false);
    const [selectedProject, setSelectedProject] = useState<CMGTProject | null>(null);
    const [userId, setUserId] = useState('');
    const [projects, setProjects] = useState<[] | CMGTProject[]>([]);
    const [appState, setAppState] = useState<appState>('online');
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(()=>{

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(res=>
                {
                    const item = res[0]
                    if (!item){
                        navigator.serviceWorker.register("/sw.js")
                            .then(result=> {
                                console.log(result)
                            })
                            .catch()
                    }
                }
            )

        }

    },[])
    return (
        <GlobalContext.Provider value={{
            userId, setUserId,
            projects, setProjects,
            openSlide, selectedProject,
            setSelectedProject,
            appState, setAppState,
            searchQuery, setSearchQuery
        }}>
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext);
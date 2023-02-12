import {CMGTProject} from "@/types/cmgt";

export interface ProjectSlideProps {
    open: boolean
    close: () => void
    project: CMGTProject
}
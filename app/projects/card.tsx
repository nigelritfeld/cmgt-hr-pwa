'use client';
import {FC} from "react";
import {ProjectCardProps} from "@/types/cmgt";
import {TimeStringToDate} from "@/utils/TimeStringToDate";
import {useGlobalContext} from "@/app/Context/store";
import {Tags} from "@/components/ui/tags";

export const Card: FC<ProjectCardProps> = ({project, links}) => {
    const {setSelectedProject} = useGlobalContext()
    const setProject = () => setSelectedProject(project)

    return <div className="flex flex-col overflow-hidden rounded-lg shadow-lg w-full grow basis-1/5 mt-2">
        <div className="flex-shrink-0">
            <img className="h-48 w-full object-cover" src={project.header_image} alt="" />
        </div>
        <div className="flex flex-1 flex-col justify-between bg-white p-6">
            <div className="flex-1">
                <div className="text-sm font-medium text-indigo-600 flex space-x-3 ">

                    <Tags tags={project.tags}/>
                </div>
                <button onClick={setProject} className="mt-2 block text-left">
                    <p className="text-xl font-semibold text-gray-900">{project.title}</p>
                    <p className="mt-3 text-base text-gray-500">{project.description.substring(0, 100)}...</p>
                </button>
            </div>
            <div className="mt-6 flex items-center">
                <div className="flex-shrink-0">
                    <dd >
                        <span className="sr-only">{project.author}</span>
                        {/*<img className="h-10 w-10 rounded-full" src={post.author.imageUrl} alt="" />*/}
                    </dd>
                </div>
                <div className=" text-left">
                    <p className="text-sm font-medium text-gray-900">
                        <span className="hover:underline">
                            {project.author}
                        </span>
                    </p>
                    <time className="text-gray-400 text-xs" dateTime={project.created_at}>{TimeStringToDate(project.created_at)}</time>

                </div>
            </div>
        </div>
    </div>
  
}
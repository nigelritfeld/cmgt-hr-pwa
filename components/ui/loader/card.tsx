import {Tags} from "@/components/ui/tags";
import {TimeStringToDate} from "@/utils/TimeStringToDate";

export const Card = () => {

    return <div className="flex flex-col overflow-hidden bg-gray-300 rounded-lg shadow-lg w-full grow basis-1/5 mt-2">
        <div className="flex-shrink-0">
            <div className="h-48 w-full object-cover bg-gray-500 rounded-xl animate-pulse"></div>
        </div>
        <div className="flex flex-1 flex-col justify-between space-y-3 p-6">
            <div className="flex-1">
                <div className="text-sm font-medium text-indigo-600 flex bg-gray-400 rounded-xl animate-pulse h-12 space-x-3 ">

                    {/*<Tags tags={project.tags}/>*/}
                </div>
                <div  className="mt-2 block h-12 ">
                    <div className="text-xl font-semibold bg-gray-500 rounded-xl animate-pulse text-gray-900"></div>
                    <div className="mt-3 text-base bg-gray-500 rounded-xl animate-pulse text-gray-500"></div>
                </div>
            </div>
            <div className="mt-6 flex bg-gray-400 h-full rounded-xl p-3 items-center">
                <div className="flex-shrink-0">
                    <dd className="bg-gray-800 rounded-xl h-10 animate-pulse">
                    </dd>
                </div>
                <div className=" text-left">
                    <div className="text-sm bg-gray-800 rounded-xl h-12 animate-pulse font-medium text-gray-900">

                    </div>
                </div>
            </div>
        </div>
    </div>


}
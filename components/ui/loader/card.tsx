import {Tags} from "@/components/ui/tags";
import {TimeStringToDate} from "@/utils/TimeStringToDate";

export const Card = () => {

    return <div className="flex flex-col overflow-hidden rounded-lg shadow-lg w-full grow basis-1/5 mx-3 mt-3">
        <div className="flex-shrink-0">
            <div className="h-48 w-full object-cover bg-gray-500 rounded-x-xl animate-pulse"></div>
        </div>
        <div className="flex flex-1 flex-col justify-between space-y-3 py-6 px-3">
            <div className="flex-1 space-y-2">
                <div className="text-sm font-medium text-indigo-600 flex bg-gray-400 rounded-xl animate-pulse h-4 space-x-3 ">
                </div>
                <div className="text-sm font-medium text-indigo-600 flex bg-gray-400 rounded-xl animate-pulse h-4 space-x-3 ">
                </div>
            </div>
            <div className="flex-1 space-y-2 h-30">
                <div className="text-sm font-medium text-indigo-600 flex bg-gray-400 rounded-xl animate-pulse h-16 space-x-3 ">
                </div>
                <div className="text-sm font-medium text-indigo-600 flex bg-gray-400 rounded-xl animate-pulse h-6 space-x-3 ">
                </div>
            </div>
        </div>
    </div>


}
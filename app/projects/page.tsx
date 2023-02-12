'use client';
import {Inter} from '@next/font/google'
import CMGT from "@/plugins/axios";
import {ProjectCardProps, Tag} from "@/types/cmgt";
import {Card} from "@/app/projects/card";
import {useGlobalContext} from "@/app/Context/store";
import {useEffect} from "react";
import Hero from "@/components/ui/hero";

const inter = Inter({subsets: ['latin']})

async function getProjects() {
    const response = await CMGT.get('/projects')

    let res
    switch (response.status) {
        case 200:
            res = response.data.data
            break
        case 201:
            res = response.data.data
            break
        case 403:
            res = response.data.data
            break
        default:
            res = new Error('Failed to fetch data');
    }
    if (res == Error) {
        throw res
    }
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
    return res

}
async function getTags() {
    const response = await CMGT.get('/tags')

    let res
    switch (response.status) {
        case 200:
            res = response.data.data
            break
        case 201:
            res = response.data.data
            break
        case 403:
            res = response.data.data
            break
        default:
            res = new Error('Failed to fetch data');
    }
    if (res == Error) {
        throw res
    }
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
    return res

}


export default function Projects() {
    const {setProjects, projects, searchQuery} = useGlobalContext()

    useEffect(()=>{
        getProjects()
            .then(data => setProjects(data))
            .catch(e=>console.log(e))
    },[])

    const filterOnTag = (tags:Tag[], query: string ) => {
        return (tags.find((tag)=> tag.name.includes(query)))
    }
    const cards = projects?.filter(({project}, index)=>{
        return  project.title.includes(searchQuery) || project.description.includes(searchQuery)
    }).map(({project, links}: ProjectCardProps, index: number) => <Card key={index} project={project} links={links}/>)
    return (
        <main className="w-full">
            {/* 3 column wrapper */}
            <div className="mx-auto w-full max-w-7xl flex-grow lg:flex xl:px-8">
                {/*<div className="bg-gray-50 pr-4 sm:pr-6 lg:flex-shrink-0 lg:border-l lg:border-gray-200 lg:pr-8 xl:pr-0">*/}
                {/*    <div className="h-full py-6 pl-6 lg:w-80">*/}
                {/*        /!* Start right column area *!/*/}
                {/*        <div className="relative h-full" style={{ minHeight: '16rem' }}>*/}

                {/*            <div className="absolute inset-0 rounded-lg border-2 border-dashed border-gray-200" />*/}
                {/*        </div>*/}
                {/*        /!* End right column area *!/*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="min-w-0 flex-1 bg-white xl:flex">


                    <div className="bg-white lg:min-w-0 lg:flex-1">
                        <div className="h-full py-6 px-4 sm:px-6 lg:px-8">
                            {/* Start main area*/}
                            <div className="relative h-full flex w-full flex-wrap space-x-3" style={{ minHeight: '36rem' }}>
                                {cards}
                            </div>
                            {/* End main area */}
                        </div>
                    </div>
                </div>


            </div>
        </main>
    )
}


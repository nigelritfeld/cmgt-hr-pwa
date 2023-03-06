'use client';
import {Inter} from '@next/font/google'
import CMGT from "@/plugins/axios";
import {ProjectCardProps, Tag} from "@/types/cmgt";
import {Card} from "@/app/projects/card";
import {useGlobalContext} from "@/app/Context/store";
import {useEffect, useState} from "react";
import Hero from "@/components/ui/hero";
import {getAllFromStore, transaction} from "@/utils/indexDB";
import {CategoryTag} from "@/components/categoryTag";

const inter = Inter({subsets: ['latin']})

async function getProjects() {
    try {
        const store = await transaction('cmgt', 1, 'projects', 'project', 'readwrite')
        const storeData = await getAllFromStore(store)
        if (storeData.length > 1) return storeData
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
        // The return value is *not* serialized
        // You can return Date, Map, Set, etc.
        return res
    } catch (e) {

    }


}


export default function Projects() {
    const {setProjects, projects, searchQuery, appState, categoryFilter} = useGlobalContext()
    const [tags, setTags] = useState<Array<Tag>>([])

    const getTags = async () => {
        const response = await CMGT.get('/tags')
        return response.data.data
    }

    useEffect(() => {
        getTags().then(tags => setTags(tags))
    }, [])

    useEffect(() => {
        getProjects()
            .then(data => setProjects(data))
            .catch(e => console.log(e))
    }, [])

    const filterOnTag = (tags: Tag[]) => {
        return !!(tags.find((tag) => categoryFilter.find(category => category.id === tag.id)))
    }

    const cards = projects?.filter(({project}, index) => {
        // if category filter is enabled only filter on tag and description
        if (categoryFilter.length >= 1 && searchQuery !== '') {
            return ((project.title.toLowerCase().includes(searchQuery) && filterOnTag(project.tags)))
        }
        if ((categoryFilter.length >= 1 && searchQuery === '')) {
            return filterOnTag(project.tags)
        }
        return project.title.toLowerCase().includes(searchQuery) || project.description.toLowerCase().includes(searchQuery)
    })
        .map(({project, links}: ProjectCardProps, index: number) => <Card key={index} project={project} links={links}/>)
    return (
        <main className="w-full">
            {
                appState === "online" ?
                    (<nav className="w-full h-16 flex items-center px-4 bg-gray-200">
                        <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
                            <div className=" flex space-x-3">
                                {tags.map((tag, index) =>
                                    <CategoryTag key={index} tag={tag}/>)}
                            </div>
                        </div>
                    </nav>) : "Tags zijn alleen zichtbaar als je verbonden bent met het internet."
            }
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
                            <div>{cards.length} projecten gevonden</div>

                            <div className="relative h-full flex w-full flex-wrap space-x-3"
                                 style={{minHeight: '36rem'}}>
                                {
                                    cards.length > 0 ? cards : "Geen projecten gevonden met huidige filters"
                                }
                            </div>
                            {/* End main area */}
                        </div>
                    </div>
                </div>


            </div>
        </main>
    )
}


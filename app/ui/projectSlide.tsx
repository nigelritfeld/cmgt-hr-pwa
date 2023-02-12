'use client';

import {FC, Fragment, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {XMarkIcon} from '@heroicons/react/24/outline'
import {ProjectSlideProps} from "@/types/slide";
import {useGlobalContext} from "@/app/Context/store";
import {Tags} from "@/components/ui/tags";


export const ProjectSlide: FC = () => {
    const {selectedProject, setSelectedProject} = useGlobalContext()

    const close = () => setSelectedProject(null)
    return <Transition.Root show={!!selectedProject} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={close}>
            <div className="fixed inset-0"/>

            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                        <Transition.Child
                            as={Fragment}
                            enter="transform transition ease-in-out duration-500 sm:duration-700"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transform transition ease-in-out duration-500 sm:duration-700"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                                <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                    <div className="px-4 sm:px-6">
                                        <div className="flex items-start justify-between">
                                            <Dialog.Title
                                                className="text-2xl font-bold text-gray-900">{selectedProject?.title}</Dialog.Title>
                                            <div className="ml-3 flex h-7 items-center">
                                                <button
                                                    type="button"
                                                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                    onClick={() => close()}
                                                >
                                                    <span className="sr-only">Close panel</span>
                                                    <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="relative mt-6 flex-1 px-4 sm:px-6 text-sm">
                                        {/* Replace with your content */}
                                        {selectedProject?.tags ? <Tags tags={selectedProject?.tags}/> : null}


                                        <div>
                                            <h3 className="font-semibold">{selectedProject?.author}</h3>

                                        </div>

                                        <p>{selectedProject?.description}</p>

                                        <div>{selectedProject?.screenshots.map((url, index) => {
                                            return (
                                                <img key={index} src={url} alt=""/>
                                            )
                                        })}</div>


                                        {/* /End replace */}
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </div>
        </Dialog>
    </Transition.Root>

}

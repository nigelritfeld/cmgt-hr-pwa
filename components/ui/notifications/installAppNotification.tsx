'use client';
import {Fragment, useState} from 'react'
import {Transition} from '@headlessui/react'
import {XMarkIcon} from '@heroicons/react/20/solid'
import {useGlobalContext} from "@/app/Context/store";
import {InstallServiceWorker} from "@/utils/installServiceWorker";

export const InstallAppNotification = () => {
    const {appInstalled, deferredPrompt} = useGlobalContext()
    const [show, setShow] = useState(true)
    const install = async () => {
        console.log("starting..")
        console.log(deferredPrompt)
        if (deferredPrompt !== null) {
            deferredPrompt.prompt();
            let {outcome} = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                InstallServiceWorker()
            }
        }
    }
    return (
        <>
            {/* Global notification live region, render this permanently at the end of the document */}
            <div
                aria-live="assertive"
                className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
            >
                <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
                    {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
                    <Transition
                        show={!appInstalled && show}
                        as={Fragment}
                        enter="transform ease-out duration-300 transition"
                        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div
                            className="pointer-events-auto w-full max-w-sm rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="p-4">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 pt-0.5">
                                        <img
                                            className="h-10 w-10 "
                                            src="/images/favicons/favicon-32x32.png"
                                            alt=""
                                        />
                                    </div>
                                    <div className="ml-3 w-0 flex-1">
                                        <p className="text-sm font-medium text-gray-900">Install app</p>
                                        <p className="mt-1 text-sm text-gray-500">Would you like to install this web
                                            app. You can install this app to use it offline.</p>
                                        <div className="mt-4 flex">
                                            <button
                                                onClick={install}
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-cmgt-primary px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-cmgt-primary/80 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            >
                                                Install app
                                            </button>
                                            {/*<button*/}
                                            {/*    type="button"*/}
                                            {/*    className="ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"*/}
                                            {/*>*/}
                                            {/*    Decline*/}
                                            {/*</button>*/}
                                        </div>
                                    </div>
                                    <div className="ml-4 flex flex-shrink-0">
                                        <button
                                            type="button"
                                            className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            onClick={() => {
                                                setShow(false)
                                            }}
                                        >
                                            <span className="sr-only">Close</span>
                                            <XMarkIcon className="h-5 w-5" aria-hidden="true"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </>
    )
}

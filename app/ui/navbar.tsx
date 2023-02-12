'use client';
import {Disclosure, Menu, Transition} from "@headlessui/react";
import {Bars3CenterLeftIcon, MagnifyingGlassIcon, XMarkIcon} from "@heroicons/react/20/solid";
import {ChangeEvent, Fragment} from "react";
import {classNames} from "@/utils/classNames";
import Link from "next/link";
import {useGlobalContext} from "@/app/Context/store";

/**
 * Navigation bar component for layout
 * Client component
 * @constructor
 */
export const NavBar = ()=> {
    const {setSearchQuery} = useGlobalContext()
    const search = (e: ChangeEvent) => setSearchQuery(e.target?.value)
    return <Disclosure as="nav" className="flex-shrink-0 bg-cmgt-primary">
        {({ open }) => (
            <>
                <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        {/* Logo section */}
                        <Link href="/" className="flex items-center px-2 lg:px-0 xl:w-64">
                            <div className="flex-shrink-0">
                                <img
                                    className="h-8 w-auto"
                                    src="/images/logo/cmgt-minilogo.png"
                                    alt="Your Company"
                                />
                            </div>
                        </Link>

                        {/* Search section */}
                        <div className="flex flex-1 justify-center lg:justify-end">
                            <div className="w-full px-2 lg:px-6">
                                <label htmlFor="search" className="sr-only">
                                    Search projects
                                </label>
                                <div className="relative text-indigo-200 focus-within:text-gray-400">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                                    </div>
                                    <input
                                        id="search"
                                        name="search"
                                        className="block w-full rounded-md border border-transparent bg-indigo-400 bg-opacity-25 py-2 pl-10 pr-3 leading-5 text-indigo-100 placeholder-indigo-200 focus:bg-white focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
                                        placeholder="Search projects"
                                        type="search"
                                        onChange={search}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex lg:hidden">
                            {/* Mobile menu button */}
                            <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-indigo-600 p-2 text-indigo-400 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600">
                                <span className="sr-only">Open main menu</span>
                                {open ? (
                                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                ) : (
                                    <Bars3CenterLeftIcon className="block h-6 w-6" aria-hidden="true" />
                                )}
                            </Disclosure.Button>
                        </div>
                        {/* Links section */}
                        <div className="hidden lg:block lg:w-80">
                            <div className="flex items-center justify-end">
                                <div className="flex">
                                    <Link
                                        href="#"
                                        className="rounded-md px-3 py-2 text-sm font-medium text-indigo-200 hover:text-white"
                                    >
                                        Projecten
                                    </Link>
                                    <Link
                                        href="#"
                                        className="rounded-md px-3 py-2 text-sm font-medium text-indigo-200 hover:text-white"
                                    >
                                        Tags
                                    </Link>
                                </div>
                                {/* Profile dropdown */}
                                <Menu as="div" className="relative ml-4 flex-shrink-0">
                                    <div>
                                        <Menu.Button className="flex rounded-full bg-indigo-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-700">
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                className="h-8 w-8 rounded-full"
                                                src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80"
                                                alt=""
                                            />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        href="#"
                                                        className={classNames(
                                                            active ? 'bg-gray-100' : '',
                                                            'block px-4 py-2 text-sm text-gray-700'
                                                        )}
                                                    >
                                                        View Profile
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        href="#"
                                                        className={classNames(
                                                            active ? 'bg-gray-100' : '',
                                                            'block px-4 py-2 text-sm text-gray-700'
                                                        )}
                                                    >
                                                        Settings
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        href="#"
                                                        className={classNames(
                                                            active ? 'bg-gray-100' : '',
                                                            'block px-4 py-2 text-sm text-gray-700'
                                                        )}
                                                    >
                                                        Logout
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>
                </div>

                <Disclosure.Panel className="lg:hidden">
                    <div className="px-2 pt-2 pb-3">
                        <Disclosure.Button
                            as="a"
                            href="#"
                            className="block rounded-md bg-indigo-800 px-3 py-2 text-base font-medium text-white"
                        >
                            Dashboard
                        </Disclosure.Button>
                        <Disclosure.Button
                            as="a"
                            href="#"
                            className="mt-1 block rounded-md px-3 py-2 text-base font-medium text-indigo-200 hover:bg-indigo-600 hover:text-indigo-100"
                        >
                            Support
                        </Disclosure.Button>
                    </div>
                    <div className="border-t border-indigo-800 pt-4 pb-3">
                        <div className="px-2">
                            <Disclosure.Button
                                as="a"
                                href="#"
                                className="block rounded-md px-3 py-2 text-base font-medium text-indigo-200 hover:bg-indigo-600 hover:text-indigo-100"
                            >
                                Your Profile
                            </Disclosure.Button>
                            <Disclosure.Button
                                as="a"
                                href="#"
                                className="mt-1 block rounded-md px-3 py-2 text-base font-medium text-indigo-200 hover:bg-indigo-600 hover:text-indigo-100"
                            >
                                Settings
                            </Disclosure.Button>
                            <Disclosure.Button
                                as="a"
                                href="#"
                                className="mt-1 block rounded-md px-3 py-2 text-base font-medium text-indigo-200 hover:bg-indigo-600 hover:text-indigo-100"
                            >
                                Sign out
                            </Disclosure.Button>
                        </div>
                    </div>
                </Disclosure.Panel>
            </>
        )}
    </Disclosure>
}
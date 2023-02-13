import './globals.css'
import {ReactNode} from "react";
import {NavBar} from '../components/ui/navbar';
import Footer from "@/components/ui/footer";
import {GlobalContextProvider} from "@/app/Context/store";
import {ProjectSlide} from "@/components/ui/projectSlide";
import {Banner} from "@/components/ui/banner";

export default function RootLayout({
                                       children,
                                   }: {
    children: ReactNode
}) {
    return (
        <GlobalContextProvider>
            <html lang="en">
            {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
            <head/>
            <body>
            {/* Background color split screen for large screens */}
            <div className="fixed top-0 left-0 h-full w-1/2 bg-white" aria-hidden="true"/>
            <div className="fixed top-0 right-0 h-full w-1/2 bg-gray-50" aria-hidden="true"/>
            <div className="relative flex min-h-screen flex-col">
                <NavBar/>
                <Banner/>
                <ProjectSlide/>
                {children}
                <Footer/>

            </div>

            </body>
            </html>
        </GlobalContextProvider>

    )
}

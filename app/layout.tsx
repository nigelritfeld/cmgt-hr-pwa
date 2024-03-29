import './globals.css'
import {ReactNode} from "react";
import {NavBar} from '../components/ui/navbar';
import Footer from "@/components/ui/footer";
import {GlobalContextProvider} from "@/app/Context/store";
import {ProjectSlide} from "@/components/ui/projectSlide";
import {Banner} from "@/components/ui/banner";
import {InstallAppNotification} from "@/components/ui/notifications/installAppNotification";

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
            <body className="bg-white">
            {/* Background color split screen for large screens */}
            <div className="relative flex min-h-screen flex-col">
                <NavBar/>
                <Banner/>
                <ProjectSlide/>
                {children}
                <Footer/>

            </div>

            <InstallAppNotification/>
            </body>
            </html>
        </GlobalContextProvider>

    )
}

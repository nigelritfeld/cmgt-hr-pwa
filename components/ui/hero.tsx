import { ChevronRightIcon } from '@heroicons/react/20/solid'
import Link from "next/link";
import {Grid} from "@/components/ui/grid";

export default function Hero() {
    return (
        <div className="relative isolate overflow-hidden bg-gray-900 bg-[#1d0009] md:max-h-[70vh]">
            <Grid/>
            {/*<svg*/}
            {/*    viewBox="0 0 1108 632"*/}
            {/*    aria-hidden="true"*/}
            {/*    className="absolute top-10 left-[calc(50%-4rem)] -z-10 w-[69.25rem] max-w-none transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"*/}
            {/*>*/}
            {/*    <path*/}
            {/*        fill="url(#175c433f-44f6-4d59-93f0-c5c51ad5566d)"*/}
            {/*        fillOpacity=".2"*/}
            {/*        d="M235.233 402.609 57.541 321.573.83 631.05l234.404-228.441 320.018 145.945c-65.036-115.261-134.286-322.756 109.01-230.655C968.382 433.026 1031 651.247 1092.23 459.36c48.98-153.51-34.51-321.107-82.37-385.717L810.952 324.222 648.261.088 235.233 402.609Z"*/}
            {/*    />*/}
            {/*    <defs>*/}
            {/*        <linearGradient*/}
            {/*            id="175c433f-44f6-4d59-93f0-c5c51ad5566d"*/}
            {/*            x1="1220.59"*/}
            {/*            x2="-85.053"*/}
            {/*            y1="432.766"*/}
            {/*            y2="638.714"*/}
            {/*            gradientUnits="userSpaceOnUse"*/}
            {/*        >*/}
            {/*            <stop stopColor="#4F46E5" />*/}
            {/*            <stop offset={1} stopColor="#80CAFF" />*/}
            {/*        </linearGradient>*/}
            {/*    </defs>*/}
            {/*</svg>*/}
            <div className="mx-auto max-w-7xl px-6  pb-24 sm:pb-32 lg:flex lg:py-10 lg:px-8">
                <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
                    <img
                        className="h-20"
                        src="/images/logo/cmgt_logo.webp"
                        alt="Your Company"
                    />
              {/*      <div className="mt-24 sm:mt-32 lg:mt-16">*/}
              {/*          <a href="#" className="inline-flex space-x-6">*/}
              {/*<span className="rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-400 ring-1 ring-inset ring-indigo-500/20">*/}
              {/*  What's new*/}
              {/*</span>*/}
              {/*              <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-300">*/}
              {/*  <span>Just shipped v1.0</span>*/}
              {/*  <ChevronRightIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />*/}
              {/*</span>*/}
              {/*          </a>*/}
              {/*      </div>*/}
                    <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
                        Creative Media & Game Technologies
                    </h1>
                    {/*<h3 className="mt-10 text-2xl font-semibold tracking-tight text-white sm:text-2xl">*/}
                    {/*    Archive*/}
                    {/*</h3>*/}
                    <p className="mt-6 text-lg leading-8 text-gray-300">
                        Archief met alle projecten ooit gemaakt door CMGT Studenten.
                    </p>
                    <div className="mt-10 flex items-center gap-x-6">
                        <Link
                            href="/projects"
                            className="rounded-md bg-indigo-500 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                        >
                            Open archief
                        </Link>
                        <a href="#" className="text-base font-semibold leading-7 text-white">
                            Learn more <span aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>
                <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mt-0 lg:mr-0 lg:max-w-none lg:flex-none xl:ml-32">
                    <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                        <img
                            src="/images/hero-image.png"
                            alt="App screenshot"
                            width={2432}
                            height={1442}
                            className="w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

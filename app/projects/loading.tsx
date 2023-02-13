"use client"

import {Card} from "@/components/ui/loader/card";

export default function Loading() {

  return <main className="w-full">
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
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
              </div>
            {/* End main area */}
          </div>
        </div>
      </div>


    </div>
  </main>
}

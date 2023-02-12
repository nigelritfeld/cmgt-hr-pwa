'use client';
import {FC} from "react";
import {Tag} from "@/types/cmgt";

interface TagsProps {
    tags: Tag[]
}

export const Tags: FC<TagsProps> = ({tags}) => {
    return <div className="flex space-x-2">{tags.map((tag, index) => {
        return (
            <p className="bg-cmgt-primary text-xs text-white px-2 py-1 rounded-full w-fit" key={index}> {tag.name}</p>
        )
    })}</div>
}
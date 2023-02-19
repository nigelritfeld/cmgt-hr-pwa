import {FC, useEffect, useState} from "react";
import {Tag} from "@/types/cmgt";
import {useGlobalContext} from "@/app/Context/store";
import {tag} from "postcss-selector-parser";
import {classNames} from "@/utils/classNames";

interface TagProps {
    tag: Tag
}


export const CategoryTag: FC<TagProps> = ({tag: {id, name}}) => {

    const {categoryFilter, setCategoryFilter} = useGlobalContext()

    const [active, setActive] = useState(false)
    const toggle = (event: MouseEvent) => {
        const id = event.target.dataset.id
        const category = categoryFilter.find(tag => tag.id === id)
        switch (category) {
            case undefined:
                add({id: parseInt(id), name})
                break;
            default:
                remove(category.id)
        }
        console.log(`${name} is currently ${active}`)
        console.log(categoryFilter)
    }

    const add = (tag: Tag) => {
        setActive(true)
        setCategoryFilter([tag, ...categoryFilter])
    }

    const remove = (id: number) => {
        setActive(false)
        setCategoryFilter([...(categoryFilter.filter(tag => tag.id != id))])
    }

    useEffect(() => {
        console.log(`${name} is currently ${active}`)
    }, [active])
    return <span onClick={(e) => toggle(e)} data-id={id} className={classNames(
        active ? "bg-cmgt-primary" : "border-bg-cmgt-primary border-1",
        " cursor-pointer text-xs text-white px-2 py-1 rounded-full w-fit"
    )}> {name}</span>
}
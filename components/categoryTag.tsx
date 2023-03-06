import {DetailedHTMLProps, FC, useEffect, useState} from "react";
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
    const toggle = (event: DetailedHTMLProps<any, MouseEvent>) => {
        console.log("Toggle category")
        const category = categoryFilter.find(tag => tag.id === id)
        switch (category) {
            case undefined:
                add({id: id, name})
                break;
            default:
                remove(category.id)
        }
    }

    const add = (tag: Tag) => {
        setActive(true)
        setCategoryFilter([tag, ...categoryFilter])
    }

    const remove = (id: number) => {
        setActive(false)
        setCategoryFilter([...(categoryFilter.filter(tag => tag.id !== id))])
    }

    useEffect(() => {
    }, [active])
    return <span onClick={toggle} data-id={id} className={classNames(
        active ?
            "bg-cmgt-primary" : "text-black bg-cmgt-primary/20",
        "border-2 border-solid border-cmgt-primary",
        "flex items-center justify-center",
        "cursor-pointer text-xs text-white px-2 py-1 rounded-full w-fit"
    )}> {name}</span>
}
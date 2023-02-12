
export interface ResourceLink {
    self: string
    collection: string
}
export interface CMGTProject {
    id: number
    title: string
    slug: string
    header_image: string
    tagline: string
    description: string
    author: string
    youtube?: string
    screenshots: Array<string>
    spotlight: boolean
    isValidated: boolean
    tags: Array<Tag>
    created_at: string
    updated_at: string
}
export interface Tag {
    id: number
    name: string
}
export interface ProjectCardProps {
    project: CMGTProject
    links: ResourceLink
}
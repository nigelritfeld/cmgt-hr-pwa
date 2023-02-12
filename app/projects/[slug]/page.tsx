import {NextPage} from "next";

const ProjectDetail = ({ params }: {
    params: { slug: string };
}) => {
return <div>
    {params.slug}
</div>
}
export default ProjectDetail
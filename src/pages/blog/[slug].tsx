import { useRouter } from "next/router";
const BlogSlugPage = () => {
    const Router = useRouter();
    const { slug } = Router.query;
    return (
        <div>
        <h1>  Detail Blog</h1>
        <p>slug : {slug}</p>
        </div>
    );
};

export default BlogSlugPage;
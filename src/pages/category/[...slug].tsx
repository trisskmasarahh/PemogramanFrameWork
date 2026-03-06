import { useRouter } from "next/router";

    const halamanCategory = () => {
    const { query } = useRouter();
    const { slug } = query;

    return (
        <div>
        <h1>Halaman Kategori</h1>
        <h2>List Parameter URL:</h2>
        <p>
            {Array.isArray(slug) &&
            slug.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </p>
        </div>
    );
    };

    export default halamanCategory;
import { useRouter } from "next/router";
const HalamanProduk = () => {
    // const Router = useRouter();
    // console.log(Router);
    const { query } = useRouter();
    return (
        <div>
        <h1>  Halaman produk</h1>
        <p>Produk : {query.id}</p>
        </div>
    );
};

export default HalamanProduk;
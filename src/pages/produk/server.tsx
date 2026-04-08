import TampilanProduk from "../../views/Product";
import {ProductType} from "@/types/Product.type";

const halamanProdukServer = (props:{ products: ProductType[] }) => {
    const { products } = props;
    return(
        <div>
            <h1>Halaman produk Server</h1>
            <TampilanProduk products={products} />

        </div>
    );
};

export default halamanProdukServer;

//fungsi getServersideProps akan dipanggil setiap kali halaman ini diakses, dan akan mengambil data produk dari API sebelum merender halaman.

export async function getServerSideProps() {
    const res = await fetch("http://localhost:3000/api/produk");
    const data = await res.json();
    // console.log("data produk yang diambil dari API:", respone);

    return {
        props: {
            products: data.data, // pastikan untuk memberikan nilai default jika data tidak tersedia
        },
    };
}


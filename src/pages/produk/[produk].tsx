import fetcher from "@/utils/swr/fetcher";
import { useRouter } from "next/router";
import useSWR from "swr";
import DetailProduk from "../../views/DetailProduct";
import { ProductType } from "@/types/Product.type";

const HalamanProduk = ({ product }: { product: ProductType }) => {
{/digunakan client-side rendering/}

  // const Router = useRouter();
  // console.log(Router);
//     const { query } = useRouter();
//     const { data, error, isLoading } = useSWR(`/api/products/${query.produk}`, fetcher);
//     return (
//         <div>
//             <DetailProduk products={isLoading ? [] : data.data} />
//         </div>
//     );
// };

return (
    <div>
        <DetailProduk products={product} />
    </div>
);
};

export default HalamanProduk;


//fungsi getsersideprps akan dipanggil setiap kali halaman diakses, dan akan mengambil data produk berdasarkan ID yang diberikan dalam URL. Data produk tersebut kemudian akan diteruskan sebagai props ke komponen HalamanProduk untuk ditampilkan.
{/digunakan server-side rendering/}

//export async function getServerSideProps({ params }: { params: { produk: string } }) {
//     const res = await fetch(`http://localhost:3000/api/produk/${params.produk}`);
//     const response = await res.json();
//     //console.log("Data produk yang diambil API:", response);
//     return {
//         props: {
//             product: response.data, //pastikan untuk memberikan nilai default jika response.data tidak ada atau undefined
//         },
//     };
// }


{/digunakan static-site generation/}

export async function getStaticPaths() {
    const res = await fetch("http://localhost:3000/api/produk");
    const response = await res.json();
    const paths = response.data.map((product: ProductType) => ({
        params: {
            produk: product.id,
        },
    }));
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }: { params: { produk: string } }) {
    const res = await fetch(`http://localhost:3000/api/produk/${params.produk}`);
    //const response response: ProductType = await res.json();
    const response:{data: ProductType} = await res.json();
    //console.log("Data produk yang diambil API:", response);
    return {
        props: {
            product: response.data, //pastikan untuk memberikan nilai default jika response.data tidak ada atau undefined
        },
    };
}
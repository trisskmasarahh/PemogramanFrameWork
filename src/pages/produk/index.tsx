import {useRouter} from "next/router";
import {useEffect, useState} from "react";
const produk = () => {
    const [islogin, setIsLogin] = useState(false);
    const {push} = useRouter();
    useEffect(() => {
        if (!islogin) {
            push("/auth/login");
        }
    },[]);

    return (
        <div>
            <h1>Halaman Produk</h1>
                <p>Ini adalah halaman produk yang hanya dapat diakses oleh pengguna yang sudah login.</p>
        </div>
    );
};

export default produk;
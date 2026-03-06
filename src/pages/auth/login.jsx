import Link from "next/link";
import { useRouter } from "next/router";

const halamanLogin = () => {
    const { push } = useRouter();
    const handlerLogin = () => {
        push('/produk');
    }

    return (
        <div>  
            <h1>Halaman Login</h1>
            <button onClick ={()=> handlerLogin()}>Login</button> <br />
            <p><Link href="/auth/register">ke Halaman Register</Link></p>
        </div>
    );
};

export default halamanLogin;

//*<button onClick={handlerLogin}>Login</button> <br />*/}
//*<button onClick ={()=> Push('/produk')}>Login</button> <br*/>
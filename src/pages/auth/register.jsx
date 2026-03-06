import Link from "next/link";

const halamanRegister = () => {
    return (
        <div>   
            <h1>Halaman Register</h1>
            <p><Link href="/auth/login">ke Halaman Login</Link></p>
        </div>
    );
};

export default halamanRegister;
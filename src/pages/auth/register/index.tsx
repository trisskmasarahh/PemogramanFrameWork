    import Link from "next/link";
    import styles from "./register.module.css";

    const halamanRegister = () => {
    return (
        <div className={styles.register}>
            <h1 className="text-3xl font-bold text-blue-600">Halaman Register</h1><br />
            <input className="border border-gray-300 rounded-md p-2" type="text" placeholder="Username" />
            <input className="border border-gray-300 rounded-md p-2" type="password" placeholder="Password" /><br />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Register</button><br />
            <Link href="/auth/login">Ke Halaman Login</Link>
        </div>
    )
    };

    export default halamanRegister;
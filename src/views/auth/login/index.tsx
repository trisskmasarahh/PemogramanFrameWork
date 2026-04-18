import Link from "next/link";
import style from "../../auth/login/login.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const TampilanLogin = () => {
const [isLoading, setIsLoading] = useState(false);
const { push, query } = useRouter();

const callbackUrl : any = query.callbackUrl || "/";
const [error, setError] = useState("");
const handleSubmit = async (event: any)=>{
    event.preventDefault();
    setError("");
    setIsLoading(true);

    // const form = event.currentTarget;
    // const formData = new FormData(event.currentTarget);
    // const email = formData.get("email") as string;
    // const fullname = formData.get("fullname") as string;
    // const password = formData.get("password") as string;

    // //validasi email wajib diisi
    // if (!email || email.trim() === "") {
    //     setError("Email is required");
    //     setIsLoading(false);
    //     return;
    // }

    // //validasi password minimal 6 karakter
    // if (!password || password.length < 6) {
    //     setError("Password must be at least 6 characters");
    //     setIsLoading(false);
    //     return;
    // }

try{
    const res = await signIn("credentials",{
        redirect: false,
        email: event.target.email.value,
        password: event.target.password.value,
        callbackUrl,
    });
    
    if (!res?.error){
        setIsLoading(false);
        push(callbackUrl);
    }else{
        setIsLoading(false);
        setError(res?.error || "Login failed")
    }
}
catch (error){
setIsLoading(false);
setError("wrong email or password");
}

};

    
    return (
        <>
        <div className={style.login}>
            {error && <p className={style.login__error}>{error}</p>}
            <h1 className={style.login__title}>Halaman login</h1>
            <div className={style.login__form}>
                <form onSubmit={handleSubmit}>
                    {error && (
                <div className={style.login__errorBox}>
                    <p className={style.login__error}>{error}</p>
                </div>
            )}

                    <div className={style.login__form__item}>
                        <label
                            htmlFor="email"
                            className={style.login__form__item__label}>
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            className={style.login__form__item__input}
                        />
                    </div>

                    {/* <div className={style.login__form__item}>
                        <label
                            htmlFor="fullname"
                            className={style.login__form__item__label}>
                            fullname
                        </label>
                        <input
                            type="text"
                            id="fullname"
                            name="fullname"
                            placeholder="fullname"
                            className={style.login__form__item__input}
                        />
                    </div> */}

                    <div className={style.login__form__item}>
                        <label
                            htmlFor="password"
                            className={style.login__form__item__label}>
                            password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="password"
                            className={style.login__form__item__input}
                        />
                    </div>
                    <button 
                    type="submit" 
                    className={style.login__form__item__button}
                    disabled={isLoading}>
                        {isLoading ? "Loading..." : "login"}
                    </button>

                </form>
                <br />
                <p className={style.login__form__item__text}>
                    tidak punya akun? <Link href="/auth/register">Ke Halaman Register</Link>
                </p>
            </div>
        </div>
        </>
    );
};

export default TampilanLogin;
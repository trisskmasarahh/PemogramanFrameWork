import Link from "next/link";
import style from "../../auth/register/register.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";

const TampilanRegister = () => {
const [isLoading, setIsLoading] = useState(false);
const { push } = useRouter();
const [error, setError] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setError("");
    setIsLoading(true);
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const fullname = formData.get("fullname") as string;
    const password = formData.get("password") as string;

    //validasi email wajib diisi
    if (!email || email.trim() === "") {
        setError("Email is required");
        setIsLoading(false);
        return;
    }

    //validasi password minimal 6 karakter
    if (!password || password.length < 6) {
        setError("Password must be at least 6 characters");
        setIsLoading(false);
        return;
    }

    const response = await fetch("/api/register", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, fullname, password }),
    });
    // const result = await response.json();
    // console.log(result);
    if (response.status === 200) {
        form.reset();
        // event.currentTarget.reset();
        setIsLoading(false);
        push("/auth/login");
    } else {
        setIsLoading(false);
        setError(
        response.status === 400 ? "Email already exists" : "An error occurred",
        );
    }
};
    return (
        <div className={style.register}>
            {error && <p className={style.register__error}>{error}</p>}
            <h1 className={style.register__title}>Halaman Register</h1>
            <div className={style.register__form}>
                <form onSubmit={handleSubmit}>
                    {error && (
                <div className={style.register__errorBox}>
                    <p className={style.register__error}>{error}</p>
                </div>
            )}

                    <div className={style.register__form__item}>
                        <label
                            htmlFor="email"
                            className={style.register__form__item__label}>
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            className={style.register__form__item__input}
                        />
                    </div>

                    <div className={style.register__form__item}>
                        <label
                            htmlFor="fullname"
                            className={style.register__form__item__label}>
                            fullname
                        </label>
                        <input
                            type="text"
                            id="fullname"
                            name="fullname"
                            placeholder="fullname"
                            className={style.register__form__item__input}
                        />
                    </div>

                    <div className={style.register__form__item}>
                        <label
                            htmlFor="password"
                            className={style.register__form__item__label}>
                            password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="password"
                            className={style.register__form__item__input}
                        />
                    </div>
                    <button 
                    type="submit" 
                    className={style.register__form__item__button}
                    disabled={isLoading}>
                        {isLoading ? "Loading..." : "Register"}
                    </button>

                </form>
                <br />
                <p className={style.register__form__item__text}>
                    Sudah punya akun? <Link href="/auth/login">Ke Halaman Login</Link>
                </p>
            </div>
        </div>
    );
};

export default TampilanRegister;
import styles from '@/styles/404.module.scss'
import Image from "next/image"

const Custom404 = () => {
    return (
        <div className={styles.error}>
            {/*<img src="/page-not-found.png" alt="404" className={styles.error__image} />*/}
            <Image
            src="/page-not-found.png"
            alt="404"
            width={400}
            height={400}
            className={styles.error__image}
            />
            <h1>404 - Halaman Tidak Ditemukan</h1>
            <p>Maaf, halaman yang Anda cari tidak ditemukan.</p>
            </div>
    );
};
        

export default Custom404
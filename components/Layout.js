import Head from 'next/head';
import Link from 'next/link';
import styles from './layout.module.css';
const siteTitle = "Hacker News Clone";
export default ({ children, nav }) => {
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta
                    name="description"
                    content="A clone of Hacker News"
                />
                <meta name="og:title" content={siteTitle} />
                <title>{siteTitle}</title>
            </Head>
            <header className={styles.header}>
                <Link href="/"><a><img className={styles.headerImage} src="/logo.gif" alt="Logo" height="13" width="13" /></a></Link>
                <Link href="/top"><a className={nav === 'top' ? styles.active : ''}>top</a></Link> | 
                <Link href="/new"><a className={nav === 'new' ? styles.active : ''}>new</a></Link>
            </header>
            <main className={styles.main}>{ children }</main>
            <footer className={styles.footer}>
                <span>Made with &hearts; by Debabrata</span>
            </footer>
        </div>
    );
}
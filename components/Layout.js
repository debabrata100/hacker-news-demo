import Head from 'next/head';
import Link from 'next/link';
import styles from './layout.module.css';
const siteTitle = "Hacker News Clone";
export default ({ children, nav }) => {
    return (
        <div className={styles.container}>
            <Head>
                <meta charSet='utf-8' />
                <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
                <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
                <meta name='description' content='A clone of Hacker News' />
                <meta name='keywords' content='Hacker News Clone Demo' />
                <title>{siteTitle}</title>
                <link rel="manifest" href="/manifest.json" />
                <link rel="icon" href="/favicon.ico" />
                <meta name="theme-color" content="#ff6600"/>
                <meta name="og:title" content={siteTitle} />
            </Head>
            <header className={styles.header} data-testid="header">
                <Link href="/"><a><img className={styles.headerImage} src="/logo.gif" alt="Logo" height="13" width="13" /></a></Link>
                <Link href="/top"><a className={nav === 'top' ? styles.active : ''}>top</a></Link> | 
                <Link href="/new"><a className={nav === 'new' ? styles.active : ''}>new</a></Link>
            </header>
            <main className={styles.main}>{ children }</main>
            <footer className={styles.footer} data-testid="footer">
                <span>Made with &hearts; by Debabrata</span>
            </footer>
        </div>
    );
}
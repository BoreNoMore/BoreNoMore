import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import { useColorMode } from '@docusaurus/theme-common';

import styles from './index.module.css';

function HomepageHeader() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <header className={clsx('hero hero--primary', styles.heroBanner)}>
            <div className="container">
                <Heading as="h1" className="hero__title">
                    {siteConfig.title}
                </Heading>
                <p className="hero__subtitle">{siteConfig.tagline}</p>
                <div className={styles.buttons}>
                    <Link
                        className="button button--secondary button--lg"
                        to="/docs/intro">
                        Get Started
                    </Link>
                </div>
            </div>
        </header>
    );
}
function UseCases() {
    const { isDarkTheme } = useColorMode();
    let useCasesImage: string;
    if (!isDarkTheme) {
        useCasesImage = "/BoreNoMore/img/use-cases.png";
    }
    else {
        useCasesImage = "/BoreNoMore/img/use-cases-dark.png";
    }
    return (
        <section className={styles.features}>
            <div className="container">
                <p className={styles.slogan}>Embrace the User-centric approach with the power of Brain&nbsp;Computer Interface. </p>
                <img src={useCasesImage} className={styles.image} alt="Use Cases" />
            </div>
        </section>
    )
}
export default function Home(): JSX.Element {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout
            title={`Hello from ${siteConfig.title}`}
            description="Description will go into a meta tag in <head />">
            <HomepageHeader />
            <main>
                <UseCases />
                <HomepageFeatures />
            </main>
        </Layout>
    );
}

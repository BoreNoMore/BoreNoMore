import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <header className={clsx('hero hero--primary', styles.heroBanner)}>
            <div className="container">
                <Heading as="h1" className={clsx('hero__title', styles.heroTitle)}>
                    User-Responsive BCI
                </Heading>
                    Embrace the User-centric approach with the power of Brain&nbsp;Computer Interface. <br/> 
                <p className="hero__subtitle">{siteConfig.tagline}</p>
                <div className={styles.buttons}>
                    <Link
                        className="button button--secondary button--lg"
                        to="/docs/intro">
                        Enter the Future
                    </Link>
                </div>
            </div>
        </header>
    );
}
function UseCases() {
    return (
        <section className={styles.features}>
            <div className="container">
                <p className={styles.slogan}>
                   <strong> Education, self-improvement, entertainment, job-assistance... </strong> <br/>
                    Possible Applications are endless - The sky is the limit.
                </p>
                <img src="/BoreNoMore/img/use-cases.png" className={styles.image} alt="Use Cases" />
            </div>
        </section>
    )
}
export default function Home(): JSX.Element {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout
            title={`${siteConfig.title}`}
            description="User-Responsive Brain-Computer Interface Framework.">
            <HomepageHeader />
            <main>
                <UseCases />
                <HomepageFeatures />
            </main>
        </Layout>
    );
}

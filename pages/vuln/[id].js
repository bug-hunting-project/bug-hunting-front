import Head from "next/head";
import { useRouter } from "next/router";

export default function vulnDetail({ params }) {
    const router = useRouter();
    const cveId = router.query.id
    return (
        <div>
            <Head>
                <title>{cveId}</title>
            </Head>
            <article>
                <h1>{`${cveId}`}</h1>
                <p>vuln detail</p>
            </article>
        </div>
    )
}

export async function getServerSideProps({ params: { params } }) {
    const { results } = await (
      await fetch(`http://220.70.38.159:5000/api/cve/${params}`)
    ).json();
    console.log(results);
    return {
      props: {
        results,
      },
    };
  }
  
import Link from "next/link";
import { getSortedPostsData } from "../lib/posts";
import Layout from "./../components/layout";
import Date from "../components/date";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <section>
        <h2 className="text-2xl uppercase text-center m-2 underline">Blog</h2>
        <ul>
          {allPostsData.map(({ id, date, title }) => (
            <li key={id}>
              <Link href={`/posts/${id}`}>
                <a className="font-black hover:text-blue-600">{title}</a>
              </Link>
              <p>{id}</p>
              <Date dateString={date} />
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

import Layout from "../components/Layout";
import NewsList from "../components/NewsList";
import { getNewsApiUrl } from "../utils";
import { useRenderedNews } from ".";

export async function getServerSideProps(context){
    const { slug , page = 0 } = context.query;
    const url = getNewsApiUrl({slug: slug[0], page});
    try{
        const data = await fetch(url);
        const dataJson = await data.json();
        return { props: { newsList: dataJson, page, nav: slug[0], error: null }};
    }catch(error){
        return { props: { newsList: [], page, nav: slug[0], error: true }};
    }
}

export default function Slug ({ newsList = null, page, nav, error }) {
    const { renderedNews, upVote, downVote, onHideNews } = useRenderedNews({newsList, page, error });
    return (
        <Layout nav={nav}>
            <NewsList upVote={upVote} downVote={downVote} error={error} onHideNews={onHideNews} newsList={renderedNews} />
        </Layout>
    );
}
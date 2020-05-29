import { getNewsApiUrl } from "../utils";
import { NewsDataComponent } from ".";

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
    return (
        <NewsDataComponent nav={nav} newsList={newsList} page={page} error={error} />
    );
}
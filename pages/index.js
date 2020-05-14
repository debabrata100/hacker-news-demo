import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import NewsList from "../components/NewsList";
import { getFormattedNews, getNewsApiUrl, getNewsFromLocal, storeNewsToLocal } from "../utils";
import { HOME_NAV } from "../utils/constants";

export async function getServerSideProps(context){
    const { page = 0 } = context.query;
    const url = getNewsApiUrl({type: HOME_NAV,page});
    try{
        const data = await fetch(url);
        const dataJson = await data.json();
        return { props: { newsList: dataJson, error: null, page }};
    }catch(error){
        return { props: { newsList: [], error: true, page }};
    }
}

export default function Home ({ newsList = null, page, error }) {
    const { renderedNews, toggleVote, onHideNews } = useRenderedNews({newsList, page, error });
    return (
        <Layout nav={HOME_NAV}>
            <NewsList onVote={toggleVote} error={error} onHideNews={onHideNews} newsList={renderedNews} />
        </Layout>
    );
}

export function useRenderedNews({ newsList, page, error }){
    const [renderedNews, setRenderedNews] = useState([]); 
    useEffect(()=>{
        if(!error && newsList && newsList.hits.length > 0){
            const formattedData = getFormattedNews(newsList);
            setRenderedNews(formattedData);
        }
    },[page]);
    const onHideNews = (id) => {
        const displayedNews = renderedNews.filter(news=>news.id !== id);
        setRenderedNews(displayedNews);
    }
    const toggleVote = ({id, isVoted}) => {
        let upvotes = getNewsFromLocal();
        if(isVoted){
            storeNewsToLocal([...upvotes,id]);
        }else{
            upvotes = upvotes.filter(oid=> oid !== id );
            storeNewsToLocal(upvotes);
        }
        const displayedNews = [...renderedNews];
        const newsIndex = renderedNews.findIndex(news=> news.id === id);
        displayedNews[newsIndex].isVoted = isVoted;
        setRenderedNews(displayedNews);
    }
    return {
        renderedNews,
        setRenderedNews,
        onHideNews,
        toggleVote
    }
}
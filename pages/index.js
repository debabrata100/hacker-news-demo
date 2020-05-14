import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import NewsList from "../components/NewsList";
import { getFormattedNews, getNewsApiUrl } from "../utils";

export async function getServerSideProps(context){
    const url = getNewsApiUrl('front',0);
    try{
        const data = await fetch(url);
        const dataJson = await data.json();
        return { props: { newsList: dataJson, error: null }};
    }catch(error){
        return { props: { newsList: [], error: true }};
    }
    
}

export default function Home ({ newsList = null, error }) {
    const [renderedNews, setRenderedNews] = useState([]); 
    useEffect(()=>{
        if(!error && newsList && newsList.hits.length > 0){
            const formattedData = getFormattedNews(newsList);
            setRenderedNews(formattedData);
        }
    },[]);
    const onHideNews = (id) => {
        const displayedNews = renderedNews.filter(news=>news.id !== id);
        setRenderedNews(displayedNews);
    }
    return (
        <Layout>
            <NewsList error={error} onHideNews={onHideNews} newsList={renderedNews} />
        </Layout>
    );
}
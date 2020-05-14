import { HOME_NAV, TOP_NAV, NEW_NAV } from "./constants";

const getDomianName = (url) => {
    if(url){
        const urlObj = new URL(url);
        return urlObj.host;
    }
    return '';
}
const calculateTimeSince = timeStamp => {
    const delta = Math.abs(new Date().getTime() - new Date(timeStamp).getTime()) / 1000;
    const seconds = Math.floor(delta / 60);
    if(seconds > 60){
        const minutes = Math.floor(delta / 60) / 60;
        if(minutes > 60){
            const hours = Math.floor(delta / 3600) / 24;
            if(hours > 24){
                const days = Math.floor(delta / 86400);
                return Math.floor(days) + ' days ago';
            }
            return Math.floor(hours) + ' hours ago'
        }
        return Math.floor(minutes) + ' minutes ago';
    }
    return seconds + ' seconds ago';
}
export const isVoted = id => {
    const upvotes = getNewsFromLocal();
    return upvotes.includes(id);
}
export const getFormattedNews = (newsList) => {
    const formattedData = newsList.hits.map((news,i)=>({
        id: news.objectID,
        title: news.title,
        comments: news.num_comments || 0,
        upvotes: news.points,
        isVoted: isVoted(news.objectID),
        author: news.author,
        domain: getDomianName(news.url),
        postedOn: calculateTimeSince(news.created_at),
        display: true
    }));
    return formattedData;
}
export const getNewsApiUrl = ({type, page}) => { 
    let baseUrl = 'https://hn.algolia.com/api/v1';
    if(page > 0){
        type = "default";
    }
    switch(type){
        case HOME_NAV:
            return `${baseUrl}/search?tags=front_page&page=${page}`;
        case TOP_NAV:
            return `${baseUrl}/search_by_date?numericFilters=points%3E1000`;
        case NEW_NAV:
            return `${baseUrl}/search_by_date?tags=story`;
        default:
            return `${baseUrl}/search?page=${page}`;
    }
}
export function getMoreButtonLink({slug,page}){
    page = parseInt(page,10);
    if(!slug){
        return `?page=${page+1}`;
    }else{
        return `/${slug[0]}?page=${page+1}`;
    }
}
export function storeNewsToLocal(news){
    localStorage.setItem("upvotes", JSON.stringify(news));
}
export function getNewsFromLocal(){
    var upvotes = JSON.parse(localStorage.getItem("upvotes"));
    return upvotes || [];
}
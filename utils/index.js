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
export const getFormattedNews = (newsList) => {
    const formattedData = newsList.hits.map((news,i)=>({
        id: news.objectID,
        title: news.title,
        comments: news.num_comments,
        upvotes: news.points,
        author: news.author,
        domain: getDomianName(news.url),
        postedOn: calculateTimeSince(news.created_at),
        display: true
    }));
    return formattedData;
}
export const getNewsApiUrl = (type, page) => { 
    let baseUrl = 'https://hn.algolia.com/api/v1';
    switch(type){
        case 'front':
            return `${baseUrl}/search?tags=front_page&page=${page}`;
        case 'top':
            return `${baseUrl}/search_by_date?numericFilters=points%3E1000&page=${page}`;
        case 'new':
            return `${baseUrl}/search_by_date?tags=story&page=${page}`
        default:
            return `${baseUrl}/search?tags=front_page&page=${page}`;
    }
}
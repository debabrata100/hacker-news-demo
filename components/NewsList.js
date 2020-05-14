import styles from './newslist.module.css';
const getVoteClass = (votes) =>{
    return votes > 100 ? 'excellent' : (votes > 90 ? 'good' : ''); 
}
export default ({ newsList, error, onHideNews }) => {
    return (<div className={styles.container}>
        {
            error ? <div className={styles.error}>Unable to Load News</div> :
            newsList.map(news=>(<div key={news.id} className={styles.row}>
                <div className={styles.comment}>{news.comments}</div>
                <div className={`${styles.vote} ${getVoteClass(news.upvotes)} `}>{news.upvotes}</div>
                <div className={styles.downvote}></div>
                <div>{news.title}</div>
                <div className={styles.info}>({news.domain})</div>
                <div className={styles.info}>by <strong>{news.author}</strong></div>
                <div className={styles.info}>{news.postedOn}</div>
                <div className={[styles.hidebutton,styles.info].join(' ')} onClick={() => onHideNews(news.id)}>[hide]</div>
            </div>))
        }
    </div>);
}
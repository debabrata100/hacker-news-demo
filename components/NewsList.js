import styles from './newslist.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getMoreButtonLink } from '../utils';

const getVoteClass = (votes) =>{
    return votes > 100 ? styles.excellent : (votes > 90 ? styles.good : ''); 
}
export default ({ newsList, error, onHideNews, onVote }) => {
    const router = useRouter();
    const { slug , page = 0 } = router.query;
    const moreButtonLink = getMoreButtonLink({ slug, page });
    return (<div className={styles.container}>
        {
            error ? <div className={styles.error}>Unable to Load News</div> :
            newsList.map(news=>(<div key={news.id} className={styles.row}>
                <div className={styles.comment}>{news.comments}<span className={styles.hideOnDesktop}>c</span></div>
                <div className={`${styles.vote} ${getVoteClass(news.upvotes)} `}>{news.upvotes}<span className={styles.hideOnDesktop}>v</span></div>
                <div 
                className={news.isVoted ? styles.upvote : styles.downvote} 
                onClick={() => onVote({ id: news.id, isVoted: !news.isVoted })}
                title={news.isVoted ? 'unvote' : 'upvote'}
                ></div>
                <div className={styles.title}>{news.title}</div>
                <div className={[styles.infoRows].join(' ')}>
                    <div className={styles.info}>({news.domain ? news.domain : ' NA '})</div>
                    <div className={styles.info}>by <strong>{news.author}</strong></div>
                    <div className={styles.info}>{news.postedOn}</div>
                    <div className={[styles.hidebutton,styles.info].join(' ')} onClick={() => onHideNews(news.id)}>[hide]</div>
                </div>
            </div>))
        }
        <div className={styles.moreButton}>
            <Link href={moreButtonLink}><a>More</a></Link>
        </div>
    </div>);
}
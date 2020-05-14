import React from 'react'
import { render } from '@testing-library/react'
import NewsList from '../components/NewsList';
const props = {
    newsList: [
        {
        id: 101,
        title: 'sample title',
        comments: 10,
        upvotes: 10,
        isVoted: true,
        author: 'dev',
        domain: 'google.com',
        postedOn: '5 minutes ago',
        display: true
        },
        {
        id: 102,
        title: 'sample title',
        comments: 10,
        upvotes: 10,
        isVoted: true,
        author: 'dev',
        domain: 'google.com',
        postedOn: '5 minutes ago',
        display: true
        }
    ],
    error: null,

}
test('must render a list of news', () => {
    const { queryAllByText } = render(<NewsList {...props} />);
    const titleElement = queryAllByText('sample title');
    expect(titleElement).toHaveLength(2);
})

import React from 'react'
import { render } from '@testing-library/react'
import Layout from '../components/Layout';

let container = null;
beforeEach(()=>{
    container = render(<Layout nav="home" />);
})

test('must render nav links', () => {
    const { queryAllByRole } = container;
    const links = queryAllByRole('link');
    expect(links).toHaveLength(3);
});
test("must have a header", () => {
    const { getByTestId } = container;
    const header = getByTestId('header');
    expect(header).toBeInTheDocument();
})
test('must have a footer', ()=>{
    const { getByTestId } = container;
    const footer = getByTestId('footer');
    expect(footer).toBeInTheDocument();
})

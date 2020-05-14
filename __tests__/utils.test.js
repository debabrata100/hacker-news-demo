import { getDomianName } from '../utils';
test('must return correct domian name from a url', () =>{
    const testUrl = "https://google.com?search=test";
    const domainName = getDomianName(testUrl);
    expect(domainName).toEqual('google.com');
})
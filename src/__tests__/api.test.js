import axios from 'axios';

describe('API test suite', () => {
    it('Test `test` route', async () => {
        const { data, status } = await axios.get('http://localhost:5000/test');
        expect(status).toBe(200);
        expect(data).toBe('Welcome to Sphinx App');
        console.log(process.env.NODE_ENV);
    });
});

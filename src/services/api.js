import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getMarketData = async () => {
    try {
        const response = await api.get('/market-data');
        return response.data;
    } catch (error) {
        console.error('Error fetching market data:', error);
        return [];
    }
};

export const getPortfolio = async () => {
    try {
        const response = await api.get('/portfolio');
        return response.data;
    } catch (error) {
        console.error('Error fetching portfolio:', error);
        return null;
    }
};

export const executeTrade = async (tradeDetails) => {
    try {
        const response = await api.post('/trade', tradeDetails);
        return response.data;
    } catch (error) {
        console.error('Error executing trade:', error);
        throw error;
    }
};

export default api;

import axios from 'axios';

const convertCurrency = async (amount, fromCurrency, toCurrency) => {
    try {
        const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const exchangeRate = response.data.rates[toCurrency];
        const convertedAmount = amount * exchangeRate;
        return convertedAmount.toFixed(2);
    } catch (error) {
        console.error('Error fetching exchange rate:', error.message);
        throw error;
    }
};

// Example usage
export default convertCurrency;
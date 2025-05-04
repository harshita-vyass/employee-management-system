const { login } = require('./login.js');

const handler = async (event) => {
  try {
    const { path, httpMethod, body } = event;
    const route = path.replace('/api/v1/auth', '');
    console.log('Route:', route);
    console.log('HTTP Method:', httpMethod);
    console.log('Body:', body);
    if (httpMethod === 'POST' && route === '/login') {
      return await login(event);
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Route not found' }),
      };
    }
  } catch (error) {
    console.error('Error occurred:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};

module.exports = { handler };
const login = async (event) => {
    try {
      const { username, password } = JSON.parse(event.body);
  
      if (!username || !password) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Missing required fields' }),
        };
      }
  
      // Mock authentication logic
      if (username === 'jane_doe' && password === 'password') {
        const token = "randomGeneratedToken12345"; // Replace with actual token generation logic
  
        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Login successful', token }),
        };
      } else {
        return {
          statusCode: 401,
          body: JSON.stringify({ error: 'Invalid credentials' }),
        };
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Internal server error' }),
      };
    }
  };
  
  module.exports = { login };
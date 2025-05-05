const login = async (event) => {
    try {
      const { username, password } = JSON.parse(event.body);
  
      if (!username || !password) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Missing required fields' }),
        };
      }

      if (username === 'jane_doe' && password === 'password') {
        const token = "randomGeneratedToken12345";
  
        return {
          statusCode: 200,
          body: JSON.stringify({
            "token": token,
            "refreshToken": token,
            "id": 2,
            "username": "jane_doe",
           
            "roles": [
                "ADMIN",
                "MANAGER",
                "DM",
                "HR"
            ]
        }),
        };
      } else if (username === 'john_doe' && password === 'password') {
        const token = "randomGeneratedToken12345";
  
        return {
          statusCode: 200,
          body: JSON.stringify({
            "token": token,
            "refreshToken": token,
            "id": 3,
            "username": "john_doe",
            firstName: "John",
            lastName: "Doe",
            "roles": [
                "DEFAULT"
            ]
        }),
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
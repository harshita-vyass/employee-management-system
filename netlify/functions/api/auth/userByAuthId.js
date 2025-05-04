const userByAuthId = async (event) => {
  try {
    const authenticationId = event.queryStringParameters.authenticationId;
    console.log('Authentication ID:', authenticationId);

    if (!authenticationId) {
      return {
        status: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
    }
}

    // Mock user data
    const users = [
      { id: 2, authenticationId: 'auth_123', username: 'jane_doe', roles: ['ADMIN', 'MANAGER'] },
      { id: 3, authenticationId: 'auth_456', username: 'john_doe', roles: ['DEFAULT'] },
    ];

    const user = users.find((user) => user.id === Number(authenticationId));
    if (!user) {
        console.log('User not found with ID:', authenticationId);
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'User not found with Id:' + authenticationId }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(user),
    };
  } catch (error) {
    console.error('Error occurred:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
}

module.exports = { userByAuthId };
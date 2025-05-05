const { notificationList } = require("./staticList");

const notification = async (event) =>{
    return {
        statusCode: 200,
        body: JSON.stringify(notificationList)
    };
}

module.exports = { notification };
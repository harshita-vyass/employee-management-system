const { designationMap } = require("./constants");

const designations = async (event) => {
  const  designations = [
        designationMap
    ];

    return {
        statusCode: 200,
        body: JSON.stringify(designations),
    };
}

module.exports = { designations };
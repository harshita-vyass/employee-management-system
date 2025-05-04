const designations = async (event) => {
  const  designations = [
        {
            "SDE_1": "Software Development Engineer 1",
            "SDE_2": "Software Development Engineer 2",
            "SDE_3": "Software Development Engineer 3",
            "PM": "Project Manager",
            "SPM": "Senior Project Manager",
            "DM": "Delivery Manager",
            "DEVOPS": "DevOps Engineer",
            "UI_UX": "UI/UX Designer",
            "HR": "Human Resource Manager",
            "SHR": "Senior Human Resource Manager"
        }
    ];

    return {
        statusCode: 200,
        body: JSON.stringify(designations),
    };
}

module.exports = { designations };
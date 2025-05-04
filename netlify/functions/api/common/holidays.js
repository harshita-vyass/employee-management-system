const holidays = async (events) =>{
    const holidays = [
        {
            "id": 1,
            "holidayDate": "2024-09-22",
            "description": "Holi"
        },
        {
            "id": 2,
            "holidayDate": "2024-09-26",
            "description": "Diwali"
        },
        {
            "id": 3,
            "holidayDate": "2024-01-12",
            "description": "Guru Nanak Jayanti"
        }
    ]
    return {
        statusCode: 200,
        body: JSON.stringify(holidays),
    };
}

module.exports = { holidays };
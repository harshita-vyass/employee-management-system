const leaveTypes= async (event) => {
    const leaveTypes={
        "PL": "Planned Leave",
        "CL": "Casual Leave",
        "MATL": "Maternity Leave",
        "PATL": "Paternity Leave",
        "BL": "Bereavement Leave",
        "UL": "Unpaid Leave"
    }

    return {
        statusCode: 200,
        body: JSON.stringify(leaveTypes),
    };
}
module.exports = { leaveTypes };
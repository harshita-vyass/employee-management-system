const filter = async (event) => {
const filters=[
    {
        "id": 4,
        "key": "businessUnits",
        "name": "Business Unit",
        "type": "Map",
        "dynamic": false,
        "filterValue": [
            {
                "key": "LIFE_SCIENCE",
                "value": "Life Science"
            },
            {
                "key": "RETAIL",
                "value": "Retail"
            },
            {
                "key": "BFSI",
                "value": "BFSI"
            },
            {
                "key": "LOGISTICS",
                "value": "Logistics"
            },
            {
                "key": "HOSPITALITY",
                "value": "Hospitality"
            },
            {
                "key": "CENTRAL",
                "value": "Central"
            }
        ],
        "applicablePages": [
            "userSearchPage",
            "projectSearchPage"
        ]
    },
    {
        "id": 9,
        "key": "regions",
        "name": "Region",
        "type": "Map",
        "dynamic": false,
        "filterValue": [
            {
                "key": "APAC",
                "value": "Asia Pacific and China"
            },
            {
                "key": "US",
                "value": "United States"
            },
            {
                "key": "CANADA",
                "value": "Canada"
            },
            {
                "key": "EU",
                "value": "Europe"
            },
            {
                "key": "MA",
                "value": "Middle East and Africa"
            }
        ],
        "applicablePages": [
            "clientSearchPage"
        ]
    },
    {
        "id": 2,
        "key": "departments",
        "name": "Department",
        "type": "Map",
        "dynamic": false,
        "filterValue": [
            {
                "key": "ENGINEERING",
                "value": "Engineering"
            },
            {
                "key": "HR",
                "value": "Human Resources"
            },
            {
                "key": "BUSINESS",
                "value": "Business"
            },
            {
                "key": "TALENT_ACQUISITION",
                "value": "Talent Acquisition"
            },
            {
                "key": "BENCH",
                "value": "Bench"
            },
            {
                "key": "PAYROLL",
                "value": "Payroll"
            },
            {
                "key": "IT",
                "value": "IT"
            },
            {
                "key": "FINANCE",
                "value": "Finance"
            }
        ],
        "applicablePages": [
            "userSearchPage"
        ]
    },
    {
        "id": 10,
        "key": "revenuePotential",
        "name": "Revenue Potential",
        "type": "Map",
        "dynamic": false,
        "filterValue": [
            {
                "key": "HIGH",
                "value": "High"
            },
            {
                "key": "MEDIUM",
                "value": "Medium"
            },
            {
                "key": "LOW",
                "value": "Low"
            }
        ],
        "applicablePages": [
            "clientSearchPage"
        ]
    },
    {
        "id": 11,
        "key": "status",
        "name": "Status",
        "type": "Map",
        "dynamic": false,
        "filterValue": [
            {
                "key": "ACTIVE",
                "value": "Active"
            },
            {
                "key": "INACTIVE",
                "value": "Inactive"
            },
            {
                "key": "PERSPECTIVE",
                "value": "Perspective"
            }
        ],
        "applicablePages": [
            "clientSearchPage"
        ]
    },
    {
        "id": 3,
        "key": "roles",
        "name": "Role",
        "type": "Map",
        "dynamic": false,
        "filterValue": [
            {
                "key": "ADMIN",
                "value": "Admin"
            },
            {
                "key": "MANAGER",
                "value": "Manager"
            },
            {
                "key": "DELIVERY",
                "value": "Delivery Manager"
            },
            {
                "key": "EMPLOYEE",
                "value": "Employee"
            },
            {
                "key": "HR",
                "value": "Human Resource Manager"
            }
        ],
        "applicablePages": [
            "userSearchPage"
        ]
    },
    {
        "id": 1,
        "key": "designations",
        "name": "Designation",
        "type": "Map",
        "dynamic": false,
        "filterValue": [
            {
                "key": "SDE_1",
                "value": "Software Development Engineer 1"
            },
            {
                "key": "SDE_2",
                "value": "Software Development Engineer 2"
            },
            {
                "key": "SDE_3",
                "value": "Software Development Engineer 3"
            },
            {
                "key": "PM",
                "value": "Project Manager"
            },
            {
                "key": "SPM",
                "value": "Senior Project Manager"
            },
            {
                "key": "DM",
                "value": "Delivery Manager"
            },
            {
                "key": "DEVOPS",
                "value": "DevOps Engineer"
            },
            {
                "key": "UI_UX",
                "value": "UI/UX Designer"
            },
            {
                "key": "HR",
                "value": "Human Resource Manager"
            },
            {
                "key": "SHR",
                "value": "Senior Human Resource Manager"
            }
        ],
        "applicablePages": [
            "userSearchPage"
        ]
    },
    {
        "id": 6,
        "key": "userIds",
        "name": "User",
        "type": "Map",
        "dynamic": true,
        "filterValue": {
            "meta": {
                "key": "id",
                "url": "/users?search=",
                "info": "email",
                "value": "name"
            }
        },
        "applicablePages": [
            "userSearchPage"
        ]
    },
    {
        "id": 5,
        "key": "managerIds",
        "name": "Manager",
        "type": "Map",
        "dynamic": true,
        "filterValue": {
            "meta": {
                "key": "id",
                "url": "/users?role=MANAGAR&search=",
                "info": "email",
                "value": "name"
            }
        },
        "applicablePages": [
            "userSearchPage"
        ]
    },
    {
        "id": 7,
        "key": "projectIds",
        "name": "Project",
        "type": "Map",
        "dynamic": true,
        "filterValue": {
            "meta": {
                "key": "id",
                "url": "/projects?size=4&search=",
                "value": "name"
            }
        },
        "applicablePages": [
            "projectSearchPage"
        ]
    },
    {
        "id": 8,
        "key": "clientIds",
        "name": "Client",
        "type": "Map",
        "dynamic": true,
        "filterValue": {
            "meta": {
                "key": "id",
                "url": "/clients?size=4&search=",
                "value": "name"
            }
        },
        "applicablePages": [
            "projectSearchPage",
            "clientSearchPage"
        ]
    }
]
    return {
        statusCode: 200,
        body: JSON.stringify(filters),
    };
}

module.exports = { filter };
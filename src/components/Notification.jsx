import React, { useEffect, useState } from "react";
// import { IS_AUTHENTICATED } from "../utils/constants";
import { apiClient } from "../api/axios";

const Notification = ({ toggleNotifications }) => {
    const [notifications, setNotifications] = useState([]);
    const empId = JSON.parse(localStorage.getItem("employee"))?.id;

    const markNotificationAsRead = (notification) => {
        console.log(notification);

        if (notification.viewed === true) {
            return;
        }
        apiClient
            .patch("/notifications/" + empId + "/markViewed", {
                notificationId: notification.id,
            })
            .then((response) => setNotifications(response))
            .catch((error) => console.error(error));
    };

    const markAllNotificationRead = () => {
        const unreadNotifications = notifications.filter(notification => notification.viewed === false)
        if (unreadNotifications.length === 0)
            return;
        apiClient
            .patch("/notifications/" + empId + "/markViewed")
            .then((response) => setNotifications(response))
            .catch((error) => console.error(error));
    }


    const addUserIdInNotification = (notification) => {
        const regex = /\$\$[^\$]+\$\$/g;
        notification.content = notification.content.replace(
            regex,
            notification.notifiedBy
        );
        updateNotificationsParams(notification);
        return (
            <li
                key={notification.id}
                className={`border-b ${notification.viewed ? " bg-transparent" : " bg-green-500/20"
                    } px-5 }`}
                onClick={() => markNotificationAsRead(notification)}
            >
                {notification.content}
            </li>
        );
    };

    const updateNotificationsParams = (notification) => {
        if (!notification) return;
    
        const regex = /##[^#]+##/g;
        const matches = notification.content.match(regex);
        console.log(matches);
    
        let keys = [];
        if (matches) {
            matches.map((match) => {
                keys.push(match.replaceAll("##", ""));
            });
        }
    
        console.log(keys);
    
        let updatedString = notification.content;
        keys.map((key) => {
            updatedString = updatedString.replace(
                "##" + key + "##",
                notification.metaData[key]
            );
        });
    
        notification.content = updatedString;
    };
    

    useEffect(() => {
        const getNotifications = () => {
            apiClient
                .get("notifications/" + empId)
                .then((response) => {
                    console.log(response);
                    setNotifications(response);
                })
                .catch((error) => {
                    console.error(error);
                });
        };
        getNotifications();
    }, []);

    return (
        <div className="flex justify-end w-full h-[100dvh]">
            <div className="text-black py-2 border-black/40 md:w-[30%] w-[80%] space-y-5 bg-white ">
               
                <div className=" px-5 flex justify-between items-center whitespace-nowrap  text-black font-bold bg-white sticky top-0 z-10">
                    <p>Notifications</p>
                    <button className="font-semibold text-white bg-green-800 cursor-pointer p-1.5 rounded text-sm" onClick={markAllNotificationRead}>
                        View All
                    </button>
                </div>
                <div className="overflow-auto max-h-[80dvh]">
                    <ul className="space-y-2">
                        {notifications.map(addUserIdInNotification)}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Notification;

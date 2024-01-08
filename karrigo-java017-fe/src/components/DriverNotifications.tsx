import React, { Component } from 'react'
import NotificationService from '../services/NotificationService';
import SuccessComponenet from './SuccessComponenet';



interface Notification { 
    taskId: number; 
    message: string;
    dateCreated: Date;
}

interface NotificationsState {
    notifications: Notification[];
    showSuccessMessage: boolean;
}

export default class DriverNotifications extends Component<{}, NotificationsState> {
    
    constructor(props: {}){
        super(props)
        this.state = {
           notifications: [],
           showSuccessMessage: false,
        }

        
    }

    componentDidMount() {
        const userToken = localStorage.getItem("accessToken");
        const notificationsService = new NotificationService(userToken); 
       notificationsService.getDriverNotifications().then((res) => {
            const receivedNotifications: Notification[] = res.data.content;

            console.log("Received Notifications:", receivedNotifications);

            if (Array.isArray(receivedNotifications)) {
                this.setState({ notifications: receivedNotifications });
            } else {
                console.error("Received notifications is not an array:", receivedNotifications);
            }
        }).catch((error) => {
            console.error("Error fetching notifications:", error);
        });

    }


    handleAcceptClick = (taskId: number) => {
        fetch(`https://localhost:8085/api/v1/drivers/task_status?taskId=${taskId}&status=accepted`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              
            },
          })
            .then((response) => response.json())
            .then((data) => {
              this.setState({ showSuccessMessage: true });
            })
            .catch((error) => {
              console.error('Error accepting task:', error);
            }); 
    }

    handleRejectClick(taskId: number) {
    
      }

    formatDate(date: Date | string): string {
        try {
            const dateObject = typeof date === 'string' ? new Date(date.replace(' ', 'T')) : date;
    
            if (isNaN(dateObject.getTime())) {
                return 'Invalid Date';
            }
    
            const options: Intl.DateTimeFormatOptions = {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZoneName: 'short',
            };
    
            return new Intl.DateTimeFormat('en-US', options).format(dateObject);
        } catch (error) {
            console.error('Error parsing date:', error);
            return 'Invalid Date';
        }
    }
    
  render() {
    const { notifications, showSuccessMessage } = this.state;

    return (
     <div className="items-stretch bg-white flex flex-col px-6 max-md:px-5">
          <div className="text-black text-2xl font-semibold leading-9 whitespace-nowrap mt-6 max-md:max-w-full">
            Notifications
          </div>

        {notifications.map((notification, index) => (
            <div key={index} className="flex justify-between gap-3 mt-1.5 py-4 border-b-zinc-300 border-b border-solid max-md:max-w-full max-md:flex-wrap max-md:justify-center">
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/e211ce60-82a4-43bc-b79f-74b5799f2720?"
                    className="aspect-square object-contain object-center w-12 justify-center items-center overflow-hidden shrink-0 max-w-full"
                    alt={`Notification ${index}`}
                />
                <div className="items-stretch self-stretch flex grow basis-[0%] flex-col max-md:max-w-full">
                  <div className="text-neutral-800 text-sm font-semibold leading-5 max-md:max-w-full" dangerouslySetInnerHTML=   {{__html: notification.message }}/>
                    <div className="text-neutral-500 text-sm leading-5 whitespace-nowrap mt-1 max-md:max-w-full">
                       {this.formatDate(notification.dateCreated)}
                    </div>
                    <div className="flex justify-between mt-2">
                    <button onClick={() => this.handleAcceptClick(notification.taskId)}>Accept</button>
                    <button onClick={() => this.handleRejectClick(notification.taskId)}>Reject</button>
              </div>
                </div>
            </div>
        ))}
        {showSuccessMessage && <SuccessComponenet />}
    </div>
    );
  }
}

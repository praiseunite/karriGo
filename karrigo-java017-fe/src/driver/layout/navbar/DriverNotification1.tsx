import { Component } from "react";
import NotificationsService from "../../../services/NotificationService";

interface Notification {  
  message: string;
  dateCreated: Date;
}

interface NotificationsState {
  notifications: Notification[];
}

 export default class Notifications extends Component<{}, NotificationsState> {

  constructor(props: {}){
    super(props)
    this.state = {
       notifications: [],
    }
  }


  componentDidMount() {
    const userToken = localStorage.getItem("accessToken");
    const notificationsService = new NotificationsService(userToken);

    notificationsService.getNotifications().then((res) => {
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
    const { notifications } = this.state;

    return (
    <div className="relative bg-white flex flex-col items-start justify-start p-6 box-border gap-[6px] max-w-[60%] max-h-full  text-left text-sm text-dimgray font-body-text-normal-16 top-[-2%] left-[90%] rounded-2xl">
      <div className="relative text-5xl leading-[36px] font-semibold text-black">
        Notifications
      </div>

       {notifications.map((notification, index) => (
          <div key={index} className="relative box-border w-[640px] h-[91px] text-gray border-b-[1px] border-solid border-gainsboro">
          <div className="absolute top-[34.48px] left-[624px] rounded-lg flex flex-row items-start justify-start">
            <img className="relative w-4 h-4" alt="" src="/svg.svg" />
          </div>
          <div className="absolute top-[0px] left-[0px] w-[612px] h-[90px]">
            <img
              loading="lazy"
               src="https://cdn.builder.io/api/v1/image/assets/TEMP/e211ce60-82a4-43bc-b79f-74b5799f2720?"
               className="aspect-square object-contain object-center w-12 justify-center items-center overflow-hidden shrink-0 max-w-full"
               alt={`Notification ${index}`}
               />
            <div className="absolute top-[16px] left-[60px] flex flex-col items-start justify-start py-0 pr-[40.58123779296875px] pl-0 gap-[4px]">
              <div className="relative leading-[18px] font-semibold flex w-[80%] items-center whitespace-normal" dangerouslySetInnerHTML= {{__html: notification.message }} />             
              <div className="relative text-[13px] leading-[18px] text-dimgray">
              {this.formatDate(notification.dateCreated)}
              </div>
            </div>
          </div>
        </div>
       ))}
      
    </div>
    );
  };
};

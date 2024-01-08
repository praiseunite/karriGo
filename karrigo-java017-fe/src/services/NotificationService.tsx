import axios from "axios";
import customFetch from "../CustomFetch";

const NOTIFICATION_BASE_API_URL = "http://localhost:8085/api/v1/notifications/0/100/dateCreated";
const NOTIFICATION_DRIVER_BASE_URL = "http://localhost:8085/api/v1/notifications/driver/0/100/dateCreated"
const TASK_STATUS_BASE_API_URL = "http://localhost:8085/api/v1/drivers/task_status";

class NotificationsService {
   private api;

   constructor(token: any) {
    this.api = customFetch(token);
  }
    getNotifications(){
        return this.api.get(NOTIFICATION_BASE_API_URL);
    }

    getDriverNotifications(){
        return this.api.get(NOTIFICATION_DRIVER_BASE_URL);
    }

   acceptTask(taskId: number) {
    const url = `${TASK_STATUS_BASE_API_URL}?taskId=${taskId}&status=accepted`;
    return axios.post(url);
  }

  rejectTask(taskId: number) {
    const url = `${TASK_STATUS_BASE_API_URL}?taskId=${taskId}&status=rejected`;
    return axios.post(url);
  }
  

}

export default NotificationsService;
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react'
import customFetch from '../CustomFetch';
import { useNavigate, useParams } from 'react-router-dom';

function TaskUpdate()  {
    console.log("I was here.");
    const queryParameters = new URLSearchParams(window.location.search);
    const taskId = queryParameters.get("taskId");
    const status = queryParameters.get("status");
    // const {taskId} = useParams();
    // const {status} = useParams();

    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(()=> {
        updateTask();
    }, [taskId]);

    const updateTask = async () => {
        console.log("Task id is: ", taskId);
        try {
          const response = await customFetch(localStorage.getItem("accessToken"))
            .post(`/drivers/task_status?taskId=${taskId}&status=${status}`)
            .then((res) => {
              const data = res.data.responseData;
            });

            navigate("/driver/home");
        } catch (err) {
          if (err && err instanceof AxiosError)
            setError(err.response?.data.responseMessage);
          else if (err && err instanceof Error) setError(err.message);
      
          console.log("Error: ", err);
        }
      };
  return (
    <div>TaskUpdate</div>
  )
}

export default TaskUpdate;
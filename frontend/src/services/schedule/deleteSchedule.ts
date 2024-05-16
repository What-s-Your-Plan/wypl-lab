import { axiosWithAccessToken } from '../axios';

async function deleteSchedule(scheduleId : number, modificationType : string) : Promise<number[]>{
    const response = await axiosWithAccessToken.delete(
        `/schedule/v1/schedules/${scheduleId}/${modificationType}`,
    )

    console.log(response);
    return response.data.body.schedules as Promise<number[]>;
}

export default deleteSchedule;
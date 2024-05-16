import { axiosWithAccessToken } from '@/services/axios';

async function getTodoList() : Promise<todoType[]>{
    const response = await axiosWithAccessToken.get('/todo/v1/todos');
    console.log(response);
    return response.data.body.todos;
}

export default getTodoList;
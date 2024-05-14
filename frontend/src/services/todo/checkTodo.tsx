import { axiosWithAccessToken } from '../axios';

async function checkTodo(todo_id : string){
    const response = await axiosWithAccessToken.patch(
        `/todo/v1/todos/check/${todo_id}`,
    );
    console.log(response);
    return;
}

export default checkTodo;
import { axiosWithAccessToken } from '../axios';

async function deleteTodo(todo_id : string){
    const response = await axiosWithAccessToken.delete(
        `/todo/v1/todos/${todo_id}`,
    );
    console.log(response);
    return;
}

export default deleteTodo;
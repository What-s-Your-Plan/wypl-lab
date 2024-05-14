import { axiosWithAccessToken } from '../axios';

async function patchTodo(
    todo_id : number,
    body : {
        content : string
    }
) : Promise<void> {
    const response = await axiosWithAccessToken.patch(
        `/todo/v1/todos/${todo_id}`,
        body
    );
    console.log(response);
}

export default patchTodo;
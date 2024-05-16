import { axiosWithAccessToken } from "../axios";

async function postTodo(body : {
    content : string;
}) : Promise<void> {
    const response = await axiosWithAccessToken.post('/todo/v1/todos', body);
    console.log(response);
}

export default postTodo;
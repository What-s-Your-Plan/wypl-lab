import { WhiteContainer } from '../common/Container';
import styled from 'styled-components';
import { useState } from 'react';

import xButton from '@/assets/icons/x.svg';
import plusButton from '@/assets/icons/edit.svg';

type todoType = {
  todo_id : number,
  content : string,
  is_completed : boolean
}

const Form = styled.form`
  width : 100%;
  display : flex;
  align-items : start;
`
const CheckBox = styled.input`
  margin-top : 6px;
  margin-right : 4px;
`

const Label = styled.label`
  width : 100%;
  font-size : 15px;
`

const IconButton = styled.img`
  width : 20px;
  margin-top : 2px;
`
const TodoElement = styled.div`
  width : 100%;
  display : flex;
  flex-direction : row;
  align-items : start;
  margin-top : 4px;
  margin-bottom : 4px;
`

const Header = styled.div`
  width : 100%;
  display : flex;
  justify-content: space-between;

  & > {
    width : 20px;
  }
`

const TextInput = styled.input`
  width : 100%;
`

function Todo() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const [todos, setTodos] = useState<todoType[]>([
    {
      todo_id : 1,
      content : "좌소연의 프론트 도전기",
      is_completed : false
    },
    {
      todo_id : 2,
      content : "조다민의 좌소연 길들이기",
      is_completed : true
    },
    {
      todo_id : 1,
      content : "좌소연의 프론트 도전기",
      is_completed : false
    },
    {
      todo_id : 2,
      content : "조다민의 좌소연 길들이기",
      is_completed : true
    }
  ])

  const clickTodo = (id : number) => {
    setTodos(todos.map((todo) => {
      if (todo.todo_id === id) {    
        //체크 axios 연결
        return { ...todo, is_completed: !todo.is_completed }; 
      }
      return todo;
    }));
  }

  const deleteTodo = (id : number) => {
    //axios 연결

    setTodos(todos.filter(todo => (todo.todo_id !== id)));
  }

  const clickPlusButton = () => {
    setIsOpen(!isOpen);
  }

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //제출 axios 연결
    //새로 불러오는 axios

    setContent("");
    setIsOpen(false);
  }

  const changeContent = (e:React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  }

  return <WhiteContainer $width="1300" className = "h-[30vh]">
    <Header>
      <div className="font-bold">Todo</div>   
      <IconButton src = {plusButton} onClick={clickPlusButton}></IconButton>
    </Header>
    <div className="scrollBar h-[85%]">
    {
      todos.length > 0 && (
        <div>
          {
            todos.map((todo) => (
              <TodoElement key={todo.todo_id}>
                <Form>
                  <CheckBox type='checkbox' id = {String(todo.todo_id)} name= "todo" 
                    checked = {todo.is_completed}
                    onClick={() => clickTodo(todo.todo_id)}></CheckBox>
                  <Label htmlFor= {String(todo.todo_id)}>{todo.content}</Label>
                </Form>
                <IconButton src = {xButton} onClick={() => deleteTodo(todo.todo_id)}></IconButton>
              </TodoElement>
            ))
          }
        </div>
      )
    }
    {
      isOpen && (
        <Form onSubmit={submit}>
          <TextInput type = "text" name = "content" value = {content} onChange={changeContent}></TextInput>
        </Form>
      )
    }
  </div>
  </WhiteContainer>;
}

export default Todo;
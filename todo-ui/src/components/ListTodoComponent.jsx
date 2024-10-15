import React, { useEffect, useState } from 'react';
import { completeTodo, deleteTodo, getAllTodos, inCompleteTodo, getTodosByUsername } from '../services/TodoService';
import { useNavigate } from 'react-router-dom';
import { isAdminUser, getUsername } from '../services/AuthService'; // Thêm getUsername để lấy username

const ListTodoComponent = () => {
    const [todos, setTodos] = useState([]);
    const navigate = useNavigate();
    const isAdmin = isAdminUser();  // Kiểm tra nếu người dùng là admin
   

    useEffect(() => {
        listTodos();
    }, []);
    
    const listTodos = async () => {
    
            let response;
            if (isAdmin) {
                // Nếu là admin, lấy tất cả todos
                response = await getAllTodos();
            } else {

                const username = getUsername(); // Lấy username của người dùng hiện tại
                // Nếu là user, lấy todos theo username
                response = await getTodosByUsername(username);  // sai o? dayy
            }

          
            setTodos(response.data);
      
    }

    const addNewTodo = () => {
        navigate('/add-todo');
    }

    const updateTodo = (id) => {
        navigate(`/update-todo/${id}`);
    }

    const removeTodo = async (id) => {
        try {
            await deleteTodo(id);
            listTodos();
        } catch (error) {
            console.error("Error deleting todo", error);
        }
    }

    const markCompleteTodo = async (id) => {
        try {
            await completeTodo(id);
            listTodos();
        } catch (error) {
            console.error("Error completing todo", error);
        }
    }

    const markInCompleteTodo = async (id) => {
        try {
            await inCompleteTodo(id);
            listTodos();
        } catch (error) {
            console.error("Error marking todo incomplete", error);
        }
    }

    const handleSOSClick = () => {
        // Chuyển hướng đến trang đăng nhập của Google
        window.location.href = 'https://accounts.google.com/';
    };

    return (
        <div className='container'>
            <h2 className='text-center'>Task List </h2>
            {isAdmin && 
                <button className='btn btn-primary mb-2' onClick={addNewTodo}>Add Task</button>
            }

            <div>
                <table className='table table-bordered table-striped'>
                    <thead>
                        <tr>
                            <th>Task Title</th>
                            <th>Task Description</th>
                            <th>Task Completed</th>
                            <th>Task Deadline Time</th>
                            
                            {isAdmin &&  <th>Username</th>}  
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map(todo => 
                            <tr key={todo.id}>
                                <td>{todo.title}</td>
                                <td>{todo.description}</td>
                                <td>{todo.completed ? 'YES' : 'NO'}</td>
                                <td>{todo.deadlineTime}</td>
                                {isAdmin && <td>{todo.username}</td>}  
                                
                                <td className="action-buttons">
                                {isAdmin && 
                                    <>
                                        <button className='btn btn-info' onClick={() => updateTodo(todo.id)}>Update</button>
                                        <button className='btn btn-danger' onClick={() => removeTodo(todo.id)}>Delete</button>
                                    </>
                                }
                              <button className='btn btn-info' onClick={() => markInCompleteTodo(todo.id)}>In Complete</button>
                                    
                                    <button className='btn btn-success' onClick={() => markCompleteTodo(todo.id)}>Complete</button>

                                
                                {!todo.completed && todo.deadlineTime <= 1 && (
                                    <button 
                                        className='btn' 
                                        style={{ backgroundColor: 'orange', color: 'white' }} 
                                        onClick={handleSOSClick}
                                    >
                                        SOS
                                    </button>
                                )}
                            </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListTodoComponent;

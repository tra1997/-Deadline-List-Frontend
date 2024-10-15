import React, { useEffect, useState } from 'react';
import { getTodo, saveTodo, updateTodo } from '../services/TodoService';
import { checkUsernameExists } from '../services/TodoService';
import { useNavigate, useParams } from 'react-router-dom';

const TodoComponent = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [deadlineTime, setDeadlineTime] = useState('');
    const [username, setUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const saveOrUpdateTodo = async (e) => {
        e.preventDefault();

        // Kiểm tra các trường có bị thiếu không
        if (!title || !description || !deadlineTime || !username) {
            setErrorMessage('Điền đủ các mục thông tin.');
            return;
        }

        // Kiểm tra xem username có tồn tại không
        const usernameExists = await checkUsernameExists(username);
        if (!usernameExists) {
            setErrorMessage('Username không tồn tại.');
            return;
        }

        // Nếu không có lỗi, tiếp tục lưu hoặc cập nhật Todo
        const todo = { title, description, deadlineTime, username };

        if (id) {
            updateTodo(id, todo).then(() => {
                navigate('/todos');
            }).catch(error => {
                console.error(error);
            });
        } else {
            saveTodo(todo).then(() => {
                navigate('/todos');
            }).catch(error => {
                console.error(error);
            });
        }
    };

    useEffect(() => {
        if (id) {
            getTodo(id).then((response) => {
                setTitle(response.data.title);
                setDescription(response.data.description);
       
                setDeadlineTime(response.data.deadlineTime);
                setUsername(response.data.username);
            }).catch(error => {
                console.error(error);
            });
        }
    }, [id]);

    return (
        <div className='container'>
            <br /><br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {id ? <h2 className='text-center'>Update Task</h2> : <h2 className='text-center'>Add Task</h2>}
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Task Title:</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Enter Task Title'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Task Description:</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Enter Task Description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Task Deadline Time:</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Enter Deadline Time'
                                    value={deadlineTime}
                                    onChange={(e) => setDeadlineTime(e.target.value)}
                                />
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Username:</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Enter Username'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>

                   

                            {/* Hiển thị thông báo lỗi nếu có */}
                            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                            <button className='btn btn-success' onClick={saveOrUpdateTodo}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodoComponent;

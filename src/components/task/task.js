import React, {useEffect, useState, useRef} from 'react';
import {useSelector, useDispatch} from "react-redux";

import './task.css'
import TaskService from "../../services/taskService"
import OneTask from "./oneTask/oneTask";

const Task = () => {
    const dispatch = useDispatch()

    const UserReducer = useSelector((state => state.UserReducer))
    const TaskReducer = useSelector((state => state.TaskReducer))

    let [addTask, setAddTask] = useState(false)
    let [addTask1, setAddTask1] = useState(false)
    let [status, setStatus] = useState('')
    let [task, setTask] = useState({})


    let taskName = useRef('')
    let taskDescription = useRef('')
    let taskStart = useRef('')
    let taskEnd = useRef('')

    useEffect(()=>{
    }, [TaskReducer.tasks])

    function TO_DO() {
        setStatus("to-do")
        TaskService.getByStatus("to-do").then(value=>{
            dispatch({type: 'SET_TASKS', payload: value.data})
        })
    }
    function IN_PROGRESS() {
        setStatus("in-progress")
        TaskService.getByStatus("in-progress").then(value=>{
            dispatch({type: 'SET_TASKS', payload: value.data})
        })
    }
    function BLOCK() {
        setStatus("block")
        TaskService.getByStatus("block").then(value=>{
            dispatch({type: 'SET_TASKS', payload: value.data})
        })
    }
    function DONE() {
        setStatus("done")
        TaskService.getByStatus("done").then(value=>{
            dispatch({type: 'SET_TASKS', payload: value.data})
        })
    }

    function AddTaskFunc() {
       setTask(task.name = taskName.current.value)
        setTask(task.description = taskDescription.current.value)
        setTask(task.status = status)
        setTask(task.startDate = taskStart.current.value)
        setTask(task.endDate = taskEnd.current.value)
        TaskService.addTask(task).then(v=>{
            setAddTask(false)
        })


    }
    function AddSubTaskFunc() {
        setTask(task.name = taskName.current.value)
        setTask(task.description = taskDescription.current.value)
        setTask(task.status = status)
        setTask(task.taskId = TaskReducer.task.id)
        setTask(task.startDate = taskStart.current.value)
        setTask(task.endDate = taskEnd.current.value)
        TaskService.addSubTask(task).then(v=>{
            setAddTask1(false)
        })

    }

    function deleteTask() {
        if(!TaskReducer.isSubTask){
            if (window.confirm("Are you sure")) {
                TaskService.deleteTaskById(TaskReducer.task.id)
            }
        }else{
            if (window.confirm("Are you sure")) {
                TaskService.deleteSubTaskById(TaskReducer.task.id)
            }
        }

    }



    function DropHandler(e, status) {
        e.preventDefault()
        let body = {
            "status": status
        }
        if(!TaskReducer.isTask){
            if (window.confirm("Are you sure")) {
                TaskService.patchTask(TaskReducer.patchTask.id, body)
            }
        }else{
            console.log('pppsubtask', TaskReducer.isSubTask)
            if (window.confirm("Are you sure")) {
                TaskService.patchSubTask(TaskReducer.patchTask.id, body)
            }
        }
    }

    function DragStart(e) {
        e.preventDefault()
    }

    function DragOver(e) {
        e.preventDefault()
    }

    return (
        <div className={"main1"}>
            <div className={"leftBox"}>
                <div className={"status"}onClick={TO_DO} onDragStart={(e)=>{
                    DragStart(e)}} onDragOver={(e)=>{DragOver(e)}} onDrop={(e)=>{DropHandler(e, "to-do")}}>TO DO</div>
                <div className={"status"} onClick={IN_PROGRESS} onDragStart={(e)=>{
                    DragStart(e)}} onDragOver={(e)=>{DragOver(e)}} onDrop={(e)=>{DropHandler(e, "in-progress")}}>IN PROGRESS</div>
                <div className={"status"} onClick={BLOCK} onDragStart={(e)=>{
                    DragStart(e)}} onDragOver={(e)=>{DragOver(e)}} onDrop={(e)=>{DropHandler(e, "block")}}>BLOCK</div>
                <div className={"status"} onClick={DONE} onDragStart={(e)=>{
                    DragStart(e)}} onDragOver={(e)=>{DragOver(e)}} onDrop={(e)=>{DropHandler(e, "done")}}>DONE</div>
            </div>
            <div className={"rightBox"}>
                {!TaskReducer.isTasks ?
                    <div className={"divHello"}>
                        <center>
                            <div>Hello {UserReducer.currentUser.username}!</div>
                            <div>This is KURYLO TRELLO. Here you can plan your project</div>
                        </center>
                    </div> : <div className={"MainDiv"}>
                        {!TaskReducer.isTask ?<button className={"addTask"} onClick={()=>setAddTask(!addTask)}>Add task</button>
                        :  <button className={"addTask"} onClick={()=>setAddTask1(!addTask1)}>Add sub-task</button>}
                        {addTask && <div className={"add"}>
                            <input ref={taskName} placeholder={"Enter name..."}/><br/>
                            <input ref={taskDescription} placeholder={"Enter description..."}/><br/>
                            <input ref={taskStart} type={"datetime-local"}/>
                            <input ref={taskEnd} type={"datetime-local"}/>
                            <button onClick={AddTaskFunc}>add</button>
                        </div>}
                        {addTask1 &&  <div className={"add"}>
                            <input ref={taskName} placeholder={"Enter name..."}/><br/>
                            <input ref={taskDescription} placeholder={"Enter description..."}/><br/>
                            <input ref={taskStart} type={"datetime-local"}/>
                            <input ref={taskEnd} type={"datetime-local"}/>
                            <button onClick={AddSubTaskFunc}>add</button>
                        </div>}
                        {TaskReducer.isTask && <div>
                            <div className={"oneTask1"}>
                                <div><p>{TaskReducer.task.name}</p>
                                    <p className={"description"}>status: {TaskReducer.task.status}</p>
                                    <hr/>
                                    <p className={"description"}>{TaskReducer.task.description}</p></div>
                                <div className={"times"}>
                                    <p className={"taskEnd"}>Recent changes: {TaskReducer.leftTimeStart}</p>
                                    <p className={"taskEnd"}>Time left: {TaskReducer.leftTimeEnd}</p>
                                    <button onClick={deleteTask}>delete</button>
                                </div>
                            </div>
                            <p className={"subTasks"}>Sub-Tasks:</p>
                            <hr/>
                        </div>}
                        {
                        TaskReducer.tasks.map(value=><OneTask key={value.id} item={value}/>)
                    }</div>
                }
            </div>
        </div>
    );
};

export default Task;
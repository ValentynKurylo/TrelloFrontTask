import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import './oneTask.css'
import TaskService from "../../../services/taskService"


const OneTask = ({item}) => {
    const dispatch = useDispatch()
    const TaskReducer = useSelector((state => state.TaskReducer))
    let [leftTimeEnd, setLeftTimeEnd] = useState('')
    let [leftTimeStart, setLeftTimeStart] = useState('')
    useEffect(() => {
        setLeftTimeEnd(LeftTimeFunc(item.endDate, Date.now()))
        setLeftTimeStart(LeftTimeFunc(Date.now(), item.updatedAt))
        if (!TaskReducer.isTask) {
            dispatch({type: 'SET_LEFT_TIME_END', payload: LeftTimeFunc(item.endDate, Date.now())})
            dispatch({type: 'SET_LEFT_TIME_START', payload: LeftTimeFunc(Date.now(), item.updatedAt)})
        }
    }, [])

    function LeftTimeFunc(time, time1){
        let now = new Date(time1)
        let end = new Date(time)
        let leftTime = ''
        if(end.getMinutes() - now.getMinutes() > 0){
            leftTime += `${end.getMinutes() - now.getMinutes()} minutes `
        }else if(end.getMinutes() - now.getMinutes() < 0){
            end.setHours(end.getHours() - 1)
        }
        if(end.getHours() - now.getHours() > 0){
            leftTime += `${end.getHours() - now.getHours()} hours `
        }else if(end.getHours() - now.getHours() < 0){
            end.setDate(end.getDate() - 1)
        }
        if(end.getDate() - now.getDate() > 0){
            leftTime += `${end.getDate() - now.getDate()} days `
        }else if(end.getDate() - now.getDate() < 0){
            end.setDate(end.getMonth() - 1)
        }
        if(end.getMonth() - now.getMonth() > 0){
            leftTime += `${end.getMonth() - now.getMonth()} months `
        }else if(end.getMonth() - now.getMonth() < 0){
            end.setFullYear(end.getFullYear() - 1)
        }
        if(end.getFullYear() - now.getFullYear() > 0){
            leftTime += `${end.getFullYear() - now.getFullYear()} years `
        }else if(end.getFullYear() - now.getFullYear() < 0){
            leftTime = 'time is up '
        }
        return leftTime
    }


    function DragTaskEnd(event) {
        event.preventDefault()
        event.stopPropagation()
    }

    function showTask() {
        if (!TaskReducer.isTask) {
            TaskService.getTaskById(item.id).then(v => {
                dispatch({type: 'SET_TASK', payload: v.data})
            })
            TaskService.getSubTaskByTaskId(item.id).then(value => {
                dispatch({type: 'SET_SUB_TASKS', payload: value.data})
            })
        }else{
            TaskService.getSubTaskById(item.id).then(v => {
                dispatch({type: 'SET_SUB_TASK', payload: v.data})
            })
        }
    }

    function DropHandler(e, item) {
        dispatch({type: 'SET_PATCH_TASK', payload: item})
    }

    return (
        <div draggable={true} onDragStart={(e)=>DropHandler(e, item)} className={"oneTask"} onClick={showTask}>
            <p className={"taskName"}>{item.name}</p>
            <div className={"times"}>
                <p className={"taskEnd"}>Time left: {leftTimeEnd}</p>
                <p className={"taskEnd"}>Recent changes: {leftTimeStart}</p>
            </div>
        </div>
    );
};

export default OneTask;
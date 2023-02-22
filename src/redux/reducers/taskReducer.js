const initialState = {
    tasks: [],
    isTasks: false,
    task: {},
    isTask: false,
    leftTimeEnd: '',
    leftTimeStart: '',
    isSubTask: false,
    patchTask: {}
}

export const TaskReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TASKS': return {
            ...state,
            tasks: action.payload,
            isTasks: true,
            task: {},
            isTask: false
        }
        case 'SET_SUB_TASKS': return {
            ...state,
            tasks: action.payload,
            isTasks: true,
        }
        case 'SET_TASK': return {
            ...state,
            task: action.payload,
            isTask: true
        }
        case 'SET_SUB_TASK': return {
            ...state,
            task: action.payload,
            isSubTask: true
        }
        case 'SET_LEFT_TIME_END': return {
            ...state,
            leftTimeEnd: action.payload,
        }
        case 'SET_LEFT_TIME_START': return {
            ...state,
            leftTimeStart: action.payload,
        }
        case 'SET_PATCH_TASK': return {
            ...state,
            patchTask: action.payload,
        }
        default:
            return state
    }
}
import {createStore} from 'redux'
export let initialState={
    
   
    
}
const reducer=(state=initialState,action)=>{
    switch(action.type){
        case "Print":{
            return state;
        }
        default:{
            return state;
        }
    }
}
const store=createStore(reducer)
export default store;
const initialSate={
    userLogin: {},
    search:""
    
};

export const reducer = (state=initialSate,action)=>{
    switch (action.type) {
        case "addProduct":
            const arr= [...state]
            const index = arr.findIndex(item=>item.id==action.payload.id)
            if (index == -1) {
                arr.push(action.payload)
            }else{
                arr[index].quantity=arr[index].quantity+1
            }
            return arr;
        case "setUserLogin":
            const userLogin = JSON.parse(localStorage.getItem("currentUser")) || {}
            return {
                ...state,
                userLogin
            }
        default:
            return state;
    }
}
// isLoggedIn

export const isLoggedIn = () =>{
    
    let data = localStorage.getItem("crn");
    if(data!=null){
        return true;
    }
    else{
        return false;
    }
};

// export const doLogin = (data,next)=>{
//     localStorage.setItem("crn");
//     next()
// };

export const getCurrentUserDetail = () =>{
    if(isLoggedIn()){
        return localStorage.getItem("crn")
    }
    else{
        return undefined;
    }
};
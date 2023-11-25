import axios from "axios";
import {  toast } from "react-toastify";
// const BACKEND_URL = process.env.REACT_APP_API;


// ==================== email validation using regex ==================== //
export const ValidateEmail = (email) => {
    //returns true of false
    return email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  //========User log in==============

  export const LoginPerson = async (userData)=>{
    try{
        const response = await axios.post(`http://localhost:5000/`,userData);

        //send from server in res.json
        if(response.data.status ==='OK'){
            toast.success("Login Successfull");
            console.log(response.data.loginDetails);
        }else if(response.data ==="incorrectPassword"){
            toast.error('Incorrect Password');
        }else if(response.data === "invalidCredentials"){
            toast.error('Invalid Credentials');
        }
        return response.data
    }
    catch(err){
        console.log("error in login verification", + err);
    }
  }
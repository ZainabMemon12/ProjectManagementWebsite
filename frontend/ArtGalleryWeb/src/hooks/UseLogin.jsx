import { useState } from 'react';
import {useAuth} from '../contexts/AuthContext.jsx'
import { message } from 'antd';


const UseLogin = () => {
    const {login}= useAuth();
    const [error,setError] = useState(null);
    const [loading,setLoading]= useState(false)

    const LoginUser = async (values)=>{
       
        try{
            setError(null)
            setLoading(true)
            const res = await fetch('http://localhost:4000/api/admin/login',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(values)
            });
            const data = await res.json();
            if(res.status===200){
                message.success(data.message);
                login(data.token,data.user)
            }
            else if(res.status===400){
                setError(data.message)
            }
            else if(res.status===401){
                setError(data.message)
            }
            else{
                message.error("login failed")
            }

        }
        catch(error){
            message.error("login failed")

        }finally{
            setLoading(false)
        }


    }

  return {loading,error,LoginUser} ;
}

export default UseLogin;

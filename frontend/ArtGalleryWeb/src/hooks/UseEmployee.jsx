import { useState } from 'react';
import { message } from 'antd';


const UseEmployee = () => {
    const [error,setError] = useState(null);
    const [loading,setLoading]= useState(false)

    const AddEmployee = async (values)=>{
       
        try{
            setError(null)
            setLoading(true)
            const res = await fetch('https://project-management-website-z.vercel.app/api/admin/register',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(values)
            });
            const data = await res.json();
            console.log(data)
            if(res.status===200){
                message.success(data.message);
            }
            else if(res.status===400){
                setError(data.message)
            }
            else if(res.status===500){
                setError(data.message)
            }
            else if(res.status===500){
                setError(data.message)
            }
            else{
                message.error("registration failed")
            }

        }
        catch(error){
            message.error("registration failed")

        }finally{
            setLoading(false)
        }


    }

  return {loading,error,AddEmployee} ;
}

export default UseEmployee;

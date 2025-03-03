import { useState } from 'react';
import { message } from 'antd';


const UseProjects = () => {
   const [error,setError] = useState(null);
    const [loading,setLoading]= useState(false)

    const createProject = async (values)=>{
       
        try{
            setError(null)
            setLoading(true)
            const res = await fetch('https://projectmanagementwebsite.onrender.com/api/project/',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(values)
            });
            const data = await res.json();
            if(res.status===200){
                message.success(data.message);
            }
            else if(res.status===400){
                setError(data.message)
            }
            else if(res.status===400){
                setError(data.message)
            }
            else if(res.status===500){
                setError(data.message)
            }
            else{
                message.error("could not create project")
            }

        }
        catch(error){
            message.error("error in creating project")

        }finally{
            setLoading(false)
        }


    }

  return {loading,error,createProject} ;
}

export default UseProjects;

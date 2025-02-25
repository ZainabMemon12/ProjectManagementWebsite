import React,{useEffect,useState} from 'react'
import FetchEmployees from '../hooks/FetchEmployees'
import FetchProjects from '../hooks/FetchProjects';

const ThingsLength = () => {
    const [employeesCount, setEmployeesCount] = useState([]);
    const [projects, setProjects] = useState([]);
    useEffect(()=>{
        const employeesLength =async ()=>{
            try{
                const empdata = await FetchEmployees()
                setEmployeesCount(empdata)
              }catch(err){
                console.log(err)

              }
              
        };
        const fetchProjectsData = async () => {
            try {
              const projData = await FetchProjects();
              setProjects(projData);
            } catch (err) {
              console.error('Error fetching projects:', err);
            }
          };
        employeesLength()
        fetchProjectsData()
    },[])
    const projectsCount = projects.length;
    const employeesCounts= employeesCount.length;


    const completedProjectsCount = projects.filter(
      project => project.status === 'Completed'
    ).length;
    const inProgressProjectsCount = projects.filter(
      project => project.status === 'In Progress'
    ).length;
    const pendingProjectsCount = projects.filter(
      project => project.status === 'Pending'
    ).length;
  return (
    <>
    <div className="things-length-con flex-row">
        <div className="em-length">
            <p> Employees:</p>
            <div className="em-txt-empt-con flex-row">
            <div className="em-empty-con"></div>
            <h1 className='em-h1'> {employeesCounts}</h1>
            </div>

        </div>
        <div className="em-length">
            <p> projects:</p>
            <div className="em-txt-empt-con flex-row">
            <div className="em-empty-con"></div>
            <h1 className='em-h1'> {projectsCount}</h1>
            </div>

        </div>
        <div className="em-length">
            <p>Completed:</p>
            <div className="em-txt-empt-con flex-row">
            <div className="em-empty-con"></div>
            <h1 className='em-h1'> {completedProjectsCount}</h1>
            </div>

        </div>
        <div className="em-length">
            <p> In-progress:</p>
            <div className="em-txt-empt-con flex-row">
            <div className="em-empty-con"></div>
            <h1 className='em-h1'> {inProgressProjectsCount}</h1>
            </div>

        </div>
        <div className="em-length">
            <p> Pending:</p>
            <div className="em-txt-empt-con flex-row">
            <div className="em-empty-con"></div>
            <h1 className='em-h1'> {pendingProjectsCount}</h1>
            </div>

        </div>
    </div>
    </>
    
  )
}

export default ThingsLength
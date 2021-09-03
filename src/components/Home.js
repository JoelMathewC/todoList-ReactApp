import useFetch from "./hooks/useFetch";
import TaskList from "./TaskList";
import { Link } from "react-router-dom";

const Home = () => {
    
    const {data: tasks, isPending, error} = useFetch('http://localhost:8000/tasks');
    
    return ( <div>
        {error && <div>{error}</div>}
        {isPending && <div>Loading...</div>}
        {tasks && <TaskList tasks={tasks}/>}
        <Link to="/create">Add Task</Link>
    </div> );
}
 
export default Home;
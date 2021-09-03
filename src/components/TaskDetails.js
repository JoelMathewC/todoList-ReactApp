import { Link, useParams } from "react-router-dom";
import useFetch from "./hooks/useFetch";
import { useHistory } from "react-router";


const TaskDetails = () => {
    const {id} = useParams();
    const {data: task,error,isPending} = useFetch(' http://localhost:8000/tasks/' + id);
    const history = useHistory();
    
    const handleClick = () => {
        fetch('http://localhost:8000/tasks/' + task.id,{
            method: 'DELETE'
        }).then(() => {
            history.push('/');
        });
    }
    return ( 
        <div>
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {task && (
                <article>
                    <h2>{task.title}</h2>
                    <p>{task.body}</p>
                    <br />
                    <Link to={`edit/${id}`}>Edit</Link>
                    <button onClick={handleClick}>Delete</button>
                    <br />
                    <br />
                    <Link to='/'>Go Back Home</Link>
                </article>
            )}
        </div>
     );
}
 
export default TaskDetails;
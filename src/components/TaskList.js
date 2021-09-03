import {Link} from 'react-router-dom';

const TaskList = ({tasks}) => {
    return ( 
        <div>
            {
                tasks.map((task) => (
                    <div key={task.id}>
                        <Link to={`/tasks/${task.id}`}>
                        <h2>{task.title}</h2>
                        <p>{task.body}</p>
                        </Link>
                    </div>
                ))
            }
        </div>
     );
}
 
export default TaskList;
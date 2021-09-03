import { useState } from "react";
import { useHistory } from "react-router-dom";


const CreateTasks = () => {

    const [title,setTitle] = useState('');
    const [body,setBody] = useState('');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const task = {title,body,"completed": false,"starred": false};

        setIsPending(true);

        fetch('http://localhost:8000/tasks',{
            method: 'POST',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(task)
        }).then(() => {
            console.log("New Task Added");
            setIsPending(false);
            history.push('/');
        });
    }

    return ( 
        <div>
            <h2>New Task</h2>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input required value={title} onChange={(e) => setTitle(e.target.value)} type="text" />
                <label>Body</label>
                <textarea required value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                <br />
                {isPending && <div>Loading...</div>}
                {!isPending && <button>Add Task</button>}
            </form>
        </div>
    );
}
 
export default CreateTasks;
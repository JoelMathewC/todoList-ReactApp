import { useEffect } from "react";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import useFetch from "./hooks/useFetch";


const EditTasks = () => {

    const {id} = useParams();
    const {data: task, error, isPending: isLoading} = useFetch(' http://localhost:8000/tasks/' + id);
    const history = useHistory();


    const [isPending,setIsPending] = useState(isLoading);
    const [title, setTitle] = useState('');
    const [body,setBody] = useState('');

    


    useEffect(() => {
        setIsPending(isLoading);
        if(task != null){
            setTitle(task.title);
            setBody(task.body);
        } 
    },[task,isLoading]);



    const handleClick = async () => {

        setIsPending(true);

        task.title = title;
        task.body = body;

        fetch('http://localhost:8000/tasks/' + id,{
            method: 'DELETE'
        })
        .then(() => {
            fetch(' http://localhost:8000/tasks',{
            method: 'POST',
            headers: {"Content-type":"application/json"},
            body: JSON.stringify(task)
            }).then(() => {
                console.log('Editing of task completed');
                setIsPending(false);
                history.push(`/tasks/${task.id}`);
            });
        }); 
    }

    return ( 
        <div>
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {!isPending && 
                <div>
                    <form onSubmit={handleClick}>
                        <label>Topic</label>
                        <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)}/>
                        <label>Body</label>
                        <textarea required value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                        <br />
                        {isPending && <div>Loading...</div>}
                        {!isPending && <button>Save Changes</button>}
                    </form>
                </div>}
        </div>
     );
}
 
export default EditTasks;
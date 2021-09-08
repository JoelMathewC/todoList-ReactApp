import { useEffect } from "react";
import { useState } from "react";
import useFetch from "./hooks/useFetch";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const EditTaskModal = ({show,onHide,task}) => {

    
    const props = {show,onHide};

    const [isPending,setIsPending] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [body,setBody] = useState(task.body);
    const [priority, setPriority] = useState(task.priority);

    


   

    const handleDeleteClick = () => {
        fetch('http://localhost:8000/tasks/' + task.id,{
            method: 'DELETE'
        }).then(() => {
            props.onHide();
        });
    }


    const handleClick = async () => {

        setIsPending(true);

        task.title = title;
        task.body = body;
        task.priority = priority;

        fetch('http://localhost:8000/tasks/' + task.id,{
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
                props.onHide();
            });
        }); 
    }

    return ( 
    
            
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                {isPending && <div>Loading...</div>}
                {!isPending && 
                (
                    <div>
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                            Edit Task
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control required type="text" placeholder="Enter title of task" value={title} onChange={(e) => setTitle(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Body</Form.Label>
                                    <Form.Control as="textarea" rows={3} required placeholder="Enter details about task" value={body} onChange={(e) => setBody(e.target.value)} />
                                </Form.Group>
                                <Form.Label>Priority</Form.Label>
                                <Form.Select aria-label="Floating label select example" required value={priority}
                                    onChange={e => setPriority(e.target.value)}>
                                    <option>Choose Priority</option>
                                    <option value="HIGH">High</option>
                                    <option value="MED">Medium</option>
                                    <option value="LOW">Low</option>
                                    <option value="HALT">Halt</option>
                                    <option value="">No Priority</option>
                                </Form.Select>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" onClick={handleDeleteClick}>Delete</Button>
                            <Button variant="primary" onClick={handleClick}>Save Changes</Button>
                        </Modal.Footer>
                    </div>
                )}
            
        </Modal>

     );
}
 
export default EditTaskModal;



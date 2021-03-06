import { useState } from "react";
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
        setIsPending(true);
        setTimeout(() => {
                fetch('http://localhost:8000/tasks/' + task.id,{
                method: 'DELETE'
            }).then(() => {
                setIsPending(false);
                props.onHide();
            });
        },1000);
    }


    const handleClick = async () => {

        setIsPending(true);

        task.title = title;
        task.body = body;
        task.priority = priority;

        setTimeout(() => {
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
        },1000);

        
    }

    return ( 
    
            
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
             
         
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
                                        <option value="">Choose Priority</option>
                                        <option value="HIGH">High</option>
                                        <option value="MED">Medium</option>
                                        <option value="LOW">Low</option>
                                        <option value="HALT">Halt</option>
                                </Form.Select>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            {isPending && <Button variant="primary" disabled>Loading...</Button>}
                            {!isPending && <Button variant="danger" onClick={handleDeleteClick}>Delete</Button>}
                            { (!isPending && (title === '' || body === '' || priority === '')) && 
                    <Button variant="primary" disabled>Save Changes</Button>}
                            {(!isPending && !(title === '' || body === '' || priority === '')) && <Button variant="primary" onClick={handleClick}>Save Changes</Button>}
                        </Modal.Footer>
            
                
            
        </Modal>

     );
}
 
export default EditTaskModal;



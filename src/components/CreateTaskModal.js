import { useState } from "react";
import { useHistory } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



const CreateTaskModal = (props) => {

    const [title,setTitle] = useState('');
    const [body,setBody] = useState('');
    const [priority, setPriority] = useState('');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const task = {title,body,"completed": false,priority};

        setIsPending(true);

        fetch('http://localhost:8000/tasks',{
            method: 'POST',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(task)
        }).then(() => {
            console.log("New Task Added");
            setIsPending(false);
            props.onHide();
        });
    }

    console.log(props);

    return ( 
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                New Task
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
                <Button variant="primary" onClick={handleSubmit}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
}
 
export default CreateTaskModal;


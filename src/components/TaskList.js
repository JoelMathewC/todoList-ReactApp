import { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import EditTaskModal from './EditTaskModal';
import Spinner from 'react-bootstrap/Spinner';




const TaskList = ({tasks,completed}) => {

    const [showEditModal,setEditModal] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    function handleButton(task){
        task.completed = !task.completed;
        setIsPending(true);

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
            });
        }); 
    }

    function handleEdit(task){
        setSelectedTask(task);
        setEditModal(true);  
    }
    
    function getPriorityColor(a){
        if(a.completed) return 'success';
        switch(a.priority){
            case 'HIGH': return 'danger';
            case 'MED': return 'warning';
            case 'LOW': return 'secondary';
            case 'HALT': return 'dark';
        }
    }

    function checkQuery(task){
        return task.completed === completed;
    }

    function onClose(){
        setEditModal(false);
        setSelectedTask(null);
    }



   
    

    var index = 1;

    return ( 
        
                <div>
                {console.log('RELOADED')}
                {isPending && 
                    <Row className="justify-content-sm-center">
                    <Spinner animation="border" variant="primary" className="mt-5"/>
                    </Row>}
                
                {!isPending && <Accordion defaultActiveKey="0">
                {
                    tasks.filter(checkQuery).map((task) => (
                        <Accordion.Item eventKey={`${task.id}`}>
                           
                                    
                                    <Accordion.Header>
                                        <Container>
                                            <Row className="justify-content-sm-start">
                                                <Col xs="1">
                                                    <Badge pill bg="light" text="dark">{index++}</Badge>
                                                </Col>
                                                <Col xs="8">
                                                    {task.title}
                                                </Col>
                                                <Col xs="3" className="text-end">
                                                    <Badge bg={getPriorityColor(task)}>{task.completed?  'DONE' : task.priority}</Badge>
                                                </Col>
                                            </Row>  
                                        </Container>                
                                    </Accordion.Header>
                             
                            
                            <Accordion.Body>
                                <Container>
                                    <Row>
                                        <div className="pb-3">
                                            {task.body}
                                        </div>
                                        
                                    </Row>
                                    <Row className="justify-content-sm-center">
                                        <Col xs="auto">
                                            <Button variant="outline-primary" onClick={() => handleButton(task)}>{task.completed ?  'Back to Pending' : 'Mark Completed'}</Button> 
                                        </Col>
                                        <Col xs="auto">
                                            <Button variant="outline-secondary" onClick={() => handleEdit(task)}>Edit Task</Button>
                                        </Col>  
                                    </Row>
                                </Container>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))
                }
                </Accordion>}
                {selectedTask && <EditTaskModal show={showEditModal} onHide={onClose} task={selectedTask}/>}
                </div>
            
     );
}
 
export default TaskList;

  {/* <div key={task.id}>
                        <Link to={`/tasks/${task.id}`}>
                        <h2>{task.title}</h2>
                        <p>{task.body}</p>
                        </Link>
                    </div> */}
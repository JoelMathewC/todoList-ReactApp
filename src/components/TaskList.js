import { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import EditTaskModal from './EditTaskModal';




const TaskList = ({tasks,completed}) => {

    const [showEditModal,setEditModal] = useState(false);
    
    function getPriorityColor(a){
        switch(a){
            case 'HIGH': return 'danger';
            case 'MED': return 'warning';
            case 'LOW': return 'info';
            case 'HALT': return 'dark';
        }
    }

    function checkQuery(task){
        return task.completed === completed;
    }

    var index = 1;

    return ( 
        
            
                <Accordion defaultActiveKey="0">
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
                                                    <Badge bg={getPriorityColor(task.priority)}>{task.priority}</Badge>
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
                                            <Button variant="outline-primary">Mark Completed</Button> 
                                        </Col>
                                        <Col xs="auto">
                                            <Button variant="outline-secondary" onClick={() => setEditModal(true)}>Edit Task</Button>
                                            <EditTaskModal show={showEditModal} onHide={() => setEditModal(false)} task={task}/>
                                        </Col>  
                                    </Row>
                                </Container>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))
                }
                </Accordion>
            
     );
}
 
export default TaskList;

  {/* <div key={task.id}>
                        <Link to={`/tasks/${task.id}`}>
                        <h2>{task.title}</h2>
                        <p>{task.body}</p>
                        </Link>
                    </div> */}
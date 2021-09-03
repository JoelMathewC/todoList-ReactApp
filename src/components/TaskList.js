import {Link} from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';



const TaskList = ({tasks}) => {
    return ( 
        
            
                <Accordion defaultActiveKey="0">
                {
                    tasks.map((task) => (
                        <Accordion.Item eventKey={`${task.id}`}>
                           
                                    
                                    <Accordion.Header>
                                        <div className="pe-4">
                                            <Badge pill bg="light" text="dark">{task.id}</Badge>
                                        </div>
                                            {task.title}
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
                                            <Button variant="outline-secondary">Edit Task</Button>
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
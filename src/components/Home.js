import useFetch from "./hooks/useFetch";
import TaskList from "./TaskList";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

const Home = () => {
    
    const {data: tasks, isPending, error} = useFetch('http://localhost:8000/tasks');
    
    return ( 
        <div>
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
        
        
            <Container>
                <div className="pb-3">
                <Row className="justify-content-sm-center">
                    <Col xs={4}>
                        <div className="text-start">
                        <ToggleButtonGroup type="checkbox" defaultValue={[1]}>
                            <ToggleButton id="tbg-check-1" value={1}>
                                Pending
                            </ToggleButton>
                            <ToggleButton id="tbg-check-2" value={2} variant={'outline-primary'}>
                                Completed
                            </ToggleButton>
                        </ToggleButtonGroup>
                        </div>
                    </Col>
                    <Col xs={4}>
                        <div className="text-end">
                            <Button variant="outline-primary" href="/create">+ Add Task</Button>
                        </div>
                    </Col>
                </Row>
                </div>

                <Row className="justify-content-sm-center">
                    <Col xs={8}>
                        {tasks && <TaskList tasks={tasks}/>} 
                    </Col>
                </Row>
            </Container>
        
        </div>
        
    );
}
 
export default Home;


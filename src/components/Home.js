import { useState } from "react";
import useFetch from "./hooks/useFetch";

import CreateTaskModal from "./CreateTaskModal";
import TaskList from "./TaskList";


import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';




const Home = () => {
    
    const {data: tasks, isPending, error} = useFetch('http://localhost:8000/tasks');

    const [showCreateModal,setCreateModal] = useState(false);
    const [completed, setCompleted] = useState(false);

    function handleTabChange(val){
        val[val.length-1] === 1 ? setCompleted(false) : setCompleted(true);
    }

    
    return ( 
        <div>
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
        
        
            <Container className="pb-5">
                <div className="pb-3">
                <Row className="justify-content-sm-center">
                    <Col xs={4}>
                        <div className="text-start">
                        <ToggleButtonGroup type="checkbox" value={completed ? [2] : [1]} onChange={handleTabChange}>
                            <ToggleButton id="tbg-check-1" value={1}  variant={'outline-primary'}>
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
                            <Button variant="outline-primary" onClick={() => setCreateModal(true)}>+ Add Task</Button>
                            <CreateTaskModal show={showCreateModal} onHide={() => setCreateModal(false)} />
                        </div>
                    </Col>
                </Row>
                </div>

                <Row className="justify-content-sm-center">
                    <Col xs={8}>
                        {tasks && <TaskList tasks={tasks} completed={completed} />} 
                    </Col>
                </Row>
            </Container>
            <br />
            <br />
        </div>
        
    );
}
 
export default Home;





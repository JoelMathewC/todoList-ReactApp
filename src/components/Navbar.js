import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const NavBar = () => {
    


    return ( 
        <Container className="mt-5 mb-5">
                <Row className="justify-content-sm-center">
                    <Col xs={8}>
                        <h2>Todo Checklist</h2>
                    </Col>
                </Row>
        </Container>
    );
}
 
export default NavBar;



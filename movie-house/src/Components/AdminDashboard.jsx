import React from 'react'
import { Button, Card, CardBody, CardHeader, Col, Row } from "react-bootstrap";


const AdminDashboard = () => {
  return (
  <>
    <div className="title">
      <h2>Admin Dashboard</h2>
    </div>
    <Card>
      <CardHeader>
        <Row>
          <Col><h3>All users</h3></Col>
        </Row>
      </CardHeader>
      <CardBody>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <h4>Users</h4>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </CardBody>
    </Card>
    </>
  );
}

export default AdminDashboard

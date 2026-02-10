import { Badge, Button, Card, Col, Row } from 'react-bootstrap';

const badgeVariant = {
  pending: 'warning',
  'in-progress': 'info',
  completed: 'success'
};

const TaskList = ({ tasks, onEdit, onDelete }) => {
  if (tasks.length === 0) {
    return <Card body className="text-center">No tasks found. Add your first task!</Card>;
  }

  return (
    <Row className="g-3">
      {tasks.map((task) => (
        <Col md={6} lg={4} key={task._id}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start mb-2">
                <Card.Title className="mb-0">{task.title}</Card.Title>
                <Badge bg={badgeVariant[task.status] || 'secondary'}>{task.status}</Badge>
              </div>
              <Card.Text>{task.description || 'No description added.'}</Card.Text>
              <Card.Text>
                <small className="text-muted">
                  Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
                </small>
              </Card.Text>
              <div className="d-flex gap-2">
                <Button size="sm" variant="outline-primary" onClick={() => onEdit(task)}>
                  Edit
                </Button>
                <Button size="sm" variant="outline-danger" onClick={() => onDelete(task._id)}>
                  Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default TaskList;

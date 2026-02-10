import { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const initialForm = {
  title: '',
  description: '',
  status: 'pending',
  dueDate: ''
};

const TaskForm = ({ show, onClose, onSave, task }) => {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (task) {
      setForm({
        ...task,
        dueDate: task.dueDate ? task.dueDate.slice(0, 10) : ''
      });
    } else {
      setForm(initialForm);
    }
  }, [task, show]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(form);
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{task ? 'Edit Task' : 'Add Task'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" name="title" value={form.title} onChange={handleChange} required minLength={2} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" value={form.description} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select name="status" value={form.status} onChange={handleChange}>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label>Due Date</Form.Label>
            <Form.Control type="date" name="dueDate" value={form.dueDate || ''} onChange={handleChange} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default TaskForm;

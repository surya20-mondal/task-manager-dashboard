import { useEffect, useState } from 'react';
import { Alert, Button, Container, Form, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { useAuth } from '../context/AuthContext';
import { getApiErrorMessage } from '../utils/getApiErrorMessage';
import { api } from '../services/api';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks', {
        params: {
          search,
          status: statusFilter
        }
      });
      setTasks(response.data);
    } catch (apiError) {
      setError(getApiErrorMessage(apiError, 'Failed to load tasks'));
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [search, statusFilter]);

  const openCreateModal = () => {
    setEditingTask(null);
    setShowTaskModal(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setShowTaskModal(true);
  };

  const handleSaveTask = async (payload) => {
    try {
      if (editingTask) {
        await api.put(`/tasks/${editingTask._id}`, payload);
      } else {
        await api.post('/tasks', payload);
      }
      setShowTaskModal(false);
      setEditingTask(null);
      fetchTasks();
    } catch (apiError) {
      setError(getApiErrorMessage(apiError, 'Failed to save task'));
    }
  };

  const handleDeleteTask = async (taskId) => {
    const confirmed = window.confirm('Are you sure you want to delete this task?');
    if (!confirmed) return;

    try {
      await api.delete(`/tasks/${taskId}`);
      fetchTasks();
    } catch (apiError) {
      setError(getApiErrorMessage(apiError, 'Failed to delete task'));
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" className="px-3">
        <Navbar.Brand>Task Manager Dashboard</Navbar.Brand>
        <div className="ms-auto d-flex align-items-center gap-3">
          <span className="text-light">Hi, {user?.name}</span>
          <Button variant="outline-light" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Navbar>

      <Container className="py-4">
        {error && <Alert variant="danger">{error}</Alert>}

        <div className="d-flex flex-wrap gap-2 justify-content-between align-items-end mb-3">
          <div className="d-flex gap-2 flex-wrap">
            <Form.Control
              placeholder="Search tasks..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              style={{ minWidth: 220 }}
            />
            <Form.Select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </Form.Select>
          </div>

          <Button onClick={openCreateModal}>+ Add Task</Button>
        </div>

        <TaskList tasks={tasks} onEdit={openEditModal} onDelete={handleDeleteTask} />
      </Container>

      <TaskForm
        show={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        onSave={handleSaveTask}
        task={editingTask}
      />
    </>
  );
};

export default DashboardPage;

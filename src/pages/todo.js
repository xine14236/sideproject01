import React, { useState, useEffect } from 'react';
import { TextField, Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, Box, Grid2 } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import useMediaQuery from '@mui/material/useMediaQuery'; 
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ToDoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editTodoId, setEditTodoId] = useState(null);
  const [editText, setEditText] = useState('');
  const [filterDate, setFilterDate] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteTodoId, setDeleteTodoId] = useState(null);
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  // 初始化從 sessionStorage 讀取資料
  useEffect(() => {
    const storedTodos = sessionStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // 當 todos 改變時，將資料存到 sessionStorage
  useEffect(() => {
    sessionStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // 新增待辦事項
  const handleAddTodo = () => {
    if (newTodo.trim() === '') return;
    const newTask = {
      id: Date.now(),
      text: newTodo,
      date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    };
    setTodos([...todos, newTask]);
    setNewTodo('');
    setOpenAddModal(false); // 關閉 Modal
  };

  // 刪除待辦事項
  const handleDelete = () => {
    setTodos(todos.filter((todo) => todo.id !== deleteTodoId));
    setOpenDeleteModal(false); // 關閉 Modal
  };

  // 編輯待辦事項
  const handleEdit = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setEditTodoId(id);
    setEditText(todoToEdit.text);
  };

  // 更新待辦事項
  const handleUpdate = () => {
    setTodos(
      todos.map((todo) =>
        todo.id === editTodoId ? { ...todo, text: editText } : todo
      )
    );
    setEditTodoId(null);
    setEditText('');
  };

  // 篩選待辦事項根據選擇的日期
  const filteredTodos = filterDate
    ? todos.filter((todo) =>
        dayjs(todo.date).isSame(dayjs(filterDate), 'day')
      )
    : todos;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>

      <section>
      
        
        {/* DateTimePicker for filtering */}
        <DateTimePicker
          label="篩選日期"
          value={filterDate}
          onChange={(newValue) => setFilterDate(newValue)}
          renderInput={(params) => <TextField {...params} sx={{ mt: 2, mb: 2 }} />}
        />

        {/* 表格呈現 To-Do List */}
        <Grid2 container spacing={2}>
      <TableContainer component={Paper}>
   
        {isSmallScreen ? (
          // 在小螢幕上，將每行轉為垂直的布局
          <Grid2 container spacing={2}>
            {filteredTodos.map((todo) => (
              <Grid2 item xs={12} key={todo.id}>
                <Paper sx={{ p: 2 }}>
                  <Grid2 container spacing={1}>
                    <Grid2 item xs={12}>
                      <strong>待辦事項：</strong> {todo.text}
                    </Grid2>
                    <Grid2 item xs={12}>
                      <strong>日期：</strong> {todo.date}
                    </Grid2>
                    <Grid2 item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <IconButton onClick={() => handleEdit(todo.id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => { setDeleteTodoId(todo.id); setOpenDeleteModal(true); }}>
                        <DeleteIcon />
                      </IconButton>
                    </Grid2>
                  </Grid2>
                </Paper>
              </Grid2>
            ))}
          </Grid2>
        ) : (
          // 在大螢幕上顯示標準表格
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>待辦事項</TableCell>
                <TableCell align="right">日期</TableCell>
                <TableCell align="right">操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTodos.map((todo) => (
                <TableRow key={todo.id}>
                  <TableCell component="th" scope="row">
                    {todo.text}
                  </TableCell>
                  <TableCell align="right">{todo.date}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleEdit(todo.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => { setDeleteTodoId(todo.id); setOpenDeleteModal(true); }}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Grid2>
  
    

        {/* 新增按鈕 */}
        <Button variant="contained" startIcon={<AddIcon />} sx={{ mt: 2 }} onClick={() => setOpenAddModal(true)}>
          新增待辦事項
        </Button>

        {/* 新增 Modal */}
        <Modal
          open={openAddModal}
          onClose={() => setOpenAddModal(false)}
          aria-labelledby="add-todo-modal"
          aria-describedby="add-todo-description"
        >
          <Box sx={style}>
            <h2 id="add-todo-modal">新增待辦事項</h2>
            <TextField
              label="待辦事項"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              fullWidth
            />
            <Button variant="contained" sx={{ mt: 2 }} onClick={handleAddTodo}>
              新增
            </Button>
          </Box>
        </Modal>

        {/* 刪除 Modal */}
        <Modal
          open={openDeleteModal}
          onClose={() => setOpenDeleteModal(false)}
          aria-labelledby="delete-todo-modal"
          aria-describedby="delete-todo-description"
        >
          <Box sx={style}>
            <h2 id="delete-todo-modal">刪除待辦事項</h2>
            <p>確定要刪除此待辦事項嗎？</p>
            <Button variant="contained" sx={{ mt: 2 }} color="error" onClick={handleDelete}>
              刪除
            </Button>
          </Box>
        </Modal>
      </section>
    </LocalizationProvider>
  );
};

export default ToDoList;

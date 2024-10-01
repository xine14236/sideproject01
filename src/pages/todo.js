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
  top: '30%',
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
  const [editDate, setEditDate] = useState(dayjs());
  const [filterDate, setFilterDate] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false); // 新增：控制編輯的 Modal
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteTodoId, setDeleteTodoId] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const isSmallScreen = useMediaQuery('(max-width:600px)');

  // 初始化從 localStorage 讀取資料
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      try {
        setTodos(JSON.parse(storedTodos)); // 確保正確解析 JSON 資料
      } catch (e) {
        console.error("無法解析 localStorage 的資料:", e);
        setTodos([]); // 如果解析失敗，設置為空
      }
    } else {
      setTodos([]); // localStorage 為空時，設置為空數組
    }
  }, []);

  // 當 todos 改變時，將資料存到 localStorage
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos)); // 正確將資料存入 localStorage
    }
  }, [todos]);

  const handleSubmit = () => {
    handleAddTodo(newTodo, selectedDate);
    setNewTodo('');
    setSelectedDate(dayjs()); // 重置時間選擇器
    setOpenAddModal(false); // 關閉 Modal
  };

  // 新增待辦事項
  const handleAddTodo = (todoText, todoDate) => {
    if (todoText.trim() === '') return;
  
    const newTask = {
      id: Date.now(),
      text: todoText,
      date: dayjs(todoDate).format('YYYY-MM-DD HH:mm:ss'), // 使用選擇的時間
    };
  
    setTodos([...todos, newTask]);
  };

  // 編輯待辦事項
  const handleEdit = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setEditTodoId(id);
    setEditText(todoToEdit.text);
    setEditDate(dayjs(todoToEdit.date)); // 將日期設置為該待辦事項的日期
    setOpenEditModal(true); // 打開編輯 Modal
  };

  // 更新待辦事項
  const handleUpdate = () => {
    setTodos(
      todos.map((todo) =>
        todo.id === editTodoId
          ? { ...todo, text: editText, date: dayjs(editDate).format('YYYY-MM-DD HH:mm:ss') }
          : todo
      )
    );
    setEditTodoId(null);
    setEditText('');
    setOpenEditModal(false); // 關閉編輯 Modal
  };

  // 刪除待辦事項
  const handleDelete = () => {
    setTodos(todos.filter((todo) => todo.id !== deleteTodoId));
    setOpenDeleteModal(false); // 關閉 Modal
  };

  // 篩選待辦事項根據選擇的日期
  const filteredTodosByDate = todos.filter((todo) => {
    const todoDate = dayjs(todo.date);
    const isAfterStart = startDate ? todoDate.isAfter(dayjs(startDate), 'second') : true;
    const isBeforeEnd = endDate ? todoDate.isBefore(dayjs(endDate), 'second') : true;
    return isAfterStart && isBeforeEnd;
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <section>
        <Grid2 container spacing={2} alignItems="center" sx={{ paddingBlock: '25px' }}>
          <Grid2 item xs={12} sm={6} size={{ sm: 12, sm: 6 }} sx={{ paddingInline: '5%' }}>
            <DateTimePicker
              label="開始時間"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
              sx={{ backgroundColor: '#FF8080' }}
            />
          </Grid2>
          <Grid2 item xs={12} sm={6} size={{ sm: 12, sm: 6 }} sx={{ paddingInline: '5%' }}>
            <DateTimePicker
              label="結束時間"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
              sx={{ backgroundColor: '#FF8080' }}
            />
          </Grid2>
          <Button variant="contained" startIcon={<AddIcon />} sx={{ mt: 2, marginInline: { sx: 0, md: '5%' }, paddingInline: { sx: 0, md: '5%' } }} onClick={() => setOpenAddModal(true)}>
            新增待辦事項
          </Button>
        </Grid2>

        {/* 表格呈現 To-Do List */}
        <Grid2 container spacing={2}>
          <TableContainer component={Paper}>
            {isSmallScreen ? (
              // 在小螢幕上，將每行轉為垂直的布局
              <Grid2 container spacing={2}>
                {filteredTodosByDate.map((todo) => (
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
                  <TableRow sx={{ backgroundColor: '#E37D22', '& .MuiTableCell-root': { color: 'white' } }}>
                    <TableCell>待辦事項</TableCell>
                    <TableCell align="right">日期</TableCell>
                    <TableCell align="right">操作</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredTodosByDate.map((todo) => (
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

        {/* 新增 Modal */}
        <Modal
          open={openAddModal}
          onClose={() => setOpenAddModal(false)}
          aria-labelledby="add-todo-modal"
          aria-describedby="add-todo-description"
        >
          <Box sx={style}>
            <h2 id="add-todo-modal">新增待辦事項</h2>
            <DateTimePicker
              label="選擇時間"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth sx={{ mb: 4 }} />}
            />
            <TextField
              label="待辦事項"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              fullWidth
              sx={{ mt: 2 }}
            />
            <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>
              新增
            </Button>
          </Box>
        </Modal>

        {/* 編輯 Modal */}
        <Modal
          open={openEditModal} // 控制編輯 Modal 的開關
          onClose={() => setOpenEditModal(false)}
          aria-labelledby="edit-todo-modal"
          aria-describedby="edit-todo-description"
        >
          <Box sx={style}>
            <h2 id="edit-todo-modal">編輯待辦事項</h2>
            <DateTimePicker
              label="編輯時間"
              value={editDate}
              onChange={(newValue) => setEditDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth sx={{ mb: 4 }} />}
            />
            <TextField
              label="編輯待辦事項"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              fullWidth
              sx={{ mt: 2 }}
            />
            <Button variant="contained" sx={{ mt: 2 }} onClick={handleUpdate}>
              更新
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

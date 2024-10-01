import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Grid2 from '@mui/material/Grid';
import { Button, Modal, Box, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
// 解決 Leaflet marker 默認圖標問題
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// 標點描述輸入框的 Modal
function AddMarkerModal({ open, handleClose, onSubmit }) {
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    onSubmit(description);
    handleClose();
    setDescription('');
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <h2>輸入標點描述</h2>
        <TextField
          label="描述"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
          確定
        </Button>
      </Box>
    </Modal>
  );
}

function AddMarkerOnRightClick({ addMarker }) {
  const [open, setOpen] = useState(false);
  const [clickedLatLng, setClickedLatLng] = useState(null);

  useMapEvents({
    contextmenu(e) { // 右鍵點擊事件
      setClickedLatLng(e.latlng);
      setOpen(true);
    },
  });

  const handleClose = () => setOpen(false);

  const handleAddMarker = (description) => {
    if (description && clickedLatLng) {
      addMarker(clickedLatLng, description);
    }
  };

  return (
    <>
      <AddMarkerModal open={open} handleClose={handleClose} onSubmit={handleAddMarker} />
    </>
  );
}

const MyMap = () => {
  const [markers, setMarkers] = useState([]);

  // 在組件掛載時，從 localStorage 中讀取標點資料
  useEffect(() => {
    const savedMarkers = JSON.parse(localStorage.getItem('markers')) || [];
    if (savedMarkers.length > 0) {
      const convertedMarkers = savedMarkers.map(marker => ({
        ...marker,
        latlng: L.latLng(marker.latlng.lat, marker.latlng.lng),
      }));
      setMarkers(convertedMarkers);
    }
  }, []);

  // 每當 markers 發生變化時，將其保存到 localStorage 中
  useEffect(() => {
    localStorage.setItem('markers', JSON.stringify(markers));
  }, [markers]);

  const addMarker = (latlng, description) => {
    setMarkers((currentMarkers) => [
      ...currentMarkers,
      { latlng, description },
    ]);
  };

  const removeMarker = (idx) => {
    const updatedMarkers = markers.filter((_, i) => i !== idx);
    setMarkers(updatedMarkers);  // 更新 markers 並保存到 localStorage
  };

  return (
    <Grid2 container spacing={0}>
        <Typography variant="h6" color="red" sx={{position:'absolute', top:{xs:'10%',md:'12%'},left:'30%',zIndex:'1000',fontWeight:'900'}}>點擊右鍵(Mobile長按)進行標點</Typography>
       
      <MapContainer center={[22.995575647879928, 120.222377453246]} zoom={13} style={{ height: '88vh', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <AddMarkerOnRightClick addMarker={addMarker} />
        {markers.map((marker, idx) => (
          <Marker key={idx} position={marker.latlng}>
            <Popup>
              <div>{marker.description}</div>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => removeMarker(idx)}
                sx={{ mt: 1 ,color:'red',backgroundColor:'#fffcf0'}}
                startIcon={<DeleteIcon/>}
              >
                刪除標點
              </Button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Grid2>
  );
};

export default MyMap;

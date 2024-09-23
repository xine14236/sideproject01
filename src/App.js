import React from 'react';
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <h1>Welcome to My Responsive Website</h1>
        <p>This is the main content area of your application.</p>
      </div>
    </div>
  );
}

export default App;
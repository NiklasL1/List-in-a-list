import React from 'react';
import './App.css';
import Products from './Components/Products';
import AddToList from './Components/AddToList';


function App() {
  return (    
    <div className="App">
      <AddToList />
      <Products />
    </div>    
  );
}

export default App;

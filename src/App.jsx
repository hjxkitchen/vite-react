import React from 'react';
import axios from 'axios';

const App = () => {
  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3000/register', {
        username: 'exampleUser',
        password: 'examplePassword',
        roleId: 2, // Assuming roleId 2 represents a "user" role
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', {
        username: 'exampleUser',
        password: 'examplePassword',
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetUser = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users/1');
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetModels = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/ModelName');
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateModel = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/ModelName', {
        // Provide the necessary data for creating the model instance
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetModelById = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/ModelName/1');
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateModel = async () => {
    try {
      const response = await axios.put('http://localhost:3000/api/ModelName/1', {
        // Provide the updated data for the model instance
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteModel = async () => {
    try {
      const response = await axios.delete('http://localhost:3000/api/ModelName/1');
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTriggerIntegration = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/integration');
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={handleRegister}>Register</button>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleGetUser}>Get User</button>
      <button onClick={handleGetModels}>Get Models</button>
      <button onClick={handleCreateModel}>Create Model</button>
      <button onClick={handleGetModelById}>Get Model by ID</button>
      <button onClick={handleUpdateModel}>Update Model</button>
      <button onClick={handleDeleteModel}>Delete Model</button>
      <button onClick={handleTriggerIntegration}>Trigger Integration</button>
    </div>
  );
};

export default App;

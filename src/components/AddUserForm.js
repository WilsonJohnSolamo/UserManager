// components/AddUserForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { mutate } from 'swr';

const AddUserForm = () => {
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');

  const handleAddUser = async () => {
    try {
      // Make a POST request to add a new user
      const newUser = {
        name: newUserName,
        email: newUserEmail,
      };
      await axios.post('https://646a0a19183682d6144c22c6.mockapi.io/users', newUser);
      // Trigger a revalidation of the user data
      mutate('https://646a0a19183682d6144c22c6.mockapi.io/users');
      // Reset the input fields after adding the user
      setNewUserName('');
      setNewUserEmail('');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        value={newUserName}
        onChange={(e) => setNewUserName(e.target.value)}
        className="p-2 border border-gray-300 rounded-md mr-2"
      />
      <input
        type="text"
        placeholder="Email"
        value={newUserEmail}
        onChange={(e) => setNewUserEmail(e.target.value)}
        className="p-2 border border-gray-300 rounded-md mr-2"
      />
      <button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={handleAddUser}>
        Add User
      </button>
    </div>
  );
};

export default AddUserForm;

// components/AddUserModal.js

import React, { useState } from 'react';
import axios from 'axios';
import { mutate } from 'swr';

const AddUserModal = ({ onClose }) => {
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
      // Close the modal
      onClose();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white rounded-lg p-4 relative z-10">
        <h2 className="text-lg font-bold mb-4">Add User</h2>
        <input
          type="text"
          placeholder="Name"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          className="p-2 border border-gray-300 rounded-md mb-2"
        />
        <input
          type="text"
          placeholder="Email"
          value={newUserEmail}
          onChange={(e) => setNewUserEmail(e.target.value)}
          className="p-2 border border-gray-300 rounded-md mb-4"
        />
        <div className="flex justify-end">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
            onClick={handleAddUser}
          >
            Add User
          </button>
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;

import React, { useState } from 'react';
import axios from 'axios';
import { mutate } from 'swr';

const EditUserModal = ({ user, onClose }) => {
  const [userName, setUserName] = useState(user.name);
  const [userEmail, setUserEmail] = useState(user.email);

  const handleEditUser = async () => {
    try {
      // Make a PUT request to update the user
      const updatedUser = {
        name: userName,
        email: userEmail,
      };
      await axios.put(`https://646a0a19183682d6144c22c6.mockapi.io/users/${user.id}`, updatedUser);
      // Trigger a revalidation of the user data
      mutate('https://646a0a19183682d6144c22c6.mockapi.io/users');
      // Close the modal
      onClose();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white rounded-lg p-4 relative z-10">
        <h2 className="text-lg font-bold mb-4">Edit User</h2>
        <input
          type="text"
          placeholder="Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="p-2 border border-gray-300 rounded-md mb-2"
        />
        <input
          type="text"
          placeholder="Email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          className="p-2 border border-gray-300 rounded-md mb-4"
        />
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
            onClick={handleEditUser}
          >
            Save
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

export default EditUserModal;
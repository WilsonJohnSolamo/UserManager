import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { mutate } from 'swr';
import EditUserModal from './EditUserModal';

const UserTable = ({ users }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
  
    const handleEdit = (user) => {
      setSelectedUser(user);
      setShowModal(true);
    };

  const handleDelete = async (id) => {
    try {
      // Make a DELETE request to the API endpoint
      await axios.delete(`https://646a0a19183682d6144c22c6.mockapi.io/users/${id}`);
      // Handle successful deletion (e.g., update user list)
      mutate('https://646a0a19183682d6144c22c6.mockapi.io/users');

      console.log('User deleted successfully');
    } catch (error) {
      // Handle error during deletion
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
        <table className="min-w-full border border-gray-300">
        <thead>
            <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Actions</th>
            </tr>
        </thead>
        <tbody>
            {users.map((user) => (
            <tr key={user.id}>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                    onClick={() => handleEdit(user)}
                    >
                    Edit
                    </button>
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                    onClick={() => handleDelete(user.id)}
                >
                    Delete
                </button>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
        {showModal && (
        <EditUserModal user={selectedUser} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default UserTable;


// // components/UserTable.js

// import React from 'react';
// import axios from 'axios';
// import { mutate } from 'swr';

// const UserTable = ({ users }) => {
//   const handleEdit = (id) => {
//     // Implement your edit logic here
//     console.log('Edit user with id:', id);
//   };

//   const handleDelete = async (id) => {
//     try {
//       // Make a DELETE request to the API endpoint
//       await axios.delete(`https://646a0a19183682d6144c22c6.mockapi.io/users/${id}`);
//       // Handle successful deletion (e.g., update user list)
//       mutate('https://646a0a19183682d6144c22c6.mockapi.io/users');

//       console.log('User deleted successfully');
//     } catch (error) {
//       // Handle error during deletion
//       console.error('Error deleting user:', error);
//     }
//   };

//   return (
//     <table className="min-w-full border border-gray-300">
//       <thead>
//         <tr>
//           <th className="px-4 py-2">Name</th>
//           <th className="px-4 py-2">Email</th>
//           <th className="px-4 py-2">Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {users.map((user) => (
//           <tr key={user.id}>
//             <td className="px-4 py-2">{user.name}</td>
//             <td className="px-4 py-2">{user.email}</td>
//             <td className="px-4 py-2">
//               <button
//                 className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
//                 onClick={() => handleEdit(user.id)}
//               >
//                 Edit
//               </button>
//               <button
//                 className="bg-red-500 text-white px-4 py-2 rounded-md"
//                 onClick={() => handleDelete(user.id)}
//               >
//                 Delete
//               </button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default UserTable;

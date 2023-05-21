// pages/UserManagement.js

import React, { useState } from 'react';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import UserTable from '../components/UserTable';
import AddUserModal from '../components/AddUserModal';

const fetcher = (url) => fetch(url).then((res) => res.json());

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { data: users, error } = useSWR('https://646a0a19183682d6144c22c6.mockapi.io/users', fetcher);

  if (error) {
    return <div>Error loading users</div>;
  }

  if (!users) {
    return <div>Loading...</div>;
  }

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search by email or name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-md mr-2"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleAddUser}
        >
          Add User
        </button>
      </div>
      {showModal && <AddUserModal onClose={handleCloseModal} />}
      <UserTable users={filteredUsers} />
    </div>
  );
};

export default UserManagement;


// // pages/UserManagement.js

// import React, { useState } from 'react';
// import useSWR, { mutate } from 'swr';
// import UserTable from '../components/UserTable';
// import AddUserForm from '../components/AddUserForm';

// const fetcher = (url) => fetch(url).then((res) => res.json());

// const UserManagement = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const { data: users, error } = useSWR('https://646a0a19183682d6144c22c6.mockapi.io/users', fetcher);

//   if (error) {
//     return <div>Error loading users</div>;
//   }

//   if (!users) {
//     return <div>Loading...</div>;
//   }

//   const filteredUsers = users.filter(
//     (user) =>
//       user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div>
//       <div className="flex mb-4">
//         <input
//           type="text"
//           placeholder="Search by email or name"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="p-2 border border-gray-300 rounded-md mr-2"
//         />
//         <AddUserForm />
//       </div>
//       <UserTable users={filteredUsers} />
//     </div>
//   );
// };

// export default UserManagement;
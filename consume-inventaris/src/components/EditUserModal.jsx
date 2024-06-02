// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function User() {
//     const [users, setUsers] = useState([]);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [selectedUserId, setSelectedUserId] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         axios.get("http://localhost:8000/user", {
//             headers: {  
//                 "Authorization": "Bearer " + localStorage.getItem("access_token"),
//             }
//         })
//         .then(res => {
//             setUsers(res.data.data);
//         })
//         .catch(err => {
//             console.log(err);
//             if (err.response && err.response.status === 401) {
//                 navigate('/login?message=' + encodeURIComponent('anda belum login !!'));
//             }
//         });
//     }, []);

//     const handleEdit = (id) => {
//         setSelectedUserId(id);
//         setIsModalOpen(true);
//     };

//     const handleDelete = (id) => {
//         if (window.confirm("Are you sure you want to delete this user?")) {
//             axios.delete(`http://localhost:8000/user/delete/${id}`, {
//                 headers: {
//                     "Authorization": "Bearer " + localStorage.getItem("access_token"),
//                 }
//             })
//             .then(res => {
//                 setUsers(users.filter(user => user.id !== id));
//             })
//             .catch(err => {
//                 console.log(err);
//                 if (err.response && err.response.status === 401) {
//                     navigate('/login?message=' + encodeURIComponent('anda belum login !!'));
//                 }
//             });
//         }
//     };

//     const handleUserUpdated = () => {
//         setIsModalOpen(false);
//         window.location.reload();
//     };

//     return (
//         <div style={styles.container}>
//             <table style={styles.table}>
//                 <thead>
//                     <tr>
//                         <th style={styles.th}>#</th>
//                         <th style={styles.th}>Username</th>
//                         <th style={styles.th}>Email</th>
//                         <th style={styles.th}>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users.map((user, index) => (
//                         <tr key={user.id} style={index % 2 === 0 ? styles.trEven : styles.tr}>
//                             <td style={styles.td}>{index + 1}</td>
//                             <td style={styles.td}>{user.username}</td>
//                             <td style={styles.td}>{user.email}</td>
//                             <td style={styles.td}>
//                                 <button
//                                     style={{ ...styles.button, ...styles.editButton }}
//                                     onClick={() => handleEdit(user.id)}
//                                 >
//                                     Edit
//                                 </button>
//                                 <button
//                                     style={{ ...styles.button, ...styles.deleteButton }}
//                                     onClick={() => handleDelete(user.id)}
//                                 >
//                                     Delete
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//             <EditUserModal 
//                 isOpen={isModalOpen} 
//                 onClose={() => setIsModalOpen(false)} 
//                 userId={selectedUserId} 
//                 onUserUpdated={handleUserUpdated} 
//             />
//         </div>
//     );
// }

// function EditUserModal({ isOpen, onClose, userId, onUserUpdated }) {
//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         if (isOpen && userId) {
//             setLoading(true);
//             axios.get(`http://localhost:8000/user/${userId}`, {
//                 headers: {  
//                     "Authorization": "Bearer " + localStorage.getItem("access_token"),
//                 }
//             })
//             .then(res => {
//                 setUsername(res.data.username);
//                 setEmail(res.data.email);
//                 setLoading(false);
//             })
//             .catch(err => {
//                 console.log(err);
//                 setError("Failed to fetch user data.");
//                 setLoading(false);
//             });
//         }
//     }, [isOpen, userId]);

//     const handleSave = () => {
//         axios.put(`http://localhost:8000/user/${userId}`, {
//             username,
//             email,
//         }, {
//             headers: {  
//                 "Authorization": "Bearer " + localStorage.getItem("access_token"),
//             }
//         })
//         .then(res => {
//             onUserUpdated();
//             onClose();
//         })
//         .catch(err => {
//             console.log(err);
//             setError("Failed to update user data.");
//         });
//     };

//     if (!isOpen) return null;

//     return (
//         <div className="modal">
//             <div className="modal-content">
//                 <span className="close" onClick={onClose}>&times;</span>
//                 <h2>Edit User</h2>
//                 {loading ? (
//                     <p>Loading...</p>
//                 ) : (
//                     <>
//                         {error && <p style={{ color: 'red' }}>{error}</p>}
//                         <label>
//                             Username:
//                             <input 
//                                 type="text" 
//                                 value={username} 
//                                 onChange={(e) => setUsername(e.target.value)} 
//                             />
//                         </label>
//                         <br />
//                         <label>
//                             Email:
//                             <input 
//                                 type="email" 
//                                 value={email} 
//                                 onChange={(e) => setEmail(e.target.value)} 
//                             />
//                         </label>
//                         <br />
//                         <button onClick={handleSave}>Save</button>
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// }

// const styles = {
//     container: {
//         padding: '20px',
//     },
//     table: {
//         width: '100%',
//         borderCollapse: 'collapse',
//         marginTop: '20px',
//     },
//     th: {
//         border: '1px solid #ddd',
//         padding: '8px',
//         textAlign: 'left',
//         backgroundColor: '#4CAF50',
//         color: 'white',
//         paddingTop: '12px',
//         paddingBottom: '12px',
//     },
//     td: {
//         border: '1px solid #ddd',
//         padding: '8px',
//         textAlign: 'left',
//     },
//     trEven: {
//         backgroundColor: '#f9f9f9',
//     },
//     trHover: {
//         backgroundColor: '#ddd',
//     },
//     tr: { 
//         backgroundColor: 'white' 
//     },
//     button: {
//         marginRight: '5px',
//         padding: '5px 10px',
//         borderRadius: '4px',
//         cursor: 'pointer',
//     },
//     editButton: {
//         backgroundColor: '#4CAF50',
//         color: 'white',
//         border: 'none',
//     },
//     deleteButton: {
//         backgroundColor: '#f44336',
//         color: 'white',
//         border: 'none',
//     },
// };

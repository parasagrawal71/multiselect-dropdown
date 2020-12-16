import React, { useState, useRef } from "react";
import "./App.css";

// IMPORT COMPONENTS HERE
import Checkbox from "./components/checkbox/Checkbox";

const App = () => {
  // STATE VARIABLES
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  // VARIABLES
  const users = [
    "Jenny Hess",
    "Elliot Fu",
    "Stevie Feliciano",
    "Christian",
    "Jenny H",
    "Elliot A",
    "Stevie S",
    "Christian C",
  ];

  // Refs
  const dropdownRef = useRef(null);

  const addRemoveUser = (e, selectedUser) => {
    e.stopPropagation(); // To stop event bubbling and avoid closing dropdown
    if (selectedUsers.includes(selectedUser)) {
      setSelectedUsers([...selectedUsers.filter((u) => u !== selectedUser)]);
    } else {
      setSelectedUsers([...selectedUsers, selectedUser]);
    }
  };

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsVisible(false);
    }
  };

  return (
    <main className="container" onClick={handleOutsideClick}>
      <section className="multiselect" onClick={() => setIsVisible(!isVisible)}>
        <div>Select users</div>
        <div className="dropdown-icon"></div>
        {isVisible && (
          <section className="dropdown" ref={dropdownRef}>
            {users.map((user, index) => {
              return (
                <div
                  key={user + index}
                  className="dropdown-item"
                  onClick={(e) => addRemoveUser(e, user)}
                >
                  {user}
                  {selectedUsers.includes(user) && <Checkbox />}
                </div>
              );
            })}
          </section>
        )}
      </section>
      <section className="selected-users">
        {selectedUsers &&
          selectedUsers.map((selectedUser, index) => {
            return (
              <div key={selectedUser + index} className="selected-user">
                {selectedUser}
                <span
                  className="cross"
                  onClick={(e) => addRemoveUser(e, selectedUser)}
                >
                  x
                </span>
              </div>
            );
          })}
      </section>
    </main>
  );
};

export default App;

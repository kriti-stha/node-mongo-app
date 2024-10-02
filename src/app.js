import React, { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState("");

  // Separate state for each form field
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [universityCourse, setUniversityCourse] = useState("");
  const [age, setAge] = useState("");

  // useEffect(() => {
  //   fetch("http://localhost:8000")
  //     .then((res) => res.json())
  //     .then((data) => setMessage(data.message));
  // }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { firstName, lastName, universityCourse, age };
    console.log("Form data submitted:", formData);
    // You can perform further actions such as sending the data to a backend server
  };

  return (
    <div className="App">
      <h1>{message}</h1>

      {/* Form for entering individual details */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label>University Course:</label>
          <input
            type="text"
            value={universityCourse}
            onChange={(e) => setUniversityCourse(e.target.value)}
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;

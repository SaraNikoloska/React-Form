import "./App.css";
import { useEffect, useState } from "react";

const personalEmailDomains = new Set(
  [
    "0-mail.com",
    "027168.com",
    "0815.su",
    "0sg.net",
    "10mail.org",
    "10minutemail.co.za",
    "11mail.com",
    "123.com",
    "123box.net",
    "gmail.com",
    "live.com",
    "hotmail.com",
    "yahoo.com",
    "outlook.com",
  ].map((value) => value.toLowerCase())
);


function App() {

  const [userInputData, setUserInputData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [error, setError] = useState("");

  function handleInputChange(e) {
    setUserInputData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  useEffect(() => {
    const parts = userInputData.email.toLowerCase().split("@");
    const domain = parts[1] || "";
    
    let err = '';
    const isValid = isValidEmail(userInputData.email);
    if (isValid) {
      const isPersonal = personalEmailDomains.has(domain);
      if(isPersonal) {
        err = 'personal'
      }
    } else {
      if(userInputData.email.length > 0) {
        err = 'invalid'
      }
    }

    setError(err);

  }, [userInputData.email]);

  function handleSubmitForm(e) {
    e.preventDefault();
    console.log(userInputData);
    alert(`Your business email ${userInputData.email} has been sent!`)
  }

  return (
    <div className="App">
      <h1>JOIN OUR COURSES</h1>
      <form onSubmit={(e) => handleSubmitForm(e)}>
        <label htmlFor="firstName">First Name</label>
        <input
          required
          type="text"
          id="firstName"
          name="firstName"
          value={userInputData.firstName}
          placeholder="Enter your first name"
          onChange={handleInputChange}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          required
          type="text"
          id="lastName"
          name="lastName"
          value={userInputData.lastName}
          placeholder="Enter your last name"
          onChange={handleInputChange}
        />
        <label htmlFor="email">Business Email</label>
        <input
          required
          type="email"
          id="email"
          name="email"
          value={userInputData.email}
          placeholder="Enter your business email"
          onChange={handleInputChange}
        />
        {error === "invalid" && (
          <small className="inputError">Please enter valid email!</small>
        )}
        {error === "personal" && (
          <small className="inputError">Please enter business email!</small>
        )}
        <button type="submit" disabled={error}>Submit</button>
      </form>
    </div>
  );
}

function isValidEmail(mail) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
}

export default App;

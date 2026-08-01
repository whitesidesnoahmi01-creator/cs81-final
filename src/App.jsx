import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [applications, setApplications] = useState(() => {
    const savedApplications = localStorage.getItem("applications");

    if (savedApplications) {
      return JSON.parse(savedApplications);
    }

    return [{
        id: 1,
        company: "Spotify",
        position: "Frontend Intern",
        dateApplied: "2026-07-25",
        status: "Applied",
      },{
        id: 2,
        company: "Amazon",
        position: "Cloud Support Intern",
        dateApplied: "2026-07-28",
        status: "Interviewing",
      },{
        id: 3,
        company: "Adobe",
        position: "Software Engineer Intern",
        dateApplied: "2026-07-30",
        status: "Rejected",
      },];});

  const [formData, setFormData] = useState({
    company: "",
    position: "",
    dateApplied: "",
    status: "Applied",
  });

  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
  localStorage.setItem("applications", JSON.stringify(applications));
  }, [applications]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });}

  function handleSubmit(event) {
    event.preventDefault();

    if (
      formData.company === "" ||
      formData.position === "" ||
      formData.dateApplied === ""
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    if (editingId !== null) {
      const updatedApplications = applications.map((application) => {
        if (application.id === editingId) {
          return {
            ...application,
            company: formData.company,
            position: formData.position,
            dateApplied: formData.dateApplied,
            status: formData.status,
          };}
    return application;
  });

  setApplications(updatedApplications);
  setEditingId(null);
  setMessage("Application updated");
} else {
  const newApplication = {
    id: Date.now(),
    company: formData.company,
    position: formData.position,
    dateApplied: formData.dateApplied,
    status: formData.status,
  };

  setApplications([...applications, newApplication]);
  setMessage("Application added");
}

    setFormData({
      company: "",
      position: "",
      dateApplied: "",
      status: "Applied",
    })
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  function deleteApplication(id) {
  const updatedApplications = applications.filter((application) => {
    return application.id !== id;
  });
  setApplications(updatedApplications);
}

  function editApplication(application) {
    setFormData({
      company: application.company,
      position: application.position,
      dateApplied: application.dateApplied,
      status: application.status,
    });
    setEditingId(application.id);
  }

  return (
    <main className="app">
      <header className="app-header">
        <h1>Job Application Tracker</h1>
        <p>Organize and monitor your job applications.</p>
      </header>

      <section
        className={
          editingId === null
            ?"application-form-section"
            :"application-form-section editing"
        }
      >
        <h2>
          {editingId === null ? "Add an Application" : "Edit Application"}
        </h2>

        <form className="application-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              name="company"
              type="text"
              value={formData.company}
              onChange={handleChange}
              placeholder="Example: Microsoft"
            />
          </div>

          <div className="form-group">
            <label htmlFor="position">Position</label>
            <input
              id="position"
              name="position"
              type="text"
              value={formData.position}
              onChange={handleChange}
              placeholder="Example: Software Intern"
            />
          </div>

          <div className="form-group">
            <label htmlFor="dateApplied">Date Applied</label>
            <input
              id="dateApplied"
              name="dateApplied"
              type="date"
              value={formData.dateApplied}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

        <button type="submit">
          {editingId === null ? "Add Application" : "Save Changes"}
        </button>
        </form>
        {message !== "" && (
          <p className="success-message">{message}</p>
        )}
      </section>

      <section className="applications-section">
        <div className="section-heading">
          <h2>Your Applications</h2>
          <p>Total: {applications.length}</p>
        </div>

        <table className="applications-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Position</th>
              <th>Date Applied</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((application) => (
              <tr key={application.id}>
                <td>{application.company}</td>
                <td>{application.position}</td>
                <td>{application.dateApplied}</td>
                <td>{application.status}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="edit-button"
                      onClick={() => editApplication(application)}
                    >
                    Edit
                    </button>
                  
                    <button
                      className="delete-button"
                      onClick={() => deleteApplication(application.id)}
                    >
                    Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );}

export default App;
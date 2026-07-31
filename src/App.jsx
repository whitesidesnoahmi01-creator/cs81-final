import { useState } from "react";
import "./App.css";

function App() {
  const [applications] = useState([
    {
      id: 1,
      company: "Spotify",
      position: "Frontend Intern",
      dateApplied: "2026-07-25",
      status: "Applied",
    },
    {
      id: 2,
      company: "Amazon",
      position: "Cloud Support Intern",
      dateApplied: "2026-07-28",
      status: "Interviewing",
    },
    {
      id: 3,
      company: "Adobe",
      position: "Software Engineer Intern",
      dateApplied: "2026-07-30",
      status: "Rejected",
    },
  ]);

  return (
    <main className="app">
      <header className="app-header">
        <h1>Job Application Tracker</h1>
        <p>Organize and monitor your job applications.</p>
      </header>

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
            </tr>
          </thead>

          <tbody>
            {applications.map((application) => (
              <tr key={application.id}>
                <td>{application.company}</td>
                <td>{application.position}</td>
                <td>{application.dateApplied}</td>
                <td>{application.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default App;
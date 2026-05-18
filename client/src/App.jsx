import { useEffect, useState } from "react";

const API =
  "https://goal-tracker-backend-5du5.onrender.com";

function App() {
  const [loggedIn, setLoggedIn] =
    useState(false);

  const [role, setRole] =
    useState("Employee");

  const [page, setPage] =
    useState("dashboard");

  const [goals, setGoals] = useState([]);

  const [goalTitle, setGoalTitle] =
    useState("");

  const [target, setTarget] =
    useState("");

  const [uom, setUom] = useState("");

  const [weightage, setWeightage] =
    useState("");

  const [status, setStatus] =
    useState("Pending");

  // FETCH GOALS
  useEffect(() => {
    fetch(`${API}/goals`)
      .then((res) => res.json())
      .then((data) => setGoals(data));
  }, []);

  // LOGIN
  const login = async () => {
    const response = await fetch(
      `${API}/login`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({ role }),
      }
    );

    const data = await response.json();

    if (data.success) {
      setLoggedIn(true);
    }
  };

  // LOGOUT
  const logout = () => {
    setLoggedIn(false);
  };

  // ADD GOAL
  const addGoal = async () => {
    if (
      !goalTitle ||
      !target ||
      !uom ||
      !weightage
    ) {
      alert("Fill all fields");
      return;
    }

    if (Number(weightage) < 10) {
      alert(
        "Minimum weightage is 10%"
      );
      return;
    }

    if (goals.length >= 8) {
      alert(
        "Maximum 8 goals allowed"
      );
      return;
    }

    const totalWeightage =
      goals.reduce(
        (sum, goal) =>
          sum +
          Number(
            goal.weightage.replace(
              "%",
              ""
            )
          ),
        0
      ) + Number(weightage);

    if (totalWeightage > 100) {
      alert(
        "Total weightage cannot exceed 100%"
      );
      return;
    }

    const newGoal = {
      title: goalTitle,
      target,
      uom,
      weightage: weightage + "%",
      status,
      achievement: "-",
    };

    const response = await fetch(
      `${API}/goals`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(newGoal),
      }
    );

    const data = await response.json();

    setGoals([...goals, data]);

    setGoalTitle("");
    setTarget("");
    setUom("");
    setWeightage("");
    setStatus("Pending");
  };

  // LOGIN PAGE
  if (!loggedIn) {
    return (
      <div style={styles.loginContainer}>
        <div style={styles.loginCard}>
          <h1>Goal Tracker Portal</h1>

          <input
            type="email"
            placeholder="Email"
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            style={styles.input}
          />

          <select
            style={styles.input}
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
          >
            <option>Employee</option>
            <option>Manager</option>
            <option>Admin</option>
          </select>

          <button
            style={styles.button}
            onClick={login}
          >
            Login
          </button>

          <p style={{ textAlign: "center" }}>
            Demo Credentials
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2>Goal Tracker</h2>

        <button
          style={styles.menuBtn}
          onClick={() =>
            setPage("dashboard")
          }
        >
          Dashboard
        </button>

        <button
          style={styles.menuBtn}
          onClick={() =>
            setPage("goals")
          }
        >
          Goals
        </button>

        <button
          style={styles.menuBtn}
          onClick={() =>
            setPage("checkins")
          }
        >
          Check-ins
        </button>

        <button
          style={styles.menuBtn}
          onClick={() =>
            setPage("reports")
          }
        >
          Reports
        </button>

        <button
          style={styles.logoutBtn}
          onClick={logout}
        >
          Logout
        </button>
      </div>

      {/* Main */}
      <div style={styles.main}>
        {page === "dashboard" && (
          <>
            <h1>{role} Dashboard</h1>

            <div
              style={styles.cardContainer}
            >
              <div style={styles.card}>
                <h2>{goals.length}</h2>
                <p>Total Goals</p>
              </div>

              <div style={styles.card}>
                <h2>Q1</h2>
                <p>Current Cycle</p>
              </div>

              <div style={styles.card}>
                <h2>78%</h2>
                <p>Performance</p>
              </div>

              {role ===
                "Manager" && (
                <div
                  style={styles.card}
                >
                  <h2>12</h2>
                  <p>
                    Pending Approvals
                  </p>
                </div>
              )}

              {role === "Admin" && (
                <div
                  style={styles.card}
                >
                  <h2>25</h2>
                  <p>
                    Total Employees
                  </p>
                </div>
              )}
            </div>
          </>
        )}

        {page === "goals" && (
          <>
            <h1>Goal Management</h1>

            <div style={styles.goalBox}>
              <input
                type="text"
                placeholder="Goal Title"
                style={styles.input}
                value={goalTitle}
                onChange={(e) =>
                  setGoalTitle(
                    e.target.value
                  )
                }
              />

              <input
                type="text"
                placeholder="Target"
                style={styles.input}
                value={target}
                onChange={(e) =>
                  setTarget(
                    e.target.value
                  )
                }
              />

              <select
                style={styles.input}
                value={uom}
                onChange={(e) =>
                  setUom(
                    e.target.value
                  )
                }
              >
                <option value="">
                  Select UoM
                </option>

                <option>Numeric</option>

                <option>
                  Percentage
                </option>

                <option>Timeline</option>

                <option>
                  Zero Based
                </option>
              </select>

              <input
                type="number"
                placeholder="Weightage %"
                style={styles.input}
                value={weightage}
                onChange={(e) =>
                  setWeightage(
                    e.target.value
                  )
                }
              />

              <select
                style={styles.input}
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value
                  )
                }
              >
                <option>Pending</option>
                <option>
                  On Track
                </option>
                <option>
                  Completed
                </option>
              </select>

              <button
                style={styles.button}
                onClick={addGoal}
              >
                Add Goal
              </button>
            </div>

            <div style={styles.tableBox}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>
                      Goal
                    </th>

                    <th style={styles.th}>
                      Target
                    </th>

                    <th style={styles.th}>
                      UoM
                    </th>

                    <th style={styles.th}>
                      Weightage
                    </th>

                    <th style={styles.th}>
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {goals.map((goal) => (
                    <tr key={goal.id}>
                      <td style={styles.td}>
                        {goal.title}
                      </td>

                      <td style={styles.td}>
                        {goal.target}
                      </td>

                      <td style={styles.td}>
                        {goal.uom}
                      </td>

                      <td style={styles.td}>
                        {goal.weightage}
                      </td>

                      <td style={styles.td}>
                        {goal.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {page === "checkins" && (
          <>
            <h1>
              Quarterly Check-ins
            </h1>

            <div style={styles.tableBox}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>
                      Goal
                    </th>

                    <th style={styles.th}>
                      Planned
                    </th>

                    <th style={styles.th}>
                      Achievement
                    </th>

                    <th style={styles.th}>
                      Manager Comment
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {goals.map((goal) => (
                    <tr key={goal.id}>
                      <td style={styles.td}>
                        {goal.title}
                      </td>

                      <td style={styles.td}>
                        {goal.target}
                      </td>

                      <td style={styles.td}>
                        {goal.achievement}
                      </td>

                      <td style={styles.td}>
                        Good Progress
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {page === "reports" && (
          <>
            <h1>Reports</h1>

            <div
              style={styles.cardContainer}
            >
              <div style={styles.card}>
                <h2>25</h2>
                <p>Total Employees</p>
              </div>

              <div style={styles.card}>
                <h2>18</h2>
                <p>Goals Completed</p>
              </div>

              <div style={styles.card}>
                <h2>7</h2>
                <p>Pending Reviews</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  loginContainer: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
  },

  loginCard: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "12px",
    width: "350px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    boxShadow:
      "0 0 10px rgba(0,0,0,0.1)",
  },

  page: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Arial",
  },

  sidebar: {
    width: "240px",
    backgroundColor: "#7c3aed",
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    color: "white",
  },

  menuBtn: {
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  logoutBtn: {
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    backgroundColor: "#ef4444",
    color: "white",
    marginTop: "20px",
  },

  main: {
    flex: 1,
    padding: "40px",
    backgroundColor: "#f3f4f6",
  },

  cardContainer: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },

  card: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "12px",
    minWidth: "180px",
    boxShadow:
      "0 0 10px rgba(0,0,0,0.1)",
  },

  goalBox: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "700px",
    boxShadow:
      "0 0 10px rgba(0,0,0,0.1)",
  },

  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid gray",
  },

  button: {
    padding: "12px",
    backgroundColor: "#7c3aed",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  tableBox: {
    marginTop: "30px",
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow:
      "0 0 10px rgba(0,0,0,0.1)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    border: "1px solid #ddd",
    padding: "12px",
    backgroundColor: "#ede9fe",
  },

  td: {
    border: "1px solid #ddd",
    padding: "12px",
    textAlign: "center",
  },
};

export default App;
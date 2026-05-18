const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

let goals = [
  {
    id: 1,
    title: "Increase Sales",
    target: "₹10 Lakh",
    uom: "Numeric",
    weightage: "40%",
    status: "On Track",
    achievement: "₹7 Lakh",
  },
];

// ROOT ROUTE
app.get("/", (req, res) => {
  res.send("Goal Tracker Backend Running");
});

// LOGIN
app.post("/login", (req, res) => {
  const { role } = req.body;

  res.json({
    success: true,
    role,
  });
});

// GET GOALS
app.get("/goals", (req, res) => {
  res.json(goals);
});

// ADD GOAL
app.post("/goals", (req, res) => {
  const newGoal = {
    id: goals.length + 1,
    ...req.body,
  };

  goals.push(newGoal);

  res.json(newGoal);
});

// REPORTS
app.get("/reports", (req, res) => {
  res.json({
    employees: 25,
    completed: 18,
    pending: 7,
  });
});

// CHECK-IN COMMENTS
app.post("/checkin", (req, res) => {
  const { comment } = req.body;

  res.json({
    success: true,
    message: "Check-in submitted",
    comment,
  });
});

// START SERVER
app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});
import React, { useState } from 'react';
import './DashBoardBottom.scss'
import {ImClock} from 'react-icons/im'
import {GiPathDistance} from 'react-icons/gi'
import {GrTrophy} from 'react-icons/gr'

function DashBoardBottom() {
  // State for duration, distance, and goal
  const [duration, setDuration] = useState('0.00');
  const [distance, setDistance] = useState('0');
  const [goal, setGoal] = useState('0');

  // State for activity tracking
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState({ name: '', duration: '', date: '' });

  // State for goal tracking
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({ activityName: '', deadline: '' });
  const [goalStatus, setGoalStatus] = useState('unset'); // 'unset', 'inProgress', 'done'

  // Function to create a new activity
  const handleCreateActivity = () => {
    setActivities([...activities, newActivity]);
    setNewActivity({ name: '', duration: '', date: '' });
  };

  // Function to create a new goal
  const handleCreateGoal = () => {
    setGoals([...goals, newGoal]);
    setNewGoal({ activityName: '', deadline: '' });
  };

  // Function to give up on a goal
  const handleGiveUp = () => {
    setGoalStatus('Fail');
  };

  // Function to mark a goal as done
  const handleDone = () => {
    setGoalStatus('Success');
  };

  return (
    <div className="dashboard-bottom">
      {/* Top row: Display duration, distance, and goal */}
      <div className="top-row">
        <div className="duration">
          <ImClock />
          <h3>Duration</h3>
          <h4>{duration} Hr</h4> 
        </div>
        <div className="distance">
          <GiPathDistance />
          <h3>Distance</h3>
          <h4>{distance}</h4>
        </div>
        <div className="goal">
          <GrTrophy />
          <h3>Goal</h3>
          <h4>{goal}</h4>
        </div>
      </div>

      {/* Activity tracking section */}
      <div className="activity-tracking">
        <h2>Activity Tracking</h2>
        <div className="activity-list">
          {activities.map((activity, index) => (
            <div key={index} className="activity-card">
              <div>Activity Name: {activity.name}</div>
              <div>Duration: {activity.duration}</div>
              <div>Date: {activity.date}</div>
            </div>
          ))}
        </div>
        <div className="create-activity">
          <input
            type="text"
            placeholder="Activity Name"
            value={newActivity.name}
            onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Duration"
            value={newActivity.duration}
            onChange={(e) => setNewActivity({ ...newActivity, duration: e.target.value })}
          />
          <input
            type="text"
            placeholder="Date"
            value={newActivity.date}
            onChange={(e) => setNewActivity({ ...newActivity, date: e.target.value })}
          />
          <button onClick={handleCreateActivity}>Create Activity</button>
        </div>
      </div>

      {/* Goal tracking section */}
      <div className="goal-tracking">
        <h2>Goal Tracking</h2>
        <div className="create-goal">
          <input
            type="text"
            placeholder="Activity Name"
            value={newGoal.activityName}
            onChange={(e) => setNewGoal({ ...newGoal, activityName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Deadline"
            value={newGoal.deadline}
            onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
          />
          <button onClick={handleCreateGoal}>Create Goal</button>
        </div>
        <div className="goal-list">
          {goals.map((goal, index) => (
            <div key={index} className="goal-card">
              <div>Activity Name: {goal.activityName}</div>
              <div>Deadline: {goal.deadline}</div>
              <div>
                <button onClick={handleGiveUp}>Give Up</button>
                <button onClick={handleDone}>Done</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashBoardBottom;

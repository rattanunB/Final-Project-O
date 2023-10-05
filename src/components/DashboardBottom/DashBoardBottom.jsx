import React, { useEffect, useState } from "react";
import "./DashBoardBottom.scss";
import { ImClock } from "react-icons/im";
import { GiPathDistance } from "react-icons/gi";
import { GoTrophy } from "react-icons/go";

import { BiRun } from "react-icons/bi";
import { TbYoga } from "react-icons/tb";
import { IoMdBicycle } from "react-icons/io";
import { GiWeightLiftingUp } from "react-icons/gi";

function DashBoardBottom() {
  // State for duration, distance, and goal
  const [duration, setDuration] = useState("0.00");
  const [distance, setDistance] = useState("0");
  const [goal, setGoal] = useState("0");
  const [myGoal, setMyGoal] = useState([
    {
      id: 1,
      activityName: "run",
      deadLine: "2023-10-05",
      giveUp: false,
      done: false,
    },
    {
      id: 2,
      activityName: "bicycle",
      deadLine: "2023-10-06",
      giveUp: false,
      done: false,
    },
    {
      id: 3,
      activityName: "yoga",
      deadLine: "2023-10-06",
      giveUp: false,
      done: false,
    },
  ]);

  const handleDoneClick = (goalId) => {
    const updatedGoals = myGoal.map((goal) => {
      if (goal.id === goalId) {
        console.log(`goal ${goal.id}  สำเร็จ`);
        return { ...goal, done: true };
      }
      return goal;
    });

    setMyGoal(updatedGoals);
  };

  const handleGiveUpClick = (goalId) => {
    const updatedGoals = myGoal.map((goal) => {
      if (goal.id === goalId) {
        console.log(`goal ${goal.id}  ล้มเหลว`);
        return { ...goal, giveUp: true };
      }
      return goal;
    });

    setMyGoal(updatedGoals);
  };

  let myActivity = [
    {
      id: 1,
      activityName: "run",
      duration: 30,
      date: "2023-10-05",
    },
    {
      id: 2,
      activityName: "bicycle",
      duration: 45,
      date: "2023-10-06",
    },
    {
      id: 3,
      activityName: "yoga",
      duration: 60,
      date: "2023-10-07",
    },
  ];

    // Calculate total duration from myActivity and set it when myActivity changes
    useEffect(() => {
      const totalDuration = myActivity.reduce((acc, activity) => acc + activity.duration, 0);
      setDuration(totalDuration.toFixed(2));
    }, [myActivity]);

  return (
    <div className="dashboard-bottom">
      <div className="top-row">
        <div className="duration total-status">
          <div className="icon">
            <ImClock />
          </div>
          <span className="status-title">Duration</span>
          <span className="status-amount">{duration} Hr</span>
        </div>
        <div className="distance total-status">
          <div className="icon">
            <GiPathDistance />
          </div>
          <span className="status-title">Distance</span>
          <span className="status-amount">{distance}</span>
        </div>
        <div className="goal total-status">
          <div className="icon">
            <GoTrophy />
          </div>
          <span className="status-title">Goal</span>
          <span className="status-amount">{goal}</span>
        </div>
      </div>

      <div className="bottom-row">
        {/* Activity tracking section */}
        <div className="activity-tracking">
          <span className="activity-head">Activity Tracking</span>
          <div className="activity-warp">
            {myActivity.map((activity) => (
              <div className="activity-card" key={activity.id}>
                <div className="activity-card-icon">
                  {activity.activityName === "run" && <BiRun />}
                  {activity.activityName === "bicycle" && <IoMdBicycle />}
                  {activity.activityName === "yoga" && <TbYoga />}
                  {activity.activityName === "weight" && <GiWeightLiftingUp />}
                </div>
                <div className="activity-card-detail">
                  <span>Activity name: {activity.activityName}</span>
                  <span>Duration: {activity.duration}</span>
                  <span>Date: {activity.date}</span>
                </div>
              </div>
            ))}
            <button className="btn-create-activity">Create Activity</button>
          </div>
        </div>

        {/* Goal tracking section */}
        <div className="goal-tracking">
          <span className="goal-head">Goal Tracking</span>
          <div className="goal-warp">
            {myGoal.map((goal) => (
              <div className="goal-card" key={goal.id}>
                <div className="goal-card-icon">
                  {goal.activityName === "run" && <BiRun />}
                  {goal.activityName === "bicycle" && <IoMdBicycle />}
                  {goal.activityName === "yoga" && <TbYoga />}
                  {/* เพิ่มไอคอนสำหรับกิจกรรมอื่น ๆ ตามที่คุณต้องการ */}
                </div>
                <div className="goal-card-detail">
                  <span>Activity name: {goal.activityName}</span>
                  <span>Deadline: {goal.deadLine}</span>

                  <div className="btn-warp">
                    {goal.done ? (
                      <span className="status-success">Success</span>
                    ) : (
                      <>
                        {goal.giveUp ? (
                          <span className="status-fail">Fail</span>
                        ) : (
                          <>
                            <button
                              className="btn-giveup"
                              onClick={() => handleGiveUpClick(goal.id)}
                            >
                              Give up
                            </button>
                            <button
                              className="btn-done"
                              onClick={() => handleDoneClick(goal.id)}
                            >
                              Done
                            </button>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <button className="btn-create-activity">Create Goal</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoardBottom;

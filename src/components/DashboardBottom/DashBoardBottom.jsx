import React, { useEffect, useState } from "react";
import "./DashBoardBottom.scss";
import { ImClock } from "react-icons/im";
import { GiPathDistance } from "react-icons/gi";
import { GoTrophy } from "react-icons/go";
import { BiRun } from "react-icons/bi";
import { TbYoga } from "react-icons/tb";
import { IoMdBicycle } from "react-icons/io";
import { GiWeightLiftingUp } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

function DashBoardBottom() {
  const [duration, setDuration] = useState("0.00");
  const [distance, setDistance] = useState("0");
  const [goal, setGoal] = useState("0");
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateActivities, setUpdateActivities] = useState(true)
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
    const [activities, setActivities] = useState([]);

  useEffect(() => {
    // สร้างฟังก์ชันเพื่อดึงข้อมูลกิจกรรม
    const fetchActivities = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken')
        const option = {
          headers: {
            authorization: `Bearer ${accessToken}`
          }
        }
        const response = await axios.get('http://localhost:8100/activity',option);
        console.log('response..', response)
        if (response.status === 200) {
          const activitiesData = response.data; // ข้อมูลกิจกรรมทั้งหมด
          setActivities(activitiesData); // เก็บข้อมูลใน state
        }
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูลกิจกรรม', error);
      }
    };

    // เรียกใช้งานฟังก์ชันเพื่อดึงข้อมูลเมื่อคอมโพเนนต์ถูกโหลด
    fetchActivities();
  }, [updateActivities]);

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

  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    setIsModalOpen(true);
    console.log(isModalOpen)
  };

  const handleDeleteClick = async () => {
    const accessToken = localStorage.getItem('accessToken');
    console.log(accessToken)
    const option = {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    }
    if (selectedActivity) {
      const objectId = selectedActivity._id;
      setIsModalOpen(false); // ปิดโมเดลหลังจากลบ
      console.log(`Delete OBJ ${objectId}`);
      try {
        const response = await axios.delete(`http://localhost:8100/activity/${objectId}`, option);
        setUpdateActivities((prevState) => !prevState)
        if (response.status === 200) {
          console.log(`Activity with ID ${objectId} deleted successfully`);
        }
      } catch (error) {
        console.error(`Failed to delete activity with ID ${objectId}`, error);
      }
    }
  };
  
  const handleEditClick = () =>{
    console.log("Clicl Edit!!")
  }

    // Calculate total duration from activities and set it when activities changes
    useEffect(() => {
      const totalDuration = activities.reduce((acc, activity) => acc + activity.duration, 0);
      setDuration(totalDuration.toFixed(2));
    }, [activities]);

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
            {activities.map((activity) => (
              <div className="activity-card" key={activity._id} onClick={() => handleActivityClick(activity)}>
                <div className="activity-card-icon">
                  {activity.activityType === "run" && <BiRun />}
                  {activity.activityType === "bicycle" && <IoMdBicycle />}
                  {activity.activityType === "yoga" && <TbYoga />}
                  {activity.activityType === "weight" && <GiWeightLiftingUp />}
                  {activity.activityType === 'abs' && <div style={{fontSize:"24px", fontWeight:"bold"}}>ABS</div>}
                </div>
                <div className="activity-card-detail">
                  <span>Activity name: {activity.activityName}</span>
                  <span>Duration: {activity.duration}</span>
                  <span>Date: {new Date(activity.date).toLocaleDateString("en-US").replace(/\//g, '-')}</span>
                </div>
              </div>
            ))}
            <a href="/createactivity" className="btn-create"><span>Create Activity</span></a>
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
            <a href="/creategoal" className="btn-create"><span>Create Goal</span></a>
          </div>
        </div>
        {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button
              className="close-button"
              onClick={() => setIsModalOpen(false)}
            >
              <AiOutlineClose />
            </button>
            <div className="modal-detail-box">
              <span className="modal-detail-title">Activity Name</span>
              <span className="modal-detail-text">{selectedActivity.activityName}</span>
            </div>
            <div className="modal-detail-box">
              <span className="modal-detail-title">Activity Description</span>
              <span className="modal-detail-text">{selectedActivity.activityDescription}</span>
            </div>
            <div className="modal-detail-box">
              <span className="modal-detail-title">Duration</span>
              <span className="modal-detail-text">{selectedActivity.duration}</span>
            </div>
            {selectedActivity.distance && (
          <div className="modal-detail-box">
            <span className="modal-detail-title">Distance</span>
            <span className="modal-detail-text">{selectedActivity.distance}</span>
          </div>
        )}
            <div className="action-buttons">
              <button className="edit-button" onClick={() => handleEditClick()}>Edit</button>
              <button className="delete-button" onClick={() => handleDeleteClick()}>Delete</button>
            </div>
          </div>
        </div>
      )}
      </div>
      
    </div>
  );
}

export default DashBoardBottom;

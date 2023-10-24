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
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("0");
  const [distance, setDistance] = useState("0");
  const [goal, setGoal] = useState("0");
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateActivities, setUpdateActivities] = useState(true)
  const [editActivity, setEditActivity] = useState(false)
  const [myGoal, setMyGoal] = useState([]);
  const [activities, setActivities] = useState([]);
  const [activitiesChanged, setActivitiesChanged] = useState(false);
  const [myGoalChanged, setMyGoalChanged] = useState(false);
  const [timeChanged, setTimeChanged] = useState(false);
  const [activityName, setActivityName] = useState('');
  const [activityDescription, setActivityDescription] = useState('');
  const [activityDuration, setActivityDuration] = useState('');
  const [activityDistance, setActivityDistance] = useState('');

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
      if (response.status === 200) {
        const activitiesData = response.data; // ข้อมูลกิจกรรมทั้งหมด
        setActivities(activitiesData); // เก็บข้อมูลใน state
        setActivitiesChanged(true); // ตั้งค่าให้มีการเปลี่ยนแปลงใน activities

      }
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการดึงข้อมูลกิจกรรม', error);
    }
  };

  // Create function to get goal data
  const fetchGoals = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      const option = {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      }
      const response = await axios.get('http://localhost:8100/goal',option);
      if (response.status === 200) {
        const goalsData = response.data; // ข้อมูลกิจกรรมทั้งหมด
        setMyGoal(goalsData); // เก็บข้อมูลใน state
        setMyGoalChanged(true); // ตั้งค่าให้มีการเปลี่ยนแปลงใน myGoal

      }
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการดึงข้อมูล Goals', error);
    }
  }

  useEffect(() => {
    // เรียกใช้งานฟังก์ชันเพื่อดึงข้อมูลเมื่อคอมโพเนนต์ถูกโหลด
    fetchActivities();
    fetchGoals();
  }, [activitiesChanged, myGoalChanged]);

  const updateStatus = async (goalItem) => {
    const accessToken = localStorage.getItem('accessToken')
    const option = {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    }
    const res = await axios.put(`http://localhost:8100/goal/${goalItem._id}`, goalItem, option)
    fetchGoals();
    setTimeChanged(true);
  }

  const handleDoneClick = (goal) => {
    goal.status = 'true'
    updateStatus(goal)
  };

  const handleGiveUpClick = (goal) => {
    goal.status = 'false'
    updateStatus(goal)
  };

  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async () => {
    const accessToken = localStorage.getItem('accessToken');
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
    setEditActivity(true)
    setActivityName(selectedActivity.activityName)
    setActivityDescription(selectedActivity.description)
    setActivityDuration(selectedActivity.duration)
    setActivityDistance(selectedActivity.distance)
  }

  const handleSave = async () => {
    const accessToken = localStorage.getItem('accessToken')
    const option = {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    }
    const param = selectedActivity._id
    try {
      const data = { activityName, description: activityDescription, duration: activityDuration, distance: activityDistance }
      await axios.put(`http://localhost:8100/activity/${param}`, data, option);
      setEditActivity(false)
      setIsModalOpen(false)
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการดึงข้อมูลกิจกรรม', error);
    }
  }

  const calculateTime = () => {
    let activityDuration = activities.reduce((acc, activity) => acc + (activity.duration), 0);
    // console.log(activityDuration)
    const findGoalSuccess = myGoal.filter((item) => item.status === 'true');
    let goalDuration = findGoalSuccess.reduce((acc, item) => acc + (item.duration), 0);
    let sumDuration = activityDuration + goalDuration;
    let hours = Math.floor(sumDuration / 60);
    let mins = sumDuration - (hours * 60);
    setHours(hours);
    setMinutes(mins);
  }

  const calculateDistance = () => {
    let activityDistance = activities.reduce((acc, activity) => acc + (activity.distance), 0);
    const findGoalSuccess = myGoal.filter((item) => item.status === 'true');
    let goalDistance = findGoalSuccess.reduce((acc, item) => acc + (item.distance), 0);
    let sumDistance = (activityDistance + goalDistance)/1000;
    setDistance(sumDistance);
  }

  const calculateGoalSuccess = () => {
    const findGoalSuccess = myGoal.filter((item) => item.status === 'true');
    const sumGoalSuccess = findGoalSuccess.length
    setGoal(sumGoalSuccess)
  }

  // Calculate total duration from activities and set it when activities changes
  useEffect(() => {
    if (activitiesChanged || myGoalChanged) {
      calculateTime();
      calculateDistance();
      calculateGoalSuccess();
    }
  }, [activitiesChanged, myGoalChanged, timeChanged]);

  return (
    <div className="dashboard-bottom">
      <div className="top-row">
        <div className="duration total-status">
          <div className="icon">
            <ImClock />
          </div>
          <span className="status-title">Duration</span>
          <span className="status-amount">{hours} Hr {minutes} Min</span>
        </div>
        <div className="distance total-status">
          <div className="icon">
            <GiPathDistance />
          </div>
          <span className="status-title">Distance</span>
          <span className="status-amount">{distance} Km</span>
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
          <div className="goal-warp" >
            {myGoal.map((goal) => (
              <div className="goal-card" key={goal._id}>
                <div className="goal-card-icon">
                  {goal.activityType === "run" && <BiRun />}
                  {goal.activityType === "bicycle" && <IoMdBicycle />}
                  {goal.activityType === "yoga" && <TbYoga />}
                  {goal.activityType === 'abs' && <div style={{fontSize:"24px", fontWeight:"bold"}}>ABS</div>}
                  {goal.activityType === "weight" && <GiWeightLiftingUp />}
                </div>
                <div className="goal-card-detail">
                  <span>Activity name: {goal.activityName}</span>
                  <span>Deadline: {new Date(goal.deadline).toLocaleDateString("en-US").replace(/\//g, '-')}</span>

                  {/* <div className="btn-warp">
                    {goal.status === 'true' ? (
                      <span className="status-success">Success</span>
                    ) : (
                      <>
                        {goal.status === 'false'? (
                          <span className="status-fail">Fail</span>
                        ) : (
                          <>
                            <button
                              className="btn-giveup"
                              onClick={() => handleGiveUpClick(goal)}
                            >
                              Give up
                            </button>
                            <button
                              className="btn-done"
                              onClick={() => handleDoneClick(goal)}
                            >
                              Done
                            </button>
                          </>
                        )}
                      </>
                    )}
                  </div> */}
                  <div className="btn-warp">
                    {
                      goal.status === 'null' ? 
                      <>
                        <button
                          className="btn-giveup"
                          onClick={() => handleGiveUpClick(goal)}
                        >
                          Give up
                        </button>
                        <button
                          className="btn-done"
                          onClick={() => handleDoneClick(goal)}
                        >
                          Done
                        </button>
                      </> : null
                    }
                    {
                      goal.status === 'true' ? 
                      <span className="status-success">Success</span> : null
                    }
                    {
                      goal.status === 'false' ?
                      <span className="status-fail">Fail</span> : null
                    }
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
              onClick={() => {
                setIsModalOpen(false)
                setEditActivity(false)
                }}
            >
              <AiOutlineClose />
            </button>
            <div className="modal-detail-box">
              <span className="modal-detail-title">Activity Name</span>
              {
                editActivity ? <input className="modal-detail-text" onChange={(e) => setActivityName(e.target.value)} value={activityName}/> 
                : <span className="modal-detail-text">{selectedActivity.activityName}</span>
              }
            </div>
            <div className="modal-detail-box">
              <span className="modal-detail-title">Activity Description</span>
              {
                editActivity ? <input className="modal-detail-text" onChange={(e) => setActivityDescription(e.target.value)} value={activityDescription}/> 
                : <span className="modal-detail-text">{selectedActivity.description}</span>
              }
            </div>
            <div className="modal-detail-box">
              <span className="modal-detail-title">Duration</span>
              {
                editActivity ? <input className="modal-detail-text" onChange={(e) => setActivityDuration(e.target.value)} value={activityDuration}/> 
                : <span className="modal-detail-text">{selectedActivity.duration}</span>
              }
            </div>
            {selectedActivity.distance && (
            <div className="modal-detail-box">
              <span className="modal-detail-title">Distance</span>
                {
                  editActivity ? <input className="modal-detail-text" onChange={(e) => setActivityDistance(e.target.value)} value={activityDistance}/> 
                  : <span className="modal-detail-text">{selectedActivity.distance}</span>
                }
            </div>
        )}
            <div className="action-buttons">
            {
              editActivity ? <button className="edit-button" onClick={() => handleSave()}>Save</button>
              :<button className="edit-button" onClick={() => handleEditClick()}>Edit</button>
            }
              
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

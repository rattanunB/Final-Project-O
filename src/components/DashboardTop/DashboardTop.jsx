import React, { useEffect, useState } from "react";
import "./DashboardTop.scss";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Bar } from 'react-chartjs-2';
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

ChartJS.register(
  BarElement, CategoryScale, LinearScale, Tooltip, Legend
)

const DashboardTop = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalEdit, setModalEdit] = useState(false)
  const [user, setUser] = useState({});
  const [ firstname, setFirstname ] = useState('')
  const [ lastname, setLastname ] = useState('');
  const [ height, setHeight ] = useState('');
  const [ weight, setWeight ] = useState('');
  const [ age, setAge ] = useState('');
  const [ activities, setActivities ] = useState([]);
  const [ activitiesChange, setActivitiesChanged ] = useState(false);
  const [graph, setGraph] = useState([]);

  const handleProfileClick = () => {
    setIsModalOpen(true)
  }

  const fetchActivities = async () => {
    const accessToken = localStorage.getItem('accessToken')
    const option = {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    }
    const response = await axios.get('http://localhost:8100/activity', option)
    setActivities(response.data)
    setActivitiesChanged(true)
  }

  const sumActivityDuration = () => {
    const findTypeRun = activities.filter(e => e.activityType === 'run')
    const findTypeYoga = activities.filter(e => e.activityType === 'yoga')
    const findTypeBicycle = activities.filter(e => e.activityType === 'bicycle')
    const findTypeWeight = activities.filter(e => e.activityType === 'weight')
    const findTypeAbs = activities.filter(e => e.activityType === 'abs')

    const runDuration = findTypeRun.reduce((acc, item) => acc + item.duration, 0)
    const yogaDuration = findTypeYoga.reduce((acc, item) => acc + item.duration, 0)
    const bicycleDuration = findTypeBicycle.reduce((acc, item) => acc + item.duration, 0)
    const weightDuration = findTypeWeight.reduce((acc, item) => acc + item.duration, 0)
    const absDuration = findTypeAbs.reduce((acc, item) => acc + item.duration, 0)
    const data = [ runDuration, yogaDuration, bicycleDuration, weightDuration, absDuration ]
    setGraph(data)
  }

  const data = {
    labels: ['Run', 'Yoga', 'Bike', 'Weight', 'ABS'],
    datasets: [
      {
        label: "กราฟแสดงเวลาของกิจกรรมทั้งหมด",
        data: [graph[0], graph[1], graph[2], graph[3], graph[4]],
        backgroundColor: [
          'rgba(75, 192, 192, 1)', // สีแต่งพื้นหลังแต่ละแท่ง
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)', // สีเส้นขอบแต่ละแท่ง
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const options = {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 16, // ขนาดของ label "กิจกรรมทางการเรียน"
            weight: 'normal',
          },
        },
      },
    },
    scales: { // ขนาดของ label ในแกน  y และ x
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: 18, 
            weight: 'normal',
          },
        },
      },
    },
  };

  const fetchUser = async () => {
    const accessToken = localStorage.getItem('accessToken')
    const option = {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    }
    try {
      const response = await axios.get('http://localhost:8100/profile',option);
      if (response.status === 200) {
        const user = response.data;
        setUser(user)
      }
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการดึงข้อมูลกิจกรรม', error);
    }
  };

  const updateProfile = async () => {
    const accessToken = localStorage.getItem('accessToken')
    const option = {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    }
    try {
      const data = { firstname, lastname, height, weight, age }
      await axios.put('http://localhost:8100/profile', data, option);
      setModalEdit(false)
      setIsModalOpen(false)
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการดึงข้อมูลกิจกรรม', error);
    }
  }

  const handleEditClick = () => {
    setModalEdit(true)
    setFirstname(user.firstname)
    setLastname(user.lastname)
    setHeight(user.height)
    setWeight(user.weight)
    setAge(user.age)
  }

  useEffect(() => {
    fetchUser()
    fetchActivities()
  },[modalEdit])

  useEffect(() => {
    activitiesChange && (
      sumActivityDuration()
    )
  },[activitiesChange])

  return (
    <div className="dashboard-top-container">
      <div className="top-row">
      <button onClick={() => handleProfileClick()}>
        <div className="user-info-left">
          <img
            src="https://images.pexels.com/photos/878846/pexels-photo-878846.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt=""
          />
          <div className="user-name">{user.firstname} {user.lastname}</div>
        </div>
      </button>
        <div className="user-info-right">
          <div className="user-info-childbox">
            <span>Height</span>
            <span>{user.height} CM</span>
          </div>
          <div className="user-info-childbox">
            <span>Weight</span>
            <span>{user.weight} KG</span>
          </div>
          <div className="user-info-childbox">
            <span>Age</span>
            <span>{user.age}</span>
          </div>
        </div>
      </div>
      <div className="bottom-row">
      <Bar data={data} options={options} />
      </div>
      {
        isModalOpen && (
          <div className="modal">
          <div className="modal-content">
            <button
              className="close-button"
              onClick={() => {
                setIsModalOpen(false)
                setModalEdit(false)
                }}
            >
              <AiOutlineClose />
            </button>
            <div className="modal-detail-box">
              <span className="modal-detail-title">Firstname</span>
              {
                modalEdit ? <input className="modal-detail-text" value={firstname} onChange={(e) => setFirstname(e.target.value)}/> 
                : <span className="modal-detail-text">{user.firstname}</span>
              }
            </div>
            <div className="modal-detail-box">
              <span className="modal-detail-title">Lastname</span>
              {
                modalEdit ? <input className="modal-detail-text" value={lastname} onChange={(e) => setLastname(e.target.value)}/> 
                : <span className="modal-detail-text">{user.lastname}</span>
              }
            </div>
            <div className="modal-detail-box">
              <span className="modal-detail-title">Height</span>
              {
                modalEdit ? <input className="modal-detail-text" value={height} onChange={(e) => setHeight(e.target.value)}/> 
                : <span className="modal-detail-text">{user.height}</span>
              }
            </div>
            <div className="modal-detail-box">
              <span className="modal-detail-title">Weight</span>
              {
                modalEdit ? <input className="modal-detail-text" value={weight} onChange={(e) => setWeight(e.target.value)}/> 
                : <span className="modal-detail-text">{user.weight}</span>
              }
            </div>
            <div className="modal-detail-box">
              <span className="modal-detail-title">Age</span>
              {
                modalEdit ? <input className="modal-detail-text" value={age} onChange={(e) => setAge(e.target.value)}/> 
                : <span className="modal-detail-text">{user.age}</span>
              }
            </div>
            <div className="action-buttons">
            {
              modalEdit ? 
              <button className="edit-button" onClick={() => updateProfile()}>Save</button>
              : <button className="edit-button" onClick={() => handleEditClick()}>Edit</button>
            }
            </div>
          </div>
        </div>
        )
      }
    </div>
  );
};

export default DashboardTop;

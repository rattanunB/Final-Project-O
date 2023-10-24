import React, { useEffect, useState } from "react";
import "./DashboardTop.scss";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Bar } from 'react-chartjs-2';
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

ChartJS.register(
  BarElement, CategoryScale, LinearScale, Tooltip, Legend
)

const DashboardTop = ({render, setRender}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalEdit, setModalEdit] = useState(false)
  const [user, setUser] = useState({});
  const [ firstname, setFirstname ] = useState('')
  const [ lastname, setLastname ] = useState('');
  const [ height, setHeight ] = useState('');
  const [ weight, setWeight ] = useState('');
  const [ age, setAge ] = useState('');
  const [ activities, setActivities ] = useState([]);
  const [ goals, setGoals ] = useState([]);
  const [ activitiesChange, setActivitiesChanged ] = useState(false);
  const [ goalChange, setGoalChange ] = useState(false)
  const [ graph, setGraph ] = useState([]);
  const [ totalActivitiesDuration, setTotalActivitiesDuration ] = useState({run: 0, yoga: 0, bicycle: 0, weight: 0, abs: 0})
  const [ totalGoalsDuration, setTotalGoalsDuration ] = useState({run: 0, yoga: 0, bicycle: 0, weight: 0, abs: 0})

  
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
    setRender(false)
  }

  const fetchGoals = async () => {
    const accessToken = localStorage.getItem('accessToken')
    const option = {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    }
    const response = await axios.get('http://localhost:8100/goal', option)
    setGoals(response.data)
    setGoalChange(true)
    setRender(false)
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

    const findGoalTypeRun = goals.filter(e => e.activityType === 'run' && e.status === "true")
    const findGoalTypeYoga = goals.filter(e => e.activityType === 'yoga' && e.status === "true")
    const findGoalTypeBicycle = goals.filter(e => e.activityType === 'bicycle' && e.status === "true")
    const findGoalTypeWeight = goals.filter(e => e.activityType === 'weight' && e.status === "true")
    const findGoalTypeAbs = goals.filter(e => e.activityType === 'abs' && e.status === "true")

    const goalRunDuration = findGoalTypeRun.reduce((acc, item) => acc + item.duration, 0)
    const goalYogaDuration = findGoalTypeYoga.reduce((acc, item) => acc + item.duration, 0)
    const goalBicycleDuration = findGoalTypeBicycle.reduce((acc, item) => acc + item.duration, 0)
    const goalWeightDuration = findGoalTypeWeight.reduce((acc, item) => acc + item.duration, 0)
    const goalAbsDuration = findGoalTypeAbs.reduce((acc, item) => acc + item.duration, 0)

    const sumRun = goalRunDuration + runDuration
    const sumYoga = goalYogaDuration + yogaDuration
    const sumBicycle = goalBicycleDuration + bicycleDuration
    const sumWeight = goalWeightDuration + weightDuration
    const sumAbs = goalAbsDuration + absDuration
    
    const data = [ sumRun, sumYoga, sumBicycle, sumWeight, sumAbs ]
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
    fetchGoals()
  },[modalEdit])

  useEffect(() => {
    activitiesChange && (
      sumActivityDuration()
    )
    goalChange && (
      sumActivityDuration()
    )
  },[activitiesChange, goalChange])

  useEffect(() => {
    if(render){
      fetchActivities();
      fetchGoals();
      setActivitiesChanged(false)
      setGoalChange(false)
    }
  },[render])

  return (
    <div className="dashboard-top-container">
      <div className="top-row">
      <button onClick={() => handleProfileClick()}>
        <div className="user-info-left">
          {
            user.gender === 'Female' ?           
            <img
              src="https://img.freepik.com/free-vector/beautiful-young-woman-hand-drawn-cartoon-art-illustration_56104-1088.jpg?w=826&t=st=1698121279~exp=1698121879~hmac=a4fcd34389b7459bf00388e349f141b87f29bff8265a99155ec0c2e9e7195788"
              alt=""
            /> 
            :
            <img
              src="https://img.freepik.com/free-vector/happy-young-man-icon-isolated_24911-109621.jpg?w=740&t=st=1698121411~exp=1698122011~hmac=fc596b6318ad8acd62eb1b7a4d7e74ced08dcedc7c0ccd615678b451523814f6"
              alt=""
            />
          }
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

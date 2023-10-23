import React, { useEffect, useState } from "react";
import "./DashboardTop.scss";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Bar } from 'react-chartjs-2';
import { AiOutlineClose } from "react-icons/ai";

ChartJS.register(
  BarElement, CategoryScale, LinearScale, Tooltip, Legend
)

const DashboardTop = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleProfileClick = () => {
    console.log('MOSS')
    setIsModalOpen(true)
  }

  const data = {
    labels: ['Run', 'Yoga', 'Bike', 'Weight', 'ABS'],
    datasets: [
      {
        label: "กราฟแสดงเวลาของกิจกรรมทั้งหมด",
        data: [360, 240, 320, 300, 360],
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

  // const fetchUser = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:8100/signup');
  //     if (response.status === 200) {
  //       const user = response.data;
  //       console.log(user)
  //     }
  //   } catch (error) {
  //     console.error('เกิดข้อผิดพลาดในการดึงข้อมูลกิจกรรม', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchUser()
  // },[])

  return (
    <div className="dashboard-top-container">
      <div className="top-row">
      <button onClick={() => handleProfileClick()}>
        <div className="user-info-left">
            <img
              src="https://images.pexels.com/photos/878846/pexels-photo-878846.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
            <div className="user-name">Nuch-cha Boonyato</div>
          </div>
      </button>
        <div className="user-info-right">
          <div className="user-info-childbox">
            <span>Height</span>
            <span>0 CM</span>
          </div>
          <div className="user-info-childbox">
            <span>Weight</span>
            <span>0 KG</span>
          </div>
          <div className="user-info-childbox">
            <span>Age</span>
            <span>0</span>
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
              onClick={() => setIsModalOpen(false)}
            >
              <AiOutlineClose />
            </button>
            <div className="modal-detail-box">
              <span className="modal-detail-title">Firstname</span>
              {/* <span className="modal-detail-text">{selectedActivity.activityName}</span> */}
            </div>
            <div className="modal-detail-box">
              <span className="modal-detail-title">Lastname</span>
              {/* <span className="modal-detail-text">{selectedActivity.activityDescription}</span> */}
            </div>
            <div className="modal-detail-box">
              <span className="modal-detail-title">Height</span>
              {/* <span className="modal-detail-text">{selectedActivity.duration}</span> */}
            </div>
            <div className="modal-detail-box">
              <span className="modal-detail-title">Weight</span>
              {/* <span className="modal-detail-text">{selectedActivity.duration}</span> */}
            </div>
            {/* {selectedActivity.distance && (
          <div className="modal-detail-box">
            <span className="modal-detail-title">Distance</span>
            <span className="modal-detail-text">{selectedActivity.distance}</span>
          </div>
        )} */}
            <div className="action-buttons">
              <button className="edit-button" onClick={() => handleEditClick()}>Edit</button>
            </div>
          </div>
        </div>
        )
      }
    </div>
  );
};

export default DashboardTop;

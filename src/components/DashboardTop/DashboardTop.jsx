import React from "react";
import "./DashboardTop.scss";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  BarElement, CategoryScale, LinearScale, Tooltip, Legend
)

const DashboardTop = () => {

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
  

  return (
    <div className="dashboard-top-container">
      <div className="top-row">
        <div className="user-info-left">
          <img
            src="https://images.pexels.com/photos/878846/pexels-photo-878846.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt=""
          />
          <div className="user-name">Nuch-cha Boonyato</div>
        </div>
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
    </div>
  );
};

export default DashboardTop;

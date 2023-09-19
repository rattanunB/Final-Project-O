import React, { useState } from 'react';
import "./CreateActivitiyPage.scss";
import { BiRun } from 'react-icons/bi'
import { TbYoga } from 'react-icons/tb'
import { IoMdBicycle } from 'react-icons/io'
import { GiWeightLiftingUp } from 'react-icons/gi'


const CreateActivityPage = () => {
  const [formData, setFormData] = useState({
    activityName: '',
    activityDescription: '',
    duration: '',
    date: '',
    activityType: 'run'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('ส่งข้อมูลฟอร์ม:', formData);
  };

  const handleCancel = () => {
    console.log("cancle")
  };

  const handleActivityTypeChange = (type) => {
    setFormData({
      ...formData,
      activityType: type
    });
  };

  return (
    <div className='createActivitiyPage'>
      <h2>Create Activitiy</h2>
      <form onSubmit={handleSubmit}>
      <div className='activityTypeSelect'>
            <span
              onClick={() => handleActivityTypeChange('run')}
              className={formData.activityType === 'run' ? 'active' : ''}
            >
              <BiRun/>
            </span>
            <span
              onClick={() => handleActivityTypeChange('yoga')}
              className={formData.activityType === 'yoga' ? 'active' : ''}
            >
              <TbYoga/>
            </span>
            <span
              onClick={() => handleActivityTypeChange('bicycle')}
              className={formData.activityType === 'bicycle' ? 'active' : ''}
            >
              <IoMdBicycle/>
            </span>
            <span
              onClick={() => handleActivityTypeChange('weight')}
              className={formData.activityType === 'weight' ? 'active' : ''}
            >
              <GiWeightLiftingUp/>
            </span>
            <span
              onClick={() => handleActivityTypeChange('abs')}
              className={formData.activityType === 'abs' ? 'active' : ''}
            >
              ABS
            </span>
          </div>
        <div className='ActivityWrapInput'>
          <label>Activity Name</label>
          <input
            type="text"
            name="activityName"
            value={formData.activityName}
            onChange={handleChange}
            className='ActivityInput'
          />
        </div>
        <div className='ActivityWrapInput'>
          <label>Activity Description</label>
          <textarea
            name="activityDescription"
            value={formData.activityDescription}
            onChange={handleChange}
            className='ActivityInput'
          />
        </div>
        <div className='ActivityWrapInput'>
          <label>Duration (Minute)</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className='ActivityInput'
          />
        </div>
        <div className='ActivityWrapInput'>
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className='ActivityInput'
          />
        </div>
        <div className='activityBtnWrap'>
          <button type="submit">Create Activity</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default CreateActivityPage;

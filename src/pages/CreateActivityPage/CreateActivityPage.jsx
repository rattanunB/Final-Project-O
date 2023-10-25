import React, { useState, useEffect } from 'react';
import "./CreateActivitiyPage.scss";
import { BiRun } from 'react-icons/bi'
import { TbYoga } from 'react-icons/tb'
import { IoMdBicycle } from 'react-icons/io'
import { GiWeightLiftingUp } from 'react-icons/gi'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateActivityPage = () => {
  const navigate = useNavigate();
  const [handleError, setHandleError] = useState(false)
  const [messageError, setMessageError] = useState('')
  const [formData, setFormData] = useState({
    activityName: '',
    activityDescription: '',
    duration: '',
    distance: '',
    date: '', // Should be empty String because this field is require form, if user doesn't fill it, the form can create bc the new Date() will provide the current day to form
    activityType: 'run'
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem('accessToken')
    const option = {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    }
    console.log('formData..',formData)
    try {
      const response = await axios.post('http://localhost:8100/activity', formData, option);
      // console.log('response..',response)
      if (response.status === 200) {
        // console.log('Activity saved successfully', formData);
        setFormData({
          activityName: '',
          description: '',
          duration: '',
          distance: '',
          date: new Date().toISOString().split('T')[0],
          activityType: 'run'
        });
        navigate('/dashboard')
      }
    } catch (error) {
      setHandleError(true)
      setMessageError(error.response.data)
    }
  };
  
  const handleCancel = () => {
    // console.log("cancle")
    navigate('/dashboard')
  };

  const handleActivityTypeChange = (type) => {
    setFormData({
      ...formData,
      activityType: type
    });
  };

  useEffect(() => {
    setHandleError(false),
    setMessageError('')
  },[])

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
            name="description"
            value={formData.description}
            onChange={handleChange}
            className='ActivityInput'
          />
        </div>
        <div className='ActivityWrapInput'>
          <label>Duration (Minute)</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className='ActivityInput'
          />
        </div>
        <div className='ActivityWrapInput'>
          <label>Distance (Meter)</label>
          {
            formData.activityType === 'run' || formData.activityType === 'bicycle'?
            <input
            type="text"
            name="distance"
            value={formData.distance}
            onChange={handleChange}
            className='ActivityInput'
            /> :
            <input
            disabled
            value={formData.distance}
            className='ActivityInput'
            />
          }
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
        {
          handleError && (
            <div style={{color:'red'}}>
              * {messageError}
            </div>
          )
        }
        <div className='activityBtnWrap'>
          <button type="submit">Create Activity</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default CreateActivityPage;

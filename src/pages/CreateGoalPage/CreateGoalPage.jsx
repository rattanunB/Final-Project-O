import { useState, useEffect } from 'react';
import { BiRun } from 'react-icons/bi'
import { TbYoga } from 'react-icons/tb'
import { IoMdBicycle } from 'react-icons/io'
import { GiWeightLiftingUp } from 'react-icons/gi'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateGoalPage = () => {
  const [handleError, setHandleError] = useState(false)
  const [messageError, setMessageError] = useState('')

  const [formData, setFormData] = useState({
    activityName: '',
    duration: '',
    distance: '',
    deadline: '',
    activityType: 'run',
    status: 'null'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log("Name-Value", name, value)
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem('accessToken')
    // console.log(accessToken);
    const option = {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    }
    try {
      const res = await axios.post('http://localhost:8100/goal', formData, option);
      // console.log('Response....', res)
      navigate('/dashboard')
    } catch (error) {
      console.log(error)
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
    <h2>Create Goal</h2>
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
        <label>Duration (Minute)</label>
        <input
          type='number'
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          className='DurationInput'
        />
      </div>
      <div className='ActivityWrapInput'>
        <label>Distance (Meter)</label>
        {
          formData.activityType === 'run' || formData.activityType === 'bicycle'?
          <input
          type="number"
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
        <label>Deadline</label>
        <input
          type="date"
          name="deadline"
          value={formData.deadline}
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
        <button type="submit">Create Goal</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  </div>
); 
}

export default CreateGoalPage
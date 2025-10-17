import React, { useState } from 'react';
import './CalorieTracker.css';

const CalorieTracker = () => {
  const [formData, setFormData] = useState({
    name: '',
    dailyGoal: '',
    breakfast: '',
    lunch: '',
    dinner: '',
    snacks: ''
  });

  const [results, setResults] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateInputs = () => {
    const { name, dailyGoal, breakfast, lunch, dinner, snacks } = formData;
    
    // Check if any field is empty
    if (!name || !dailyGoal || !breakfast || !lunch || !dinner || !snacks) {
      alert('All fields are required!');
      return false;
    }

    // Check if any field has negative values
    if (dailyGoal < 0 || breakfast < 0 || lunch < 0 || dinner < 0 || snacks < 0) {
      alert('Calorie values cannot be negative!');
      return false;
    }

    // Check if values are valid numbers
    if (isNaN(dailyGoal) || isNaN(breakfast) || isNaN(lunch) || isNaN(dinner) || isNaN(snacks)) {
      alert('Please enter valid numbers for calorie values!');
      return false;
    }

    return true;
  };

  const calculateCalories = () => {
    if (!validateInputs()) return;

    const { name, dailyGoal, breakfast, lunch, dinner, snacks } = formData;
    
    const totalCalories = parseInt(breakfast) + parseInt(lunch) + parseInt(dinner) + parseInt(snacks);
    const remainingCalories = parseInt(dailyGoal) - totalCalories;

    setResults({
      name,
      dailyGoal: parseInt(dailyGoal),
      totalCalories,
      remainingCalories
    });
  };

  return (
    <div className="calorie-tracker">
      <h1>Calorie Tracker</h1>
      
      <div className="input-section">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label>Daily Calorie Goal:</label>
          <input
            type="number"
            name="dailyGoal"
            value={formData.dailyGoal}
            onChange={handleInputChange}
            placeholder="Enter daily goal"
            min="0"
          />
        </div>

        <div className="form-group">
          <label>Breakfast Calories:</label>
          <input
            type="number"
            name="breakfast"
            value={formData.breakfast}
            onChange={handleInputChange}
            placeholder="Enter breakfast calories"
            min="0"
          />
        </div>

        <div className="form-group">
          <label>Lunch Calories:</label>
          <input
            type="number"
            name="lunch"
            value={formData.lunch}
            onChange={handleInputChange}
            placeholder="Enter lunch calories"
            min="0"
          />
        </div>

        <div className="form-group">
          <label>Dinner Calories:</label>
          <input
            type="number"
            name="dinner"
            value={formData.dinner}
            onChange={handleInputChange}
            placeholder="Enter dinner calories"
            min="0"
          />
        </div>

        <div className="form-group">
          <label>Snacks Calories:</label>
          <input
            type="number"
            name="snacks"
            value={formData.snacks}
            onChange={handleInputChange}
            placeholder="Enter snacks calories"
            min="0"
          />
        </div>

        <button className="calculate-btn" onClick={calculateCalories}>
          Calculate Calories
        </button>
      </div>

      {results && (
        <div className="results-section">
          <h2>Results for {results.name}</h2>
          <div className="result-item">
            <span>Daily Calorie Goal:</span>
            <span>{results.dailyGoal} calories</span>
          </div>
          <div className="result-item">
            <span>Total Calories Consumed:</span>
            <span>{results.totalCalories} calories</span>
          </div>
          <div className="result-item">
            <span>Remaining Calories:</span>
            <span>{results.remainingCalories} calories</span>
          </div>
          <div className={`message ${results.remainingCalories < 0 ? 'warning' : 'success'}`}>
            {results.remainingCalories < 0 
              ? "You exceeded your daily calorie goal!" 
              : "You are within your daily goal!"}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalorieTracker;
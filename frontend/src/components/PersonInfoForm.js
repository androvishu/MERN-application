import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import countries from './countries';

function PersonInfoForm() {

  let navigate = useNavigate();

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const [isFormValid, setIsFormValid] = useState(false);

  const handleCountryChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setSelectedCountry(e.target.value);
    setSelectedState('');
    setSelectedCity('');
  };

  const handleStateChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setSelectedState(e.target.value);
    setSelectedCity('');
  };

  const handleCityChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setSelectedCity(e.target.value);
  };

  // Define state variables for form fields and errors
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    state: '',
    city: '',
    gender: '',
    dateOfBirth: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    state: '',
    city: '',
    gender: '',
    dateOfBirth: '',
  });

  // Validation functions
  const validateEmail = (email) => {
    // Regular expression for email validation
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return regex.test(email);
  };

  const validateDateOfBirth = (dob) => {
    // Calculate age based on date of birth
    const currentDate = new Date();
    const birthDate = new Date(dob);
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    return age >= 14;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validation for specific fields
    if (name === 'firstName' || name === 'lastName') {
      if (!/^[A-Za-z]+$/.test(value)) {
        setErrors({ ...errors, [name]: 'Must accept alphabets only' });
      } else {
        setErrors({ ...errors, [name]: '' });
      }
    } else if (name === 'email') {
      if (!validateEmail(value)) {
        setErrors({ ...errors, [name]: 'Must accept valid email format' });
      } else {
        setErrors({ ...errors, [name]: '' });
      }
    } else if (name === 'dateOfBirth') {
      if (!validateDateOfBirth(value)) {
        setErrors({ ...errors, [name]: 'Must be older than 14 years' });
      } else {
        setErrors({ ...errors, [name]: '' });
      }
    } else {
      setErrors({ ...errors, [name]: '' });
    }

    const isValid = Object.values(formData).every((value) => value.trim() !== '');
    setIsFormValid(isValid);
  };

  const calculateAge = (dateOfBirth) => {
    const dob = new Date(dateOfBirth);
    const currentDate = new Date();

    const yearsDiff = currentDate.getFullYear() - dob.getFullYear();
    const monthsDiff = currentDate.getMonth() - dob.getMonth();
    const daysDiff = currentDate.getDate() - dob.getDate();

    // Adjust for negative months or days difference
    if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
      return yearsDiff - 1; // Subtract 1 year if not yet reached the birthdate this year
    } else {
      return yearsDiff;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.status === 201) { navigate('display') }
      else { alert('Something went wrong!') }

    } catch (err) {
      console.error(err.message);
      alert('Internal server error!');
    }

  };

  return (
    <div className="container mt-5 w-50 mb-5">
      <h1 className='d-inline'>Registration  Form</h1>
      <Link className='btn btn-link float-end' to='/display'>See More &rarr;</Link>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className={`form-control ${errors.firstName && 'is-invalid'}`}
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          {errors.firstName && (
            <div className="invalid-feedback">{errors.firstName}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className={`form-control ${errors.lastName && 'is-invalid'}`}
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
          {errors.lastName && (
            <div className="invalid-feedback">{errors.lastName}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className={`form-control ${errors.email && 'is-invalid'}`}
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        <div>
          <label htmlFor="country" className="form-label">Country:</label>
          <select
            id="country"
            className={`form-select ${errors.country && 'is-invalid'}`}
            name='country'
            value={selectedCountry}
            onChange={handleCountryChange}>
            <option value="">Select a country</option>
            {countries.map((country, index) => (
              <option key={index} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        {selectedCountry && (
          <div>
            <label htmlFor="state" className='form-label'>State:</label>
            <select
              id="state"
              className={`form-select ${errors.state && 'is-invalid'}`}
              name='state'
              value={selectedState}
              onChange={handleStateChange}>
              <option value="">Select a state</option>
              {countries
                .find((country) => country.name === selectedCountry)
                .states.map((state, index) => (
                  <option key={index} value={state.name}>
                    {state.name}
                  </option>
                ))}
            </select>
          </div>
        )}
        {selectedState && (
          <div>
            <label htmlFor="city" className='form-label'>City:</label>
            <select
              id="city"
              className={`form-select ${errors.city && 'is-invalid'}`}
              name='city'
              value={selectedCity}
              onChange={handleCityChange}>
              <option value="">Select a city</option>
              {countries
                .find((country) => country.name === selectedCountry)
                .states.find((state) => state.name === selectedState)
                .cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
            </select>
          </div>
        )}

        <div className="mb-3">
          <label className="form-label">Gender</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                className={`form-check-input ${errors.gender && 'is-invalid'}`}
                type="radio"
                name="gender"
                id="male"
                value="male"
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="male">
                Male
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className={`form-check-input ${errors.gender && 'is-invalid'}`}
                type="radio"
                name="gender"
                id="female"
                value="female"
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="female">
                Female
              </label>
            </div>
          </div>
          {errors.gender && (
            <div className="invalid-feedback">{errors.gender}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="dateOfBirth" className="form-label">
            Date of Birth
          </label>
          <input
            type="date"
            className={`form-control ${errors.dateOfBirth && 'is-invalid'}`}
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
          />
          {errors.dateOfBirth && (
            <div className="invalid-feedback">{errors.dateOfBirth}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="text"
            className="form-control"
            value={calculateAge(formData.dateOfBirth)}
            readOnly
          />
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={!isFormValid}>
          Save
        </button>
      </form>
    </div>
  );
}

export default PersonInfoForm;

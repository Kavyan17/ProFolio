import { useEffect, useState } from 'react';
import '../styles/UserDetails.css';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { url } from "../components/Constants.jsx";

export default function UserDetails() {
  let navigate = useNavigate();

  useEffect(() => {
    async function getUserData() {
      const response = await fetch(`${url}/api/user/public/${user.id}`);
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      if (jsonResponse) {
        setName(jsonResponse.name);
        setTitle(jsonResponse.title);
        setPhone(jsonResponse.phone);
        setHomeLocation(jsonResponse.homeLocation);
        setCurrentAddress(jsonResponse.currentLocation);
        setAboutMe(jsonResponse.about);
        if (jsonResponse.educationList != []) {
          setEducation(jsonResponse.educationList);
        }
        if (jsonResponse.skills != []) {
          setUserSkills(jsonResponse.skills);
        }
        if (jsonResponse.workExperienceList != []) {
          setWorkExperience(jsonResponse.workExperienceList);
        }
        if (jsonResponse.externalLinks != []) {
          setSocialMedia(jsonResponse.externalLinks);
        }
        if (jsonResponse.certifications != []) {
          setCertifications(jsonResponse.certifications);
        }
        if (jsonResponse.projects != []) {
          setProjects(jsonResponse.projects);
        }

      }
      else {
        alert("Wrong OTP entered, Please Try Again");
      }
    }

    getUserData();
  }, []);

  const [user, setUser] = useOutletContext();
  const [Name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [educationErrors, setEducationErrors] = useState([]);
  const [workExperienceErrors, setWorkExperienceErrors] = useState([]);
  const [projectErrors, setProjectErrors] = useState([]);
  const [certificationErrors, setCertificationErrors] = useState([]);
  const [title, setTitle] = useState('');
  const [phone, setPhone] = useState('');
  const [homeLocation, setHomeLocation] = useState('');
  const [currentLocation, setCurrentAddress] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [socialMedia, setSocialMedia] = useState([{
    name: '',
    url: ''
  }]);

  const [education, setEducation] = useState([{
    institutionName: '',
    degreeName: '',
    grade: '',
    location: '',
    fromDate: '',
    toDate: '',
    description: ''
  }]);
  const [workExperience, setWorkExperience] = useState([{
    role: '',
    organizationName: '',
    location: '',
    fromDate: '',
    toDate: '',
    description: ''
  }]);
  const [userSkills, setUserSkills] = useState([{ name: '' }]);
  const [certifications, setCertifications] = useState([{ name: '', provider: '', issuedOn: '', validUntil: '', credentialId: '', url: '' }]);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [currentPosition, setCurrentPosition] = useState({ companyOrInsititute: '', positionOrDegree: '', fromDate: '', location: '' });
  const [projects, setProjects] = useState([{
    name: '',
    description: '',
    url: '',
    startDate: '',
    endDate: ''
  }]);

  // const handleEducationChange = (event, index) => {
  //   const { name, value } = event.target;
  //   const updatedEducation = [...education];
  //   updatedEducation[index][name] = value;
  //   setEducation(updatedEducation);
  // };

  //New code
  const handleEducationChange = (event, index) => {
    const { name, value } = event.target;
    const updatedEducation = [...education];
    const updatedErrors = [...educationErrors];
    const currentEntry = updatedEducation[index];
    currentEntry[name] = value;
    updatedEducation[index] = currentEntry;

    // Assume we have a separate error state for each education entry
    if (name === 'toDate' && !validateToDate(currentEntry.fromDate, value)) {
      updatedErrors[index] = 'To date cannot be before From date.';
    } else {
      updatedErrors[index] = ''; // Clear error message when valid
    }

    setEducation(updatedEducation);
    setEducationErrors(updatedErrors);
  };

  const handleAddEducation = () => {
    setEducation([...education, { institutionName: '', degreeName: '', grade: '', location: '', fromDate: '', toDate: '', description: '' }]);
  };

  const handleSocialMediaChange = (event, index) => {
    const { name, value } = event.target;
    const updatedSocialMedia = [...socialMedia];
    updatedSocialMedia[index][name] = value;
    setSocialMedia(updatedSocialMedia);
  };

  const handleAddSocialMedia = () => {
    setSocialMedia([...socialMedia, { name: '', url: '' }]);
  };


  function handleCertificationsChange(event, index) {
    const { name, value } = event.target;
    const updatedCertification = [...certifications];
    updatedCertification[index][name] = value;
    setCertifications(updatedCertification);
  }

  // const handleEducationChange = (event, index) => {
  //   const { name, value } = event.target;
  //   const updatedEducation = [...education];
  //   const updatedErrors = [...educationErrors];
  //   const currentEntry = updatedEducation[index];
  //   currentEntry[name] = value;
  //   updatedEducation[index] = currentEntry;

  //   // Assume we have a separate error state for each education entry
  //   if (name === 'toDate' && !validateToDate(currentEntry.fromDate, value)) {
  //     updatedErrors[index] = 'To date cannot be before From date.';
  //   } else {
  //     updatedErrors[index] = ''; // Clear error message when valid
  //   }

  //   setEducation(updatedEducation);
  //   setEducationErrors(updatedErrors);
  // };

  //New Code
  // const validateCertifications = () => {
  //   const newCertificationErrors = certifications.map(cert => {
  //     if (new Date(cert.validUntil) < new Date(cert.issuedOn)) {
  //       return 'Expiration date cannot be before issue date.';
  //     }
  //     return ''; // No error
  //   });

  //   setCertificationErrors(newCertificationErrors);
  //   // Check if any of the certifications have an error message
  //   return !newCertificationErrors.some(error => error !== '');
  // };


  function handleAddCertification() {
    setCertifications([...certifications, { name: '', provider: '', issuedOn: '', validUntil: '', credentialId: '', url: '' }])
  }

  function handleUserSkillChange(event, index) {
    const updatedSkills = [...userSkills];
    updatedSkills[index] = { name: event.target.value };
    setUserSkills(updatedSkills);
  }

  function handleAddUserSkill() {
    setUserSkills([...userSkills, { name: '' }]);
  }

  function handleWorkExperienceChange(event, index) {
    const { name, value } = event.target;
    const updatedExperience = [...workExperience];
    const updatedErrors = [...workExperienceErrors];
    updatedExperience[index][name] = value;

    // Validate dates as an example
    if (name === 'toDate' && new Date(value) < new Date(updatedExperience[index]['fromDate'])) {
      updatedErrors[index] = 'To date cannot be before from date.';
    } else {
      updatedErrors[index] = '';
    }
    setWorkExperience(prevExperience => {
      const updatedExperience = [...prevExperience];
      updatedExperience[index] = { ...updatedExperience[index], [name]: value };
      return updatedExperience;
    });
  }

  //New code

  // const handleWorkExperienceChange = (event, index) => {
  //   const { name, value } = event.target;
  //   const updatedExperience = [...workExperience];
  //   const updatedErrors = [...workExperienceErrors];
  //   updatedExperience[index][name] = value;

  //   // Validate dates as an example
  //   if (name === 'toDate' && new Date(value) < new Date(updatedExperience[index]['fromDate'])) {
  //     updatedErrors[index] = 'To date cannot be before from date.';
  //   } else {
  //     updatedErrors[index] = '';
  //   }

  //   setWorkExperience(updatedExperience);
  //   setWorkExperienceErrors(updatedErrors);
  // };


  function handleAddWorkExperience() {
    setWorkExperience([...workExperience, {
      role: '',
      organizationName: '',
      location: '',
      fromDate: '',
      toDate: '',
      description: ''
    }]);
  }

  // const handleProjectChange = (event, index) => {
  //   const { name, value } = event.target;
  //   const updatedProjects = [...projects];
  //   updatedProjects[index][name] = value;
  //   setProjects(updatedProjects);
  // };

  //New code
  const handleProjectChange = (event, index) => {
    const { name, value } = event.target;
    const updatedProjects = [...projects];
    const updatedErrors = [...projectErrors];
    updatedProjects[index][name] = value;

    // Validate dates as an example
    if (name === 'endDate' && new Date(value) < new Date(updatedProjects[index]['startDate'])) {
      updatedErrors[index] = { ...updatedErrors[index], endDate: 'End date cannot be before start date.' };
    } else {
      updatedErrors[index] = { ...updatedErrors[index], endDate: '' };
    }

    setProjects(updatedProjects);
    setProjectErrors(updatedErrors);
  };


  const handleAddProject = () => {
    setProjects([...projects, { name: '', description: '', url: '', startDate: '', endDate: '' }]);
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    setProfilePhoto(file);
    // if (file) {

    //   const reader = new FileReader();

    //   reader.onloadend = () => {
    //     setProfilePhoto(reader.result);
    //   };

    //   reader.readAsDataURL(file);
    // }
  };

  //New code lines
  const validateName = (name) => {
    if (!name || name.length < 3) {
      setNameError("Name must be at least 3 characters long");
      return false;
    }
    setNameError('');
    return true;
  };

  // Validation function for the phone field
  // const validatePhone = (phone) => {
  //   const phoneRegex = /^[0-9]{15}$/; 
  //   if (!phoneRegex.test(phone)) {
  //     setPhoneError("Invalid phone number");
  //     return false;
  //   }
  //   setPhoneError('');
  //   return true;
  // };
  

//Validate Phone
  const validatePhone = (phone) => {
    const phoneRegex = /^\+?[0-9\s\-\(\)]*$/;
    const atLeastOneDigit = /[0-9]/;

    if (!phoneRegex.test(phone) || !atLeastOneDigit.test(phone)) {
      setPhoneError("Invalid phone number");
      return false;
    }
    setPhoneError('');
    return true;
  };

  const validateToDate = (fromDate, toDate) => {
    if (new Date(toDate) < new Date(fromDate)) {
      return false; // The to date is before the from date
    }
    return true;
  };


  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);
    validateName(newName);
  };

  const handlePhoneChange = (event) => {
    const newPhone = event.target.value;
    setPhone(newPhone);
    validatePhone(newPhone);
  };

  const validateAll = () => {
    let isValid = true;

    // Validate name and phone first
    if (!validateName(Name) || !validatePhone(phone)) {
      isValid = false;
    }

    // Validate each education
    for (let edu of education) {
      if (new Date(edu.toDate) < new Date(edu.fromDate)) {
        isValid = false;
        // Set the education error for specific index here if needed
      }
    }

    // Validate each work experience
    for (let exp of workExperience) {
      if (new Date(exp.toDate) < new Date(exp.fromDate)) {
        isValid = false;
        // Set the work experience error for specific index here if needed
      }
    }

    // Validate each project
    for (let project of projects) {
      if (new Date(project.endDate) < new Date(project.startDate)) {
        isValid = false;
        // Set the project error for specific index here if needed
      }
    }

    // Validate each certification
    for (let certification of certifications) {
      if (new Date(certification.validUntil) < new Date(certification.issuedOn)) {
        isValid = false;
        // Set the certification error for specific index here if needed
      }
    }

    return isValid;
  };


  async function handleSubmit(event) {
    event.preventDefault();

    const isNameValid = validateName(Name);
    const isPhoneValid = validatePhone(phone);

    if (!isNameValid || !isPhoneValid) {
      // Prevent form submission if validation fails
      return;
    }


    // Perform all validations
    if (!validateAll()) {
      alert('Please correct the errors before submitting.');
      return; // Stop the form from submitting
    }

    if (profilePhoto != null) {
      let formData = new FormData();
      console.log(profilePhoto);
      formData.append("file", profilePhoto);
      const responseImage = await fetch(`${url}/api/user/${user.id}/profile-picture`, {
        method: "POST",
        body: formData,
        headers: {
          'Authorization': `Bearer ${user.authToken}`,
        },
      });
      console.log(responseImage);
    }


    console.log({
      Name,
      title,
      phone,
      homeLocation,
      currentLocation,
      aboutMe,
      education,
      workExperience,
      userSkills,
      certifications,
      profilePhoto,
      currentPosition,
      socialMedia,
      projects
    });

    console.log(user.authToken);
    console.log((education == [{
      institutionName: '',
      degreeName: '',
      grade: '',
      location: '',
      fromDate: '',
      toDate: '',
      description: ''
    }]));
    let response = await fetch(`${url}/api/user/${user.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        "id": user.id,
        "name": Name,
        'title': title,
        "phone": phone,
        "about": aboutMe,
        "templatePreference": 1,
        "homeLocation": homeLocation,
        "currentLocation": currentLocation,
        "educationList": (education.length == 1 && education[0].degreeName == '') ? null : education,
        "workExperienceList": (workExperience.length === 1 && workExperience[0].organizationName === '') ? null : workExperience,
        "skills": userSkills.map(skill => ({ "name": skill.name })),
        "externalLinks": (socialMedia.length == 1 && socialMedia[0].name == '') ? null : socialMedia,
        "certifications": (certifications.length == 1 && certifications[0].name == '') ? null : certifications,
        "projects": (projects.length == 1 && projects[0].name == '') ? null : projects,
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,PATCH,OPTIONS,DELETE',
        'Access-Control-Allow-Credentials': 'true',
        'Authorization': `Bearer ${user.authToken}`,
      },
    });
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    if (response.status == 202) {
      return navigate(`/user/${user.id}`);
    }
  }

  return (
    <div id="user-details-container">
      <div className="form-container">
        <h1 className="gradient-heading">Update Your Personal Details</h1>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend><span className="number">1</span> Your basic info</legend>
            <label htmlFor="name">Name</label>
            {/* <input
              type="text"
              placeholder="Name"
              value={Name}
              onChange={(event) => setName(event.target.value)}
            /> */}
            <input
              type="text"
              placeholder="Name"
              value={Name}
              onChange={handleNameChange}
              style={{ borderColor: nameError ? 'red' : 'initial' }}
            />
            {nameError && <div style={{ color: 'red' }}>{nameError}</div>}
            <label htmlFor="title">Title</label>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />

            <label htmlFor="phone">Phone</label>
            {/* <input
              id="phone"
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            /> */}
            <input
              id="phone"
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={handlePhoneChange}
              style={{ borderColor: phoneError ? 'red' : 'initial' }}
            />
            {phoneError && <div style={{ color: 'red' }}>{phoneError}</div>}
            <label htmlFor="home-address">Home Address</label>
            <input
              id="home-address"
              type="text"
              placeholder="Home Address"
              value={homeLocation}
              onChange={(e) => setHomeLocation(e.target.value)}
            />

            <label htmlFor="current-address">Current Address</label>
            <input
              id="current-address"
              type="text"
              placeholder="Current Address"
              value={currentLocation}
              onChange={(e) => setCurrentAddress(e.target.value)}
            />

            <label htmlFor="about-me">About Me</label>
            <textarea
              id="about-me"
              placeholder="A little bit about yourself..."
              value={aboutMe}
              onChange={(e) => setAboutMe(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend><span className="number">2</span>Education</legend>
            {education.map((edu, index) => (
              <div key={index}>
                <label htmlFor='institutionName'>Institute Name</label>
                <input
                  type="text"
                  placeholder="Institute Name"
                  name="institutionName"
                  value={edu.institutionName}
                  onChange={(event) => handleEducationChange(event, index)}
                />
                <label htmlFor='degreeName'>Degree Name</label>
                <input
                  type="text"
                  placeholder="Degree Name"
                  name="degreeName"
                  value={edu.degreeName}
                  onChange={(event) => handleEducationChange(event, index)}
                />
                <label htmlFor={`grade-${index}`}>Grade</label>
                <input
                  type="text"
                  placeholder="Grade"
                  name="grade"
                  value={edu.grade}
                  onChange={(event) => handleEducationChange(event, index)}
                />
                <label htmlFor={`location-${index}`}>Location</label>
                <input
                  type="text"
                  placeholder="Location"
                  name="location"
                  value={edu.location}
                  onChange={(event) => handleEducationChange(event, index)}
                />

                <label htmlFor={`fromDate-${index}`}>From Date</label>
                <input
                  type="date"
                  name="fromDate"
                  placeholder="fromDate"
                  value={edu.fromDate}
                  onChange={(event) => handleEducationChange(event, index)}
                />

                <label htmlFor={`toDate-${index}`}>To Date</label>
                {/* <input
                  type="date"
                  name="toDate"
                  value={edu.toDate}
                  onChange={(event) => handleEducationChange(event, index)}
                /> */}
                <input
                  type="date"
                  name="toDate"
                  placeholder="toDate"
                  value={edu.toDate}
                  onChange={(event) => handleEducationChange(event, index)}
                />
                {educationErrors[index] && (
                  <div style={{ color: 'red' }}>{educationErrors[index]}</div>
                )}
                <label htmlFor='desciption'>Description</label>
                <textarea
                  id='description'
                  placeholder='Description'
                  name="description"
                  value={edu.description}
                  onChange={(event) => handleEducationChange(event, index)}
                />
                <hr />
              </div>
            ))}

            <button type="button" onClick={handleAddEducation}>
              Add Education
            </button>
          </fieldset>
          <br></br>

          {/* Experience Section */}
          <fieldset>
            <legend><span className="number">3</span> Experience</legend>

            {workExperience.map((exp, index) => (
              <div key={index}>
                <label htmlFor={`workExp-role-${index}`}>Role</label>
                <input
                  type="text"
                  placeholder="Role"
                  name="role"
                  value={exp.role}
                  onChange={(event) => handleWorkExperienceChange(event, index)}
                />
                <label htmlFor="employment-type">Organization Name</label>
                <input
                  type="text"
                  placeholder="Organization Name"
                  name="organizationName"
                  value={exp.organizationName}
                  onChange={(event) => handleWorkExperienceChange(event, index)}
                />
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  placeholder="Location"
                  name="location"
                  value={exp.location}
                  onChange={(event) => handleWorkExperienceChange(event, index)}
                />
                <label htmlFor="fromDate">From date</label>
                <input
                  type="date"
                  placeholder='From date'
                  id='fromDate'
                  name="fromDate"
                  value={exp.fromDate}
                  onChange={(event) => handleWorkExperienceChange(event, index)}
                />
                <label htmlFor="toDate">To date</label>
                {/* <input
                  type="date"
                  placeholder='To date'
                  id='toDate'
                  name="toDate"
                  value={exp.toDate}
                  onChange={(event) => handleWorkExperienceChange(event, index)}
                /> */}
                <input
                  type="date"
                  placeholder='To date'
                  id='toDate'
                  name="toDate"
                  value={exp.toDate}
                  onChange={(event) => handleWorkExperienceChange(event, index)}
                />
                {projectErrors[index]?.endDate && (
                  <div style={{ color: 'red' }}>{workExperienceErrors[index]}</div>
                )}
                <label htmlFor="description">Description</label>
                <textarea
                  id='description'
                  name="description"
                  placeholder='Description'
                  value={exp.description}
                  onChange={(event) => handleWorkExperienceChange(event, index)}
                />
                <hr />
              </div>
            ))}
            <button type="button" onClick={handleAddWorkExperience}>
              Add Experience
            </button>
          </fieldset>
          <br></br>
          {/* Skills Section */}
          <fieldset>
            <legend><span className="number">4</span> Skills</legend>
            {userSkills.map((skill, index) => (
              <div key={index}>
                <label htmlFor={`userSkill-${index}`}>Skill</label>
                <input
                  type="text"
                  placeholder="Enter a skill"
                  value={skill.name}
                  onChange={(event) => handleUserSkillChange(event, index)}
                />
                <hr />
              </div>
            ))}

            <button type="button" onClick={handleAddUserSkill}>
              Add Skill
            </button>
          </fieldset>
          <br></br>

          {/* Social Media Section */}
          <fieldset>
            <legend><span className="number">5</span> Social Media</legend>
            {socialMedia.map((platform, index) => (
              <div key={index}>
                <label htmlFor={`socialMedia-name-${index}`}>Platform Name</label>
                <input
                  type="text"
                  placeholder="LinkedIn, Instagram, etc."
                  name="name"
                  value={platform.name}
                  onChange={(event) => handleSocialMediaChange(event, index)}
                />

                <label htmlFor={`socialMedia-url-${index}`}>URL</label>
                <input
                  type="text"
                  placeholder="https://..."
                  name="url"
                  value={platform.url}
                  onChange={(event) => handleSocialMediaChange(event, index)}
                />
                <hr />
              </div>
            ))}
            <button type="button" onClick={handleAddSocialMedia}>
              Add Social Media
            </button>
          </fieldset>
          <br></br>

          {/* Certifications Section */}
          <fieldset>
            <legend><span className="number">6</span> Certifications</legend>
            {certifications.map((item, index) => (
              <div key={index}>
                <label htmlFor="name">Certification or License Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={item.name}
                  onChange={(event) => handleCertificationsChange(event, index)}
                />
                <label htmlFor="provider">Issuing Organization</label>
                <input
                  type="text"
                  placeholder="Issuing Organization"
                  name="provider"
                  value={item.provider}
                  onChange={(event) => handleCertificationsChange(event, index)}
                />
                <label htmlFor='issue-date'>Issue date</label>
                <input
                  type="date"
                  id='issue-date'
                  name="issuedOn"
                  value={item.issuedOn}
                  onChange={(event) => handleCertificationsChange(event, index)}
                />
                <label htmlFor='expiration-date'>Valid Untill</label>
                <input
                  type="date"
                  id='expiration-date'
                  name="validUntil"
                  value={item.validUntil}
                  onChange={(event) => handleCertificationsChange(event, index)}
                /> 
                <label htmlFor='credentialId'>Credential ID</label>
                <input
                  type="text"
                  id='credential-id'
                  name="credentialId"
                  placeholder='Credential ID'
                  value={item.credentialId}
                  onChange={(event) => handleCertificationsChange(event, index)}
                />
                <label htmlFor='credentialUrl'>Credential URL</label>
                <input
                  type="text"
                  id='credential-url'
                  name="url"
                  placeholder='Credential URL'
                  value={item.url}
                  onChange={(event) => handleCertificationsChange(event, index)}
                />
                <hr />
              </div>
            ))}

            <button type="button" onClick={handleAddCertification}>
              Add certifications or license
            </button>
          </fieldset>
          <br></br>

          {/* Projects Section */}
          <fieldset>
            <legend><span className="number">7</span> Projects</legend>
            {projects.map((project, index) => (
              <div key={index}>
                <label htmlFor={`project-name-${index}`}>Project Name</label>
                <input
                  type="text"
                  placeholder="Project Name"
                  name="name"
                  value={project.name}
                  onChange={(event) => handleProjectChange(event, index)}
                />

                <label htmlFor={`project-description-${index}`}>Description</label>
                <textarea
                  placeholder="Project Description"
                  name="description"
                  value={project.description}
                  onChange={(event) => handleProjectChange(event, index)}
                />

                <label htmlFor={`project-url-${index}`}>URL</label>
                <input
                  type="text"
                  placeholder="https://..."
                  name="url"
                  value={project.url}
                  onChange={(event) => handleProjectChange(event, index)}
                />

                <label htmlFor={`project-startDate-${index}`}>Start Date</label>
                <input
                  type="date"
                  placeholder="startDate"
                  name="startDate"
                  value={project.startDate}
                  onChange={(event) => handleProjectChange(event, index)}
                />
                <label htmlFor={`project-endDate-${index}`}>End Date</label>
                {/* <input
                  type="date"
                  name="endDate"
                  value={project.endDate}
                  onChange={(event) => handleProjectChange(event, index)}
                /> */}
                <input
                  type="date"
                  placeholder="endDate"
                  name="endDate"
                  value={project.endDate}
                  onChange={(event) => handleProjectChange(event, index)}
                />
                {projectErrors[index]?.endDate && (
                  <div style={{ color: 'red' }}>{projectErrors[index].endDate}</div>
                )}
                <hr />
              </div>
            ))}
            <button type="button" onClick={handleAddProject}>
              Add Project
            </button>
          </fieldset>
          <br></br>

          {/* Profile Photo Upload */}
          <label htmlFor='profile-photo'>Upload your picture for profile photo</label>
          <input id='profile-photo' type="file" accept="image/*" onChange={handleProfilePhotoChange} />
          <button type="submit">Submit</button>
        </form>
      </div>

    </div>

  );

}
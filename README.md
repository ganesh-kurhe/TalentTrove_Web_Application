# TalentTrove Website

Welcome to the **TalentTrove** repository. TalentTrove is a dynamic full-stack web application designed to bridge the gap between job seekers and recruiters. The platform provides an intuitive and user-friendly interface where users can search for jobs, recruiters post job openings, and manage applications with ease.

---

## 📑 Table of Contents

- [Overview](#overview)
- [Features](#features)
  - [For Job Seekers](#for-job-seekers)
  - [For Recruiters](#for-employers)
- [Tech Stack](#tech-stack)
- [Installation](#installation)

---

## 📌 Overview

TalentTrove is built to streamline the hiring process.  
**Recruiters** can post job openings and review applications, while **job seekers** can create profiles, upload resumes, and apply to jobs that match their skills and interests.

---

## ✨ Features

### For Job Seekers

- User-friendly registration and login
- Profile creation and resume upload
- Search for jobs by title, location, or skills
- Apply to jobs with a single click
- Track application status (Accepted / Rejected)

### For Employers

- Register and log in as a recruiter
- Create company profiles
- Post job openings with detailed descriptions
- View applicants for each job
- Accept or reject applicants with status tracking

---

## 🛠️ Tech Stack

- **Frontend**: React.js, HTML, CSS, JavaScript  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **Authentication**: JSON Web Tokens (JWT)  
- **File Storage**: Cloudinary (for resumes)

---

## 🚀 Installation

Follow these steps to set up the project locally:

1. **Clone the repository**  
   ```bash
   git clone https://github.com/ganesh-kurhe/TalentTrove.git
   cd TalentTrove

2. **Install dependencies**
   ```bash
   npm install

3. **Set up environment variables**
   Create a .env file in the root directory and add the following:
   ```bash
   MONGO_URI=your_database_uri
   PORT=5000 
   SECRET_KEY=your_secret_key
   CLOUD_NAME=your_cloud_name
   API_KEY=your_api_key
   API_SECRET=your_api_secret
 



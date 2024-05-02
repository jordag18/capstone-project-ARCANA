# CS4311_ARCANA_CUIBONO_Spring2024

> # Advanced Resiliency Chronicling for Analysis in Network Assessments (ARCANA)

## Introduction

GitHub repository for Software Engineering Design and Implementation CS-4311 capstone project:

The **ARCANA** system helps DAC CEAD analysts assess blue team performance (PMR) against red team cyber-attacks in exercises.
It analyzes event data during the exercise, presenting a visual timeline of attacks and blue team responses.

---

## Project Features

The system intends to provide a means of conducting the analysis of events that occurred during an Adversarial Assessment in order to create a visual representation of a timeline of events and manage the appropriate times and connections of related events
- Ingestion of logs
- Project creation
- Graph creation and manipulation.
- Synchronization features to preserve Analysts' work in real-time.


### Justification of CAT 1 STIG Vulnerabilities
### Running the Project

***Prerequisites:***

- To run the following web-application, ensure that you have [**Python 3.8**](https://www.python.org/) **or newer** installed.
- Latest version of [**Node.js**](https://nodejs.org/en) installed as well.
- [**MongoDB Compass**](https://www.mongodb.com/products/tools/compass)
- [**Docker**](https://www.docker.com/)

#### Packages and Dependencies

###### Python Library Dependencies:

### From file

    You can install all dependencies using the following commands:
    cd backend
    pip install -r requirements.txt

### Installing manually

    You can install the backend dependencies by using the following command:
    cd backend

    Then copy and paste the following into the terminal: 

    pip install pymongo 
    pip install fastapi
    pip install "uvicorn[standard]"
    pip install Pillow
    pip install mongoengine
    pip install python-multipart
    pip install pandas
    pip install motormongo

##### Getting Started

First check the mongodb `localhost:27017` server is running by connecting through mongoCompass.

Run the following command in a terminal within the path `~/backend` to begin 

    python -m uvicorn main:app --reload

Check that the uvicorn server is running on `http://127.0.0.1:8000`

Uvicorn server should be running within the terminal and ready to recieve api calls from frontend application.

###### Then run the following commands

***Start the backend***

    cd backend
    uvicorn main:app --reload

###### Node.Js Packages and Modules Dependencies:

In a different terminal change directory to the frontend.

###### Then run the following commands

***Development Build:***

    npm install -save-dev
    npm run dev

***Production Build:***

    npm install -save
    npm run build
    npm run start


Once the product is doen building a URL will present itself in the terminal.
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

###### Running ARCANA

- User will first be prompted for their first and last initials ONLY.
- User will be taken to the Project Manager page.
- User can create a project, or, if a project is listed, click modify and open.
- User will be taken to the Events Management page where they can create an event, modify an event, delete an event
- User will have access to a toolbar that will direct them to the Event Graph and the TOA Manager
- User will have access to import and export functions in the Graph Manager
- User will have the ability to modify Event nodes like they would in the Event Manager.
- User will have the ability to delete, create, or modify TOA icons as well.

###### Documentation:

- [React Documentation](https://react.dev/reference/react)
- [Next.js Documentation](https://nextjs.org/docs)
---

### Credits

Team Name: **Cui-Bono**

| Team Members: |
|:--|
| Alexander Watson |
| Diana Castañeda |
| Samantha Silva |
| Bryan Arriaga |
| Jordan Aguon |
| Daniel Lucio |
| Alan Ochoa |
| Luis Fierro |

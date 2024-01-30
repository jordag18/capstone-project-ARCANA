# CS4311_ARCANA_CUIBONO_Spring2024

> # Advanced Resiliency Chronicling for Analysis in Network Assessments (ARCANA)

## Introduction

GitHub repository for Software Engineering Design and Implementation CS-4311 capstone project:

The **ARCANA** system helps DAC CEAD analysts assess blue team performance (PMR) against red team cyber-attacks in exercises. It analyzes event data during the exercise, presenting a visual timeline of attacks and blue team responses.

---

## Project Features

The system intends to provide a means of conducting the analysis of events that occurred during an Adversarial Assessment in order to create a visual representation of a timeline of events and manage the appropriate times and connections of related events
- Ingestion of logs
- Project creation
- Graph creation and manipulation.
- Synchronization features to preserve Analysts' work in real-time.

## Getting Started
### Running the Project
#### Project Setup

***Prerequisites:***

- To run the following web-application, ensure that you have [**Python 3.8**](https://www.python.org/) **or newer** installed.
- Latest version of [**Node.js**](https://nodejs.org/en) installed as well.
- [**MongoDB Compass**](https://www.mongodb.com/products/tools/compass)
- [**Docker**](https://www.docker.com/)

#### Packages and Dependencies

###### Python Library Dependencies:
    pip install pymongo fastapi

    pip install "uvicorn[standard]"

###### Node.Js Packages and Modules Dependencies:

To build and run the react you need to change directory to `~/frontend/arcana`

###### Then run the following commands

***Development Build:***

    npm install -save-dev
    mpm run dev


***Production Build:***

    npm install -save
    npm run build
    npm run start

***Necessary Modules:***

    npm install react-bootstrap
    npm install react-bootstrap-icons
    npm install react-dom

##### Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

###### Next.js documentation:

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

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

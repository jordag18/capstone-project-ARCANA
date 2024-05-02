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


## Justification of CAT 1 STIG Vulnerabilities
| VULNERABILITY ID | DESCRIPTION | MITIGATING REASON |
|------------------|-------------|-------------------|
| V – 222400 | Validity periods must be verified on all application messages using WS-Security or SAML assertions. | This is a security measure to prevent the use of outdated or expired security tokens. This ID would not apply on this project due to the project not having a need for security tokens &/or passwords. |
| V – 222404 | The application must use both the NotBefore and NotOnOrAfter elements or OneTimeUse element when using the Conditions element in a SAML assertion. | Specifically, it states that when using the Conditions element in a SAML assertion, the assertion must include either both the NotBefore and NotOnOrAfter elements or the Onetime Use element. For this project this would not be relevant due that SAML, it’s a secured internet connection enabler for using relevant Single Sign On on XML, this would not apply. |
| V – 222612 | The application must not be vulnerable to overflow attacks. | To mitigate the risk of overflow attacks, we would need to employ secure coding practices and implement proper input validation, boundary checking, and memory management. Overflow attacks, such as buffer overflows, can lead to serious security vulnerabilities, allowing attackers to overwrite memory and execute arbitrary code. |
| V – 222578 | The application must destroy the session ID value and/or cookie on logoff or browser close. | In this scenario where the application is used locally in a browser like Mozilla Firefox and doesn't connect to the internet, managing session IDs and cookies for local security is still important. Even in a local context, it's crucial to follow secure practices to protect sensitive information and user sessions. |
| V – 222430 | The application must execute without excessive account permissions. | Session Management, Cookie Attributes (‘HTTP Only’, ‘Same Site’), Session Timeout, Clear Cookies on browser close, Secure local storage |
| V – 222432 | The application must enforce the limit of three consecutive invalid logon attempts by a user during a 15-minute time period. | ARCANA application does not need user/password requirement, this STIG is not relevant for this project. |
| V – 222577 | The application must not expose session IDs. | It's crucial to implement measures to prevent session ID exposure, as exposing session IDs can lead to security vulnerabilities. |
| V – 222609 | The application must not be subject to input handling vulnerabilities. | To mitigate input handling vulnerabilities in the application, we need to implement robust input validation, sanitization, and encoding practices. |
| V – 222608 | The application must not be vulnerable to XML-oriented attacks | To mitigate XML-oriented attacks in the application, even if it's not connected to the internet, we can implement the following measures: Avoid XML External Entity Attacks, Use a secure XML Parser, Input validation for XML Data |
| V – 222602 | The application must protect from Cross-Site Scripting (XSS) vulnerabilities | To mitigate Cross-Site Scripting (XSS) vulnerabilities in the locally run application, follow these best practices: Output encoding, Content Security Policy (CSP), Use frameworks with built-in protection (e.g. React, Angular, Vue...), Escape Dynamic JavaScript values |
| V – 222601 | The application must not store sensitive information in hidden fields | To ensure that your application does not store sensitive information in hidden fields, we can follow these best practices: Avoid Storing Sensitive Data, Secure Communication Channels, Use local storage, Data Masking |
| V – 222607 | The application must not be vulnerable to SQL Injection. | Even though MongoDB is a NoSQL database and not susceptible to traditional SQL injection attacks, it's crucial to follow best practices to prevent NoSQL injection or other security vulnerabilities. |
| V – 222604 | The application must be protected from command injection. | To protect the application from command injection vulnerabilities, especially in the context of using MongoDB, we can follow these best practices to mitigate this: Use parameterized queries, Sanitize input, Error Handling, Update dependencies |
| V – 222403 | The application must use the NotOnOrAfter condition when using the SubjectConfirmation element in a SAML assertion. | Same as with V-222400 and V- 222404 this would not apply to this project due to the project not requiring any kind of authentication, SSO or such |
| V – 222585 | The application must fail to a secure state if system initialization fails, shutdown fails, or aborts fail. | Ensuring that the application fails to a secure state in the event of various failures involves implementing robust error handling and recovery mechanisms. |
| V – 222550 | The application, when utilizing PKI-based authentication, must validate certificates by constructing a certification path to an accepted trust anchor. | The application does not need any kind of authentication/certification use, this would not apply for this project. |
| V – 222522 | The application must uniquely identify and authenticate organizational users (or processes acting on behalf of organizational users). | The application does not need any kind of authentication, but the application to mitigate this is using the user's requirement for their initials to recognize who did what. |
| V – 222554 | The application must not display passwords/PINs as clear text. | This application will have no usage for passwords |
| V – 222596 | The application must protect the confidentiality and integrity of transmitted information. | This application will have no usage for passwords |
| V – 222399 | Messages protected with WS_Security must use time stamps with creation and expiration times. | N/A; ARCANA will not use WS_Security tokens. |
| V – 222658 | All products must be supported by the vendor or the development team. | All products from this application will be supported by the development team and vendor |
| V – 222659 | The application must be decommissioned when maintenance or support is no longer available. | When decommissioned the application will be available to terminate any files and storage |
| V – 222551 | The application, when using PKI-based authentication, must enforce authorized access to the corresponding private key. | All PKI-Based Authentication will give access to a corresponding private key. |
| V – 222620 | Application web servers must be on a separate network segment from the application and database servers if it is a tiered application operating in the DoD DMZ. | The application will have no use of the internet. |
| V – 222536 | The application must enforce a minimum 15-character password length. | The application will have no use for passwords. |
| V – 222643 | The application must have the capability to mark sensitive/classified output when required. | The application will give the option to mark sensitive data to specific users. |
| V – 222542 | The application must only store cryptographic representations of passwords. | The application will have no use for passwords. |
| V – 222543 | The application must transmit only cryptographically-protected passwords. | The application will have no use for passwords. |
| V – 222425 | The application must enforce approved authorizations for logical access to information and system resources in accordance with applicable access control policies. | This application will give the approved user specific data they are entrusted with. |
| V – 222642 | The application must not contain embedded authentication data. | The user must give authentication details each time a user logs in. |
| V - 222662 | Default passwords must be changed. | The application will have no use for passwords. |
| V - 222555 | The application must use mechanisms meeting the requirements of applicable federal laws, Executive Orders, directives, policies, regulations, standards, and guidance for authentication to a cryptographic module. | This application will follow all the guidelines of Federal Laws, Executive Orders, Policies, Regulations, Stands for the cryptographic module |

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

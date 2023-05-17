# React Note-taking App (Two Phases) 

### Overview
Applcation development process can be divided into two stages, stage one utilized front-end framework only and stage two contains back-end development and also front-end refurbishment
  1. **Project initial development phase**: A font-end app using `React` and install it on an `IIS web server`. The goal is to play around with server side, set up IIS server and test my JavaScript files.
  
      Live-demo: https://mellifluous-cascaron-eb5884.netlify.app/
      
<p align="center">
<img width="360" alt="note-taking app" src="https://user-images.githubusercontent.com/75557717/215304692-163d4bf3-9fc5-41f7-ad0a-86e502f875b3.png">
</p>

  2. **Project enhancement phase**: A full stack application that contains a CRUD (Create, Read, Update, Delete) operation built in `Node.js` (backend scripting) that utilizes `MongoDB` for persistent data storage

| Add note | View notes list / delete note | Note details | Edit note |
| --- | --- | --- | --- |
| ![Screenshot 1](https://github.com/nathanlao/MERN_stack_note_taking_app/assets/75557717/26721253-721b-4403-94cb-74e28f3b3587) | ![Screenshot 2](https://github.com/nathanlao/MERN_stack_note_taking_app/assets/75557717/c26a0e7f-9a1e-4060-afb2-aca16ba4f815) | ![Screenshot 3](https://github.com/nathanlao/MERN_stack_note_taking_app/assets/75557717/1b0133b3-bc9b-49a1-a797-4bfe3a8fba82) | ![Screenshot 4](https://github.com/nathanlao/MERN_stack_note_taking_app/assets/75557717/622fe65d-6dfb-4b60-bebd-8c84acee8130) |


## Phase one (Feb 4th)
### Front-end React Application
- Root component of the application contains two subcomponents: `EditNotes` and `ListNotes`
- `EditNotes` component contains a textarea and a button
- `ListNotes` component contains a list of created notes along with links to saved notes. Pop-up window will show when user clicks on notes

#### Concepts used:
- `useState()` to keep track of arrays of notes objects, watch for inputs in textarea
- `useEffect()` for side effect, in this case, storing notes in `localStorage`
- Passing state as `props` to subcomponents
- `Form` submit
- `map()` each note element into an array of JSX elements
- Conditional rendering the pop-up window
- Using `relative unit` and `media query` in CSS styling

### Server
- Created a `Windows Server 2012-R2 Virtual Machine` instance on `Google Cloud Platform`
- Installed and config `IIS Web Server` on VM
- Set up the web app by creating a `bucket` and transferring files to the default folder`(wwwroot)` to server through Cloud Storage
- Access the web page through external IP address

## Phase two (Mar 1st)
### Architecture (MERN stack)
The application's architecture is based on the `MERN stack`, which allows for the seamless integration of front-end and back-end components. The flow of data follows a client-server model, where the front-end built with React communicates with the back-end built with Node.js and Express.js through request-response cycles.

### Front-end (React.js with React Router v6)
- Implement a front-end application using `React`, incorporating `React Router v6` for routes navigation
- Refurbish front-end styling using React component library `MaterialUI`
- Create components for adding new notes, deleting existing notes, modifying note attributes, and displaying all notes from the database, CRUD operations are done by making requests to backend using `Axios` package
- Be able to enter title, body and choose a background color of a note 
- Be able to click on a note to view its full details including the date created and time last modified

### Back-end (Node.js with Express.js)
- Use `Node.js` and `Express.js` to handle the server-side logic
- Use `MongoDB` to store and retrieve notes
- Set up `Docker image` for the NodeJS application and MongoDB

## How to run?
To run the application, first enter the client-side folder, install dependencies and run client-side:
```
cd my-note-taking-app
npm install
npm start
```

then we will be invoking the commands:
```
docker pull nnnnisidle/note-taking-app:1.0.1
docker-compose up
```

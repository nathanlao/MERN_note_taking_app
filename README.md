# React Note-taking App
### Overview
A font-end app using `React` and install it on an `IIS web server`. The goal is to play around with server side, set up IIS server and test my JavaScript files.

Live-demo: https://mellifluous-cascaron-eb5884.netlify.app/

<p align="center">
<img width="480" alt="note-taking app" src="https://user-images.githubusercontent.com/75557717/215304692-163d4bf3-9fc5-41f7-ad0a-86e502f875b3.png">
</p>

## Front-end React Application
- Root component of the application contains two subcomponents: `EditNotes` and `ListNotes`
- `EditNotes` component contains a textarea and a button
- `ListNotes` component contains a list of created notes along with links to saved notes. Pop-up window will show when user clicks on notes

### Concepts used:
- `useState()` to keep track of arrays of notes objects, watch for inputs in textarea
- `useEffect()` for side effect, in this case, storing notes in `localStorage`
- Passing state as `props` to subcomponents
- `Form` submit
- `map()` each note element into an array of JSX elements
- Conditional rendering the pop-up window
- Using `relative unit` and `media query` in CSS styling

## Server
- Created a `Windows Server 2012-R2 Virtual Machine` instance on `Google Cloud Platform`
- Installed and config `IIS Web Server` on VM
- Set up the web app by creating a `bucket` and transferring files to the default folder`(wwwroot)` to server through Cloud Storage
- Access the web page through external IP address

# apron-test

## Installation

Ensure you have node 20+ installed!

### Frontend

cd ./apron-booking-system

npm install

### Backend

cd ./backend

npm install


## Running

Both the frontend (apron-booking-system) and backend need to be running in order for the application to work. See below instructions

### Frontend

make sure you are in directory: ./apron-booking-system

npm run dev (check logs to see port used. Should be http://localhost:5173)

### Backend

make sure you are in directory: ./backend

node server.js (should be running on localhost:5000)


## Testing

npm run test (tests written in vitest which is very similar to Jest and react-testing-library)

npm run e2e (using Playwright)


## Tech stack

React 18
Typescript
Vite
react-hook-form
react-query
react-testing-library
playwright
stitches
ag-grid


## Notes and possible improvements

I have not used stitches before but I wanted to use it for this test so that I become accustomed to the library if I were to get a role at Apron. However
I am not sure about best practices so I feel this could be improved.

I have not implemented the UI to fit different screen sizes. This could be achieved using breakpoint values per screen size (sm, m, xl etc) and using different css values for each.

I completely missed the recommendation to use yup for form validation! However, I think I have covered the main use cases for this using react-hook-forms and have written tests against those use cases. 

The example users in the Figma file dont follow the use cases in the spec (for example 5 letter first name requirement.) So you wont be able to edit some users unless you 
meet the first name/last name character criteria. 

I tried to follow the UI from Figma as closely as possible. However I may have missed things due to time constraints and I wasnt sure how best to style the Ag-Grid. 

I have added tests using vitest/react-testing-library and playwright. I do feel testing is one of the most important aspects of web engineering. However, I may have missed some test cases or I could have expanded the e2e tests further.

I would also add coverage checks and perhaps the ability to integrate testing into a pre-check github-action using a YML file. 

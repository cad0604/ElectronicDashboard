# Amber Coding Challenge

Hello and welcome to the Amber coding challenge. We've chosen this task to be broadly representative of the kind of work you would be doing if you join the team. Our intention is that this would take around 4 hours of your time.

Your task is to build some or all of a customer's energy use dashboard. It's a bit of a choose your own adventure where you can go as broad or deep as you like across the frontend and backend as suits your own particular skillset.

The code challenge will be reviewed by two of our engineers before proceeding to the technical interview, where we will use it as a springboard to discuss technical decisions. All candidates perform the same test regardless of experience level, but expectations on polish and quality of discussion on underlying approach in the follow up interview scale with seniority.

## Versions of the test

* [Frontend Version](#frontend-version)
* [Backend Version](#backend-version)
* [Fullstack Version](#fullstack-version)

### Frontend Version

Use the randomly generated test data the server returns by default and build the UI for the dashboard

Your dashboard MUST:

* Show the date range the usage summary covers
* Prominently display the total amount of electricity used in the period covered by the usage summary
* Prominently display the average daily amount of electricity used in the period covered by the usage summary
* Include a tabular view of daily usage data embedded in the summary

Other tips

* Use your preferred CSS approach (ie styled-components, inline styles, vanilla asset bundling) but be prepared to discuss alternatives in follow up
* The initial data bootstrap in App.js is using hooks, but it's OK to switch to class based components if that's your preference
* Keep an eye out for the artificial time delay on the server, it's there to encourage you to think about loading states in the UI

### Backend Version

Do not worry about the UI (but make sure what's there still builds) but instead change the server to return a "real" UsageSummary based on smart meter data

* In `server/app.ts` comment/uncomment the relevant code to switch from sample to real data
* You must implement all compulsory fields on `UsageSummary` (totals and averages for varying time horizons)
* Bonus points for also calculating the optional field `UsagePeak`. [What is peak demand](https://www.enertiv.com/resources/faq/what-is-peak-demand) can help you understand the underlying concept there

Other tips

* Good tests carry a lot of bonus points here
* Information on the CSV file format can be found at [github.com/charliedotau/Smart-Meter-File-Format-Examples-Aus](https://github.com/charliedotau/Smart-Meter-File-Format-Examples-Aus). Short version: ignore the first 3 columns, column 4 is the date, and columns 6+ are the kwH used in each half hour window.
* Keep an eye out for the nominated units on data fields. [kW !== kWh](https://www.solarquotes.com.au/blog/kw-and-kwh-what-is-the-difference/)
* There's no right or wrong answer on classes vs functional style, but it's important you have some kind of decomposition and organisational approach you can speak to in the follow up interview

### Fullstack Version

* Do both the frontend and backend challenges together
* **BUT do a really light version of each**
* Seriously don't go too hard here, definitely skip `UsagePeak`

## General Tips

* Don't try to boil the ocean and show off across every aspect of the challenge, get it working end to end and then put your personal shine into one area. We want to be respectful of your time so pick a particular domain and explicitly tell us alongside your submission where you put your focus.
* Once the minimum requirements are met there are no right or wrong answers, instead this challenge is used as a conversation starter about your abilities in a follow up interview.
* Feel free to add any external libraries as needed but the app needs to install and run cleanly on our machines so be conservative
* The challenge is provided to you as a tarred up git repo, returning it the same way with your own commits showing work in progress is appreciated
* Adding tests is not required but is appreciated, especially if you're trying to highlight more "backend" like skills
* You are free to add, remove, or change libraries as you see fit. We provided a relatively full skeleton of build and testing tools as a convenience to minimise unnecessary time spent wrestling npm packages

**Please do not upload your submission as a public git repository.**

# Dev Process

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and you can run it with the commands listed below.

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Runs all the tests. To explicitly run tests for backend or frontend use:

* `yarn test:server` for the backend
* `yarn test:app` for the frontend

My Skype address is : live:.cid.744dc7644d403232
If you have another work, call me with skype. thank you.
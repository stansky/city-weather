## Hilton Dev Assessment

For this code assessment, we expect you to make the changes listed in the `Deliverables` sections and then email us the link to your codesandbox instance that has your changes. (As soon as you make a change and save it, it will fork this project and create a unique url for you).

## Setup

You need to sign up for an OpenWeather API key. Instructions are here: https://openweathermap.org/appid

After you get your API, add that as API_KEY in city-weather.tsx

## Mock bug report

Steps to reproduce:

1. Type a valid US city in the "Weather Search" box
1. Press {enter}

Expected results
User should see the current weather results for that city

Actual Results:
App crashes

## Deliverable 1:

1. Fix the bug
   - Treating this like a bug ticket, identify the bug in the application and provide a fix.
2. Talk about your changes
   - Write a short description about what was the underlying cause of the bug and how you fixed it

## Deliverable 2:

1. Create a city-weather-refactor.tsx file, in which you refactor the city-weather component to use react hooks rather than React.Component. Incorporate the following:

   1. Match the design
      - A designer has provided a comp on how this app should look (see design.png)
        - To match the design you may need to use different fields that are retuned from teh openweathermap API. For example, the weather condition three digit code can be [mapped to the icons here](https://openweathermap.org/weather-conditions)
      - Tailwindcss is installed and configured for you
   2. Improve web accessibility
      - Ensure that clicking on the label "Weather Search" puts focus into the text-input.
      - Make sure any loading states are correctly announced to a screen reader
   3. Make the tests better
      - There was a test written for this feature but it clearly didn't catch the bug, make the test better (you can open a new terminal in the bottom right of code sandbox and `yarn test`)

2. Talk about your changes
   - For the refactor and other accompanying tasks, include any other thoughts, assumptions, or known compromises in how you approached the work.



----

## Bug Findings
The bug experienced was the in the `CityWeather` component. The component makes an api call and renders the results in the DOM. 

Due to the API call being made in the `ComponentDidMount` lifecycle hook, the DOM would attempt to access properties on a null object while rendering, even though the API call was pending, resulting in error. 

The simple fix to this would be to wrap the `CityWeather` return html in a jsx conditional, i.e. `{weatherResult && ( ... )}`. This would prevent the error when the user searches for a city. 

Due to the API call being in the `ComponentDidMount` lifecycle hook, the component will only display the weather data for the first city search. 

To fix this, I moved the API call logic to a new function, and call that in `ComponentDidMount` as well as `ComponentDidUpdate`, which will fire every-time the city prop is changed from the previous value. This will let the user search for a new city and display the weather without needing to reload the page. 

## Refactoring

The main refactoring work was changing this from a class component to a functional component, so I could use the `useEffect` hook. 

The logic is similar to before; `useEffect` will call an async method to do a fetch call to the weather API. The method will handle setting simple states for `loading` and `error` to conditionally render a screen-reader only message for loading, an alert message for an unsuccessful API call. 

The `useEffect` hook takes in the city prop as a param, so when that changes, the API will be called again to get new weather data. 

An `htmlFor` attribute was added to the search label to bring focus to the input `onClick`. 

## Design
The design layout is flexbox based, with the search box doing a column based flex layout, and the weather data being row based. Items are centered vertically and horizontally, with padding on the containers, and margins between stacked elements. 

The design is responsive, although small screens could be better suited by a vertically stacked search input section. 

For accessibility consideration, the design could be modified to include an `<h1>` tag for `Weather Results` and the city name could be an `<h2>`

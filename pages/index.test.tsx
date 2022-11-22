import { rest } from "msw";
import { setupServer } from "msw/node";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import "isomorphic-unfetch";

import App from "./index";

const server = setupServer(
  rest.get("https://api.openweathermap.org/*", (req, res, ctx) => {
    return res(
      ctx.json({
        weather: [
          {
            description: "Overcast clouds",
          },
        ],
        main: {
          // temp in Kelvin
          temp: 295.372,
        },
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("loads and displays weather input", async () => {
  render(<App />);

  userEvent.click(screen.getByText("Weather Search:"));

  expect(screen.getByTestId("weather-input")).toHaveFocus();
});

test("handles server error", async () => {
  server.use(
    rest.get(
      "https://api.openweathermap.org/data/2.5/weather",
      (req, res, ctx) => {
        return res(ctx.status(500));
      }
    )
  );

  render(<App />);

  const input = screen.getByTestId("weather-input");
  fireEvent.change(input, { target: { value: "denver" } });
  screen.getByTestId("weather-submit").click();

  await waitFor(() => {
    expect(screen.getByText("Error fetching weather data")).toBeInTheDocument();
  });
});

test("fetches and displays weather data ", async () => {
  render(<App />);

  const input = screen.getByTestId("weather-input");
  fireEvent.change(input, { target: { value: "denver" } });
  screen.getByTestId("weather-submit").click();

  await waitFor(() => {
    expect(screen.getByTestId("city-name")).toHaveTextContent('denver');
    expect(screen.getByText("Overcast clouds")).toBeInTheDocument();
    expect(screen.getByText("Temperature:")).toBeInTheDocument();
    expect(screen.getByText("72 ℉")).toBeInTheDocument();
  });
});

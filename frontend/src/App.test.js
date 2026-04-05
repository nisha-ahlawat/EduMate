import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./api/client", () => ({
  __esModule: true,
  default: {
    post: jest.fn(() => Promise.resolve({ data: {} })),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    },
  },
  setAccessToken: jest.fn(),
}));

test("renders login role selection", () => {
  render(<App />);
  expect(screen.getByRole("button", { name: /^Student$/i })).toBeInTheDocument();
});

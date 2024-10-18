// App.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

// Mock Math.random to control the location of the dog
beforeEach(() => {
  jest.spyOn(Math, "random").mockReturnValue(0.3); // This ensures consistent dog location for tests
});

afterEach(() => {
  jest.spyOn(Math, "random").mockRestore(); // Restore Math.random after each test
});

describe("Find the Dog Game", () => {
  test("Requirement 1: User clicks on a button in the grid", () => {
    render(<App />);
    const gridButton = screen.getAllByRole("button")[0]; // Get the first button
    fireEvent.click(gridButton); // Simulate clicking the button
    expect(gridButton).toBeInTheDocument(); // Check that the button exists
  });

  test("Requirement 2: Proximity calculation between clicked button and dog location", () => {
    render(<App />);
    const gridButton = screen.getAllByRole("button")[0];
    fireEvent.click(gridButton);
    const clickedDistance = gridButton.textContent;
    expect(parseInt(clickedDistance, 10)).toBeGreaterThan(0); // Expect distance to be greater than 0
  });

  test("Requirement 3: Color changes based on proximity to the dog", () => {
    render(<App />);
    const gridButton = screen.getAllByRole("button")[0];
    fireEvent.click(gridButton);
    expect(gridButton).toHaveStyle("background-color: blue"); // Expect button to be blue (far from the dog)
  });

  test("Requirement 4: Reset button hides the dog in a new location", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Reset")); // Click the reset button
    const gridButtons = screen.getAllByRole("button");
    gridButtons.forEach((button) => {
      expect(button).toHaveTextContent("?"); // All buttons should be reset to ?
    });
  });

  test("Requirement 5: Displays a message when the dog is found", () => {
    render(<App />);
    const dogButton = screen.getAllByRole("button")[6]; // This is where the dog is hidden
    fireEvent.click(dogButton);
    expect(window.alert).toHaveBeenCalledWith("You found the dog!"); // Expect the alert to appear
  });

  test("Requirement 6: Displays the number of attempts made by the user", () => {
    render(<App />);
    fireEvent.click(screen.getAllByRole("button")[0]);
    expect(screen.getByText(/Attempts: 1/i)).toBeInTheDocument(); // Expect "Attempts: 1"
  });

  test("Requirement 7: Allows users to adjust the size of the grid", () => {
    render(<App />);
    const select = screen.getByLabelText(/Grid Size/i); // Simulate a dropdown for grid size
    fireEvent.change(select, { target: { value: "7" } }); // Change grid size to 7x7
    const gridButtons = screen.getAllByRole("button");
    expect(gridButtons.length).toBe(49); // Expect 49 buttons in 7x7 grid
  });

  test("Requirement 8: Timer tracks time until the dog is found", () => {
    render(<App />);
    fireEvent.click(screen.getAllByRole("button")[0]);
    const timer = screen.getByText(/Time: /i);
    expect(timer).toBeInTheDocument(); // Timer should be displayed after first click
  });

  test("Requirement 9: Provides hints based on proximity to the dog", () => {
    render(<App />);
    fireEvent.click(screen.getAllByRole("button")[0]);
    const hint = screen.getByText(/You are far away/i);
    expect(hint).toBeInTheDocument(); // Expect a hint to appear after clicking
  });

  test("Requirement 10: Allows users to toggle the proximity color guide on or off", () => {
    render(<App />);
    const toggle = screen.getByLabelText(/Proximity Color Guide/i); // Simulate a toggle switch
    fireEvent.click(toggle); // Turn off the color guide
    fireEvent.click(screen.getAllByRole("button")[0]);
    expect(screen.getAllByRole("button")[0]).not.toHaveStyle(
      "background-color"
    ); // Color should not change
  });

  test("Requirement 11: Displays a game over screen when the user finds the dog", () => {
    render(<App />);
    const dogButton = screen.getAllByRole("button")[6]; // This is where the dog is hidden
    fireEvent.click(dogButton);
    expect(screen.getByText(/You found the dog!/i)).toBeInTheDocument(); // Game over screen appears
  });

  test("Requirement 12: Restart option is displayed after finding the dog", () => {
    render(<App />);
    const dogButton = screen.getAllByRole("button")[6]; // This is where the dog is hidden
    fireEvent.click(dogButton);
    expect(screen.getByText(/Play again/i)).toBeInTheDocument(); // Restart button appears after game over
  });
});

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import DashboardClient from "@/components/DashboardClient";

const mockWeekData = [
  { day: "Mon", mood: 3, isToday: false },
  { day: "Tue", mood: 5, isToday: false },
  { day: "Wed", mood: null, isToday: false },
  { day: "Thu", mood: 2, isToday: false },
  { day: "Fri", mood: 4, isToday: false },
  { day: "Sat", mood: 1, isToday: false },
  { day: "Sun", mood: 4, isToday: true },
];

describe("DashboardClient", () => {
  it("renders all 7 day labels", () => {
    render(<DashboardClient weekData={mockWeekData} />);
    expect(screen.getByText("Mon")).toBeInTheDocument();
    expect(screen.getByText("Tue")).toBeInTheDocument();
    expect(screen.getByText("Wed")).toBeInTheDocument();
    expect(screen.getByText("Sun")).toBeInTheDocument();
  });

  it("renders today indicator for current day", () => {
    const { container } = render(<DashboardClient weekData={mockWeekData} />);
    // Today (Sun) should have the lavender-deep text class
    expect(container.innerHTML).toContain("text-lavender-deep");
  });

  it("renders 7 bar elements", () => {
    const { container } = render(<DashboardClient weekData={mockWeekData} />);
    // Each day has a flex-1 column
    const cols = container.querySelectorAll(".flex-1.flex.flex-col");
    expect(cols.length).toBe(7);
  });

  it("shows placeholder bar for null mood day", () => {
    const { container } = render(<DashboardClient weekData={mockWeekData} />);
    // Wed has null mood — should render bg-borderLight fallback div
    expect(container.innerHTML).toContain("bg-borderLight");
  });
});

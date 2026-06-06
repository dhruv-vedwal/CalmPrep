import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CrisisBanner from "@/components/CrisisBanner";

describe("CrisisBanner", () => {
  it("renders without crashing", () => {
    render(<CrisisBanner />);
    expect(screen.getByText(/need to talk to someone/i)).toBeInTheDocument();
  });

  it("displays all three helpline options", () => {
    render(<CrisisBanner />);
    expect(screen.getByText(/iCall/i)).toBeInTheDocument();
    expect(screen.getByText(/Vandrevala/i)).toBeInTheDocument();
    expect(screen.getByText(/iMind/i)).toBeInTheDocument();
  });

  it("helpline links have correct tel: href", () => {
    render(<CrisisBanner />);
    const iCallLink = screen.getByRole("link", { name: /iCall/i });
    expect(iCallLink).toHaveAttribute("href", "tel:9152987821");

    const vandrevalaLink = screen.getByRole("link", { name: /Vandrevala/i });
    expect(vandrevalaLink).toHaveAttribute("href", "tel:18602662345");
  });

  it("mentions 24/7 availability for accessibility", () => {
    render(<CrisisBanner />);
    expect(screen.getByText(/24\/7/i)).toBeInTheDocument();
  });
});

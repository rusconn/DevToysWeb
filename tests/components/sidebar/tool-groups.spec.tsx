import { type Location, useLocation } from "react-router";

import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ToolGroups } from "../../../app/layout/sidebar/tool-groups";

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useLocation: vi.fn(),
    Link: vi.fn(({ children, to, ...props }) => (
      <a href={to} {...props}>
        {children}
      </a>
    )),
  };
});

function navExpandedButton() {
  return screen.queryByRole("button", { expanded: true });
}

function returnValue(pathname: string) {
  return { pathname } as Location;
}

describe("initial open/close states of accordion", () => {
  it("closed when go to /", () => {
    vi.mocked(useLocation).mockReturnValue(returnValue("/"));
    render(<ToolGroups />);
    expect(navExpandedButton()).not.toBeInTheDocument();
  });

  it("closed when go to group pages", () => {
    vi.mocked(useLocation).mockReturnValue(returnValue("/converters"));
    render(<ToolGroups />);
    expect(navExpandedButton()).not.toBeInTheDocument();

    vi.mocked(useLocation).mockReturnValue(returnValue("/formatters"));
    render(<ToolGroups />);
    expect(navExpandedButton()).not.toBeInTheDocument();
  });

  it("opened when go to /converters/number-base", () => {
    vi.mocked(useLocation).mockReturnValue(returnValue("/converters/number-base"));
    render(<ToolGroups />);
    expect(navExpandedButton()).toBeInTheDocument();
  });

  it("opened when go to /formatters/json", () => {
    vi.mocked(useLocation).mockReturnValue(returnValue("/formatters/json"));
    render(<ToolGroups />);
    expect(navExpandedButton()).toBeInTheDocument();
  });
});

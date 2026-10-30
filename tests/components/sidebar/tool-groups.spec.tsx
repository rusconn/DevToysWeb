import { createPath, type LinkProps, MemoryRouter } from "react-router";

import { cleanup, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ToolGroups } from "../../../app/layout/sidebar/tool-groups";

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");

  return {
    ...actual,
    Link: ({ children, prefetch: _prefetch, to, ...props }: LinkProps) => (
      <a href={typeof to === "string" ? to : createPath(to)} {...props}>
        {children}
      </a>
    ),
  };
});

function navExpandedButton() {
  return screen.queryByRole("button", { expanded: true });
}

function renderToolGroups(pathname: string) {
  cleanup();
  render(
    <MemoryRouter initialEntries={[pathname]}>
      <ToolGroups />
    </MemoryRouter>,
  );
}

describe("initial open/close states of accordion", () => {
  it("closed when go to /", () => {
    renderToolGroups("/");
    expect(navExpandedButton()).not.toBeInTheDocument();
  });

  it("opened when go to group pages", () => {
    renderToolGroups("/converters");
    expect(navExpandedButton()).toBeInTheDocument();

    renderToolGroups("/formatters");
    expect(navExpandedButton()).toBeInTheDocument();
  });

  it("opened when go to /converters/number-base", () => {
    renderToolGroups("/converters/number-base");
    expect(navExpandedButton()).toBeInTheDocument();
  });

  it("opened when go to /formatters/json", () => {
    renderToolGroups("/formatters/json");
    expect(navExpandedButton()).toBeInTheDocument();
  });
});

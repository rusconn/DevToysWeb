import { usePathname } from "next/navigation";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ToolGroups } from "../../../app/_layout/sidebar/tool-groups";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

function navExpandedButton() {
  return screen.queryByRole("button", { expanded: true });
}

describe("initial open/close states of accordion", () => {
  it("closed when go to /", () => {
    vi.mocked(usePathname).mockReturnValue("/");
    render(<ToolGroups />);

    expect(navExpandedButton()).not.toBeInTheDocument();
  });

  it("closed when go to group pages", () => {
    vi.mocked(usePathname).mockReturnValue("/converters");
    render(<ToolGroups />);
    expect(navExpandedButton()).not.toBeInTheDocument();

    vi.mocked(usePathname).mockReturnValue("/formatters");
    render(<ToolGroups />);
    expect(navExpandedButton()).not.toBeInTheDocument();
  });

  it("opened when go to /converters/number-base", () => {
    vi.mocked(usePathname).mockReturnValue("/converters/number-base");
    render(<ToolGroups />);
    expect(navExpandedButton()).toBeInTheDocument();
  });

  it("opened when go to /formatters/json", () => {
    vi.mocked(usePathname).mockReturnValue("/formatters/json");
    render(<ToolGroups />);
    expect(navExpandedButton()).toBeInTheDocument();
  });
});

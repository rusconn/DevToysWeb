import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { SearchBar } from "../../../app/layout/sidebar/search-bar";

const { navigate } = vi.hoisted(() => ({ navigate: vi.fn() }));

vi.mock("react-router", async () => {
  const actual = await vi.importActual<typeof import("react-router")>("react-router");

  return {
    ...actual,
    useNavigate: () => navigate,
    PrefetchPageLinks: () => null,
  };
});

beforeEach(() => {
  navigate.mockClear();
});

function renderSearchBar() {
  render(<SearchBar />);

  return {
    form: screen.getByRole("form", { name: "Tool search" }),
    input: screen.getByPlaceholderText("Type to search for tools…"),
    searchButton: screen.getByRole("button", { name: "Search tools" }),
  };
}

function typeText(input: HTMLElement, text: string) {
  fireEvent.change(input, { target: { value: text } });
}

describe("search bar form", () => {
  it("navigates to search results when the form is submitted", () => {
    const { form, input } = renderSearchBar();

    typeText(input, "json yaml");
    // Enter triggers the implicit submission of the form.
    fireEvent.submit(form);

    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith({ pathname: "/search", search: "q=json%20yaml" });
  });

  it("trims and encodes the search text", () => {
    const { form, input } = renderSearchBar();

    typeText(input, "  a/b  ");
    fireEvent.submit(form);

    expect(navigate).toHaveBeenCalledWith({ pathname: "/search", search: "q=a%2Fb" });
  });

  it("navigates when the search button is clicked", () => {
    const { searchButton, input } = renderSearchBar();

    typeText(input, "hash");
    fireEvent.click(searchButton);

    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith({ pathname: "/search", search: "q=hash" });
  });

  it("does not submit the form when the clear button is clicked", () => {
    const { input } = renderSearchBar();

    typeText(input, "hash");
    const clearButton = screen.getByRole("button", { name: "Clear search text" });
    expect(clearButton).toHaveAttribute("type", "button");

    fireEvent.click(clearButton);

    expect(navigate).not.toHaveBeenCalled();
    expect(input).toHaveValue("");
  });

  it("submits without text", () => {
    const { form } = renderSearchBar();

    fireEvent.submit(form);

    expect(navigate).toHaveBeenCalledWith({ pathname: "/search", search: "q=" });
  });
});

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Uuid from "../../../app/routes/generators/uuid";

const generatedV4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function renderUuid() {
  render(<Uuid />);

  return {
    form: screen.getByRole("form", { name: "Generate UUIDs" }),
    generateButton: screen.getByRole("button", { name: "Generate UUID(s)" }),
    generatesInput: screen.getByRole("spinbutton", { name: "Number of UUIDs to generate" }),
    output: screen.getByRole("textbox") as HTMLTextAreaElement,
    clearButton: screen.getByRole("button", { name: "clear uuids" }),
  };
}

describe("uuid generate form", () => {
  it("generates a uuid when the generate button is clicked", () => {
    const { generateButton, output } = renderUuid();

    fireEvent.click(generateButton);

    expect(output.value.split("\n")).toEqual([expect.stringMatching(generatedV4)]);
  });

  it("generates the entered number of uuids when the form is submitted", () => {
    const { form, generatesInput, output } = renderUuid();

    fireEvent.change(generatesInput, { target: { value: "3" } });
    // Enter in the count input triggers the implicit submission of the form.
    fireEvent.submit(form);

    const lines = output.value.split("\n");
    expect(lines).toHaveLength(3);
    for (const line of lines) {
      expect(line).toMatch(generatedV4);
    }
  });

  it("clears the output without submitting the form", () => {
    const { generateButton, clearButton, output } = renderUuid();

    fireEvent.click(generateButton);
    expect(clearButton).toHaveAttribute("type", "button");

    fireEvent.click(clearButton);

    expect(output.value).toBe("");
  });

  it("keeps the count input within the allowed range", () => {
    const { generatesInput } = renderUuid();

    expect(generatesInput).toHaveAttribute("min", "1");
    expect(generatesInput).toHaveAttribute("max", "1000");
  });
});

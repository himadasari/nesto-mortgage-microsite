import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import type { Applicant } from "../../types";
import ApplicationForm from "../../components/ApplicationForm";

const initialData: Applicant = {
    firstName: "Ava",
    lastName: "Thompson",
    email: "ava.thompson@client.ca",
    phone: "4165550198",
  };

describe("ApplicationForm", () => {
  it("renders initial applicant details", () => {
    render(
      <ApplicationForm
        initialData={initialData}
        onSubmit={vi.fn()}
        isLoading={false}
      />
    );

    expect(screen.getByDisplayValue("Ava")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Thompson")).toBeInTheDocument();
    expect(
      screen.getByDisplayValue("ava.thompson@client.ca")
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue("4165550198")).toBeInTheDocument();
  });

  it("updates applicant information on input change", () => {
    render(
      <ApplicationForm
        initialData={initialData}
        onSubmit={vi.fn()}
        isLoading={false}
      />
    );

    const emailInput = screen.getByDisplayValue(
      "ava.thompson@client.ca"
    );

    fireEvent.change(emailInput, {
      target: { value: "ava.updated@client.ca" },
    });

    expect(emailInput).toHaveValue("ava.updated@client.ca");
  });

  it("submits updated applicant data", () => {
    const handleSubmit = vi.fn();

    render(
      <ApplicationForm
        initialData={initialData}
        onSubmit={handleSubmit}
        isLoading={false}
      />
    );

    const phoneInput = screen.getByDisplayValue("4165550198");

    fireEvent.change(phoneInput, {
      target: { value: "6475550123" },
    });

    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(handleSubmit).toHaveBeenCalledWith({
      ...initialData,
      phone: "6475550123",
    });
  });

  it("disables submit button while saving", () => {
    render(
      <ApplicationForm
        initialData={initialData}
        onSubmit={vi.fn()}
        isLoading={true}
      />
    );

    const button = screen.getByRole("button");

    expect(button).toBeDisabled();
  });
});
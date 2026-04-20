import { useState } from "react";
import type { Applicant } from "../types";

const ApplicationForm = ({
  initialData,
  onSubmit,
  isLoading,
}: {
  initialData?: Applicant;
  onSubmit: (data: Applicant) => void;
  isLoading: boolean;
}) => {
  const [formData, setFormData] = useState<Applicant>({
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
  });

  const handleChange = (field: keyof Applicant, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="application-form">
        <div className="form-row">
            <label htmlFor="firstName">First Name</label>
            <input
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
            />
        </div>
        <div className="form-row">
            <label htmlFor="lastName">Last Name</label>
            <input
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
            />
        </div>
        <div className="form-row">
            <label htmlFor="email">Email</label>
            <input
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
            />
        </div>
        <div className="form-row">
            <label htmlFor="phone">Phone</label>
            <input
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
            />
        </div>
        <button
            className="application-form__submit-button"
            type="submit"
            disabled={isLoading}
        >
            {isLoading ? "Saving..." : "Save Application"}
        </button>
    </form>
  );
};

export default ApplicationForm;
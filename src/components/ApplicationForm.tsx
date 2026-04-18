import { useState } from "react";
import type { Applicant } from "../types";

const validateFields = (data: Applicant) => {
  const errors: Partial<Record<keyof Applicant, string>> = {};

  if (!data.firstName.trim()) {
    errors.firstName = "First name is required";
  }

  if (!data.email.includes("@")) {
    errors.email = "Invalid email";
  }

  if (data.phone.length < 10) {
    errors.phone = "Phone must be at least 10 digits";
  }

  return errors;
};

export const ApplicationForm = ({
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

  const [errors, setErrors] = useState<Partial<Record<keyof Applicant, string>>>({});

  const handleChange = (field: keyof Applicant, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateFields(formData);

    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
    }

    setErrors({});
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="application-form">
        <div className="form-row">
            <label htmlFor="firstName">First Name<span aria-hidden="true" className="required">*</span></label>
            <input
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                required
            />
            {errors.firstName && <p className="error">{errors.firstName}</p>}
        </div>
        <div className="form-row">
            <label htmlFor="lastName">Last Name</label>
            <input
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
            />
        </div>
        <div className="form-row">
            <label htmlFor="email">Email<span aria-hidden="true" className="required">*</span></label>
            <input
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
            />
            {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-row">
            <label htmlFor="phone">Phone<span aria-hidden="true" className="required">*</span></label>
            <input
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                required
            />
            {errors.phone && <p className="error">{errors.phone}</p>}
        </div>
        <button disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Application"}
        </button>
    </form>
  );
};
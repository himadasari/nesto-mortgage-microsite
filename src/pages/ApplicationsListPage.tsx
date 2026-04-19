import React from "react";
import { useNavigate } from "react-router-dom";
import { useApplications } from "../hooks/useApplications";

const ApplicationsListPage = () => {
    const {data, isLoading, isError} = useApplications();
    const navigate = useNavigate();

    const handleEdit = (id: string) => {
        navigate(`/application/${id}`);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error occurred while fetching applications.</div>;
    }

    const validApplications = data?.filter((app) => {
    const applicant = app.applicants?.[0];
    if (!applicant) return false;

    return (
        applicant?.firstName &&
        applicant?.lastName &&
        applicant?.email &&
        applicant?.phone
    );
    });

    if (!validApplications?.length) {
        return <div>No completed applications yet</div>;
    }

    return (
        <div className="applications">
            <h1>Applications</h1>
            <div className="applications__table-container">
                <table className="applications__table">
                    <thead className="applications__table-header">
                        <tr className="applications__row applications__row--head">
                            <th className="applications__cell">Full Name</th>
                            <th className="applications__cell">Email</th>
                            <th className="applications__cell">Phone Number</th>
                            <th className="applications__cell">Action</th>
                        </tr>
                    </thead>
                    <tbody className="applications__table-body">
                        {validApplications.map((application) => {
                            const applicant = application.applicants?.[0];
                            if (!applicant) return null;

                            return (
                                <tr key={application.id} className="applications__row">
                                    <td className="applications__cell">{applicant.firstName} {applicant.lastName}</td>
                                    <td className="applications__cell">{applicant.email}</td>
                                    <td className="applications__cell">{applicant.phone}</td>
                                    <td className="applications__cell">
                                        <button type="button" className="applications__button" onClick={() => handleEdit(application.id)}>
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApplicationsListPage;
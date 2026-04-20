import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApplications } from '../hooks/useApplications';
import { translations } from '../i18/translations';
import { useLanguage } from '../hooks/useLanguage';

const ApplicationsListPage = () => {
  const { data, isLoading, isError } = useApplications();
  const [searchString, setSearchString] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'email'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];

  const handleEdit = (id: string) => {
    navigate(`/application/${id}`);
  };

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

  const handleSort = (column: 'name' | 'email') => {
    if (sortBy === column) {
      // same column, toggle direction
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      // new column, set column + reset direction
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const visibleApplications = useMemo(() => {
    const term = searchString.trim().toLowerCase();

    let items = validApplications ?? [];

    // Filter
    if (term) {
      items = items.filter((app) => {
        const applicant = app.applicants?.[0];

        const fullName =
          `${applicant?.firstName || ''} ${applicant?.lastName || ''}`.toLowerCase();
        const email = applicant?.email?.toLowerCase() || '';
        const phone = applicant?.phone || '';

        return (
          fullName.includes(term) ||
          email.includes(term) ||
          phone.includes(term)
        );
      });
    }

    // Sort
    return [...items].sort((a, b) => {
      const aApplicant = a.applicants?.[0];
      const bApplicant = b.applicants?.[0];

      const aName =
        `${aApplicant?.firstName || ''} ${aApplicant?.lastName || ''}`.toLowerCase();
      const bName =
        `${bApplicant?.firstName || ''} ${bApplicant?.lastName || ''}`.toLowerCase();

      const aEmail = aApplicant?.email?.toLowerCase() || '';
      const bEmail = bApplicant?.email?.toLowerCase() || '';

      let comparison = 0;

      if (sortBy === 'name') {
        comparison = aName.localeCompare(bName);
      } else if (sortBy === 'email') {
        comparison = aEmail.localeCompare(bEmail);
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [validApplications, searchString, sortBy, sortOrder]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching applications.</div>;
  }

  if (!validApplications?.length) {
    return <div>No applications with complete details yet</div>;
  }

  if (!visibleApplications.length) {
    return <div>No results found</div>;
  }

  return (
    <div className="applications">
      <h1>{t.applications}</h1>
      <input
        type="text"
        placeholder={t.searchPlaceholder}
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
        className="applications__search"
      />
      <div className="applications__table-container">
        <table className="applications__table">
          <thead className="applications__table-header">
            <tr className="applications__row applications__row--head">
              <th
                className="applications__cell"
                onClick={() => handleSort('name')}
              >
                Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th
                className="applications__cell"
                onClick={() => handleSort('email')}
              >
                Email {sortBy === 'email' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="applications__cell">Phone Number</th>
              <th className="applications__cell">Action</th>
            </tr>
          </thead>
          <tbody className="applications__table-body">
            {visibleApplications.map((application) => {
              const applicant = application.applicants?.[0];
              if (!applicant) return null;

              return (
                <tr key={application.id} className="applications__row">
                  <td className="applications__cell">
                    {applicant.firstName} {applicant.lastName}
                  </td>
                  <td className="applications__cell">{applicant.email}</td>
                  <td className="applications__cell">{applicant.phone}</td>
                  <td className="applications__cell">
                    <button
                      type="button"
                      className="applications__button"
                      onClick={() => handleEdit(application.id)}
                    >
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

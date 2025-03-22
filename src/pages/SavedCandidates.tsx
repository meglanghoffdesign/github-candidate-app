import { useEffect, useState } from 'react';
import { Candidate } from '../interfaces/Candidate.interface'; 

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(saved); 
  }, []);

  const removeCandidate = (index: number) => {
    const updatedCandidates = savedCandidates.filter((_, i) => i !== index);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates)); 
  };

  if (savedCandidates.length === 0) {
    return <p>No candidates accepted yet.</p>;
  }

  return (
    <div>
      <h1>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        <table className="candidate-table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Bio</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate, index) => (
              <tr key={index}>
                <td><img src={candidate.avatar_url} alt={`${candidate.name}'s avatar`} width="50" className="candidate-avatar-table"/></td>
                <td>{candidate.name ? (<span>{candidate.name} (<a href={`https://github.com/${candidate.login}`} target="_blank" rel="noopener noreferrer">{candidate.login}</a>)</span>) : (<a href={`https://github.com/${candidate.login}`} target="_blank" rel="noopener noreferrer">{candidate.login}</a>)}</td>
                <td>{candidate.location || 'Not provided'}</td>
                <td>{candidate.email ? (<a href={`mailto:${candidate.email}`}>{candidate.email}</a>) : (<span className="no-email">Not provided</span>)}</td>
                <td>{candidate.company || 'Not provided'}</td>
                <td>{candidate.bio || 'Not provided'}</td>
                <td><button className="skip-button" onClick={() => removeCandidate(index)}> -</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No saved candidates yet.</p>
      )}
    </div>
  );
};

export default SavedCandidates;
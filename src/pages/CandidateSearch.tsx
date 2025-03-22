import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface'; 

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null); 
  const [candidates, setCandidates] = useState<Candidate[]>([]); 
  const [index, setIndex] = useState<number>(0); 

  useEffect(() => {
    const fetchCandidates = async () => {
      const data = await searchGithub(); 
      const detailedCandidates = await Promise.all(
        data.map(async (user: Candidate) => {
          const details = await searchGithubUser(user.login); 
          return { ...user, ...details };
        })
      );

      setCandidates(detailedCandidates);
      if (detailedCandidates.length > 0) {
        setCandidate(detailedCandidates[0]);
      }
    };

    fetchCandidates();
  }, []);

  const saveCandidate = () => {
    if (candidate) {
      const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      if (!savedCandidates.some((savedCandidate: Candidate) => savedCandidate.login === candidate.login)) {
        savedCandidates.push(candidate);
        localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
        alert('Candidate saved successfully!');
      } else {
        alert('This candidate has already been saved!');
      }
    }
    goToNextCandidate();
  };

  const skipCandidate = () => {
    goToNextCandidate();
  };

  const goToNextCandidate = () => {
    if (index + 1 < candidates.length) {
      setIndex(index + 1);
      setCandidate(candidates[index + 1]);
    } else {
      setCandidate(null);
    }
  };

  if (!candidate) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Candidate Search</h1>
        <div className="candidate-card">
          <img src={candidate.avatar_url} alt={`${candidate.name}'s avatar`} className="candidate-avatar" width="100" />
          <div className="candidate-details">
            <h3><strong>{candidate.name ? (<span>{candidate.name} (<a href={`https://github.com/${candidate.login}`} target="_blank" rel="noopener noreferrer">{candidate.login}</a>)</span>) : (<a href={`https://github.com/${candidate.login}`} target="_blank" rel="noopener noreferrer">{candidate.login}</a>)}</strong></h3>
            <p>Location: {candidate.location || 'Not provided'}</p>
            <p>Email: {candidate.email ? (<a href={`mailto:${candidate.email}`}>{candidate.email}</a>) : (<span className="no-email">Not provided</span>)}</p>
            <p>Company: {candidate.company || 'Not provided'}</p>
            <p>Bio: {candidate.bio || 'Not provided'}</p>
          </div>
        </div>
        <div className="button-container">
          <button onClick={saveCandidate} className="save-button">+</button>
          <button onClick={skipCandidate} className="skip-button">-</button>
        </div>
    </div>
  );
};

export default CandidateSearch;
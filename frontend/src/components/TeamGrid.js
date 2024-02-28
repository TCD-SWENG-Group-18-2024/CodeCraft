// TeamGrid.js

import React, { useState } from 'react';
import teamMembersData from '../data/teamMembersData';
import '../styles/TeamGrid.css';
import Modal from './Modal';

const TeamGrid = () => {
    const [selectedMember, setSelectedMember] = useState(null);
  
    const handleMemberClick = member => {
      setSelectedMember(member);
    };
  
    const handleCloseModal = () => {
      setSelectedMember(null);
    };


    const groupByYear = (members) => {
      return members.reduce((group, member) => {
        const { year } = member;
        group[year] = group[year] ?? [];
        group[year].push(member);
        return group;
      }, {});
    };


    const groupedMembers = groupByYear(teamMembersData);

    return (
      <>

        {Object.entries(groupedMembers).map(([year, members]) => (
          <div key={year}>
            <h2 style={{color: '#F5F5F5'}}>{`${year} Year Students`}</h2>
            <div className="team-grid">
              {members.map(member => (
                <div key={member.id} className="team-member" onClick={() => handleMemberClick(member)}>
                  <div className="team-member-image-container">
                    <img src={member.image} alt={member.name} className="team-member-image" />
                  </div>
                  <div className="team-member-text">
                    <p className="team-member-name">{member.name}</p>
                    <p className="team-member-role">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        {selectedMember && (
          <Modal member={selectedMember} onClose={handleCloseModal} />
        )}
      </>
    );
};
  
export default TeamGrid;

import { Edit, X, Briefcase, Building, Calendar, Save, Plus } from 'lucide-react';
import React, { useState } from 'react'
import { currentUserActions } from '../../../store/CurrentUser/currentuser.slice';
import type { CurrentUserState, Experience, Skill } from '../../../store/CurrentUser/currentuser.types';
import { useAppDispatch } from '../../../store/hooks';
import Card from '../../../components/Card/Card';
import Button from '../../../components/Button/Button';

import './editProfile.scss'

interface EditProfileProps {
    profileData: CurrentUserState;
    setIsEditing: (isEditing: boolean) => void;
}
const EditProfile: React.FC<EditProfileProps> = ({ profileData, setIsEditing }) => {

    const [editData, setEditData] = useState<CurrentUserState>(profileData);

    const dispatch = useAppDispatch();


    const handleInputChange = (field: keyof CurrentUserState, value: any) => {
        setEditData(prev => ({ ...prev, [field]: value }));
    };

    const handleExperienceChange = (index: number, field: keyof Experience, value: string) => {
        const updatedExp = [...editData.experience];
        updatedExp[index] = { ...updatedExp[index], [field]: value };
        setEditData(prev => ({ ...prev, experience: updatedExp }));
    };

    const addExperience = () => {
        setEditData(prev => ({
            ...prev,
            experience: [
                { company: '', role: '', period: '', description: '' },
                ...prev.experience
            ]
        }));
    };

    const removeExperience = (index: number) => {
        setEditData(prev => ({
            ...prev,
            experience: prev.experience.filter((_, i) => i !== index)
        }));
    };

    const handleSkillChange = (index: number, field: keyof Skill, value: string) => {
        const updatedSkills = [...editData.skills];
        updatedSkills[index] = { ...updatedSkills[index], [field]: value as any };
        setEditData(prev => ({ ...prev, skills: updatedSkills }));
    };

    const addSkill = () => {
        setEditData(prev => ({
            ...prev,
            skills: [...prev.skills, { name: '', level: 'Beginner', category: 'General' }]
        }));
    };

    const removeSkill = (index: number) => {
        setEditData(prev => ({
            ...prev,
            skills: prev.skills.filter((_, i) => i !== index)
        }));
    };
    return (

        <Card className="edit-page-wrapper fade-in">
            <div className="section-header">
                <h2><Edit size={22} className="accent" /> Update Your Identity</h2>
                <p>Ensure your profile remains competitive and up-to-date.</p>
            </div>

            <div className="edit-form-grid">
                <div className="form-group half">
                    <label>First Name</label>
                    <input type="text" value={editData.firstName} onChange={(e) => handleInputChange('firstName', e.target.value)} />
                </div>
                <div className="form-group half">
                    <label>Last Name</label>
                    <input type="text" value={editData.lastName} onChange={(e) => handleInputChange('lastName', e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Headline</label>
                    <input type="text" value={editData.headline} onChange={(e) => handleInputChange('headline', e.target.value)} placeholder="e.g. Senior Full Stack Developer" />
                </div>
                <div className="form-group">
                    <label>Professional Bio</label>
                    <textarea rows={4} value={editData.bio} onChange={(e) => handleInputChange('bio', e.target.value)} />
                </div>
                <div className="form-group half">
                    <label>Email</label>
                    <input type="email" value={editData.email} onChange={(e) => handleInputChange('email', e.target.value)} />
                </div>
                <div className="form-group half">
                    <label>Phone</label>
                    <input type="text" value={editData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} />
                </div>
                <div className="form-group half">
                    <label>Github URL</label>
                    <input type="text" value={editData.github} onChange={(e) => handleInputChange('github', e.target.value)} />
                </div>
                <div className="form-group half">
                    <label>LinkedIn URL</label>
                    <input type="text" value={editData.linkedin} onChange={(e) => handleInputChange('linkedin', e.target.value)} />
                </div>
            </div>

            {/* Experience Edit */}
            <div className="edit-sub-section">
                <div className="sub-header">
                    <h3>Experience</h3>
                    <Button variant="ghost" size="sm" iconLeft={<Plus size={16} />} onClick={addExperience}>Add Experience</Button>
                </div>
                {editData.experience.map((exp, i) => (
                    <div key={i} className="edit-experience-card">
                        <button className="remove-btn" onClick={() => removeExperience(i)} aria-label="Remove experience">
                            <X size={16} />
                        </button>

                        <div className="card-row">
                            <div className="form-group">
                                <label><Briefcase size={14} /> Job Title</label>
                                <input
                                    type="text"
                                    value={exp.role}
                                    onChange={(e) => handleExperienceChange(i, 'role', e.target.value)}
                                    placeholder="e.g. Senior Software Engineer"
                                />
                            </div>
                            <div className="form-group">
                                <label><Building size={14} /> Company</label>
                                <input
                                    type="text"
                                    value={exp.company}
                                    onChange={(e) => handleExperienceChange(i, 'company', e.target.value)}
                                    placeholder="e.g. Google"
                                />
                            </div>
                        </div>

                        <div className="card-row">
                            <div className="form-group">
                                <label><Calendar size={14} /> Time Period</label>
                                <input
                                    type="text"
                                    value={exp.period}
                                    onChange={(e) => handleExperienceChange(i, 'period', e.target.value)}
                                    placeholder="e.g. Jan 2022 - Present"
                                />
                            </div>
                        </div>

                        <div className="form-group description-field">
                            <label>Key Responsibilities & Achievements</label>
                            <textarea
                                rows={3}
                                value={exp.description}
                                onChange={(e) => handleExperienceChange(i, 'description', e.target.value)}
                                placeholder="Describe your impact, technologies used, and key projects..."
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Skills Edit */}
            <div className="edit-sub-section">
                <div className="sub-header">
                    <h3>Skills</h3>
                    <Button variant="ghost" size="sm" iconLeft={<Plus size={16} />} onClick={addSkill}>Add Skill</Button>
                </div>
                <div className="edit-skills-grid">
                    {editData.skills.map((skill, i) => (
                        <div key={i} className="edit-skill-item">
                            <input type="text" value={skill.name} onChange={(e) => handleSkillChange(i, 'name', e.target.value)} placeholder="Skill name" />
                            <select value={skill.level} onChange={(e) => handleSkillChange(i, 'level', e.target.value)}>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                                <option value="Expert">Expert</option>
                            </select>
                            <button className="remove-skill-btn" onClick={() => removeSkill(i)}><X size={14} /></button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="form-actions">
                <Button variant="primary" iconLeft={<Save size={18} />} onClick={() => { dispatch(currentUserActions.setCurrentUser(editData)); setIsEditing(false); }}>
                    Save Changes
                </Button>
                <Button variant="ghost" onClick={() => setIsEditing(false)}>
                    Cancel
                </Button>
            </div>
        </Card>
    )
}

export default EditProfile
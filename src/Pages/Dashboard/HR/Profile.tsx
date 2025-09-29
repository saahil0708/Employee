import React, { useState, useEffect } from 'react';
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building,
  Clock,
  Edit,
  Save,
  Camera,
  Shield,
  Bell,
  Lock,
  Download,
  Upload,
  CheckCircle,
  FileText,
  XCircle,
  Eye,
  EyeOff,
  Trash2,
  Plus,
  Award,
  BookOpen,
  Briefcase,
  GraduationCap
} from 'lucide-react';

// Types
interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  hireDate: string;
  employeeId: string;
  avatar?: string;
  address: string;
  dateOfBirth: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  skills: string[];
  education: Education[];
  workExperience: WorkExperience[];
}

interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
  grade?: string;
}

interface WorkExperience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
}

// Mock data
const mockProfile: UserProfile = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@techcorp.com',
  phone: '+1 (555) 123-4567',
  position: 'Senior HR Manager',
  department: 'Human Resources',
  hireDate: '2022-03-15',
  employeeId: 'TC-2022-015',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  address: '123 Main Street, San Francisco, CA 94105',
  dateOfBirth: '1985-08-20',
  emergencyContact: {
    name: 'Jane Doe',
    phone: '+1 (555) 987-6543',
    relationship: 'Spouse'
  },
  skills: ['Recruitment', 'Employee Relations', 'HR Policies', 'Performance Management', 'Training & Development'],
  education: [
    {
      id: '1',
      degree: 'Master of Business Administration',
      institution: 'Stanford University',
      year: '2010-2012',
      grade: '3.8/4.0'
    },
    {
      id: '2',
      degree: 'Bachelor of Psychology',
      institution: 'University of California, Berkeley',
      year: '2006-2010',
      grade: '3.6/4.0'
    }
  ],
  workExperience: [
    {
      id: '1',
      company: 'TechCorp Inc.',
      position: 'Senior HR Manager',
      duration: '2022-Present',
      description: 'Leading HR operations, talent acquisition, and employee development programs.'
    },
    {
      id: '2',
      company: 'Innovate Solutions',
      position: 'HR Manager',
      duration: '2018-2022',
      description: 'Managed recruitment processes and implemented employee engagement initiatives.'
    },
    {
      id: '3',
      company: 'Global Enterprises',
      position: 'HR Specialist',
      duration: '2015-2018',
      description: 'Handled employee relations and performance management systems.'
    }
  ]
};

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>(mockProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'personal' | 'professional' | 'documents' | 'security'>('personal');
  const [editedProfile, setEditedProfile] = useState<UserProfile>(mockProfile);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  useEffect(() => {
    setEditedProfile(profile);
  }, [profile]);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    // Here you would typically make an API call to save the profile
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditedProfile({
          ...editedProfile,
          avatar: e.target?.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordChange = () => {
    // Validate and change password
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    // Here you would typically make an API call to change the password
    alert('Password changed successfully!');
    setIsChangingPassword(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const addSkill = (skill: string) => {
    if (skill && !editedProfile.skills.includes(skill)) {
      setEditedProfile({
        ...editedProfile,
        skills: [...editedProfile.skills, skill]
      });
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setEditedProfile({
      ...editedProfile,
      skills: editedProfile.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const TabButton: React.FC<{ tab: typeof activeTab; icon: React.ReactNode; label: string }> = ({ tab, icon, label }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full text-left ${
        activeTab === tab
          ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
          : 'text-gray-600 hover:bg-gray-50'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your personal and professional information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              {/* Profile Summary */}
              <div className="text-center mb-6">
                <div className="relative inline-block mb-4">
                  <img
                    src={profile.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=3b82f6&color=fff`}
                    alt={profile.name}
                    className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-lg"
                  />
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                      <Camera size={16} />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
                <p className="text-gray-600">{profile.position}</p>
                <p className="text-sm text-gray-500">{profile.department}</p>
              </div>

              <nav className="space-y-1">
                <TabButton tab="personal" icon={<User size={18} />} label="Personal Info" />
                <TabButton tab="professional" icon={<Briefcase size={18} />} label="Professional" />
                <TabButton tab="documents" icon={<BookOpen size={18} />} label="Documents" />
                <TabButton tab="security" icon={<Shield size={18} />} label="Security" />
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Personal Information Tab */}
            {activeTab === 'personal' && (
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
                      <p className="text-sm text-gray-600">Update your personal details and contact information</p>
                    </div>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Edit size={16} />
                        Edit Profile
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={handleCancel}
                          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSave}
                          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <Save size={16} />
                          Save Changes
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedProfile.name}
                          onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900">{profile.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={editedProfile.email}
                          onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <div className="flex items-center gap-2 text-gray-900">
                          <Mail size={16} />
                          {profile.email}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editedProfile.phone}
                          onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <div className="flex items-center gap-2 text-gray-900">
                          <Phone size={16} />
                          {profile.phone}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                      {isEditing ? (
                        <input
                          type="date"
                          value={editedProfile.dateOfBirth}
                          onChange={(e) => setEditedProfile({ ...editedProfile, dateOfBirth: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <div className="flex items-center gap-2 text-gray-900">
                          <Calendar size={16} />
                          {new Date(profile.dateOfBirth).toLocaleDateString()}
                        </div>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                      {isEditing ? (
                        <textarea
                          value={editedProfile.address}
                          onChange={(e) => setEditedProfile({ ...editedProfile, address: e.target.value })}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <div className="flex items-start gap-2 text-gray-900">
                          <MapPin size={16} className="mt-0.5" />
                          {profile.address}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Emergency Contact */}
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Contact Name</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editedProfile.emergencyContact.name}
                            onChange={(e) => setEditedProfile({
                              ...editedProfile,
                              emergencyContact: { ...editedProfile.emergencyContact, name: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-900">{profile.emergencyContact.name}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={editedProfile.emergencyContact.phone}
                            onChange={(e) => setEditedProfile({
                              ...editedProfile,
                              emergencyContact: { ...editedProfile.emergencyContact, phone: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-900">{profile.emergencyContact.phone}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editedProfile.emergencyContact.relationship}
                            onChange={(e) => setEditedProfile({
                              ...editedProfile,
                              emergencyContact: { ...editedProfile.emergencyContact, relationship: e.target.value }
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-900">{profile.emergencyContact.relationship}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Professional Information Tab */}
            {activeTab === 'professional' && (
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Professional Information</h2>
                  <p className="text-sm text-gray-600">Your work experience, education, and skills</p>
                </div>

                <div className="p-6 space-y-8">
                  {/* Basic Professional Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID</label>
                      <div className="flex items-center gap-2 text-gray-900">
                        <User size={16} />
                        {profile.employeeId}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                      <div className="flex items-center gap-2 text-gray-900">
                        <Briefcase size={16} />
                        {profile.position}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                      <div className="flex items-center gap-2 text-gray-900">
                        <Building size={16} />
                        {profile.department}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Hire Date</label>
                      <div className="flex items-center gap-2 text-gray-900">
                        <Calendar size={16} />
                        {new Date(profile.hireDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Skills & Expertise</h3>
                      {isEditing && (
                        <button
                          onClick={() => {
                            const skill = prompt('Enter a new skill:');
                            if (skill) addSkill(skill);
                          }}
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                        >
                          <Plus size={16} />
                          Add Skill
                        </button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          <Award size={12} />
                          {skill}
                          {isEditing && (
                            <button
                              onClick={() => removeSkill(skill)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <XCircle size={12} />
                            </button>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Education */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Education</h3>
                    <div className="space-y-4">
                      {profile.education.map((edu) => (
                        <div key={edu.id} className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                              <p className="text-gray-600">{edu.institution}</p>
                              <p className="text-sm text-gray-500">{edu.year}</p>
                              {edu.grade && <p className="text-sm text-gray-500">Grade: {edu.grade}</p>}
                            </div>
                            <GraduationCap size={20} className="text-gray-400" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Work Experience */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Work Experience</h3>
                    <div className="space-y-4">
                      {profile.workExperience.map((exp) => (
                        <div key={exp.id} className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-gray-900">{exp.position}</h4>
                              <p className="text-gray-600">{exp.company}</p>
                              <p className="text-sm text-gray-500">{exp.duration}</p>
                            </div>
                            <Briefcase size={20} className="text-gray-400" />
                          </div>
                          <p className="text-gray-700 text-sm">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Documents</h2>
                  <p className="text-sm text-gray-600">Manage your personal documents and certificates</p>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Upload Area */}
                    <div className="md:col-span-2">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-600 mb-2">Drag and drop files here or click to browse</p>
                        <p className="text-sm text-gray-500 mb-4">Supports PDF, images, Word documents</p>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          Upload Documents
                        </button>
                      </div>
                    </div>

                    {/* Document List */}
                    <div className="md:col-span-2">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">My Documents</h3>
                      <div className="space-y-3">
                        {[
                          { name: 'ID_Proof.pdf', date: '2024-01-15', size: '2.4 MB' },
                          { name: 'Degree_Certificate.jpg', date: '2024-01-10', size: '1.8 MB' },
                          { name: 'Resume.docx', date: '2024-01-08', size: '0.8 MB' }
                        ].map((doc, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <FileText size={20} className="text-gray-400" />
                              <div>
                                <p className="font-medium text-gray-900">{doc.name}</p>
                                <p className="text-sm text-gray-500">{doc.date} • {doc.size}</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button className="p-1 text-blue-600 hover:bg-blue-50 rounded-lg">
                                <Eye size={16} />
                              </button>
                              <button className="p-1 text-green-600 hover:bg-green-50 rounded-lg">
                                <Download size={16} />
                              </button>
                              <button className="p-1 text-red-600 hover:bg-red-50 rounded-lg">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Security Settings</h2>
                  <p className="text-sm text-gray-600">Manage your password and security preferences</p>
                </div>

                <div className="p-6 space-y-6">
                  {/* Change Password */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">Change Password</h3>
                        <p className="text-sm text-gray-600">Update your password to keep your account secure</p>
                      </div>
                      <button
                        onClick={() => setIsChangingPassword(!isChangingPassword)}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        {isChangingPassword ? 'Cancel' : 'Change Password'}
                      </button>
                    </div>

                    {isChangingPassword && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                          <div className="relative">
                            <input
                              type={showPassword.current ? "text" : "password"}
                              value={passwordData.currentPassword}
                              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword({ ...showPassword, current: !showPassword.current })}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showPassword.current ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                          <div className="relative">
                            <input
                              type={showPassword.new ? "text" : "password"}
                              value={passwordData.newPassword}
                              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword({ ...showPassword, new: !showPassword.new })}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showPassword.new ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                          <div className="relative">
                            <input
                              type={showPassword.confirm ? "text" : "password"}
                              value={passwordData.confirmPassword}
                              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showPassword.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={handlePasswordChange}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Update Password
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Security Preferences */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-4">Security Preferences</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                          <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Login Notifications</p>
                          <p className="text-sm text-gray-600">Get notified when someone logs into your account</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
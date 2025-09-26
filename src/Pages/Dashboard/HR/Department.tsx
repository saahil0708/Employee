import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Users, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Building, 
  User,
  Calendar,
  Mail,
  Phone,
  MapPin,
  TrendingUp,
  Clock,
  DollarSign,
  BadgeCheck
} from 'lucide-react';

// Types
interface Department {
  id: string;
  name: string;
  description: string;
  manager: string;
  employeeCount: number;
  budget: number;
  createdAt: string;
  color: string;
}

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  hireDate: string;
  department: string;
  status: 'active' | 'inactive';
  avatar?: string;
}

// Mock data
const mockDepartments: Department[] = [
  {
    id: '1',
    name: 'Engineering',
    description: 'Software development and technical operations',
    manager: 'Sarah Johnson',
    employeeCount: 47,
    budget: 4500000,
    createdAt: '2023-01-15',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: '2',
    name: 'Marketing',
    description: 'Brand management and customer acquisition',
    manager: 'Mike Chen',
    employeeCount: 23,
    budget: 1200000,
    createdAt: '2023-02-20',
    color: 'from-green-500 to-green-600'
  },
  {
    id: '3',
    name: 'Human Resources',
    description: 'Employee relations and talent management',
    manager: 'Emily Davis',
    employeeCount: 12,
    budget: 800000,
    createdAt: '2023-01-10',
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: '4',
    name: 'Finance',
    description: 'Financial planning and accounting',
    manager: 'Robert Wilson',
    employeeCount: 18,
    budget: 950000,
    createdAt: '2023-03-05',
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: '5',
    name: 'Sales',
    description: 'Revenue generation and client relationships',
    manager: 'Lisa Thompson',
    employeeCount: 35,
    budget: 2800000,
    createdAt: '2023-02-01',
    color: 'from-red-500 to-red-600'
  },
  {
    id: '6',
    name: 'Operations',
    description: 'Business operations and process optimization',
    manager: 'David Kim',
    employeeCount: 28,
    budget: 1500000,
    createdAt: '2023-01-25',
    color: 'from-indigo-500 to-indigo-600'
  }
];

const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    position: 'Senior Developer',
    hireDate: '2023-01-15',
    department: 'Engineering',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    phone: '+1 (555) 987-6543',
    position: 'Marketing Manager',
    hireDate: '2022-08-20',
    department: 'Marketing',
    status: 'active'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@company.com',
    phone: '+1 (555) 456-7890',
    position: 'HR Specialist',
    hireDate: '2023-03-10',
    department: 'Human Resources',
    status: 'active'
  }
];

const DepartmentsPage: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>(mockDepartments);
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [filteredDepartments, setFilteredDepartments] = useState<Department[]>(mockDepartments);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    manager: '',
    budget: ''
  });

  // Filter departments based on search
  useEffect(() => {
    if (searchTerm) {
      const filtered = departments.filter(dept =>
        dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dept.manager.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dept.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDepartments(filtered);
    } else {
      setFilteredDepartments(departments);
    }
  }, [searchTerm, departments]);

  const handleAddDepartment = () => {
    const newDepartment: Department = {
      id: (departments.length + 1).toString(),
      name: formData.name,
      description: formData.description,
      manager: formData.manager,
      employeeCount: 0,
      budget: parseFloat(formData.budget),
      createdAt: new Date().toISOString().split('T')[0],
      color: getRandomColor()
    };
    setDepartments([...departments, newDepartment]);
    setIsAddModalOpen(false);
    resetForm();
  };

  const handleEditDepartment = () => {
    if (!selectedDepartment) return;
    
    setDepartments(departments.map(dept =>
      dept.id === selectedDepartment.id ? { 
        ...dept, 
        name: formData.name,
        description: formData.description,
        manager: formData.manager,
        budget: parseFloat(formData.budget)
      } : dept
    ));
    setIsEditModalOpen(false);
    resetForm();
  };

  const handleDeleteDepartment = (id: string) => {
    setDepartments(departments.filter(dept => dept.id !== id));
    setEmployees(employees.filter(emp => emp.department !== departments.find(d => d.id === id)?.name));
  };

  const openEditModal = (department: Department) => {
    setSelectedDepartment(department);
    setFormData({
      name: department.name,
      description: department.description,
      manager: department.manager,
      budget: department.budget.toString()
    });
    setIsEditModalOpen(true);
  };

  const openViewModal = (department: Department) => {
    setSelectedDepartment(department);
    setIsViewModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      manager: '',
      budget: ''
    });
    setSelectedDepartment(null);
  };

  const getRandomColor = () => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-green-500 to-green-600',
      'from-purple-500 to-purple-600',
      'from-orange-500 to-orange-600',
      'from-red-500 to-red-600',
      'from-indigo-500 to-indigo-600'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const DepartmentCard: React.FC<{ department: Department }> = ({ department }) => {
    const departmentEmployees = employees.filter(emp => emp.department === department.name);
    
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 bg-gradient-to-br ${department.color} rounded-lg flex items-center justify-center`}>
              <Building size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{department.name}</h3>
              <p className="text-sm text-gray-600 line-clamp-1">{department.description}</p>
            </div>
          </div>
          <div className="relative">
            <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <MoreVertical size={16} className="text-gray-500" />
            </button>
          </div>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Manager</span>
            <span className="font-medium text-gray-900">{department.manager}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Employees</span>
            <span className="font-medium text-gray-900">{department.employeeCount}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Annual Budget</span>
            <span className="font-medium text-gray-900">{formatCurrency(department.budget)}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            Created {new Date(department.createdAt).toLocaleDateString()}
          </span>
          <div className="flex gap-1">
            <button 
              onClick={() => openViewModal(department)}
              className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors text-blue-600"
            >
              <Users size={14} />
            </button>
            <button 
              onClick={() => openEditModal(department)}
              className="p-1.5 hover:bg-green-50 rounded-lg transition-colors text-green-600"
            >
              <Edit size={14} />
            </button>
            <button 
              onClick={() => handleDeleteDepartment(department.id)}
              className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-red-600"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const Modal: React.FC<{ 
    isOpen: boolean; 
    onClose: () => void; 
    title: string; 
    children: React.ReactNode;
    actionButton?: React.ReactNode;
  }> = ({ isOpen, onClose, title, children, actionButton }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg">
              <span className="text-2xl">×</span>
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
          {actionButton && (
            <div className="flex gap-3 justify-end p-6 border-t border-gray-200">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              {actionButton}
            </div>
          )}
        </div>
      </div>
    );
  };

  const DepartmentEmployees: React.FC<{ department: Department }> = ({ department }) => {
    const departmentEmployees = employees.filter(emp => emp.department === department.name);
    
    return (
      <div className="space-y-4">
        {departmentEmployees.map(employee => (
          <div key={employee.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              {employee.avatar ? (
                <img src={employee.avatar} alt={employee.name} className="w-10 h-10 rounded-full" />
              ) : (
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
              )}
              <div>
                <h4 className="font-medium text-gray-900">{employee.name}</h4>
                <p className="text-sm text-gray-600">{employee.position}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>{employee.email}</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                employee.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {employee.status}
              </span>
            </div>
          </div>
        ))}
        
        {departmentEmployees.length === 0 && (
          <div className="text-center py-8">
            <Users size={48} className="mx-auto text-gray-400 mb-3" />
            <p className="text-gray-600">No employees in this department</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Departments</h1>
            <p className="text-gray-600">Manage organizational departments and team structure</p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition-colors duration-200"
          >
            <Plus size={20} />
            Add Department
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Departments</p>
                <p className="text-2xl font-bold text-gray-900">{departments.length}</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <Building size={20} className="text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Employees</p>
                <p className="text-2xl font-bold text-gray-900">{employees.length}</p>
              </div>
              <div className="p-2 bg-green-50 rounded-lg">
                <Users size={20} className="text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Dept Size</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(employees.length / departments.length)}
                </p>
              </div>
              <div className="p-2 bg-purple-50 rounded-lg">
                <User size={20} className="text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Budget</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(departments.reduce((sum, dept) => sum + dept.budget, 0))}
                </p>
              </div>
              <div className="p-2 bg-orange-50 rounded-lg">
                <DollarSign size={20} className="text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search departments by name, manager, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredDepartments.map(department => (
          <DepartmentCard key={department.id} department={department} />
        ))}
      </div>

      {filteredDepartments.length === 0 && (
        <div className="text-center py-12">
          <Building size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No departments found</h3>
          <p className="text-gray-600">Try adjusting your search or add a new department</p>
        </div>
      )}

      {/* Add Department Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          resetForm();
        }}
        title="Add New Department"
        actionButton={
          <button
            onClick={handleAddDepartment}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Add Department
          </button>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Department Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Engineering, Marketing"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Brief description of the department's function"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Department Manager</label>
            <input
              type="text"
              value={formData.manager}
              onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Manager's full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Annual Budget (USD)</label>
            <input
              type="number"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="500000"
            />
          </div>
        </div>
      </Modal>

      {/* Edit Department Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          resetForm();
        }}
        title="Edit Department"
        actionButton={
          <button
            onClick={handleEditDepartment}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Save Changes
          </button>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Department Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Department Manager</label>
            <input
              type="text"
              value={formData.manager}
              onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Annual Budget (USD)</label>
            <input
              type="number"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </Modal>

      {/* View Department Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Department Details"
      >
        {selectedDepartment && (
          <div className="space-y-6">
            {/* Department Header */}
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 bg-gradient-to-br ${selectedDepartment.color} rounded-lg flex items-center justify-center`}>
                <Building size={28} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedDepartment.name}</h3>
                <p className="text-gray-600">{selectedDepartment.description}</p>
              </div>
            </div>

            {/* Department Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Users size={16} className="text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Total Employees</span>
                </div>
                <p className="text-2xl font-bold text-blue-900">{selectedDepartment.employeeCount}</p>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign size={16} className="text-green-600" />
                  <span className="text-sm font-medium text-green-800">Annual Budget</span>
                </div>
                <p className="text-2xl font-bold text-green-900">{formatCurrency(selectedDepartment.budget)}</p>
              </div>
            </div>

            {/* Manager Information */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Department Manager</h4>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{selectedDepartment.manager}</p>
                  <p className="text-sm text-gray-600">Department Head</p>
                </div>
              </div>
            </div>

            {/* Employees List */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">Department Employees</h4>
                <span className="text-sm text-gray-600">{selectedDepartment.employeeCount} employees</span>
              </div>
              <DepartmentEmployees department={selectedDepartment} />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DepartmentsPage;
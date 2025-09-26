import React, { useState, useEffect } from 'react';
import {
    Plus,
    Search,
    MoreVertical,
    Edit,
    Trash2,
    Eye,
    Download,
    Upload,
    Mail,
    Phone,
    Calendar,
    BadgeCheck,
    User,
    Building,
    ChevronDown
} from 'lucide-react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import SaveButton from '../../../Utils/SaveButton';

// Types
interface Employee {
    id: string;
    name: string;
    email: string;
    phone: string;
    department: string;
    position: string;
    hireDate: string;
    status: 'active' | 'inactive';
    avatar?: string;
    employeeId: string;
    address: string;
    emergencyContact: string;
    emergencyPhone: string;
    salary: string;
    workType: 'full-time' | 'part-time' | 'contract';
}

interface EmployeeFormData {
    name: string;
    email: string;
    phone: string;
    department: string;
    position: string;
    hireDate: string;
    employeeId: string;
    address: string;
    emergencyContact: string;
    emergencyPhone: string;
    salary: string;
    workType: 'full-time' | 'part-time' | 'contract';
}

// Mock data - Replace with actual Supabase calls
const mockEmployees: Employee[] = [
    {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@company.com',
        phone: '+1 (555) 123-4567',
        department: 'Engineering',
        position: 'Senior Developer',
        hireDate: '2023-01-15',
        status: 'active',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        employeeId: 'EMP001',
        address: '123 Main St, City, State 12345',
        emergencyContact: 'Jane Doe',
        emergencyPhone: '+1 (555) 123-4568',
        salary: '85000',
        workType: 'full-time'
    },
    {
        id: '2',
        name: 'Jane Smith',
        email: 'jane.smith@company.com',
        phone: '+1 (555) 987-6543',
        department: 'Marketing',
        position: 'Marketing Manager',
        hireDate: '2022-08-20',
        status: 'active',
        employeeId: 'EMP002',
        address: '456 Oak Ave, City, State 12345',
        emergencyContact: 'Bob Smith',
        emergencyPhone: '+1 (555) 987-6544',
        salary: '75000',
        workType: 'full-time'
    },
    {
        id: '3',
        name: 'Mike Johnson',
        email: 'mike.johnson@company.com',
        phone: '+1 (555) 456-7890',
        department: 'HR',
        position: 'HR Specialist',
        hireDate: '2023-03-10',
        status: 'active',
        employeeId: 'EMP003',
        address: '789 Pine St, City, State 12345',
        emergencyContact: 'Lisa Johnson',
        emergencyPhone: '+1 (555) 456-7891',
        salary: '65000',
        workType: 'full-time'
    },
    {
        id: '4',
        name: 'Sarah Wilson',
        email: 'sarah.wilson@company.com',
        phone: '+1 (555) 234-5678',
        department: 'Finance',
        position: 'Financial Analyst',
        hireDate: '2021-11-05',
        status: 'inactive',
        employeeId: 'EMP004',
        address: '321 Elm St, City, State 12345',
        emergencyContact: 'Tom Wilson',
        emergencyPhone: '+1 (555) 234-5679',
        salary: '70000',
        workType: 'part-time'
    }
];

const departments = ['Engineering', 'Marketing', 'HR', 'Finance', 'Sales', 'Operations'];

const EmployeesPage: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
    const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>(mockEmployees);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'inactive'>('all');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [formData, setFormData] = useState<EmployeeFormData>({
        name: '',
        email: '',
        phone: '',
        department: '',
        position: '',
        hireDate: '',
        employeeId: '',
        address: '',
        emergencyContact: '',
        emergencyPhone: '',
        salary: '',
        workType: 'full-time'
    });

    // Filter employees based on search and filters
    useEffect(() => {
        let filtered = employees;

        if (searchTerm) {
            filtered = filtered.filter(emp =>
                emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                emp.position.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedDepartment !== 'all') {
            filtered = filtered.filter(emp => emp.department === selectedDepartment);
        }

        if (selectedStatus !== 'all') {
            filtered = filtered.filter(emp => emp.status === selectedStatus);
        }

        setFilteredEmployees(filtered);
    }, [employees, searchTerm, selectedDepartment, selectedStatus]);

    const handleAddEmployee = () => {
        const newEmployee: Employee = {
            id: (employees.length + 1).toString(),
            ...formData,
            status: 'active'
        };
        setEmployees([...employees, newEmployee]);
        setIsAddModalOpen(false);
        resetForm();
    };

    const handleEditEmployee = () => {
        if (!selectedEmployee) return;

        setEmployees(employees.map(emp =>
            emp.id === selectedEmployee.id ? { ...emp, ...formData } : emp
        ));
        setIsEditModalOpen(false);
        resetForm();
    };

    const handleDeleteEmployee = (id: string) => {
        setEmployees(employees.filter(emp => emp.id !== id));
    };

    const openEditModal = (employee: Employee) => {
        setSelectedEmployee(employee);
        setFormData({
            name: employee.name,
            email: employee.email,
            phone: employee.phone,
            department: employee.department,
            position: employee.position,
            hireDate: employee.hireDate,
            employeeId: employee.employeeId || '',
            address: employee.address || '',
            emergencyContact: employee.emergencyContact || '',
            emergencyPhone: employee.emergencyPhone || '',
            salary: employee.salary || '',
            workType: employee.workType || 'full-time'
        });
        setIsEditModalOpen(true);
    };

    const openViewModal = (employee: Employee) => {
        setSelectedEmployee(employee);
        setIsViewModalOpen(true);
    };

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            department: '',
            position: '',
            hireDate: '',
            employeeId: '',
            address: '',
            emergencyContact: '',
            emergencyPhone: '',
            salary: '',
            workType: 'full-time'
        });
        setSelectedEmployee(null);
    };

    const EmployeeCard: React.FC<{ employee: Employee }> = ({ employee }) => (
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    {employee.avatar ? (
                        <img src={employee.avatar} alt={employee.name} className="w-12 h-12 rounded-full" />
                    ) : (
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                            <User size={20} className="text-white" />
                        </div>
                    )}
                    <div>
                        <h3 className="font-semibold text-gray-900">{employee.name}</h3>
                        <p className="text-sm text-gray-600">{employee.position}</p>
                    </div>
                </div>
                <div className="relative">
                    <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical size={16} className="text-gray-500" />
                    </button>
                </div>
            </div>

            <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail size={14} />
                    <span>{employee.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone size={14} />
                    <span>{employee.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Building size={14} />
                    <span>{employee.department}</span>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${employee.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                    }`}>
                    {employee.status === 'active' ? 'Active' : 'Inactive'}
                </span>
                <div className="flex gap-1">
                    <button
                        onClick={() => openViewModal(employee)}
                        className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors text-blue-600"
                    >
                        <Eye size={14} />
                    </button>
                    <button
                        onClick={() => openEditModal(employee)}
                        className="p-1.5 hover:bg-green-50 rounded-lg transition-colors text-green-600"
                    >
                        <Edit size={14} />
                    </button>
                    <button
                        onClick={() => handleDeleteEmployee(employee.id)}
                        className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
            </div>
        </div>
    );

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

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Employees</h1>
                        <p className="text-gray-600">Manage your team members and their information</p>
                    </div>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition-colors duration-200"
                    >
                        <Plus size={20} />
                        Add Employee
                    </button>
                </div>

                {/* Search and Filters */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
                    <div className="lg:col-span-2 relative">
                        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search employees by name, email, or position..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full outline-none pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div className="relative">
                        <select
                            value={selectedDepartment}
                            onChange={(e) => setSelectedDepartment(e.target.value)}
                            className="w-full appearance-none px-4 py-2.5 pr-10 border outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">All Departments</option>
                            {departments.map(dept => (
                                <option key={dept} value={dept}>{dept}</option>
                            ))}
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                    <div className="relative">
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value as any)}
                            className="w-full appearance-none px-4 py-2.5 pr-10 border outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Employee Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredEmployees.map(employee => (
                    <EmployeeCard key={employee.id} employee={employee} />
                ))}
            </div>

            {filteredEmployees.length === 0 && (
                <div className="text-center py-12">
                    <User size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No employees found</h3>
                    <p className="text-gray-600">Try adjusting your search or filters</p>
                </div>
            )}

            {/* Add Employee Modal */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => {
                    setIsAddModalOpen(false);
                    resetForm();
                }}
                title="Add New Employee"
                actionButton={
                    <SaveButton
                        onClick={handleAddEmployee}
                        variant="contained"
                        text="Add Employee"
                        loadingText="Adding Employee..."
                    />
                }
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <TextField
                        label="Full Name"
                        variant="outlined"
                        fullWidth
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                    <TextField
                        label="Employee ID"
                        variant="outlined"
                        fullWidth
                        value={formData.employeeId}
                        onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                        required
                    />
                    <TextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        fullWidth
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                    <TextField
                        label="Phone"
                        type="tel"
                        variant="outlined"
                        fullWidth
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                    />
                    <TextField
                        select
                        label="Department"
                        variant="outlined"
                        fullWidth
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        required
                    >
                        {departments.map((dept) => (
                            <MenuItem key={dept} value={dept}>
                                {dept}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Position"
                        variant="outlined"
                        fullWidth
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        required
                    />
                    <TextField
                        label="Hire Date"
                        type="date"
                        variant="outlined"
                        fullWidth
                        value={formData.hireDate}
                        onChange={(e) => setFormData({ ...formData, hireDate: e.target.value })}
                        InputLabelProps={{ shrink: true }}
                        required
                    />
                    <TextField
                        select
                        label="Work Type"
                        variant="outlined"
                        fullWidth
                        value={formData.workType}
                        onChange={(e) => setFormData({ ...formData, workType: e.target.value as any })}
                        required
                    >
                        <MenuItem value="full-time">Full Time</MenuItem>
                        <MenuItem value="part-time">Part Time</MenuItem>
                        <MenuItem value="contract">Contract</MenuItem>
                    </TextField>
                    <TextField
                        label="Manager"
                        variant="outlined"
                        fullWidth
                        value={formData.manager}
                        onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                    />
                    <TextField
                        label="Salary"
                        type="number"
                        variant="outlined"
                        fullWidth
                        value={formData.salary}
                        onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                        InputProps={{
                            startAdornment: <span className="text-gray-500 mr-1">$</span>,
                        }}
                    />
                    <div className="md:col-span-2">
                        <TextField
                            label="Address"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={2}
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        />
                    </div>
                    <TextField
                        label="Emergency Contact Name"
                        variant="outlined"
                        fullWidth
                        value={formData.emergencyContact}
                        onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                    />
                    <TextField
                        label="Emergency Contact Phone"
                        type="tel"
                        variant="outlined"
                        fullWidth
                        value={formData.emergencyPhone}
                        onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                    />
                </div>
            </Modal>

            {/* Edit Employee Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    resetForm();
                }}
                title="Edit Employee"
                actionButton={
                    <SaveButton
                        onClick={handleEditEmployee}
                        variant="contained"
                        text="Save Changes"
                        loadingText="Saving Changes..."
                    />
                }
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <TextField
                        label="Full Name"
                        variant="outlined"
                        fullWidth
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                    <TextField
                        label="Employee ID"
                        variant="outlined"
                        fullWidth
                        value={formData.employeeId}
                        onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                        required
                    />
                    <TextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        fullWidth
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                    <TextField
                        label="Phone"
                        type="tel"
                        variant="outlined"
                        fullWidth
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                    />
                    <TextField
                        select
                        label="Department"
                        variant="outlined"
                        fullWidth
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        required
                    >
                        {departments.map((dept) => (
                            <MenuItem key={dept} value={dept}>
                                {dept}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Position"
                        variant="outlined"
                        fullWidth
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        required
                    />
                    <TextField
                        label="Hire Date"
                        type="date"
                        variant="outlined"
                        fullWidth
                        value={formData.hireDate}
                        onChange={(e) => setFormData({ ...formData, hireDate: e.target.value })}
                        InputLabelProps={{ shrink: true }}
                        required
                    />
                    <TextField
                        select
                        label="Work Type"
                        variant="outlined"
                        fullWidth
                        value={formData.workType}
                        onChange={(e) => setFormData({ ...formData, workType: e.target.value as any })}
                        required
                    >
                        <MenuItem value="full-time">Full Time</MenuItem>
                        <MenuItem value="part-time">Part Time</MenuItem>
                        <MenuItem value="contract">Contract</MenuItem>
                    </TextField>
                    <TextField
                        label="Manager"
                        variant="outlined"
                        fullWidth
                        value={formData.manager}
                        onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                    />
                    <TextField
                        label="Salary"
                        type="number"
                        variant="outlined"
                        fullWidth
                        value={formData.salary}
                        onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                        InputProps={{
                            startAdornment: <span className="text-gray-500 mr-1">$</span>,
                        }}
                    />
                    <div className="md:col-span-2">
                        <TextField
                            label="Address"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={2}
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        />
                    </div>
                    <TextField
                        label="Emergency Contact Name"
                        variant="outlined"
                        fullWidth
                        value={formData.emergencyContact}
                        onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                    />
                    <TextField
                        label="Emergency Contact Phone"
                        type="tel"
                        variant="outlined"
                        fullWidth
                        value={formData.emergencyPhone}
                        onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                    />
                </div>
            </Modal>

            {/* View Employee Modal */}
            <Modal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                title="Employee Profile"
            >
                {selectedEmployee && (
                    <div className="space-y-6">
                        {/* Profile Header */}
                        <div className="flex items-center gap-4">
                            {selectedEmployee.avatar ? (
                                <img src={selectedEmployee.avatar} alt={selectedEmployee.name} className="w-16 h-16 rounded-full" />
                            ) : (
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                                    <User size={24} className="text-white" />
                                </div>
                            )}
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">{selectedEmployee.name}</h3>
                                <p className="text-gray-600">{selectedEmployee.position}</p>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium mt-1 inline-block ${selectedEmployee.status === 'active'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                    }`}>
                                    {selectedEmployee.status === 'active' ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-2">
                                    <Mail size={16} className="text-gray-400" />
                                    <span className="text-sm">{selectedEmployee.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone size={16} className="text-gray-400" />
                                    <span className="text-sm">{selectedEmployee.phone}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Building size={16} className="text-gray-400" />
                                    <span className="text-sm">{selectedEmployee.department}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} className="text-gray-400" />
                                    <span className="text-sm">Hired: {new Date(selectedEmployee.hireDate).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>

                        {/* Documents Section */}
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Documents</h4>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <BadgeCheck size={16} className="text-blue-600" />
                                        <span className="text-sm">ID Proof</span>
                                    </div>
                                    <button className="p-1 hover:bg-blue-50 rounded-lg text-blue-600">
                                        <Download size={14} />
                                    </button>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <BadgeCheck size={16} className="text-blue-600" />
                                        <span className="text-sm">Employment Certificate</span>
                                    </div>
                                    <button className="p-1 hover:bg-blue-50 rounded-lg text-blue-600">
                                        <Download size={14} />
                                    </button>
                                </div>
                                <button className="w-full flex items-center gap-2 justify-center p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors">
                                    <Upload size={16} />
                                    <span className="text-sm">Upload New Document</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default EmployeesPage;
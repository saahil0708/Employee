import React, { useState, useEffect } from 'react';
import {
    Search,
    Filter,
    MoreVertical,
    Download,
    Eye,
    Trash2,
    Edit,
    Upload,
    FileText,
    File,
    Image,
    Folder,
    Plus,
    Share2,
    Clock,
    User,
    Building,
    Calendar,
    CheckCircle,
    XCircle,
    AlertCircle,
    FileTextIcon,
    Users,
    Shield,
    ChevronDown
} from 'lucide-react';

// Types
interface Document {
    id: string;
    name: string;
    type: 'pdf' | 'image' | 'word' | 'excel' | 'other';
    category: 'id-proof' | 'certificate' | 'policy' | 'contract' | 'payroll' | 'other';
    uploadDate: string;
    size: string;
    uploadedBy: string;
    employee?: string;
    department?: string;
    status: 'approved' | 'pending' | 'rejected';
    description?: string;
    documentType: 'hr' | 'employee'; // New field to distinguish document types
}

interface DocumentCategory {
    id: string;
    name: string;
    count: number;
    icon: React.ReactNode;
    color: string;
}

// Mock data with documentType field
const mockDocuments: Document[] = [
    // HR Documents
    {
        id: '1',
        name: 'HR_Policies_Handbook.pdf',
        type: 'pdf',
        category: 'policy',
        uploadDate: '2024-01-15',
        size: '2.4 MB',
        uploadedBy: 'Sarah Johnson',
        department: 'HR',
        status: 'approved',
        description: 'HR policies and procedures',
        documentType: 'hr'
    },
    {
        id: '2',
        name: 'Recruitment_Process.docx',
        type: 'word',
        category: 'policy',
        uploadDate: '2024-01-10',
        size: '1.7 MB',
        uploadedBy: 'HR Department',
        status: 'approved',
        description: 'Recruitment and hiring process',
        documentType: 'hr'
    },
    {
        id: '3',
        name: 'Q4_HR_Report.xlsx',
        type: 'excel',
        category: 'payroll',
        uploadDate: '2024-01-08',
        size: '3.2 MB',
        uploadedBy: 'Finance Team',
        status: 'approved',
        description: 'Quarterly HR performance report',
        documentType: 'hr'
    },
    {
        id: '4',
        name: 'Training_Materials.zip',
        type: 'other',
        category: 'other',
        uploadDate: '2024-01-05',
        size: '15.8 MB',
        uploadedBy: 'Training Team',
        status: 'pending',
        description: 'Employee training materials',
        documentType: 'hr'
    },

    // Employee Documents
    {
        id: '5',
        name: 'John_Doe_ID_Proof.pdf',
        type: 'pdf',
        category: 'id-proof',
        uploadDate: '2024-01-15',
        size: '2.1 MB',
        uploadedBy: 'John Doe',
        employee: 'John Doe',
        department: 'Engineering',
        status: 'approved',
        description: 'Government issued ID proof',
        documentType: 'employee'
    },
    {
        id: '6',
        name: 'Jane_Smith_Degree_Certificate.jpg',
        type: 'image',
        category: 'certificate',
        uploadDate: '2024-01-08',
        size: '1.8 MB',
        uploadedBy: 'Jane Smith',
        employee: 'Jane Smith',
        department: 'Marketing',
        status: 'pending',
        description: 'University degree certificate',
        documentType: 'employee'
    },
    {
        id: '7',
        name: 'Mike_Chen_Employment_Contract.docx',
        type: 'word',
        category: 'contract',
        uploadDate: '2024-01-03',
        size: '1.1 MB',
        uploadedBy: 'HR Department',
        employee: 'Mike Chen',
        department: 'Sales',
        status: 'approved',
        description: 'Employment agreement',
        documentType: 'employee'
    },
    {
        id: '8',
        name: 'Security_Training_Certificate.pdf',
        type: 'pdf',
        category: 'certificate',
        uploadDate: '2024-01-02',
        size: '2.9 MB',
        uploadedBy: 'IT Department',
        employee: 'Alice Brown',
        department: 'IT',
        status: 'rejected',
        description: 'Cybersecurity training completion',
        documentType: 'employee'
    }
];

const categories: DocumentCategory[] = [
    { id: 'all', name: 'All Documents', count: mockDocuments.length, icon: <FileText size={18} />, color: 'text-gray-600' },
    { id: 'id-proof', name: 'ID Proofs', count: mockDocuments.filter(d => d.category === 'id-proof').length, icon: <User size={18} />, color: 'text-blue-600' },
    { id: 'certificate', name: 'Certificates', count: mockDocuments.filter(d => d.category === 'certificate').length, icon: <CheckCircle size={18} />, color: 'text-green-600' },
    { id: 'policy', name: 'Policies', count: mockDocuments.filter(d => d.category === 'policy').length, icon: <Building size={18} />, color: 'text-purple-600' },
    { id: 'contract', name: 'Contracts', count: mockDocuments.filter(d => d.category === 'contract').length, icon: <File size={18} />, color: 'text-orange-600' },
    { id: 'payroll', name: 'Payroll', count: mockDocuments.filter(d => d.category === 'payroll').length, icon: <Calendar size={18} />, color: 'text-red-600' },
    { id: 'other', name: 'Other', count: mockDocuments.filter(d => d.category === 'other').length, icon: <Folder size={18} />, color: 'text-gray-600' }
];

const departments = ['All Departments', 'Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations', 'IT'];

const DocumentsPage: React.FC = () => {
    const [documents, setDocuments] = useState<Document[]>(mockDocuments);
    const [filteredDocuments, setFilteredDocuments] = useState<Document[]>(mockDocuments);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedDepartment, setSelectedDepartment] = useState<string>('All Departments');
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [selectedDocumentType, setSelectedDocumentType] = useState<'all' | 'hr' | 'employee'>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
    const [uploading, setUploading] = useState(false);
    const [uploadDocumentType, setUploadDocumentType] = useState<'hr' | 'employee'>('hr');

    // Filter documents based on selections
    useEffect(() => {
        let filtered = documents;

        if (selectedDocumentType !== 'all') {
            filtered = filtered.filter(doc => doc.documentType === selectedDocumentType);
        }

        if (selectedCategory !== 'all') {
            filtered = filtered.filter(doc => doc.category === selectedCategory);
        }

        if (selectedDepartment !== 'All Departments') {
            filtered = filtered.filter(doc => doc.department === selectedDepartment);
        }

        if (selectedStatus !== 'all') {
            filtered = filtered.filter(doc => doc.status === selectedStatus);
        }

        if (searchTerm) {
            filtered = filtered.filter(doc =>
                doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                doc.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                doc.employee?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                doc.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredDocuments(filtered);
    }, [documents, selectedDocumentType, selectedCategory, selectedDepartment, selectedStatus, searchTerm]);

    const getFileIcon = (type: Document['type']) => {
        switch (type) {
            case 'pdf':
                return <FileTextIcon size={20} className="text-red-500" />;
            case 'image':
                return <Image size={20} className="text-green-500" />;
            case 'word':
                return <FileText size={20} className="text-blue-500" />;
            case 'excel':
                return <FileText size={20} className="text-green-600" />;
            default:
                return <File size={20} className="text-gray-500" />;
        }
    };

    const getStatusBadge = (status: Document['status']) => {
        const styles = {
            approved: 'bg-green-100 text-green-800',
            pending: 'bg-yellow-100 text-yellow-800',
            rejected: 'bg-red-100 text-red-800'
        };

        const icons = {
            approved: <CheckCircle size={12} />,
            pending: <Clock size={12} />,
            rejected: <XCircle size={12} />
        };

        return (
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
                {icons[status]}
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const getDocumentTypeBadge = (type: Document['documentType']) => {
        const styles = {
            hr: 'bg-blue-100 text-blue-800',
            employee: 'bg-purple-100 text-purple-800'
        };

        const icons = {
            hr: <Shield size={12} />,
            employee: <Users size={12} />
        };

        return (
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${styles[type]}`}>
                {icons[type]}
                {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
        );
    };

    const handleUpload = async (files: FileList | null) => {
        if (!files || files.length === 0) return;

        setUploading(true);
        // Simulate upload process
        await new Promise(resolve => setTimeout(resolve, 2000));

        const newDocument: Document = {
            id: (documents.length + 1).toString(),
            name: files[0].name,
            type: getFileType(files[0].name),
            category: 'other',
            uploadDate: new Date().toISOString().split('T')[0],
            size: formatFileSize(files[0].size),
            uploadedBy: 'HR User',
            status: 'pending',
            description: 'Newly uploaded document',
            documentType: uploadDocumentType,
            department: uploadDocumentType === 'hr' ? 'HR' : undefined
        };

        setDocuments([newDocument, ...documents]);
        setUploading(false);
        setIsUploadModalOpen(false);
        setUploadDocumentType('hr'); // Reset to default
    };

    const getFileType = (filename: string): Document['type'] => {
        const ext = filename.split('.').pop()?.toLowerCase();
        if (ext === 'pdf') return 'pdf';
        if (['jpg', 'jpeg', 'png', 'gif'].includes(ext || '')) return 'image';
        if (['doc', 'docx'].includes(ext || '')) return 'word';
        if (['xls', 'xlsx'].includes(ext || '')) return 'excel';
        return 'other';
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleDownload = (document: Document) => {
        // Simulate download
        alert(`Downloading ${document.name}`);
    };

    const handleDelete = (documentId: string) => {
        if (window.confirm('Are you sure you want to delete this document?')) {
            setDocuments(documents.filter(doc => doc.id !== documentId));
        }
    };

    const openViewModal = (document: Document) => {
        setSelectedDocument(document);
        setIsViewModalOpen(true);
    };

    const DocumentCard: React.FC<{ document: Document }> = ({ document }) => (
        <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all duration-300 min-w-0">
            <div className="flex items-start justify-between mb-3 gap-2">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="flex-shrink-0">
                        {getFileIcon(document.type)}
                    </div>
                    <div className="min-w-0 flex-1">
                        <h3 className="font-medium text-gray-900 truncate text-sm" title={document.name}>
                            {document.name}
                        </h3>
                        <p className="text-sm text-gray-600 truncate" title={document.description}>
                            {document.description}
                        </p>
                    </div>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                    {getDocumentTypeBadge(document.documentType)}
                    <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical size={16} className="text-gray-500" />
                    </button>
                </div>
            </div>

            <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Category</span>
                    <span className="font-medium text-gray-900 capitalize">{document.category.replace('-', ' ')}</span>
                </div>
                {document.employee && (
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 flex-shrink-0">Employee</span>
                        <span className="font-medium text-gray-900 truncate ml-2" title={document.employee}>
                            {document.employee}
                        </span>
                    </div>
                )}
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Uploaded</span>
                    <span className="text-gray-600">{document.uploadDate}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Size</span>
                    <span className="text-gray-600">{document.size}</span>
                </div>
            </div>

            <div className="flex items-center justify-between">
                {getStatusBadge(document.status)}
                <div className="flex gap-1">
                    <button
                        onClick={() => openViewModal(document)}
                        className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors text-blue-600"
                    >
                        <Eye size={14} />
                    </button>
                    <button
                        onClick={() => handleDownload(document)}
                        className="p-1.5 hover:bg-green-50 rounded-lg transition-colors text-green-600"
                    >
                        <Download size={14} />
                    </button>
                    <button
                        onClick={() => handleDelete(document.id)}
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

    const hrDocumentsCount = documents.filter(doc => doc.documentType === 'hr').length;
    const employeeDocumentsCount = documents.filter(doc => doc.documentType === 'employee').length;

    return (
        <div className="min-h-screen bg-gray-50 p-6 overflow-x-hidden">
            {/* Header */}
            <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Documents</h1>
                        <p className="text-gray-600">Manage HR documents and employee documents</p>
                    </div>
                    <button
                        onClick={() => setIsUploadModalOpen(true)}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition-colors duration-200"
                    >
                        <Upload size={20} />
                        Upload Document
                    </button>
                </div>

                {/* Document Type Tabs */}
                <div className="flex bg-white rounded-lg border border-gray-200 p-1 mb-6">
                    <button
                        onClick={() => setSelectedDocumentType('all')}
                        className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedDocumentType === 'all'
                                ? 'bg-blue-100 text-blue-700'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        All Documents ({documents.length})
                    </button>
                    <button
                        onClick={() => setSelectedDocumentType('hr')}
                        className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedDocumentType === 'hr'
                                ? 'bg-blue-100 text-blue-700'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        <Shield size={16} className="inline mr-2" />
                        HR Documents ({hrDocumentsCount})
                    </button>
                    <button
                        onClick={() => setSelectedDocumentType('employee')}
                        className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedDocumentType === 'employee'
                                ? 'bg-blue-100 text-blue-700'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        <Users size={16} className="inline mr-2" />
                        Employee Documents ({employeeDocumentsCount})
                    </button>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Documents</p>
                                <p className="text-2xl font-bold text-gray-900">{documents.length}</p>
                            </div>
                            <div className="p-2 bg-blue-50 rounded-lg">
                                <FileText size={20} className="text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">HR Documents</p>
                                <p className="text-2xl font-bold text-gray-900">{hrDocumentsCount}</p>
                            </div>
                            <div className="p-2 bg-purple-50 rounded-lg">
                                <Shield size={20} className="text-purple-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Employee Docs</p>
                                <p className="text-2xl font-bold text-gray-900">{employeeDocumentsCount}</p>
                            </div>
                            <div className="p-2 bg-green-50 rounded-lg">
                                <Users size={20} className="text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Storage Used</p>
                                <p className="text-2xl font-bold text-gray-900">1.2 GB</p>
                            </div>
                            <div className="p-2 bg-orange-50 rounded-lg">
                                <Folder size={20} className="text-orange-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6 min-w-0">
                    <div className="lg:col-span-2 relative">
                        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search documents by name, description, employee, or uploader..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div className="relative">
                        <select
                            value={selectedDepartment}
                            onChange={(e) => setSelectedDepartment(e.target.value)}
                            className="w-full appearance-none px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            {departments.map(dept => (
                                <option key={dept} value={dept}>{dept}</option>
                            ))}
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                    <div className="relative">
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="w-full appearance-none px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">All Status</option>
                            <option value="approved">Approved</option>
                            <option value="pending">Pending</option>
                            <option value="rejected">Rejected</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 min-w-0">
                {/* Categories Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
                        <nav className="space-y-2">
                            {categories.map(category => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors w-full text-left ${selectedCategory === category.id
                                            ? 'bg-blue-50 text-blue-600'
                                            : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <span className={category.color}>{category.icon}</span>
                                    <span className="font-medium flex-1">{category.name}</span>
                                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                        {category.count}
                                    </span>
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Documents Grid */}
                <div className="lg:col-span-3 min-w-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 min-w-0">
                        {filteredDocuments.map(document => (
                            <DocumentCard key={document.id} document={document} />
                        ))}
                    </div>

                    {filteredDocuments.length === 0 && (
                        <div className="text-center py-12">
                            <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
                            <p className="text-gray-600">Try adjusting your filters or upload new documents</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Upload Modal */}
            <Modal
                isOpen={isUploadModalOpen}
                onClose={() => {
                    setIsUploadModalOpen(false);
                    setUploadDocumentType('hr');
                }}
                title="Upload Document"
                actionButton={
                    <button
                        onClick={() => document.getElementById('file-upload')?.click()}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                        {uploading ? 'Uploading...' : 'Select Files'}
                    </button>
                }
            >
                <div className="space-y-6">
                    {/* Document Type Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Document Type</label>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => setUploadDocumentType('hr')}
                                className={`p-4 border-2 rounded-lg text-left transition-colors ${uploadDocumentType === 'hr'
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-300 hover:border-gray-400'
                                    }`}
                            >
                                <Shield size={24} className="text-blue-600 mb-2" />
                                <h4 className="font-medium text-gray-900">HR Document</h4>
                                <p className="text-sm text-gray-600">Company policies, reports, HR materials</p>
                            </button>
                            <button
                                onClick={() => setUploadDocumentType('employee')}
                                className={`p-4 border-2 rounded-lg text-left transition-colors ${uploadDocumentType === 'employee'
                                        ? 'border-purple-500 bg-purple-50'
                                        : 'border-gray-300 hover:border-gray-400'
                                    }`}
                            >
                                <Users size={24} className="text-purple-600 mb-2" />
                                <h4 className="font-medium text-gray-900">Employee Document</h4>
                                <p className="text-sm text-gray-600">ID proofs, certificates, employee records</p>
                            </button>
                        </div>
                    </div>

                    {/* Upload Area */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-600 mb-2">Drag and drop files here or click to browse</p>
                        <p className="text-sm text-gray-500">Supports PDF, images, Word, Excel (Max: 10MB per file)</p>
                        <input
                            id="file-upload"
                            type="file"
                            multiple
                            onChange={(e) => handleUpload(e.target.files)}
                            className="hidden"
                            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
                        />
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <AlertCircle size={16} className="text-blue-600" />
                            <span className="text-sm font-medium text-blue-800">Upload Guidelines</span>
                        </div>
                        <ul className="text-sm text-blue-700 space-y-1">
                            <li>• Maximum file size: 10MB per document</li>
                            <li>• Supported formats: PDF, JPG, PNG, DOC, XLS</li>
                            <li>• Documents will be reviewed before approval</li>
                            <li>• Ensure sensitive information is properly secured</li>
                        </ul>
                    </div>
                </div>
            </Modal>

            {/* View Document Modal */}
            <Modal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                title="Document Details"
            >
                {selectedDocument && (
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-gray-100 rounded-lg">
                                {getFileIcon(selectedDocument.type)}
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">{selectedDocument.name}</h3>
                                <p className="text-gray-600">{selectedDocument.description}</p>
                                <div className="flex gap-2 mt-2">
                                    {getDocumentTypeBadge(selectedDocument.documentType)}
                                    {getStatusBadge(selectedDocument.status)}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Category</label>
                                <p className="text-gray-900 capitalize">{selectedDocument.category.replace('-', ' ')}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Document Type</label>
                                <p className="text-gray-900 capitalize">{selectedDocument.documentType}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Upload Date</label>
                                <p className="text-gray-900">{selectedDocument.uploadDate}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">File Size</label>
                                <p className="text-gray-900">{selectedDocument.size}</p>
                            </div>
                            {selectedDocument.employee && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Employee</label>
                                        <p className="text-gray-900">{selectedDocument.employee}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Department</label>
                                        <p className="text-gray-900">{selectedDocument.department}</p>
                                    </div>
                                </>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Uploaded By</label>
                                <p className="text-gray-900">{selectedDocument.uploadedBy}</p>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4 border-t border-gray-200">
                            <button
                                onClick={() => handleDownload(selectedDocument)}
                                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Download size={16} />
                                Download
                            </button>
                            <button className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                                <Share2 size={16} />
                                Share
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default DocumentsPage;
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sanitizeHTML, validateName, validateEmail, checkRateLimit } from '../utils/security';
import { secureStorage } from '../utils/security';
import { CONFIG } from '../utils/config';

const DocumentOrder = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    documentType: '',
    priority: 'normal',
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const documentTypes = [
    { value: 'resume', label: 'Resume/CV', description: 'Professional resume document' },
    { value: 'portfolio', label: 'Portfolio PDF', description: 'Complete portfolio in PDF format' },
    { value: 'certificates', label: 'Certificates', description: 'Cybersecurity certifications' },
    { value: 'references', label: 'References', description: 'Professional references' },
    { value: 'cover-letter', label: 'Cover Letter', description: 'Customized cover letter' },
    { value: 'project-details', label: 'Project Details', description: 'Detailed project documentation' }
  ];

  const priorities = [
    { value: 'low', label: 'Low Priority', color: 'text-blue-400', description: '5-7 business days' },
    { value: 'normal', label: 'Normal Priority', color: 'text-cyber-green', description: '2-3 business days' },
    { value: 'high', label: 'High Priority', color: 'text-yellow-400', description: '1-2 business days' },
    { value: 'urgent', label: 'Urgent', color: 'text-red-400', description: 'Same day (additional fees may apply)' }
  ];

  useEffect(() => {
    // Load existing orders from secure storage
    const savedOrders = secureStorage.get('documentOrders') || [];
    setOrders(savedOrders);
  }, []);

  const validateForm = () => {
    const newErrors = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!validateName(formData.name)) {
      newErrors.name = 'Please enter a valid name (letters, spaces, hyphens only)';
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate document type
    if (!formData.documentType) {
      newErrors.documentType = 'Please select a document type';
    }

    // Validate notes length
    if (formData.notes.length > 500) {
      newErrors.notes = 'Notes must be less than 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    // Sanitize input
    const sanitizedValue = typeof value === 'string' ? sanitizeHTML(value) : value;
    
    setFormData(prev => ({
      ...prev,
      [field]: sanitizedValue
    }));

    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // Check rate limiting
    if (!checkRateLimit('documentOrder', CONFIG.RATE_LIMITS.DOCUMENT_ORDER.maxAttempts, CONFIG.RATE_LIMITS.DOCUMENT_ORDER.timeWindow)) {
      setErrors({ submit: 'Too many orders submitted. Please try again later.' });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create new order
      const newOrder = {
        id: Date.now().toString(),
        ...formData,
        status: 'pending',
        createdAt: new Date().toISOString(),
        estimatedDelivery: calculateEstimatedDelivery(formData.priority)
      };

      // Save to secure storage
      const updatedOrders = [...orders, newOrder];
      setOrders(updatedOrders);
      secureStorage.set('documentOrders', updatedOrders);

      // Reset form
      setFormData({
        name: '',
        email: '',
        documentType: '',
        priority: 'normal',
        notes: ''
      });

      // Show success message
      setErrors({ success: 'Order submitted successfully! You will receive a confirmation email shortly.' });
      
      // Close form after delay
      setTimeout(() => {
        setIsOpen(false);
        setErrors({});
      }, 3000);

    } catch (error) {
      setErrors({ submit: 'Failed to submit order. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateEstimatedDelivery = (priority) => {
    const now = new Date();
    let daysToAdd;
    
    switch (priority) {
      case 'urgent': daysToAdd = 1; break;
      case 'high': daysToAdd = 2; break;
      case 'normal': daysToAdd = 3; break;
      case 'low': daysToAdd = 7; break;
      default: daysToAdd = 3;
    }
    
    const deliveryDate = new Date(now.getTime() + (daysToAdd * 24 * 60 * 60 * 1000));
    return deliveryDate.toISOString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-400';
      case 'processing': return 'text-blue-400';
      case 'completed': return 'text-cyber-green';
      case 'cancelled': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 bg-cyber-green text-black px-6 py-3 rounded-full font-semibold shadow-neon hover:shadow-neon-lg transition-all z-40"
      >
        📄 Request Documents
      </motion.button>

      {/* Order Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-black/90 border border-cyber-green/50 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-cyber-green">Request Documents</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block text-cyber-green mb-2 font-semibold">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-4 py-3 bg-black/50 border rounded-lg focus:outline-none focus:shadow-neon text-white transition-all ${
                      errors.name ? 'border-red-500' : 'border-cyber-green/30 focus:border-cyber-green'
                    }`}
                    placeholder="Enter your full name"
                    maxLength={CONFIG.VALIDATION.NAME_MAX_LENGTH}
                  />
                  {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-cyber-green mb-2 font-semibold">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-3 bg-black/50 border rounded-lg focus:outline-none focus:shadow-neon text-white transition-all ${
                      errors.email ? 'border-red-500' : 'border-cyber-green/30 focus:border-cyber-green'
                    }`}
                    placeholder="your.email@example.com"
                    maxLength={CONFIG.VALIDATION.EMAIL_MAX_LENGTH}
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Document Type */}
                <div>
                  <label className="block text-cyber-green mb-2 font-semibold">
                    Document Type *
                  </label>
                  <select
                    value={formData.documentType}
                    onChange={(e) => handleInputChange('documentType', e.target.value)}
                    className={`w-full px-4 py-3 bg-black/50 border rounded-lg focus:outline-none focus:shadow-neon text-white transition-all ${
                      errors.documentType ? 'border-red-500' : 'border-cyber-green/30 focus:border-cyber-green'
                    }`}
                  >
                    <option value="">Select a document type</option>
                    {documentTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label} - {type.description}
                      </option>
                    ))}
                  </select>
                  {errors.documentType && <p className="text-red-400 text-sm mt-1">{errors.documentType}</p>}
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-cyber-green mb-2 font-semibold">
                    Priority Level
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {priorities.map(priority => (
                      <label
                        key={priority.value}
                        className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                          formData.priority === priority.value
                            ? 'border-cyber-green bg-cyber-green/10'
                            : 'border-gray-600 hover:border-cyber-green/50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="priority"
                          value={priority.value}
                          checked={formData.priority === priority.value}
                          onChange={(e) => handleInputChange('priority', e.target.value)}
                          className="sr-only"
                        />
                        <div className="flex-1">
                          <div className={`font-semibold ${priority.color}`}>
                            {priority.label}
                          </div>
                          <div className="text-sm text-gray-400">
                            {priority.description}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-cyber-green mb-2 font-semibold">
                    Additional Notes
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    className={`w-full px-4 py-3 bg-black/50 border rounded-lg focus:outline-none focus:shadow-neon text-white transition-all resize-none ${
                      errors.notes ? 'border-red-500' : 'border-cyber-green/30 focus:border-cyber-green'
                    }`}
                    rows="3"
                    placeholder="Any specific requirements or customizations..."
                    maxLength="500"
                  />
                  <div className="flex justify-between items-center mt-1">
                    {errors.notes && <p className="text-red-400 text-sm">{errors.notes}</p>}
                    <p className="text-gray-500 text-sm ml-auto">
                      {formData.notes.length}/500
                    </p>
                  </div>
                </div>

                {/* Error/Success Messages */}
                {errors.submit && (
                  <div className="bg-red-500/20 border border-red-500 rounded-lg p-3">
                    <p className="text-red-400">{errors.submit}</p>
                  </div>
                )}
                
                {errors.success && (
                  <div className="bg-cyber-green/20 border border-cyber-green rounded-lg p-3">
                    <p className="text-cyber-green">{errors.success}</p>
                  </div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-4 bg-cyber-green text-black font-bold rounded-lg hover:bg-cyber-green/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting Order...' : 'Submit Document Request'}
                </motion.button>
              </form>

              {/* Existing Orders */}
              {orders.length > 0 && (
                <div className="mt-8 pt-6 border-t border-cyber-green/30">
                  <h3 className="text-lg font-semibold text-cyber-green mb-4">Your Orders</h3>
                  <div className="space-y-3 max-h-40 overflow-y-auto">
                    {orders.slice(-3).map(order => (
                      <div key={order.id} className="bg-black/30 border border-gray-600 rounded-lg p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold text-white">
                              {documentTypes.find(t => t.value === order.documentType)?.label}
                            </p>
                            <p className="text-sm text-gray-400">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <span className={`text-sm font-semibold ${getStatusColor(order.status)}`}>
                            {order.status.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DocumentOrder;
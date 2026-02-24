import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sanitizeHTML } from '../utils/security';
import { secureStorage } from '../utils/security';
import { CONFIG } from '../utils/config';

const ReminderSystem = () => {
  const [reminders, setReminders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState('default');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    type: 'general'
  });

  const reminderTypes = [
    { value: 'general', label: 'General Reminder', icon: '📝' },
    { value: 'meeting', label: 'Meeting/Interview', icon: '🤝' },
    { value: 'deadline', label: 'Application Deadline', icon: '⏰' },
    { value: 'follow-up', label: 'Follow-up', icon: '📞' },
    { value: 'portfolio', label: 'Portfolio Update', icon: '💼' }
  ];

  useEffect(() => {
    // Load existing reminders
    const savedReminders = secureStorage.get('reminders') || [];
    setReminders(savedReminders);

    // Check notification permission
    if (CONFIG.FEATURES.NOTIFICATIONS) {
      setNotificationPermission(Notification.permission);
    }

    // Set up reminder checking interval
    const interval = setInterval(checkReminders, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const requestNotificationPermission = async () => {
    if (!CONFIG.FEATURES.NOTIFICATIONS) return;

    try {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      
      if (permission === 'granted') {
        showNotification('Notifications Enabled', 'You will now receive reminder notifications.');
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  const showNotification = (title, body, options = {}) => {
    if (notificationPermission !== 'granted' || !CONFIG.FEATURES.NOTIFICATIONS) return;

    try {
      new Notification(title, {
        body,
        icon: '/favicon.svg',
        badge: '/favicon.svg',
        tag: 'portfolio-reminder',
        requireInteraction: true,
        ...options
      });
    } catch (error) {
      console.error('Error showing notification:', error);
    }
  };

  const checkReminders = () => {
    const now = new Date();
    const updatedReminders = reminders.map(reminder => {
      if (!reminder.triggered && new Date(reminder.datetime) <= now) {
        // Trigger reminder
        const reminderType = reminderTypes.find(t => t.value === reminder.type);
        showNotification(
          `${reminderType?.icon} ${reminder.title}`,
          reminder.description || 'Reminder notification',
          { tag: `reminder-${reminder.id}` }
        );

        // Show in-app notification
        setShowNotifications(true);

        return { ...reminder, triggered: true, triggeredAt: now.toISOString() };
      }
      return reminder;
    });

    if (JSON.stringify(updatedReminders) !== JSON.stringify(reminders)) {
      setReminders(updatedReminders);
      secureStorage.set('reminders', updatedReminders);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.title.trim() || !formData.date || !formData.time) {
      alert('Please fill in all required fields');
      return;
    }

    // Create datetime
    const datetime = new Date(`${formData.date}T${formData.time}`);
    if (datetime <= new Date()) {
      alert('Please select a future date and time');
      return;
    }

    // Create new reminder
    const newReminder = {
      id: Date.now().toString(),
      title: sanitizeHTML(formData.title.trim()),
      description: sanitizeHTML(formData.description.trim()),
      datetime: datetime.toISOString(),
      type: formData.type,
      triggered: false,
      createdAt: new Date().toISOString()
    };

    // Save reminder
    const updatedReminders = [...reminders, newReminder];
    setReminders(updatedReminders);
    secureStorage.set('reminders', updatedReminders);

    // Reset form
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      type: 'general'
    });
    setShowForm(false);

    // Show confirmation
    alert('Reminder set successfully!');
  };

  const deleteReminder = (id) => {
    const updatedReminders = reminders.filter(r => r.id !== id);
    setReminders(updatedReminders);
    secureStorage.set('reminders', updatedReminders);
  };

  const getUpcomingReminders = () => {
    const now = new Date();
    return reminders
      .filter(r => !r.triggered && new Date(r.datetime) > now)
      .sort((a, b) => new Date(a.datetime) - new Date(b.datetime))
      .slice(0, 3);
  };

  const getTriggeredReminders = () => {
    return reminders
      .filter(r => r.triggered)
      .sort((a, b) => new Date(b.triggeredAt) - new Date(a.triggeredAt))
      .slice(0, 5);
  };

  const formatDateTime = (datetime) => {
    const date = new Date(datetime);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  const upcomingReminders = getUpcomingReminders();
  const triggeredReminders = getTriggeredReminders();

  // Floating label variants
  const labelVariants = {
    default: { y: 0, scale: 1, color: '#9CA3AF' },
    focused: { y: -28, scale: 0.85, color: '#00FF88' },
  };

  return (
    <>
      {/* Floating Reminder Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowForm(true)}
        className="fixed bottom-6 right-6 group bg-cyber-green text-black px-6 py-3 rounded-full font-semibold shadow-[0_0_20px_#00FF88] hover:shadow-[0_0_30px_#00FF88] transition-all z-40 flex items-center gap-2"
      >
        <span className="text-xl">⏰</span>
        <span>Set Reminder</span>
        {upcomingReminders.length > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center border-2 border-cyber-green"
          >
            {upcomingReminders.length}
          </motion.span>
        )}
        {/* Tooltip */}
        <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/90 text-cyber-green text-sm px-3 py-1 rounded border border-cyber-green/50 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Click to set a reminder
        </span>
      </motion.button>

      {/* Notification Permission Banner */}
      {CONFIG.FEATURES.NOTIFICATIONS && notificationPermission === 'default' && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur border border-cyber-green rounded-lg p-4 z-40 max-w-md shadow-[0_0_30px_rgba(0,255,136,0.2)]"
        >
          <p className="text-sm text-cyber-green mb-3 flex items-center gap-2">
            <span className="text-xl">🔔</span>
            Enable notifications to receive reminders
          </p>
          <button
            onClick={requestNotificationPermission}
            className="text-sm bg-cyber-green text-black px-4 py-2 rounded font-semibold hover:bg-cyber-green/80 transition-colors w-full"
          >
            Enable Notifications
          </button>
        </motion.div>
      )}

      {/* Reminder Form Modal */}
      <AnimatePresence>
        {showForm && (
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
              className="relative bg-black/90 border border-cyber-green/50 rounded-2xl p-6 max-w-md w-full shadow-[0_0_50px_rgba(0,255,136,0.2)]"
            >
              {/* Glitch Header */}
              <div className="flex justify-between items-center mb-6">
                <div className="relative">
                  <h2 className="text-2xl font-bold text-cyber-green">
                    Set Reminder
                    <motion.span
                      className="absolute inset-0 text-cyber-green/50"
                      animate={{ x: [-2, 2, -2], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 0.2, repeat: Infinity }}
                    >
                      Set Reminder
                    </motion.span>
                  </h2>
                </div>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-cyber-green/10 rounded-full"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title Field */}
                <div className="relative">
                  <motion.label
                    htmlFor="title"
                    className="absolute left-4 pointer-events-none text-gray-400"
                    initial="default"
                    animate={formData.title ? 'focused' : 'default'}
                    variants={labelVariants}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    Title *
                  </motion.label>
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 bg-black/50 border border-cyber-green/30 rounded-lg focus:border-cyber-green focus:outline-none focus:shadow-neon text-white transition-all"
                    placeholder=" "
                    maxLength="100"
                    required
                  />
                </div>

                {/* Description Field */}
                <div className="relative">
                  <motion.label
                    htmlFor="description"
                    className="absolute left-4 pointer-events-none text-gray-400"
                    initial="default"
                    animate={formData.description ? 'focused' : 'default'}
                    variants={labelVariants}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    Description
                  </motion.label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-4 py-3 bg-black/50 border border-cyber-green/30 rounded-lg focus:border-cyber-green focus:outline-none focus:shadow-neon text-white transition-all resize-none"
                    placeholder=" "
                    rows="3"
                    maxLength="200"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Date Field */}
                  <div className="relative">
                    <motion.label
                      htmlFor="date"
                      className="absolute left-4 pointer-events-none text-gray-400"
                      initial="default"
                      animate={formData.date ? 'focused' : 'default'}
                      variants={labelVariants}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      Date *
                    </motion.label>
                    <input
                      type="date"
                      id="date"
                      value={formData.date}
                      onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full px-4 py-3 bg-black/50 border border-cyber-green/30 rounded-lg focus:border-cyber-green focus:outline-none focus:shadow-neon text-white transition-all [color-scheme:dark]"
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>

                  {/* Time Field */}
                  <div className="relative">
                    <motion.label
                      htmlFor="time"
                      className="absolute left-4 pointer-events-none text-gray-400"
                      initial="default"
                      animate={formData.time ? 'focused' : 'default'}
                      variants={labelVariants}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      Time *
                    </motion.label>
                    <input
                      type="time"
                      id="time"
                      value={formData.time}
                      onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                      className="w-full px-4 py-3 bg-black/50 border border-cyber-green/30 rounded-lg focus:border-cyber-green focus:outline-none focus:shadow-neon text-white transition-all [color-scheme:dark]"
                      required
                    />
                  </div>
                </div>

                {/* Type Select */}
                <div>
                  <label className="block text-cyber-green mb-2 font-semibold">
                    Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-4 py-3 bg-black/50 border border-cyber-green/30 rounded-lg focus:border-cyber-green focus:outline-none focus:shadow-neon text-white transition-all"
                  >
                    {reminderTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.icon} {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-cyber-green to-green-400 text-black font-bold rounded-lg hover:shadow-[0_0_30px_#00FF88] transition-all"
                >
                  Set Reminder
                </motion.button>
              </form>

              {/* Upcoming Reminders */}
              {upcomingReminders.length > 0 && (
                <div className="mt-6 pt-4 border-t border-cyber-green/30">
                  <h3 className="text-sm font-semibold text-cyber-green mb-3 flex items-center gap-2">
                    <span>⏳</span> Upcoming Reminders
                  </h3>
                  <div className="space-y-2 max-h-32 overflow-y-auto pr-2 scrollbar-thin scrollbar-track-cyber-dark scrollbar-thumb-cyber-green/50">
                    {upcomingReminders.map(reminder => {
                      const { date, time } = formatDateTime(reminder.datetime);
                      const reminderType = reminderTypes.find(t => t.value === reminder.type);
                      
                      return (
                        <motion.div
                          key={reminder.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className="group bg-black/30 border border-cyber-green/30 rounded-lg p-3 hover:border-cyber-green transition-all"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-white flex items-center gap-1">
                                <span>{reminderType?.icon}</span> {reminder.title}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {date} at {time}
                              </p>
                            </div>
                            <button
                              onClick={() => deleteReminder(reminder.id)}
                              className="text-gray-500 hover:text-red-400 transition-colors ml-2 opacity-0 group-hover:opacity-100"
                              aria-label="Delete reminder"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Triggered Reminders Notification Panel */}
      <AnimatePresence>
        {showNotifications && triggeredReminders.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed top-20 right-4 bg-black/90 backdrop-blur border border-cyber-green rounded-xl p-4 max-w-sm z-50 shadow-[0_0_30px_rgba(0,255,136,0.3)]"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-semibold text-cyber-green flex items-center gap-2">
                <span className="text-xl">🔔</span> Recent Reminders
              </h3>
              <button
                onClick={() => setShowNotifications(false)}
                className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-cyber-green/10 rounded"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-track-cyber-dark scrollbar-thumb-cyber-green/50">
              {triggeredReminders.map(reminder => {
                const reminderType = reminderTypes.find(t => t.value === reminder.type);
                return (
                  <motion.div
                    key={reminder.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-cyber-green/10 border border-cyber-green/30 rounded-lg p-3"
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-lg">{reminderType?.icon}</span>
                      <div>
                        <p className="text-sm font-semibold text-cyber-green">
                          {reminder.title}
                        </p>
                        {reminder.description && (
                          <p className="text-xs text-gray-300 mt-1">{reminder.description}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ReminderSystem;
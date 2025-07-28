import React, { useState } from 'react';
import Header from '../component/header.jsx';
import Footer from '../component/footer.jsx';
import '../css/contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json'
    };
    
    // Add auth token if available
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch('http://localhost:5000/contact', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(formData)
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to submit form');
    }
    
    setFormStatus(data.message);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    
  } catch (error) {
    console.error('Form submission error:', error);
    setFormStatus(error.message || 'An error occurred. Please try again.');
  }
};

const [chatSession, setChatSession] = useState(null);
const [chatMessages, setChatMessages] = useState([]);
const [newMessage, setNewMessage] = useState('');
const [showChat, setShowChat] = useState(false);
const [isLoading, setIsLoading] = useState(false);

const startChat = async () => {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json'
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch('http://localhost:5000/api/chat/start', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({})
    });
    
    if (!response.ok) {
      throw new Error('Failed to start chat');
    }
    
    const data = await response.json();
    setChatSession(data.session_id);
    setChatMessages([{
      sender: 'bot',
      text: data.initial_message,
      timestamp: new Date().toISOString()
    }]);
    setShowChat(true);
  } catch (error) {
    console.error('Error starting chat:', error);
    alert('Could not start chat. Please try again later or contact us via email/phone.');
  }
};

const sendMessage = async () => {
  if (!newMessage.trim() || isLoading) return;
  
  try {
    setIsLoading(true);
    const userMessage = {
      sender: 'user',
      text: newMessage,
      timestamp: new Date().toISOString()
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    
    const response = await fetch('http://localhost:5000/api/chat/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        session_id: chatSession,
        message: newMessage
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to send message');
    }
    
    const data = await response.json();
    
    setChatMessages(prev => [...prev, {
      sender: 'bot',
      text: data.response,
      timestamp: new Date().toISOString()
    }]);
    
  } catch (error) {
    console.error('Error sending message:', error);
    setChatMessages(prev => [...prev, {
      sender: 'bot',
      text: "I'm experiencing some technical difficulties. For immediate assistance, please email support@heeka.com or call +91 9876543210.",
      timestamp: new Date().toISOString()
    }]);
  } finally {
    setIsLoading(false);
  }
};

const closeChat = () => {
  setShowChat(false);
  setChatSession(null);
  setChatMessages([]);
};

  const [showMap, setShowMap] = useState(false);

  const handleGetDirections = () => {
    setShowMap(true);
  };

  return (
    <>
      <Header />
      <div className="contact-container">
        {/* Hero Section */}
        <section className="contact-hero">
          <div className="hero-content">
            <h1>Get in Touch</h1>
            <p>
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </section>

        {/* Contact Form and Info Section */}
        <section className="contact-main">
          <div className="container">
            <div className="contact-grid">
              {/* Contact Form */}
              <div className="contact-form-section">
                <h2>Send us a Message</h2>
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="subject">Subject *</label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="product-inquiry">Product Inquiry</option>
                        <option value="order-support">Order Support</option>
                        <option value="bulk-order">Bulk Order</option>
                        <option value="partnership">Partnership</option>
                        <option value="feedback">Feedback</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                  </div>

                  <button type="submit" className="submit-btn">
                    Send Message
                  </button>

                  {formStatus && (
                    <div className="form-status success">
                      {formStatus}
                    </div>
                  )}
                </form>
              </div>

              {/* Contact Information */}
              <div className="contact-info-section">
                <h2>Contact Information</h2>
                
                <div className="contact-cards">
                  <div className="contact-card">
                    <div className="contact-icon">📧</div>
                    <h3>Email Us</h3>
                    <p>info@heeka.com</p>
                    <p>support@heeka.com</p>
                  </div>

                  <div className="contact-card">
                    <div className="contact-icon">📞</div>
                    <h3>Call Us</h3>
                    <p>+91 9876543210</p>
                    <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                  </div>

                  <div className="contact-card">
                    <div className="contact-icon">📍</div>
                    <h3>Visit Us</h3>
                    <p>123 Organic Street,<br />
                       Green Valley, Tamil Nadu,<br />
                       India - 641001</p>
                  </div>

                  <div className="contact-card">
                    <div className="contact-icon">💬</div>
                    <h3>Live Chat</h3>
                    <p>Available 24/7</p>
                    <button className="chat-btn" onClick={startChat}>Start Chat</button>
                    
                    {showChat && (
                      <div className="chat-window">
                        <div className="chat-header">
                          <h4>Heeka Support</h4>
                          <button className="close-chat" onClick={closeChat}>×</button>
                        </div>
                        <div className="chat-messages">
                          {chatMessages.map((msg, index) => (
                            <div key={index} className={`chat-message ${msg.sender}`}>
                              <p>{msg.text}</p>
                              <span className="chat-time">
                                {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                              </span>
                            </div>
                          ))}
                          {isLoading && (
                            <div className="chat-message bot">
                              <p>Typing...</p>
                            </div>
                          )}
                        </div>
                        <div className="chat-input">
                          <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message..."
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                            disabled={isLoading}
                          />
                          <button onClick={sendMessage} disabled={isLoading}>
                            {isLoading ? 'Sending...' : 'Send'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* FAQ Section */}
                <div className="faq-section">
                  <h3>Frequently Asked Questions</h3>
                  <div className="faq-item">
                    <h4>How long does shipping take?</h4>
                    <p>We typically ship within 2-3 business days, and delivery takes 3-7 days depending on your location.</p>
                  </div>
                  <div className="faq-item">
                    <h4>Do you offer bulk discounts?</h4>
                    <p>Yes! We offer special pricing for bulk orders. Contact us for a custom quote.</p>
                  </div>
                  <div className="faq-item">
                    <h4>Are your products certified organic?</h4>
                    <p>Yes, all our products are certified organic and meet international quality standards.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="map-section">
          <div className="container">
            <h2>Find Us</h2>
            <div className="map-container">
              {showMap ? (
                <div className="map-iframe">
                  <iframe
                    title="Heeka Organic Store Location"
                    width="100%"
                    height="400"
                    frameBorder="0"
                    style={{ border: 0, borderRadius: '15px' }}
                    src={"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248756.13131228788!2d80.04385969043571!3d13.04747331623444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x6e61a70b6863d433!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1753682582723!5m2!1sen!2sin"}
                    allowFullScreen
                  ></iframe>
                  <button 
                    className="back-btn" 
                    onClick={() => setShowMap(false)}
                  >
                    Back to Info
                  </button>
                </div>
              ) : (
                <div className="map-placeholder">
                  <div className="map-content">
                    <h3>Heeka Organic Store</h3>
                    <p>123 Organic Street, Green Valley<br />Tamil Nadu, India - 641001</p>
                    <button 
                      className="directions-btn" 
                      onClick={handleGetDirections}
                    >
                      Get Directions
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Build WhatsApp message from form data
    const msg = `Hi, I'm ${formData.name}.\n\n${formData.message}\n\nContact: ${formData.phone || formData.email}`;
    const whatsappUrl = `https://wa.me/263771234567?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
  };

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>Contact <span className="section-accent">Us</span></h1>
          <p>Get in touch with our team for orders, quotes, or any questions</p>
        </div>
      </div>

      <div className="container">
        <div className="contact-grid">
          <div>
            <h2 className="section-title" style={{ fontSize: '1.6rem', marginBottom: '30px' }}>
              Get In <span className="section-accent">Touch</span>
            </h2>

            <div className="contact-info-item">
              <div className="contact-info-icon">{'\u{1F4DE}'}</div>
              <div>
                <h4>Phone</h4>
                <p>+263 77 123 4567</p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-info-icon">{'\u{1F4E7}'}</div>
              <div>
                <h4>Email</h4>
                <p>info@kuriinvestments.com</p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-info-icon">{'\u{1F4CD}'}</div>
              <div>
                <h4>Location</h4>
                <p>Harare, Zimbabwe</p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-info-icon">{'\u{1F552}'}</div>
              <div>
                <h4>Business Hours</h4>
                <p>Mon-Fri: 6:00 AM - 5:00 PM<br />Sat: 6:00 AM - 1:00 PM</p>
              </div>
            </div>
          </div>

          <div>
            {submitted ? (
              <div style={{
                background: 'var(--color-dark-2)',
                border: '1px solid var(--color-dark-3)',
                borderRadius: 'var(--radius)',
                padding: '40px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>{'\u2705'}</div>
                <h3 style={{ fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>Message Sent!</h3>
                <p style={{ color: 'var(--color-gray)' }}>
                  Your message has been forwarded to our WhatsApp. We&apos;ll respond shortly.
                </p>
                <button
                  className="btn btn-secondary"
                  style={{ marginTop: '16px' }}
                  onClick={() => setSubmitted(false)}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{
                background: 'var(--color-dark-2)',
                border: '1px solid var(--color-dark-3)',
                borderRadius: 'var(--radius)',
                padding: '30px',
              }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', marginBottom: '20px' }}>Send a Message</h3>
                <div className="form-group">
                  <label>Your Name</label>
                  <input
                    type="text"
                    placeholder="Full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+263 77 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;

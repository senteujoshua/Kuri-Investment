import { useState, useEffect } from 'react';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'Contact Kuri Investments | Stone Crushing Company in Nyeri, Kenya';
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `Hi, I'm ${formData.name}.\n\n${formData.message}\n\nContact: ${formData.phone || formData.email}`;
    const whatsappUrl = `https://wa.me/254717377226?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
  };

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>Contact <span className="section-accent">Us</span></h1>
          <p>Contact a reliable stone crushing company in Kenya for orders, quotes, or any questions about our aggregates</p>
        </div>
      </div>

      <div className="container">
        {/* Google Map */}
        <div style={{
          marginBottom: '40px',
          borderRadius: 'var(--radius)',
          overflow: 'hidden',
          border: '1px solid var(--color-dark-3)',
        }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.75567951184!2d37.0033915!3d-0.3210631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1828695878c010ab%3A0x4cd867e3ad3aef7d!2sKuri%20crusher!5e0!3m2!1sen!2ske!4v1771116736498!5m2!1sen!2ske"
            width="100%"
            height="400"
            style={{ border: 0, display: 'block' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Kuri Investments Location"
          />
        </div>

        <div className="contact-grid">
          {/* Left column - Contact Info */}
          <div>
            <div style={{
              background: 'var(--color-dark-2)',
              border: '1px solid var(--color-dark-3)',
              borderRadius: 'var(--radius)',
              padding: '30px',
            }}>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.4rem',
                marginBottom: '24px',
              }}>
                Get In <span style={{ color: 'var(--color-orange)' }}>Touch</span>
              </h3>

              <div className="contact-info-item">
                <div className="contact-info-icon">{'\u{1F4DE}'}</div>
                <div>
                  <h4>Phone</h4>
                  <p><a href="tel:+254717377226" style={{ color: 'inherit' }}>+254 717 377 226</a></p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">{'\u{1F4E7}'}</div>
                <div>
                  <h4>Email</h4>
                  <p><a href="mailto:info@kuriinvestments.co.ke" style={{ color: 'inherit' }}>info@kuriinvestments.co.ke</a></p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">{'\u{1F4CD}'}</div>
                <div>
                  <h4>Location</h4>
                  <p>Kigango, Nyeri, Kenya</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">{'\u{1F552}'}</div>
                <div>
                  <h4>Business Hours</h4>
                  <p>Mon-Sat: 8:00 AM - 6:00 PM</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--color-orange)' }}>
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </div>
                <div>
                  <h4>Instagram</h4>
                  <p><a href="https://www.instagram.com/kuri_construction?igsh=dm02dDBmNWNtZjhu" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>@kuri_construction</a></p>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/254717377226?text=Hi%2C%20I%27m%20interested%20in%20your%20quarry%20products."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                marginTop: '16px',
                padding: '16px 24px',
                background: '#25D366',
                color: 'white',
                borderRadius: 'var(--radius)',
                fontWeight: 700,
                fontSize: '1rem',
                textDecoration: 'none',
                transition: 'opacity 0.2s, transform 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          {/* Right column - Form */}
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
                    placeholder="0717 377 226"
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
                    placeholder="How can we help you? (e.g., I need 10 tons of ballast delivered to Nairobi)"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  Send via WhatsApp
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

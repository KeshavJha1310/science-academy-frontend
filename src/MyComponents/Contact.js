import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { contactConfig } from './content_option';
import '../MyComponents/contact.css';

const Contact = () => {
  const [message, setMessage] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://science-academy-server.vercel.app/api/emails', {
        userName,
        userEmail,
        userMessage,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Email sending failed');
    }
  };

  return (
    <div className="Container" id="contact">
      <Row className="mb-5 mt-3">
        <Col lg="8">
          <h2 className="h2">Get in Touch</h2>
        </Col>
      </Row>
      <hr className="t_border my-4 ml-0 text-left" />
      <Row className="sec_sp">
        <Col lg="5" className="mb-5">
          <address>
            <div className='add-info'>
            <strong className="email-label">Email :</strong>{' '}
            <a className="email-id" href={`mailto:${contactConfig.YOUR_EMAIL}`}>
              {contactConfig.YOUR_EMAIL}
            </a>
            <br />
            <br />

            {contactConfig.hasOwnProperty('YOUR_FONE') ? (
              <p>
                <strong className="email-label">Phone :</strong>{' '}
                <span className="email-id">
                  <a href={`tel:${contactConfig.YOUR_FONE}`}>
                    {contactConfig.YOUR_FONE}
                  </a>
                </span>
                <br />
                <br />
                <a
                  href="https://goo.gl/maps/uQnugPNm3JL5SajE9"
                  className="social-icon"
                >
                  <strong className="email-label">
                    <i className="fas fa-map-marked-alt"> :</i>
                  </strong>
                  <span className="email-id"> {contactConfig.location}</span>
                </a>
              </p>
            ) : (
              ''
            )}
            <br />
            </div>
            <div className="social-icons">
              <a href="https://facebook.com" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://whatsapp.com" className="social-icon whatsapp">
                <i className="fab fa-whatsapp"></i>
              </a>
              <a href="https://instagram.com" className="social-icon instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://goo.gl/maps/uQnugPNm3JL5SajE9"
                className="social-icon"
              >
                <i className="fas fa-map-marked-alt"></i>
              </a>
            </div>
          </address>
        </Col>
        <Col lg="7" className="d-flex align-items-center">
          <form
            className="contact__form w-100"
            onSubmit={sendEmail}
          >
            <Row>
              <Col lg="6" className="form-group">
                <input
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Name"
                  type="text"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Col>
              <Col lg="6" className="form-group">
                <input
                  className="form-control rounded-0"
                  id="email"
                  name="email"
                  placeholder="Email"
                  type="email"
                  required
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </Col>
            </Row>
            <textarea
              className="form-control rounded-0"
              id="message"
              name="message"
              placeholder="Message"
              rows="5"
              required
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
            ></textarea>
            <br />
            {/* <Row>
              <Col lg="12" className="form-group">
                <button className="btn ac_btn" type="submit">
                  Send
                </button>
              </Col>
            </Row> */}
             <Row>
          <Col lg="12" className="form-group">
            <button className="btn ac_btn" type="submit" disabled={isSending}>
              {isSending ? 'Sending...' : 'Send'}
            </button>
          </Col>
        </Row>
          </form>
        </Col>
      </Row>
      <p>{message}</p>
    </div>
  );
};

export default Contact;

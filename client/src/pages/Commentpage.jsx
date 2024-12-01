import React, { useState } from 'react';
import './commentpg.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useMutation } from 'react-query';
import useUserStore from '../store/userStore';

function Commentpage() {
  const user = useUserStore((state) => state.user);
  const userId = user.id;
  console.log(userId);

  const [button, setButton] = useState(false);
  const [userComment, setComment] = useState({
    id: userId,
    message: '',
  });

  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState(''); // 'success', 'danger', or ''
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    setComment({
      ...userComment,
      [e.target.name]: e.target.value,
    });
  };

  const { mutate, isLoading, isError, isSuccess, error } = useMutation({
    mutationFn: async (commentData) => {
      const response = await fetch('http://localhost:4000/create-testimonial', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      });

      if (!response.ok) {
        throw new Error('Error submitting the testimonial');
      }

      return response.json();
    },
    onError: (err) => {
      console.error('Error occurred:', err.message);
      setAlertMessage(err.message);
      setAlertType('danger'); // Set alert to 'danger' for errors
      setShowAlert(true);
    },
    onSuccess: (data) => {
      console.log('Testimonial submitted successfully:', data);
      setComment({
        ...userComment,
        message: '', // Clear the comment input after successful submission
      });
      setAlertMessage('Comment submitted successfully!');
      setAlertType('success'); // Set alert to 'success'
      setShowAlert(true);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userComment.message.trim()) {
      mutate(userComment); // Trigger the mutation with the comment data
    } else {
      setAlertMessage('Please write a comment before submitting.');
      setAlertType('danger');
      setShowAlert(true);
    }
  };

  return (
    <div className="overall-comment-page text-light">
      <div className="form-div-comment">
        {showAlert && (
          <div className={`alert alert-${alertType} alert-dismissible fade show`} role="alert">
            {alertMessage}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={() => setShowAlert(false)}
            ></button>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <label
            onClick={() => setButton(true)}
            htmlFor="comment"
            className="fs-1 text-dark"
          >
            Send a comment....
          </label>
          <br />
          <textarea
            name="message"
            value={userComment.message}
            onChange={handleChange}
            id="comment"
            className="container-fluid comment-text-area-input fs-4 border-0 outline-0"
            placeholder="Write your comment here..."
          />
          <div className="send-comment-btn">
            {button && (
              <button type="submit" className="btn btn-outline-dark" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Commentpage;

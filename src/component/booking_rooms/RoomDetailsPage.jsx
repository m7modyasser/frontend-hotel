import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService'; // Assuming your service is in a file called ApiService.js
import DatePicker from 'react-datepicker';

const RoomDetailsPage = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalGuests, setTotalGuests] = useState(1);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [userId, setUserId] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await ApiService.getRoomById(roomId);
        setRoomDetails(response.room);
        const userProfile = await ApiService.getUserProfile();
        setUserId(userProfile.user.id);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [roomId]);


  const handleConfirmBooking = async () => {
    if (!checkInDate || !checkOutDate) {
      setErrorMessage('Please select check-in and check-out dates.');
      setTimeout(() => setErrorMessage(''), 5000);
      return;
    }

    if (isNaN(numAdults) || numAdults < 1 || isNaN(numChildren) || numChildren < 0) {
      setErrorMessage('Please enter valid numbers for adults and children.');
      setTimeout(() => setErrorMessage(''), 5000);
      return;
    }

    const oneDay = 24 * 60 * 60 * 1000;
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    const totalDays = Math.round(Math.abs((endDate - startDate) / oneDay)) + 1;

    const totalGuests = numAdults + numChildren;
    const roomPricePerNight = roomDetails.roomPrice;
    const calculatedTotalPrice = roomPricePerNight * totalDays;

    setTotalPrice(calculatedTotalPrice);
    setTotalGuests(totalGuests);
  };

  const acceptBooking = async () => {
    try {
      const startDate = new Date(checkInDate);
      const endDate = new Date(checkOutDate);

      const formattedCheckInDate = new Date(startDate.getTime() - (startDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
      const formattedCheckOutDate = new Date(endDate.getTime() - (endDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];

      const booking = {
        checkInDate: formattedCheckInDate,
        checkOutDate: formattedCheckOutDate,
        numOfAdults: numAdults,
        numOfChildren: numChildren
      };

      const response = await ApiService.bookRoom(roomId, userId, booking);
      if (response.statusCode === 200) {
        setConfirmationCode(response.bookingConfirmationCode);
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
          navigate('/rooms');
        }, 10000);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message);
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };

  if (isLoading) {
    return <p style={{ textAlign: 'center', marginTop: '100px', fontSize: '18px', color: 'var(--text-secondary)' }}>Loading your luxury experience...</p>;
  }

  if (error) {
    return <p className="error-message" style={{ margin: '100px auto', maxWidth: '600px' }}>{error}</p>;
  }

  if (!roomDetails) {
    return <p style={{ textAlign: 'center', marginTop: '100px' }}>Room not found.</p>;
  }

  const { roomType, roomPrice, roomPhotoUrl, description, bookings } = roomDetails;

  const images = [
    roomPhotoUrl,
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1000"
  ];

  const nextImage = () => setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));

  return (
    <div className="room-details-booking">
      {showMessage && (
        <div className="booking-success-message glass" style={{ marginBottom: '40px' }}>
          <h3 style={{ marginBottom: '8px', color: 'var(--success)' }}>Booking Confirmed!</h3>
          <p>Your confirmation code is: <strong>{confirmationCode}</strong>. We've sent the details to your email and phone.</p>
        </div>
      )}
      {errorMessage && (
        <div className="error-message glass" style={{ marginBottom: '40px' }}>
          {errorMessage}
        </div>
      )}
      
      <div className="room-details-layout">
        <div className="room-details-left">
          <div className="room-carousel shadow-lg">
            <button className="carousel-btn prev" onClick={prevImage}>&#10094;</button>
            <img src={images[currentImageIndex]} alt={roomType} className="room-details-image" />
            <button className="carousel-btn next" onClick={nextImage}>&#10095;</button>
          </div>
          
          <div className="room-details-info">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '40px', fontWeight: '800', margin: 0 }}>{roomType}</h3>
                <span className="phegon-color" style={{ fontSize: '24px', fontWeight: '700' }}>${roomPrice} <span style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>/ night</span></span>
            </div>
            <p style={{ fontSize: '18px', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '40px' }}>{description}</p>
            
            {/* Mocked Premium Features */}
            <div style={{ padding: '32px', background: 'var(--bg-elevated)', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                <h4 style={{ fontSize: '20px', marginBottom: '16px' }}>Premium Features</h4>
                <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', color: 'var(--text-secondary)' }}>
                    <li>✓ High-Speed Wi-Fi</li>
                    <li>✓ 24/7 Room Service</li>
                    <li>✓ Smart Climate Control</li>
                    <li>✓ Luxury Toiletries</li>
                    <li>✓ Minibar Included</li>
                    <li>✓ Panoramic Views</li>
                </ul>
            </div>
          </div>
        </div>

        <div className="room-details-right">
          <div className="booking-info glass">
            <h3 style={{ fontSize: '24px', marginBottom: '24px' }}>Reserve Your Stay</h3>
            
            <div className="booking-info-buttons">
              {!showDatePicker && <button className="book-now-button" onClick={() => setShowDatePicker(true)} style={{ width: '100%', padding: '16px', fontSize: '18px' }}>Select Dates</button>}
              {showDatePicker && <button className="go-back-button btn" onClick={() => setShowDatePicker(false)} style={{ background: 'transparent', border: '1px solid var(--border-strong)', color: 'var(--text-primary)' }}>Cancel</button>}
            </div>

            {showDatePicker && (
              <div className="date-picker-container">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Check-in</label>
                        <DatePicker
                        className="detail-search-field"
                        selected={checkInDate}
                        onChange={(date) => setCheckInDate(date)}
                        selectsStart
                        startDate={checkInDate}
                        endDate={checkOutDate}
                        placeholderText="Add date"
                        dateFormat="dd/MM/yyyy"
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Check-out</label>
                        <DatePicker
                        className="detail-search-field"
                        selected={checkOutDate}
                        onChange={(date) => setCheckOutDate(date)}
                        selectsEnd
                        startDate={checkInDate}
                        endDate={checkOutDate}
                        minDate={checkInDate}
                        placeholderText="Add date"
                        dateFormat="dd/MM/yyyy"
                        />
                    </div>
                </div>

                <div className='guest-container'>
                  <div className="guest-div">
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Adults</label>
                    <input
                      type="number"
                      min="1"
                      value={numAdults}
                      onChange={(e) => setNumAdults(parseInt(e.target.value))}
                    />
                  </div>
                  <div className="guest-div">
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Children</label>
                    <input
                      type="number"
                      min="0"
                      value={numChildren}
                      onChange={(e) => setNumChildren(parseInt(e.target.value))}
                    />
                  </div>
                </div>
                
                {!totalPrice ? (
                    <button className="confirm-booking book-now-button" onClick={handleConfirmBooking} style={{ marginTop: '16px' }}>Calculate Price</button>
                ) : null}
              </div>
            )}
            
            {totalPrice > 0 && (
              <div className="total-price" style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--border-subtle)' }}>
                <p style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '16px', color: 'var(--text-secondary)' }}>
                    <span>Guests</span>
                    <span>{totalGuests}</span>
                </p>
                <p style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', fontSize: '20px', fontWeight: '700', color: 'var(--text-primary)' }}>
                    <span>Total</span>
                    <span className="phegon-color">${totalPrice}</span>
                </p>
                <button onClick={acceptBooking} className="accept-booking book-now-button" style={{ width: '100%', padding: '16px', fontSize: '18px', background: 'var(--accent-brand)', color: '#000' }}>Confirm Reservation</button>
              </div>
            )}
            
            <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '13px', color: 'var(--text-tertiary)' }}>
                You won't be charged yet. Free cancellation up to 48 hours before check-in.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsPage;

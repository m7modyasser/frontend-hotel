import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from '../../service/ApiService';

const AdminPage = () => {
    const [adminName, setAdminName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdminName = async () => {
            try {
                const response = await ApiService.getUserProfile();
                setAdminName(response.user.name);
            } catch (error) {
                console.error('Error fetching admin details:', error.message);
            }
        };

        fetchAdminName();
    }, []);

    return (
        <div className="admin-page">
            <h1 className="welcome-message">Overview Dashboard</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '18px' }}>
                Welcome back, {adminName || 'Admin'}. Here's what's happening today.
            </p>
            
            <div className="dashboard-grid">
                <div className="stat-card glass">
                    <span className="stat-title">Monthly Revenue</span>
                    <span className="stat-value" style={{ color: 'var(--success)' }}>$124,500</span>
                    <span style={{ fontSize: '13px', color: 'var(--text-tertiary)', marginTop: '8px' }}>↑ 12% vs last month</span>
                </div>
                <div className="stat-card glass">
                    <span className="stat-title">Occupancy Rate</span>
                    <span className="stat-value">85%</span>
                    <span style={{ fontSize: '13px', color: 'var(--text-tertiary)', marginTop: '8px' }}>↑ 5% vs last week</span>
                </div>
                <div className="stat-card glass">
                    <span className="stat-title">Active Bookings</span>
                    <span className="stat-value">34</span>
                    <span style={{ fontSize: '13px', color: 'var(--text-tertiary)', marginTop: '8px' }}>12 arriving today</span>
                </div>
                <div className="stat-card glass">
                    <span className="stat-title">Available Rooms</span>
                    <span className="stat-value phegon-color">12</span>
                    <span style={{ fontSize: '13px', color: 'var(--text-tertiary)', marginTop: '8px' }}>Needs attention</span>
                </div>
            </div>

            <div className="admin-actions">
                <button className="admin-button" onClick={() => navigate('/admin/manage-rooms')}>
                    Manage Rooms Fleet
                </button>
                <button className="admin-button" onClick={() => navigate('/admin/manage-bookings')}>
                    Review All Bookings
                </button>
            </div>
        </div>
    );
}

export default AdminPage;

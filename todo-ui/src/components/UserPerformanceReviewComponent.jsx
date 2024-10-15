import React, { useEffect, useState } from 'react';
import { getUserPerformanceReview } from '../services/UserService';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaThumbsDown } from 'react-icons/fa'; // Import icons

const UserPerformanceReviewComponent = () => {
    const [reviewData, setReviewData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch performance review data on component load
        getUserPerformanceReview()
            .then((response) => {
                setReviewData(response.data); // Save the array of review data
            })
            .catch((error) => {
                console.error('Error fetching performance review:', error);
                navigate('/login'); // Redirect to login if error occurs
            });
    }, [navigate]);

    // Function to evaluate staff performance
    const evaluateStaff = (onTimeTasks, overdueTasks) => {
        // Handle case where there are no overdue tasks to avoid division by zero
        if (overdueTasks === 0) {
            // If there are no overdue tasks and there are on-time tasks, they are excellent
            return onTimeTasks > 0 ? 'good' : 'normal'; // Consider 'normal' if no on-time tasks
        }
        
        const ratio = (onTimeTasks / (onTimeTasks + overdueTasks)) * 100; // Calculate the ratio

        if (ratio > 90) return 'good';
        else if (ratio >= 70) return 'normal';
        else return 'bad';
    };

    return (
        <div className='container'>
            <h2 className='text-center'>Staff Performance Review</h2>
            {reviewData.length > 0 ? (
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>On Time Tasks</th>
                            <th>Overdue Tasks</th>
                            <th>Ongoing Tasks</th>
                            <th>Staff Evaluation</th> {/* New Column */}
                        </tr>
                    </thead>
                    <tbody>
                        {reviewData.map((review, index) => (
                            <tr key={index}>
                                <td>{review.username}</td>
                                <td>{review.onTimeTask}</td>
                                <td>{review.overdueTask}</td>
                                <td>{review.ongoingTask}</td>
                                <td>
                                    {(() => {
                                        const evaluation = evaluateStaff(review.onTimeTask, review.overdueTask);
                                        if (evaluation === 'good') {
                                            return <FaStar color="gold" />; // Star icon for good
                                        } else if (evaluation === 'normal') {
                                            return 'Normal'; // Text for normal
                                        } else {
                                            return <FaThumbsDown color="red" />; // Dislike icon for bad
                                        }
                                    })()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Loading performance review...</p>
            )}
        </div>
    );
};

export default UserPerformanceReviewComponent;

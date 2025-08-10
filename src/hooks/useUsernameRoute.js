import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';

export const useUsernameRoute = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const { user } = useAuthStore();

  // Redirect to user's own profile if they try to access someone else's
  useEffect(() => {
    if (user && username && user.username !== username) {
      navigate(`/${user.username}`, { replace: true });
    }
  }, [user, username, navigate]);

  // Update URL when username changes
  const updateUsernameRoute = (newUsername) => {
    if (user && newUsername && newUsername !== user.username) {
      navigate(`/${newUsername}`, { replace: true });
    }
  };

  return { updateUsernameRoute };
};

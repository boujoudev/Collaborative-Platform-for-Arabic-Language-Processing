import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function ChangePassWord() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique de soumission du formulaire
    if (newPassword === confirmPassword) {
      alert("Mot de passe réinitialisé avec succès!");
    } else {
      alert("Les mots de passe ne correspondent pas!");
    }
  };

  return (
    <div className="change-password-container">
      <div className="change-password-card">
        <h1 className="change-password-platform-title">TAL-Arabe Platform</h1>

        <h2 className="change-password-title">Reset Password</h2>

        <form onSubmit={handleSubmit}>
          <div className="change-password-input-group">
            <label className="change-password-label">
              Enter your new password
            </label>
            <div className="change-password-input-container">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="change-password-input"
              />
              <button
                type="button"
                className="change-password-toggle"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>

          <div className="change-password-input-group">
            <label className="change-password-label">
              Confirm your new password
            </label>
            <div className="change-password-input-container">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="change-password-input"
              />
              <button
                type="button"
                className="change-password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>

          <button type="submit" className="change-password-submit-button">
            Set New Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassWord;

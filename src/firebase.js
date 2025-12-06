// Dummy Firebase configuration to prevent build errors
// Replace with actual config if Chat feature is needed

const auth = {};
const db = {};
const loginWithGoogle = () => console.warn("Firebase not configured");
const logout = () => console.warn("Firebase not configured");

export { auth, db, loginWithGoogle, logout };

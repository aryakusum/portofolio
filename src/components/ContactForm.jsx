import { useState } from 'react';
import ShinyText from './ShinyText/ShinyText';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate sending
        setStatus('sending');
        setTimeout(() => {
            window.location.href = `mailto:aryasatriawinata@gmail.com?subject=Contact from ${formData.name}&body=${formData.message}`;
            setStatus('sent');
            setFormData({ name: '', email: '', message: '' });
        }, 1500);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto bg-[#0a0a0a] backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-2xl shadow-black/50">
            <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>

            <div className="mb-4">
                <label className="block text-gray-400 text-sm font-medium mb-2">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white focus:ring-1 focus:ring-white text-white transition-all placeholder-gray-600"
                    placeholder="Your Name"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-400 text-sm font-medium mb-2">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white focus:ring-1 focus:ring-white text-white transition-all placeholder-gray-600"
                    placeholder="your@email.com"
                />
            </div>

            <div className="mb-6">
                <label className="block text-gray-400 text-sm font-medium mb-2">Message</label>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white focus:ring-1 focus:ring-white text-white transition-all resize-none placeholder-gray-600"
                    placeholder="Project details..."
                ></textarea>
            </div>

            <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-3.5 px-6 rounded-lg bg-white text-black font-bold hover:bg-gray-200 shadow-lg shadow-white/10 transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
                {status === 'sending' ? (
                    <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                    </>
                ) : (
                    'Send Message'
                )}
            </button>

            {status === 'sent' && (
                <p className="mt-4 text-green-400 text-center text-sm">
                    Redirecting to email client...
                </p>
            )}
        </form>
    );
}

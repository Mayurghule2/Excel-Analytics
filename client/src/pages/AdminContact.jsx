import React, { useEffect, useState } from 'react';
import { fetchContactMessages } from '../services/api';
import { Mail, User, MessageCircle } from 'react-feather';

const AdminContact = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await fetchContactMessages();
        setMessages(res.data);
      } catch (err) {
        console.error('Failed to fetch contact messages:', err);
        setError('Failed to load messages.');
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500 animate-pulse">
        Loading messages...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto ">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6"> Contact Messages</h2>

      {messages.length === 0 ? (
        <p className="text-gray-500">No messages found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className=" shadow-lg bg-white border border-gray-100 hover:shadow-xl transition-all duration-300 p-5 hover:scale-105"
            >
              <div className="flex items-center gap-3 mb-4 ml-2">
                <User className="text-blue-500" size={30} />
                <h4 className="font-semibold text-xl text-gray-700">{msg.name}</h4>
              </div>

              <div className="flex items-center gap-3 mb-2 ml-3">
                <Mail className="text-green-500" size={18} />
                <p className="text-sm text-gray-600">{msg.email}</p>
              </div>

              <div className="mb-2 flex  gap-2 items-center ml-3">
                <span className="text-base text-gray-400">Subject:</span>
                <p className="text-gray-700 font-medium">{msg.subject}</p>
              </div>

              <div className="flex items-start gap-2 mt-3 ml-3">
                  <div className="mt-1 shrink-0">
    <MessageCircle className="text-purple-500" size={18} />
  </div>
                <p className="text-gray-600 whitespace-pre-wrap break-words break-word  overflow-wrap w-2/3">{msg.message}</p>
              </div>

              <p className="text-right text-xs text-gray-400 mt-4">
                {new Date(msg.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminContact;

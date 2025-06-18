
import React from 'react';
import { MailType } from './MailInbox';

interface MailDetailViewProps {
  mail: MailType;
  recipient?: string;
}

const MailDetailView: React.FC<MailDetailViewProps> = ({ mail, recipient }) => {
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          From
        </label>
        <p className="text-gray-900">{mail.sender}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {mail.type === 'sent' ? 'To' : 'Recipient'}
        </label>
        <p className="text-gray-900">{mail.type === 'sent' ? 'Recipients' : recipient || 'Not specified'}</p>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Subject
        </label>
        <p className="text-gray-900">{mail.subject}</p>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Content
        </label>
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-gray-900 whitespace-pre-wrap">{mail.preview}</p>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Timestamp
        </label>
        <p className="text-gray-600">{mail.timestamp}</p>
      </div>
    </>
  );
};

export default MailDetailView;

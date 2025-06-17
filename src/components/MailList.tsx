
import React from 'react';
import { MailType } from './MailInbox';
import MailItem from './MailItem';

interface MailListProps {
  mails: MailType[];
  activeSection: 'sent' | 'draft';
}

const MailList: React.FC<MailListProps> = ({ mails, activeSection }) => {
  const getSectionTitle = () => {
    switch (activeSection) {
      case 'sent':
        return 'Sent Mail';
      case 'draft':
        return 'Drafts';
      default:
        return 'Mail';
    }
  };

  if (mails.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">📭</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No mails in {getSectionTitle().toLowerCase()}</h3>
          <p className="text-gray-500">Your {getSectionTitle().toLowerCase()} is empty.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{getSectionTitle()}</h2>
        <div className="space-y-2">
          {mails.map((mail) => (
            <MailItem key={mail.id} mail={mail} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MailList;

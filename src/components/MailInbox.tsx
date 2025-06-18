import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Contact } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MailList from "./MailList";
import MailSidebar from "./MailSidebar";
import MailDetail from "./MailDetail";

export type MailType = {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  timestamp: string;
  isRead: boolean;
  category: 'f2p' | 'p2f';
  type: 'sent' | 'draft';
  reviewTag?: string;
};

const mockMails: MailType[] = [
  {
    id: '1',
    sender: 'me',
    subject: 'Welcome to F2P Platform',
    preview: 'Thank you for joining our free-to-play community...',
    timestamp: '2 hours ago',
    isRead: true,
    category: 'f2p',
    type: 'sent'
  },
  {
    id: '2',
    sender: 'me',
    subject: 'Premium Features Available',
    preview: 'Unlock exclusive content with our pay-to-free model...',
    timestamp: '4 hours ago',
    isRead: true,
    category: 'p2f',
    type: 'sent'
  },
  {
    id: '3',
    sender: 'me',
    subject: 'Re: Partnership Proposal',
    preview: 'Thanks for reaching out. I would be interested...',
    timestamp: '1 day ago',
    isRead: true,
    category: 'f2p',
    type: 'sent'
  },
  {
    id: '4',
    sender: 'me',
    subject: 'Draft: Marketing Campaign Ideas',
    preview: 'Here are some initial thoughts on the upcoming campaign...',
    timestamp: '2 days ago',
    isRead: false,
    category: 'p2f',
    type: 'draft',
    reviewTag: 'manager'
  },
  {
    id: '5',
    sender: 'me',
    subject: 'Draft: F2P User Onboarding',
    preview: 'Welcome to our platform! Here is what you need to know...',
    timestamp: '3 days ago',
    isRead: false,
    category: 'f2p',
    type: 'draft'
  },
];

const MailInbox = () => {
  const [activeCategory, setActiveCategory] = useState<'f2p' | 'p2f'>('f2p');
  const [activeSection, setActiveSection] = useState<'sent' | 'draft'>('sent');
  const [selectedMail, setSelectedMail] = useState<MailType | null>(null);
  const [mails, setMails] = useState<MailType[]>(mockMails);
  const navigate = useNavigate();

  const filteredMails = mails.filter(mail => 
    mail.category === activeCategory && mail.type === activeSection
  );

  const getUnreadCount = (category: 'f2p' | 'p2f', section: 'sent' | 'draft') => {
    return mails.filter(mail => 
      mail.category === category && 
      mail.type === section && 
      !mail.isRead
    ).length;
  };

  const handleMailSelect = (mail: MailType) => {
    setSelectedMail(mail);
  };

  const handleMailSave = (updatedMail: MailType) => {
    setMails(prevMails => 
      prevMails.map(mail => 
        mail.id === updatedMail.id ? updatedMail : mail
      )
    );
  };

  const handleMailDelete = (mailId: string) => {
    setMails(prevMails => prevMails.filter(mail => mail.id !== mailId));
    setSelectedMail(null);
  };

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <MailSidebar 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        activeCategory={activeCategory}
        getUnreadCount={getUnreadCount}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {!selectedMail ? (
          <>
            {/* Header */}
            <div className="bg-white border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h1 className="text-2xl font-bold text-gray-900">Mail Outbox</h1>
                  
                  {/* Category Switch */}
                  <div className="flex items-center space-x-3 bg-gray-100 rounded-lg p-1">
                    <span className={`px-3 py-1 text-sm font-medium transition-colors ${
                      activeCategory === 'f2p' ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      F2P
                    </span>
                    <Switch
                      checked={activeCategory === 'p2f'}
                      onCheckedChange={(checked) => setActiveCategory(checked ? 'p2f' : 'f2p')}
                      className="data-[state=checked]:bg-purple-600"
                    />
                    <span className={`px-3 py-1 text-sm font-medium transition-colors ${
                      activeCategory === 'p2f' ? 'text-purple-600' : 'text-gray-500'
                    }`}>
                      P2F
                    </span>
                  </div>

                  <Badge 
                    variant={activeCategory === 'f2p' ? 'default' : 'secondary'}
                    className={activeCategory === 'f2p' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}
                  >
                    {activeCategory.toUpperCase()} Mailbox
                  </Badge>
                </div>

                {/* Contacts Button */}
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/contacts')}
                  className="flex items-center space-x-2"
                >
                  <Contact className="h-4 w-4" />
                  <span>Contacts</span>
                </Button>
              </div>
            </div>

            {/* Mail List */}
            <MailList 
              mails={filteredMails} 
              activeSection={activeSection}
              onMailSelect={handleMailSelect}
            />
          </>
        ) : (
          <MailDetail 
            mail={selectedMail}
            onBack={() => setSelectedMail(null)}
            onSave={handleMailSave}
            onDelete={handleMailDelete}
          />
        )}
      </div>
    </div>
  );
};

export default MailInbox;

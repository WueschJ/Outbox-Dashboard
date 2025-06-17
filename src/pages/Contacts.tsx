import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ContactsList from "@/components/ContactsList";
import ContactDetails from "@/components/ContactDetails";
import MailDetail from "@/components/MailDetail";

export type ContactType = {
  id: string;
  name: string;
  email: string;
  lastContact: string;
  lastSubject: string;
  totalEmails: number;
  category: 'f2p' | 'p2f';
  avatar?: string;
};

export type ConversationType = {
  id: string;
  subject: string;
  timestamp: string;
  type: 'sent' | 'received';
  preview: string;
  content: string;
};

const mockContacts: ContactType[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@f2p.com',
    lastContact: '2 hours ago',
    lastSubject: 'Welcome to F2P Platform',
    totalEmails: 5,
    category: 'f2p'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@p2f.com',
    lastContact: '4 hours ago',
    lastSubject: 'Premium Features Available',
    totalEmails: 12,
    category: 'p2f'
  },
  {
    id: '3',
    name: 'Mike Chen',
    email: 'mike@f2p.com',
    lastContact: '1 day ago',
    lastSubject: 'Partnership Proposal',
    totalEmails: 8,
    category: 'f2p'
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily@p2f.com',
    lastContact: '2 days ago',
    lastSubject: 'Marketing Campaign Ideas',
    totalEmails: 15,
    category: 'p2f'
  },
  {
    id: '5',
    name: 'Alex Rodriguez',
    email: 'alex@f2p.com',
    lastContact: '3 days ago',
    lastSubject: 'Bug Report Follow-up',
    totalEmails: 3,
    category: 'f2p'
  }
];

const mockConversations: { [contactId: string]: ConversationType[] } = {
  '1': [
    {
      id: '1-1',
      subject: 'Welcome to F2P Platform',
      timestamp: '2 hours ago',
      type: 'sent',
      preview: 'Thank you for joining our free-to-play community...',
      content: 'Thank you for joining our free-to-play community. We are excited to have you on board!'
    },
    {
      id: '1-2',
      subject: 'Re: Welcome to F2P Platform',
      timestamp: '1 hour ago',
      type: 'received',
      preview: 'Thanks for the warm welcome...',
      content: 'Thanks for the warm welcome! I am looking forward to exploring the platform.'
    }
  ],
  '2': [
    {
      id: '2-1',
      subject: 'Premium Features Available',
      timestamp: '4 hours ago',
      type: 'sent',
      preview: 'Unlock exclusive content with our pay-to-free model...',
      content: 'Unlock exclusive content with our pay-to-free model. Premium features are now available!'
    }
  ]
};

const Contacts = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<'all' | 'f2p' | 'p2f'>('all');
  const [selectedContact, setSelectedContact] = useState<ContactType | null>(null);
  const [selectedConversation, setSelectedConversation] = useState<ConversationType | null>(null);

  const filteredContacts = mockContacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || contact.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleConversationSelect = (conversation: ConversationType) => {
    // Convert conversation to MailType format for MailDetail component
    const mailFromConversation = {
      id: conversation.id,
      sender: conversation.type === 'sent' ? 'me' : selectedContact?.email || '',
      subject: conversation.subject,
      preview: conversation.content,
      timestamp: conversation.timestamp,
      isRead: true,
      category: selectedContact?.category || 'f2p' as const,
      type: conversation.type === 'sent' ? 'sent' as const : 'sent' as const
    };
    setSelectedConversation(conversation);
  };

  if (selectedConversation) {
    const mailFromConversation = {
      id: selectedConversation.id,
      sender: selectedConversation.type === 'sent' ? 'me' : selectedContact?.email || '',
      subject: selectedConversation.subject,
      preview: selectedConversation.content,
      timestamp: selectedConversation.timestamp,
      isRead: true,
      category: selectedContact?.category || 'f2p' as const,
      type: selectedConversation.type === 'sent' ? 'sent' as const : 'sent' as const
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <MailDetail 
          mail={mailFromConversation}
          onBack={() => setSelectedConversation(null)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center space-x-4 mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Inbox</span>
          </Button>
        </div>
        
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
          <div className="flex items-center space-x-4">
            <Input
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />
            <div className="flex space-x-2">
              {['all', 'f2p', 'p2f'].map((category) => (
                <Button
                  key={category}
                  variant={filterCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterCategory(category as 'all' | 'f2p' | 'p2f')}
                  className={`${
                    filterCategory === category 
                      ? category === 'f2p' 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : category === 'p2f'
                        ? 'bg-purple-600 hover:bg-purple-700'
                        : ''
                      : ''
                  }`}
                >
                  {category === 'all' ? 'All' : category.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-200px)]">
        <div className="w-1/2 border-r border-gray-200">
          <ContactsList 
            contacts={filteredContacts}
            selectedContact={selectedContact}
            onSelectContact={setSelectedContact}
          />
        </div>
        <div className="w-1/2">
          <ContactDetails 
            contact={selectedContact}
            conversations={selectedContact ? mockConversations[selectedContact.id] || [] : []}
            onConversationSelect={handleConversationSelect}
          />
        </div>
      </div>
    </div>
  );
};

export default Contacts;

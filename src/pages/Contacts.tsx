
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ContactCard from "@/components/ContactCard";

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

const Contacts = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<'all' | 'f2p' | 'p2f'>('all');

  const filteredContacts = mockContacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || contact.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

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

      <div className="p-6">
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            {filteredContacts.length} contact{filteredContacts.length !== 1 ? 's' : ''} found
          </p>
        </div>
        
        {filteredContacts.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="text-gray-400 text-6xl mb-4">👥</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Contacts;

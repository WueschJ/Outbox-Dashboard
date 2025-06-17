
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ContactType } from "@/pages/Contacts";

interface ContactsListProps {
  contacts: ContactType[];
  selectedContact: ContactType | null;
  onSelectContact: (contact: ContactType) => void;
}

const ContactsList: React.FC<ContactsListProps> = ({ 
  contacts, 
  selectedContact, 
  onSelectContact 
}) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  if (contacts.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">👥</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto">
      <div className="p-4 border-b border-gray-200">
        <p className="text-sm text-gray-600">
          {contacts.length} contact{contacts.length !== 1 ? 's' : ''} found
        </p>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Contact</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Last Contact</TableHead>
            <TableHead>Emails</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow 
              key={contact.id}
              className={`cursor-pointer hover:bg-gray-50 ${
                selectedContact?.id === contact.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
              }`}
              onClick={() => onSelectContact(contact)}
            >
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className={`text-xs ${
                      contact.category === 'f2p' 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-purple-100 text-purple-600'
                    }`}>
                      {getInitials(contact.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{contact.name}</p>
                    <p className="text-xs text-gray-500">{contact.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge 
                  variant="secondary"
                  className={`text-xs ${
                    contact.category === 'f2p' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-purple-100 text-purple-800'
                  }`}
                >
                  {contact.category.toUpperCase()}
                </Badge>
              </TableCell>
              <TableCell>
                <div>
                  <p className="text-sm">{contact.lastContact}</p>
                  <p className="text-xs text-gray-500 truncate max-w-[150px]">
                    {contact.lastSubject}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm">{contact.totalEmails}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ContactsList;

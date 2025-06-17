
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ContactType } from "@/pages/Contacts";
import { Mail } from "lucide-react";

interface ContactCardProps {
  contact: ContactType;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact }) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <Avatar className="h-12 w-12">
            <AvatarFallback className={`${
              contact.category === 'f2p' 
                ? 'bg-blue-100 text-blue-600' 
                : 'bg-purple-100 text-purple-600'
            }`}>
              {getInitials(contact.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 truncate">{contact.name}</h3>
            <p className="text-sm text-gray-500 truncate">{contact.email}</p>
          </div>
          <Badge 
            variant="secondary"
            className={
              contact.category === 'f2p' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-purple-100 text-purple-800'
            }
          >
            {contact.category.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-gray-700">Last Contact:</p>
            <p className="text-sm text-gray-500">{contact.lastContact}</p>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-700">Last Subject:</p>
            <p className="text-sm text-gray-500 truncate">{contact.lastSubject}</p>
          </div>
          
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <Mail className="h-4 w-4" />
              <span>{contact.totalEmails} emails</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactCard;

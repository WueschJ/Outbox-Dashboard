
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContactType, ConversationType } from "@/pages/Contacts";
import { Mail, User } from "lucide-react";

interface ContactDetailsProps {
  contact: ContactType | null;
  conversations: ConversationType[];
}

const ContactDetails: React.FC<ContactDetailsProps> = ({ contact, conversations }) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  if (!contact) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Select a contact</h3>
          <p className="text-gray-500">Choose a contact from the list to view their details and conversations.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Contact Header */}
      <div className="p-6 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className={`text-lg ${
              contact.category === 'f2p' 
                ? 'bg-blue-100 text-blue-600' 
                : 'bg-purple-100 text-purple-600'
            }`}>
              {getInitials(contact.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900">{contact.name}</h2>
            <p className="text-gray-600">{contact.email}</p>
            <div className="flex items-center space-x-2 mt-2">
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
              <span className="text-sm text-gray-500">{contact.totalEmails} total emails</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Details Tabs */}
      <div className="flex-1 p-6 overflow-auto">
        <Tabs defaultValue="conversations" className="h-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="conversations">Conversations</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
          
          <TabsContent value="conversations" className="mt-4">
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Email History</h3>
              {conversations.length === 0 ? (
                <div className="text-center py-8">
                  <Mail className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No conversations found</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {conversations.map((conversation) => (
                    <Card key={conversation.id} className="border border-gray-200">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{conversation.subject}</h4>
                            <p className="text-xs text-gray-500 mt-1">{conversation.timestamp}</p>
                          </div>
                          <Badge 
                            variant={conversation.type === 'sent' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {conversation.type === 'sent' ? 'Sent' : 'Received'}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-gray-600">{conversation.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="details" className="mt-4">
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Contact Information</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Name</label>
                  <p className="text-sm text-gray-900 mt-1">{contact.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <p className="text-sm text-gray-900 mt-1">{contact.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Category</label>
                  <p className="text-sm text-gray-900 mt-1">{contact.category.toUpperCase()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Last Contact</label>
                  <p className="text-sm text-gray-900 mt-1">{contact.lastContact}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Last Subject</label>
                  <p className="text-sm text-gray-900 mt-1">{contact.lastSubject}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Total Emails</label>
                  <p className="text-sm text-gray-900 mt-1">{contact.totalEmails}</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ContactDetails;

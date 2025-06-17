
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MailType } from './MailInbox';

interface MailItemProps {
  mail: MailType;
}

const MailItem: React.FC<MailItemProps> = ({ mail }) => {
  return (
    <Card className={`cursor-pointer transition-all hover:shadow-md ${
      !mail.isRead ? 'bg-blue-50 border-blue-200' : 'bg-white'
    }`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <p className={`text-sm font-medium truncate ${
                !mail.isRead ? 'text-gray-900' : 'text-gray-700'
              }`}>
                {mail.sender}
              </p>
              {!mail.isRead && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                  New
                </Badge>
              )}
            </div>
            <h3 className={`text-sm font-medium mb-1 truncate ${
              !mail.isRead ? 'text-gray-900' : 'text-gray-700'
            }`}>
              {mail.subject}
            </h3>
            <p className="text-sm text-gray-500 truncate">
              {mail.preview}
            </p>
          </div>
          <div className="ml-4 flex-shrink-0">
            <p className="text-xs text-gray-400">
              {mail.timestamp}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MailItem;


import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Tag } from "lucide-react";
import { MailType } from './MailInbox';

interface MailDetailHeaderProps {
  mail: MailType;
  onBack: () => void;
}

const MailDetailHeader: React.FC<MailDetailHeaderProps> = ({ mail, onBack }) => {
  return (
    <div className="border-b border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Button>

        <div className="flex items-center space-x-2">
          <Badge 
            variant={mail.type === 'sent' ? 'default' : 'secondary'}
            className={mail.type === 'sent' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
          >
            {mail.type === 'sent' ? 'Sent' : 'Draft'}
          </Badge>
          <Badge 
            variant="outline"
            className={mail.category === 'f2p' ? 'border-blue-200 text-blue-600' : 'border-purple-200 text-purple-600'}
          >
            {mail.category.toUpperCase()}
          </Badge>
          {mail.reviewTag && (
            <Badge variant="outline" className="bg-orange-50 border-orange-200 text-orange-700 flex items-center space-x-1">
              <Tag className="h-3 w-3" />
              <span>Review: {mail.reviewTag}</span>
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default MailDetailHeader;

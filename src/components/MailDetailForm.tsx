
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, Send } from "lucide-react";

interface MailDetailFormProps {
  subject: string;
  content: string;
  recipient: string;
  sender: string;
  reviewTag: string;
  onSubjectChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onRecipientChange: (value: string) => void;
  onSenderChange: (value: string) => void;
  onReviewTagChange: (value: string) => void;
  onSaveAsDraft: () => void;
  onTagForReview: () => void;
  onSend: () => void;
}

const MailDetailForm: React.FC<MailDetailFormProps> = ({
  subject,
  content,
  recipient,
  sender,
  reviewTag,
  onSubjectChange,
  onContentChange,
  onRecipientChange,
  onSenderChange,
  onReviewTagChange,
  onSaveAsDraft,
  onTagForReview,
  onSend
}) => {
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Sender
        </label>
        <Select value={sender} onValueChange={onSenderChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select sender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Noah">Noah</SelectItem>
            <SelectItem value="Johanna">Johanna</SelectItem>
            <SelectItem value="Zied">Zied</SelectItem>
            <SelectItem value="Chris">Chris</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Recipient
        </label>
        <Input
          value={recipient}
          onChange={(e) => onRecipientChange(e.target.value)}
          placeholder="Enter recipient email"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Subject
        </label>
        <Input
          value={subject}
          onChange={(e) => onSubjectChange(e.target.value)}
          placeholder="Enter subject"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Content
        </label>
        <Textarea
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          placeholder="Enter email content"
          className="min-h-[200px]"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 pt-4 border-t">
        <Button 
          onClick={onSaveAsDraft}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <Save className="h-4 w-4" />
          <span>Save as Draft</span>
        </Button>
        
        <div className="flex items-center space-x-2">
          <Select value={reviewTag} onValueChange={onReviewTagChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select reviewer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="manager">Manager</SelectItem>
              <SelectItem value="legal">Legal Team</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            onClick={onTagForReview}
            variant="outline"
          >
            Tag for Review
          </Button>
        </div>
        
        <Button 
          onClick={onSend}
          className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
        >
          <Send className="h-4 w-4" />
          <span>Send Now</span>
        </Button>
      </div>
    </>
  );
};

export default MailDetailForm;

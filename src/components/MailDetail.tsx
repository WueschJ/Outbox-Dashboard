
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MailType } from './MailInbox';
import { useToast } from "@/hooks/use-toast";
import MailDetailHeader from './MailDetailHeader';
import MailDetailActions from './MailDetailActions';
import MailDetailForm from './MailDetailForm';
import MailDetailView from './MailDetailView';

interface MailDetailProps {
  mail: MailType | null;
  onBack: () => void;
  onSave?: (updatedMail: MailType) => void;
  onDelete?: (mailId: string) => void;
}

const MailDetail: React.FC<MailDetailProps> = ({ mail, onBack, onSave, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [subject, setSubject] = useState(mail?.subject || '');
  const [content, setContent] = useState(mail?.preview || '');
  const [recipient, setRecipient] = useState(mail?.sender === 'me' ? '' : mail?.sender || '');
  const [sender, setSender] = useState(mail?.sender || 'Noah');
  const [reviewTag, setReviewTag] = useState('');
  const { toast } = useToast();

  if (!mail) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Select a mail to view</p>
      </div>
    );
  }

  const handleSaveAsDraft = () => {
    if (onSave) {
      const updatedMail = {
        ...mail,
        subject,
        preview: content,
        sender,
        timestamp: 'now'
      };
      onSave(updatedMail);
    }
    setIsEditing(false);
    toast({
      title: "Draft saved",
      description: "Your draft has been saved successfully.",
    });
  };

  const handleSend = () => {
    if (onSave) {
      const updatedMail = {
        ...mail,
        subject,
        preview: content,
        sender,
        type: 'sent' as const,
        timestamp: 'now',
        isRead: true,
        reviewTag: undefined
      };
      onSave(updatedMail);
    }
    setIsEditing(false);
    toast({
      title: "Email sent",
      description: "Your email has been sent successfully.",
    });
  };

  const handleTagForReview = () => {
    if (!reviewTag) {
      toast({
        title: "Please select a reviewer",
        description: "You need to select someone to review this draft.",
        variant: "destructive"
      });
      return;
    }
    
    if (onSave) {
      const updatedMail = {
        ...mail,
        subject,
        preview: content,
        sender,
        reviewTag,
        timestamp: 'now'
      };
      onSave(updatedMail);
    }
    
    toast({
      title: "Tagged for review",
      description: `Draft has been tagged for review by ${reviewTag}.`,
    });
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(mail.id);
      onBack();
      toast({
        title: "Draft deleted",
        description: "The draft has been deleted successfully.",
      });
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <MailDetailHeader mail={mail} onBack={onBack} />
      
      <MailDetailActions
        mail={mail}
        isEditing={isEditing}
        onEdit={() => setIsEditing(true)}
        onDelete={handleDelete}
      />

      <div className="flex-1 p-6 overflow-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Email Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <MailDetailForm
                subject={subject}
                content={content}
                recipient={recipient}
                sender={sender}
                reviewTag={reviewTag}
                onSubjectChange={setSubject}
                onContentChange={setContent}
                onRecipientChange={setRecipient}
                onSenderChange={setSender}
                onReviewTagChange={setReviewTag}
                onSaveAsDraft={handleSaveAsDraft}
                onTagForReview={handleTagForReview}
                onSend={handleSend}
              />
            ) : (
              <MailDetailView mail={mail} recipient={recipient} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MailDetail;

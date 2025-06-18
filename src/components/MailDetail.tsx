
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save, Send, Edit, Tag, Trash2 } from "lucide-react";
import { MailType } from './MailInbox';
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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

  const isDraft = mail.type === 'draft';
  const canEdit = isDraft;

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
        reviewTag: undefined // Remove review tag when sent
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
      {/* Header */}
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

        <div className="flex items-center space-x-2">
          {canEdit && !isEditing && (
            <Button 
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2"
            >
              <Edit className="h-4 w-4" />
              <span>Edit Draft</span>
            </Button>
          )}
          
          {isDraft && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="destructive"
                  className="flex items-center space-x-2"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete Draft</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the draft.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Email Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sender
                  </label>
                  <Select value={sender} onValueChange={setSender}>
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
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="Enter recipient email"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <Input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Enter subject"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content
                  </label>
                  <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter email content"
                    className="min-h-[200px]"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-4 border-t">
                  <Button 
                    onClick={handleSaveAsDraft}
                    variant="outline"
                    className="flex items-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save as Draft</span>
                  </Button>
                  
                  <div className="flex items-center space-x-2">
                    <Select value={reviewTag} onValueChange={setReviewTag}>
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
                      onClick={handleTagForReview}
                      variant="outline"
                    >
                      Tag for Review
                    </Button>
                  </div>
                  
                  <Button 
                    onClick={handleSend}
                    className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send Now</span>
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    From
                  </label>
                  <p className="text-gray-900">{mail.sender}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {mail.type === 'sent' ? 'To' : 'Recipient'}
                  </label>
                  <p className="text-gray-900">{mail.type === 'sent' ? 'Recipients' : recipient || 'Not specified'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <p className="text-gray-900">{mail.subject}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content
                  </label>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-gray-900 whitespace-pre-wrap">{mail.preview}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Timestamp
                  </label>
                  <p className="text-gray-600">{mail.timestamp}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MailDetail;

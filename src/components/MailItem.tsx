
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tag, Trash2 } from "lucide-react";
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
import { MailType } from './MailInbox';

interface MailItemProps {
  mail: MailType;
  onSelect?: (mail: MailType) => void;
  onDelete?: (mailId: string) => void;
}

const MailItem: React.FC<MailItemProps> = ({ mail, onSelect, onDelete }) => {
  const handleClick = (e: React.MouseEvent) => {
    // Don't trigger mail selection if clicking on delete button
    if ((e.target as HTMLElement).closest('.delete-button')) {
      return;
    }
    
    if (onSelect) {
      onSelect(mail);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(mail.id);
    }
  };

  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${
        !mail.isRead ? 'bg-blue-50 border-blue-200' : 'bg-white'
      }`}
      onClick={handleClick}
    >
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
            {mail.reviewTag && (
              <div className="mt-2">
                <Badge variant="outline" className="bg-orange-50 border-orange-200 text-orange-700 text-xs flex items-center space-x-1 w-fit">
                  <Tag className="h-3 w-3" />
                  <span>Review: {mail.reviewTag}</span>
                </Badge>
              </div>
            )}
          </div>
          <div className="ml-4 flex-shrink-0 flex items-center space-x-2">
            <p className="text-xs text-gray-400">
              {mail.timestamp}
            </p>
            {mail.type === 'draft' && onDelete && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="delete-button h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Draft</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this draft? This action cannot be undone.
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
      </CardContent>
    </Card>
  );
};

export default MailItem;

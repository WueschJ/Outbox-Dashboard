
import React from 'react';
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
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

interface MailDetailActionsProps {
  mail: MailType;
  isEditing: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

const MailDetailActions: React.FC<MailDetailActionsProps> = ({ 
  mail, 
  isEditing, 
  onEdit, 
  onDelete 
}) => {
  const isDraft = mail.type === 'draft';
  const canEdit = isDraft;

  return (
    <div className="flex items-center space-x-2">
      {canEdit && !isEditing && (
        <Button 
          onClick={onEdit}
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
              <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default MailDetailActions;


import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, MailOpen } from "lucide-react";

interface MailSidebarProps {
  activeSection: 'sent' | 'draft';
  onSectionChange: (section: 'sent' | 'draft') => void;
  activeCategory: 'f2p' | 'p2f';
  getUnreadCount: (category: 'f2p' | 'p2f', section: 'sent' | 'draft') => number;
}

const MailSidebar: React.FC<MailSidebarProps> = ({
  activeSection,
  onSectionChange,
  activeCategory,
  getUnreadCount
}) => {
  const sections = [
    { 
      id: 'sent' as const, 
      label: 'Sent', 
      icon: MailOpen 
    },
    { 
      id: 'draft' as const, 
      label: 'Drafts', 
      icon: Mail 
    },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Navigation</h2>
        <nav className="space-y-2">
          {sections.map((section) => {
            const unreadCount = getUnreadCount(activeCategory, section.id);
            const Icon = section.icon;
            
            return (
              <Button
                key={section.id}
                variant={activeSection === section.id ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => onSectionChange(section.id)}
              >
                <Icon className="h-4 w-4 mr-3" />
                <span className="flex-1 text-left">{section.label}</span>
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="ml-auto">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default MailSidebar;

import { useState, useEffect, ReactNode } from 'react';
import { Edit2, Check, X } from 'lucide-react';
import { useAuth } from '../hooks/use-auth-context';

interface EditableContentProps {
  id: string; // Unique identifier for this content block
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements; // Element type (div, section, etc.)
  className?: string;
  contentType?: 'text' | 'html'; // Type of content being edited
  initialContent?: string; // Initial content
  onSave?: (id: string, content: string) => void; // Save callback
}

// Local storage key prefix for saved content
const CONTENT_STORAGE_PREFIX = 'rbfc_editable_content_';

const EditableContent = ({
  id,
  children,
  as: Component = 'div',
  className = '',
  contentType = 'html',
  initialContent = '',
  onSave
}: EditableContentProps) => {
  const { isAdmin } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(initialContent);
  
  // Load content from local storage or use children as fallback
  useEffect(() => {
    const savedContent = localStorage.getItem(`${CONTENT_STORAGE_PREFIX}${id}`);
    if (savedContent) {
      setContent(savedContent);
    } else if (initialContent) {
      setContent(initialContent);
    }
  }, [id, initialContent]);
  
  // Save content handler
  const handleSave = () => {
    localStorage.setItem(`${CONTENT_STORAGE_PREFIX}${id}`, content);
    setIsEditing(false);
    
    if (onSave) {
      onSave(id, content);
    }
  };
  
  // Cancel editing handler
  const handleCancel = () => {
    // Restore previous content
    const savedContent = localStorage.getItem(`${CONTENT_STORAGE_PREFIX}${id}`);
    if (savedContent) {
      setContent(savedContent);
    } else {
      setContent(initialContent);
    }
    setIsEditing(false);
  };
  
  // If not in admin mode, render children directly
  if (!isAdmin) {
    return (
      <Component className={className}>
        {content ? (
          contentType === 'html' ? (
            <div dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
            content
          )
        ) : (
          children
        )}
      </Component>
    );
  }
  
  return (
    <Component className={`${className} relative group`}>
      {isEditing ? (
        <div className="w-full">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full min-h-[120px] p-3 border border-primary rounded focus:outline-none focus:ring-2 focus:ring-primary text-base"
            style={{ fontSize: '16px' }} /* Prevent zoom on mobile */
          />
          <div className="flex justify-end mt-3 space-x-3">
            <button
              onClick={handleCancel}
              className="flex items-center gap-1 px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
            >
              <X size={14} />
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1 px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              <Check size={14} />
              Save
            </button>
          </div>
        </div>
      ) : (
        <>
          <div>
            {content ? (
              contentType === 'html' ? (
                <div dangerouslySetInnerHTML={{ __html: content }} />
              ) : (
                content
              )
            ) : (
              children
            )}
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="absolute top-2 right-2 p-2 bg-primary text-white rounded-full opacity-70 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hover:scale-110 hover:opacity-100"
            title="Edit content"
          >
            <Edit2 size={16} />
          </button>
        </>
      )}
    </Component>
  );
};

export default EditableContent;
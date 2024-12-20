import dynamic from "next/dynamic";
import Quill from "quill";
import { useRef } from "react";

interface ChatInputProps {
  placeholder: string;
}
const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });
export const ChatInput = ({ placeholder }: ChatInputProps) => {
  const editorRef = useRef<Quill | null>(null);
  return (
    <div className="px-5 w-full">
      <Editor
        placeholder={placeholder}
        onSubmit={() => {}}
        onCancel={() => {}}
        disabled={false}
        innerRef={editorRef}
        variant="create"
      />
    </div>
  );
};

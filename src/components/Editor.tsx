import { PiTextAaBold } from "react-icons/pi";

import { ImageIcon, Send, Smile } from "lucide-react";

import { Button } from "./ui/button";

import Quill, { Delta, QuillOptions, Op } from "quill";
import "quill/dist/quill.snow.css";

import { useEffect, useRef } from "react";
import { Hint } from "./ui/hint";

type EditorValue = {
  image: File | null;
  body: string;
};
interface EditorPorps {
  onSubmit: ({ image, body }: EditorValue) => void;
  onCancel?: () => void;
  placeholder?: string;
  defaultValue?: Delta | Op[];
  variant?: "create" | "update";
}

const Editor = ({ variant = "create" }: EditorPorps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div")
    );

    const options: QuillOptions = {
      theme: "snow",
    };
    new Quill(editorContainer, options);

    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);

  return (
    <div className="flex flex-col">
      <div
        className="flex flex-col border border-slate-200 rounded-md overflow-hidden focus-within:border-slate-300 focus-within:shadow-sm transition bg-white
      "
      >
        <div ref={containerRef} className="h-full ql-custom" />
        <div className="flex px-2 pb-2 z-[5]">
          <Hint label="hide formatting">
            <Button
              disabled={false}
              variant={"ghost"}
              size="iconsm"
              onClick={() => {}}
            >
              <PiTextAaBold className="size-4" />
            </Button>
          </Hint>
          <Hint label="emoji">
            <Button
              disabled={false}
              variant={"ghost"}
              size="iconsm"
              onClick={() => {}}
            >
              <Smile className="size-4" />
            </Button>
          </Hint>
          {variant === "create" && (
            <Hint label="image">
              <Button
                disabled={false}
                variant={"ghost"}
                size="iconsm"
                onClick={() => {}}
              >
                <ImageIcon className="size-4" />
              </Button>
            </Hint>
          )}

          {variant === "update" && (
            <div className="ml-auto flex items-center gap-x-2">
              <Button
                variant={"outline"}
                onClick={() => {}}
                size={"sm"}
                disabled={false}
              >
                Cancel
              </Button>
              <Button
                className=" bg-[#007a5a] hover:bg-[#007a5a]/80 text-white"
                variant={"outline"}
                onClick={() => {}}
                size={"sm"}
                disabled={false}
              >
                Save
              </Button>
            </div>
          )}
          {variant === "create" && (
            <Hint label="send">
              <Button
                disabled={false}
                onClick={() => {}}
                size={"iconsm"}
                className="ml-auto bg-[#007a5a] hover:bg-[#007a5a]/80 text-white"
              >
                <Send className="size-4" />
              </Button>
            </Hint>
          )}
        </div>
      </div>
      <div className="p-2 text-[10px] text-muted-foreground flex  justify-end">
        <p>
          <strong>Shift +Return</strong> add a new line
        </p>
      </div>
    </div>
  );
};

export default Editor;

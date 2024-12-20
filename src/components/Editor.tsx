import { PiTextAaBold } from "react-icons/pi";

import { ImageIcon, Send, Smile } from "lucide-react";

import { Button } from "./ui/button";

import Quill, { Delta, QuillOptions, Op } from "quill";
import "quill/dist/quill.snow.css";

import {
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Hint } from "./ui/hint";
import { cn } from "@/lib/utils";
import { EmojiPopOver } from "./Create-emoji";

type EditorValue = {
  image: File | null;
  body: string | null;
};
interface EditorPorps {
  onSubmit: ({ image, body }: EditorValue) => void;
  onCancel?: () => void;
  placeholder?: string;
  disabled?: boolean;
  innerRef?: MutableRefObject<Quill | null>;

  defaultValue?: Delta | Op[];
  variant?: "create" | "update";
}

const Editor = ({
  variant = "create",
  onCancel,
  onSubmit,
  placeholder = "write somehting....",
  defaultValue = [],
  innerRef,
  disabled = false,
}: EditorPorps) => {
  const [Text, setText] = useState("");
  const [isToolBarVisisble, setisToolBarVisible] = useState(true);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const disableRef = useRef(disabled);
  const submitRef = useRef(onSubmit);
  const placeholderRef = useRef(placeholder);
  const quilRef = useRef<Quill | null>(null);
  const defaultvalueRef = useRef(defaultValue);

  useLayoutEffect(() => {
    submitRef.current = onSubmit;
    disableRef.current = disabled;
    placeholderRef.current = placeholder;
    quilRef.current = null;
    defaultvalueRef.current = defaultValue;
  });

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div")
    );

    const options: QuillOptions = {
      theme: "snow",
      placeholder: placeholderRef.current,
      modules: {
        toolbaar: [
          ["bold", "italic", "strike"],
          ["link"],
          [{ list: "ordered" }, { list: "bullet" }],
        ],
        keyboard: {
          bindings: {
            enter: {
              key: "Enter",
              handler: () => {
                //TODO: submit form
                return;
              },
            },
            shift_enter: {
              key: "Enter",
              shiftkey: true,
              handler: () => {
                quill.insertText(quill.getSelection()?.index || 0, "\n");
              },
            },
          },
        },
      },
    };

    const quill = new Quill(editorContainer, options);
    quilRef.current = quill;
    quilRef.current.focus();

    if (innerRef) {
      innerRef.current = quill;
    }

    quill.setContents(defaultvalueRef.current);
    setText(quill.getText());

    quill.on(Quill.events.TEXT_CHANGE, () => {
      setText(quill.getText());
    });

    return () => {
      if (quilRef.current) {
        quilRef.current = null;
      }
      if (innerRef?.current) {
        innerRef.current = null;
      }
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [innerRef]);
  const isEmpty = Text.replace(/<(.|\n)*?>/g, "").trim().length === 0;

  const toggleToolBar = () => {
    setisToolBarVisible((current) => !current);
    const toolBarElement = containerRef.current?.querySelector(".ql-toolbar");
    if (toolBarElement) {
      toolBarElement.classList.toggle("hidden");
    }
  };

  const OnemojiSelect = (emoji: any) => {
    const quill = quilRef.current;
    quill?.insertText(quill?.getSelection()?.index || 0, emoji.native);
  };

  return (
    <div className="flex flex-col">
      <div
        className="flex flex-col border border-slate-200 rounded-md overflow-hidden focus-within:border-slate-300 focus-within:shadow-sm transition bg-white
      "
      >
        <div ref={containerRef} className="h-full ql-custom" />
        <div className="flex px-2 pb-2 z-[5]">
          <Hint
            label={isToolBarVisisble ? "Hide Formatting" : "show Formating"}
          >
            <Button
              disabled={disabled}
              variant={"ghost"}
              size="iconsm"
              onClick={toggleToolBar}
            >
              <PiTextAaBold className="size-4" />
            </Button>
          </Hint>
          <EmojiPopOver onemojiSelect={OnemojiSelect} label="emoji">
            <Button
              disabled={disabled}
              variant={"ghost"}
              size="iconsm"
              onClick={() => {}}
            >
              <Smile className="size-4" />
            </Button>
          </EmojiPopOver>
          {variant === "create" && (
            <Hint label="image">
              <Button
                disabled={disabled}
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
                disabled={disabled}
              >
                Cancel
              </Button>
              <Button
                className=" bg-[#007a5a] hover:bg-[#007a5a]/80 text-white"
                variant={"outline"}
                onClick={() => {}}
                size={"sm"}
                disabled={disabled}
              >
                Save
              </Button>
            </div>
          )}
          {variant === "create" && (
            <Hint label="send">
              <Button
                disabled={disabled || isEmpty}
                onClick={() => {}}
                size={"iconsm"}
                className={cn(
                  "ml-auto",
                  isEmpty
                    ? "bg-white hover:bg-white text-muted-foreground "
                    : " bg-[#007a5a] hover:bg-[#007a5a]/80 text-white"
                )}
              >
                <Send className="size-4" />
              </Button>
            </Hint>
          )}
        </div>
      </div>
      {variant === "create" && (
        <div
          className={cn(
            "p-2 text-[10px] text-muted-foreground flex  opacity-0 transition justify-end",
            !isEmpty && "opacity-100 "
          )}
        >
          <p>
            <strong>Shift +Enter</strong> add a new line
          </p>
        </div>
      )}
    </div>
  );
};

export default Editor;

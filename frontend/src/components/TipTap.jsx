import "./tiptap.css";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from '@tiptap/extension-link';
import {
    FaBold,
    FaItalic,
    FaStrikethrough,
    FaHeading,
    FaListOl,
    FaListUl,
    FaQuoteLeft,
    FaRedo,
    FaUndo,
    FaUnderline,
    FaLink,
    FaUnlink,
} from "react-icons/fa";
import Underline from "@tiptap/extension-underline";
import React from "react";
import { useEffect, useContext, useCallback } from "react";
import { UpdateContext } from "../context/UpdateContext";

const MenuBar = ({ editor }) => {
    if (!editor) {
        return null;
    }

    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes("link").href;
        const url = window.prompt("URL", previousUrl);

        // cancelled
        if (url === null) {
            return;
        }

        // empty
        if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();

            return;
        }

        // update link
        editor
            .chain()
            .focus()
            .extendMarkRange("link")
            .setLink({ href: url })
            .run();
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <div className="menu-bar">
            <div className="editorButtons">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    className={editor.isActive("bold") ? "is-active" : ""}
                >
                    <FaBold />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={
                        !editor.can().chain().focus().toggleItalic().run()
                    }
                    className={editor.isActive("italic") ? "is-active" : ""}
                >
                    <FaItalic />
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().toggleUnderline().run()
                    }
                    disabled={
                        !editor.can().chain().focus().toggleUnderline().run()
                    }
                    className={editor.isActive("underline") ? "is-active" : ""}
                >
                    <FaUnderline />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={
                        !editor.can().chain().focus().toggleStrike().run()
                    }
                    className={editor.isActive("strike") ? "is-active" : ""}
                >
                    <FaStrikethrough />
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 3 }).run()
                    }
                    className={
                        editor.isActive("heading", { level: 3 })
                            ? "is-active"
                            : ""
                    }
                >
                    <FaHeading />
                </button>

                <button
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                    className={editor.isActive("bulletList") ? "is-active" : ""}
                >
                    <FaListUl />
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                    className={
                        editor.isActive("orderedList") ? "is-active" : ""
                    }
                >
                    <FaListOl />
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().toggleBlockquote().run()
                    }
                    className={editor.isActive("blockquote") ? "is-active" : ""}
                >
                    <FaQuoteLeft />
                </button>
                <button
                    onClick={setLink}
                    className={editor.isActive("link") ? "is-active" : ""}
                >
                    <FaLink />
                </button>
                <button
                    onClick={() => editor.chain().focus().unsetLink().run()}
                    disabled={!editor.isActive("link")}
                >
                    <FaUnlink />
                </button>
            </div>
            <div className="editorButtons">
                <button
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().chain().focus().undo().run()}
                >
                    <FaUndo />
                </button>
                <button
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().chain().focus().redo().run()}
                >
                    <FaRedo />
                </button>
            </div>
        </div>
    );
};

const TipTap = ({ setBody, submitted, setSubmitted }) => {
    const { updateData } = useContext(UpdateContext);
    const editor = useEditor(
        {
            extensions: [
                StarterKit,
                Underline,
                Link.configure({
                    openOnClick: false,
                }),
            ],
            content: updateData ? updateData.body : updateData,
            onCreate: ({ editor }) => {
                editor.commands.focus("end");
            },
            onUpdate: ({ editor }) => {
                const outputHTML = editor.getHTML();
                setBody(outputHTML);
            },
        },
        [updateData]
    );

    // clears tiptap editor window when 'submitted' state changes
    // from PostForm, (it's a prop here)
    // then resets submitted state to false
    useEffect(() => {
        submitted && editor.commands.clearContent(true);
        setSubmitted(false);
    }, [submitted]);

    return (
        <>
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </>
    );
};

export default TipTap;

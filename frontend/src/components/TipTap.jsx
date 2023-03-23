import "./tiptap.css";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
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
} from "react-icons/fa";
import Underline from "@tiptap/extension-underline";
import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { UpdateContext } from "../context/UpdateContext";

const MenuBar = ({ editor }) => {
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
            extensions: [StarterKit, Underline],
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

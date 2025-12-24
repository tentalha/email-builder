import '@maily-to/core/style.css';
import './Maily.css';

import { Editor } from '@maily-to/core';
import { useState } from 'react';
import {
    text,
    heading1,
    heading2,
    heading3,
    bulletList,
    orderedList,
    image,
    button,
    divider,
    spacer
} from '@maily-to/core/blocks';
import {
    VariableExtension,
    getVariableSuggestions,
    ImageUploadExtension
} from '@maily-to/core/extensions';

export function Maily() {
    const [editor, setEditor] = useState();

    // Default starter template
    const defaultContent = {
        type: 'doc',
        content: [
            {
                type: 'heading',
                attrs: { level: 1 },
                content: [{ type: 'text', text: 'Welcome to Our Newsletter! 📧' }]
            },
            {
                type: 'paragraph',
                content: [
                    { type: 'text', text: 'Hi ' },
                    {
                        type: 'variable',
                        attrs: {
                            name: 'firstName',
                            fallback: 'there'
                        }
                    },
                    { type: 'text', text: ',' }
                ]
            },
            {
                type: 'paragraph',
                content: [
                    { type: 'text', text: 'Thank you for subscribing to our newsletter. We\'re excited to have you on board!' }
                ]
            },
            {
                type: 'heading',
                attrs: { level: 2 },
                content: [{ type: 'text', text: 'What\'s New?' }]
            },
            {
                type: 'bulletList',
                content: [
                    {
                        type: 'listItem',
                        content: [
                            {
                                type: 'paragraph',
                                content: [{ type: 'text', text: 'Feature updates and improvements' }]
                            }
                        ]
                    },
                    {
                        type: 'listItem',
                        content: [
                            {
                                type: 'paragraph',
                                content: [{ type: 'text', text: 'New content and resources' }]
                            }
                        ]
                    },
                    {
                        type: 'listItem',
                        content: [
                            {
                                type: 'paragraph',
                                content: [{ type: 'text', text: 'Exclusive offers for subscribers' }]
                            }
                        ]
                    }
                ]
            },
            {
                type: 'paragraph',
                content: [
                    { type: 'text', text: 'Best regards,' },
                    { type: 'hardBreak' },
                    { type: 'text', text: 'The ' },
                    {
                        type: 'variable',
                        attrs: {
                            name: 'companyName',
                            fallback: 'Team'
                        }
                    },
                    { type: 'text', text: ' Team' }
                ]
            }
        ]
    };

    const [contentJson, setContentJson] = useState(defaultContent);

    // Variables configuration
    const variables = [
        { name: 'firstName', required: false },
        { name: 'lastName', required: false },
        { name: 'email', required: true },
        { name: 'companyName', required: false },
        { name: 'currentDate', required: false },
        { name: 'userName', required: false },
    ];

    // Image upload handler
    const handleImageUpload = async (file) => {
        // For demo purposes, create a local URL
        // In production, upload to your server/CDN
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.readAsDataURL(file);
        });
    };

    // Export HTML functionality
    const handleExport = () => {
        if (editor) {
            const html = editor.getHTML();
            console.log('Exported HTML:', html);

            // Create downloadable file
            const blob = new Blob([html], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'email-template.html';
            a.click();
            URL.revokeObjectURL(url);
        }
    };

    // Export JSON functionality
    const handleExportJson = () => {
        if (editor) {
            const json = editor.getJSON();
            console.log('Exported JSON:', json);
            setContentJson(json);

            // Create downloadable file
            const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'email-template.json';
            a.click();
            URL.revokeObjectURL(url);
        }
    };

    return (
        <div className="maily-container">
            <div className="maily-header">
                <div className="header-left">
                    <h1 className="editor-title">📧 Email Template Builder</h1>
                    <p className="editor-subtitle">Create beautiful emails with ease using Maily</p>
                </div>
                <div className="header-actions">
                    <button onClick={handleExportJson} className="btn btn-secondary">
                        Export JSON
                    </button>
                    <button onClick={handleExport} className="btn btn-primary">
                        Export HTML
                    </button>
                </div>
            </div>

            <div className="editor-wrapper">
                <Editor
                    contentJson={contentJson}
                    onCreate={setEditor}
                    onUpdate={setEditor}
                    extensions={[
                        VariableExtension.configure({
                            suggestion: getVariableSuggestions('@'),
                            variables: variables,
                        }),
                        ImageUploadExtension.configure({
                            onImageUpload: handleImageUpload,
                        }),
                    ]}
                    blocks={[
                        {
                            title: 'Basic Blocks',
                            commands: [text, heading1, heading2, heading3],
                        },
                        {
                            title: 'Lists',
                            commands: [bulletList, orderedList],
                        },
                        {
                            title: 'Media & Layout',
                            commands: [image, button, divider, spacer],
                        },
                    ]}
                />
            </div>

            <div className="maily-footer">
                <div className="footer-info">
                    <span className="info-badge">💡 Tip: Type <code>/</code> for commands</span>
                    <span className="info-badge">📝 Type <code>@</code> for variables</span>
                </div>
            </div>
        </div>
    );
}
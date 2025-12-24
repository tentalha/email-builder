import React, { useRef, useState } from 'react';
import EmailEditor from 'react-email-editor';
import './UnlayerBuilder.css';

export default function UnlayerBuilder() {
  const emailEditorRef = useRef(null);
  const [htmlOutput, setHtmlOutput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const exportHtml = () => {
    const editor = emailEditorRef.current?.editor;

    editor?.exportHtml((data) => {
      const { design, html } = data;
      setHtmlOutput(html);
      setJsonOutput(JSON.stringify(design, null, 2));
      setShowPreview(true);
    });
  };

  const saveDesign = () => {
    const editor = emailEditorRef.current?.editor;

    editor?.saveDesign((design) => {
      console.log('Design JSON:', design);
      // You can save this to your backend or localStorage
      localStorage.setItem('emailDesign', JSON.stringify(design));
      alert('Design saved to localStorage!');
    });
  };

  const loadDesign = () => {
    const editor = emailEditorRef.current?.editor;
    const savedDesign = localStorage.getItem('emailDesign');

    if (savedDesign) {
      editor?.loadDesign(JSON.parse(savedDesign));
      alert('Design loaded!');
    } else {
      alert('No saved design found!');
    }
  };

  const onReady = () => {
    console.log('Editor is ready');

    // Load boilerplate template
    const editor = emailEditorRef.current?.editor;

    const sampleTemplate = {
      "counters": {
        "u_column": 4,
        "u_row": 4,
        "u_content_text": 4,
        "u_content_button": 1,
        "u_content_divider": 1,
        "u_content_image": 1
      },
      "body": {
        "id": "body",
        "rows": [
          {
            "id": "header-row",
            "cells": [1],
            "columns": [
              {
                "id": "header-column",
                "contents": [
                  {
                    "id": "logo-image",
                    "type": "image",
                    "values": {
                      "containerPadding": "20px",
                      "anchor": "",
                      "src": {
                        "url": "https://via.placeholder.com/200x60/4F46E5/ffffff?text=Your+Logo",
                        "width": 200,
                        "height": 60
                      },
                      "textAlign": "center",
                      "altText": "Company Logo",
                      "action": {
                        "name": "web",
                        "values": {
                          "href": "",
                          "target": "_blank"
                        }
                      },
                      "hideDesktop": false,
                      "displayCondition": null,
                      "_meta": {
                        "htmlID": "u_content_image_1",
                        "htmlClassNames": "u_content_image"
                      },
                      "selectable": true,
                      "draggable": true,
                      "duplicatable": true,
                      "deletable": true,
                      "hideable": true
                    }
                  }
                ],
                "values": {
                  "backgroundColor": "#ffffff",
                  "padding": "0px",
                  "border": {},
                  "borderRadius": "0px",
                  "_meta": {
                    "htmlID": "u_column_1",
                    "htmlClassNames": "u_column"
                  }
                }
              }
            ],
            "values": {
              "displayCondition": null,
              "columns": false,
              "backgroundColor": "#f8f9fa",
              "columnsBackgroundColor": "#ffffff",
              "backgroundImage": {
                "url": "",
                "fullWidth": true,
                "repeat": "no-repeat",
                "size": "custom",
                "position": "center"
              },
              "padding": "20px 0px",
              "anchor": "",
              "hideDesktop": false,
              "_meta": {
                "htmlID": "u_row_1",
                "htmlClassNames": "u_row"
              },
              "selectable": true,
              "draggable": true,
              "duplicatable": true,
              "deletable": true,
              "hideable": true
            }
          },
          {
            "id": "content-row",
            "cells": [1],
            "columns": [
              {
                "id": "content-column",
                "contents": [
                  {
                    "id": "heading-text",
                    "type": "text",
                    "values": {
                      "containerPadding": "30px 20px 10px",
                      "anchor": "",
                      "textAlign": "center",
                      "lineHeight": "140%",
                      "linkStyle": {
                        "inherit": true,
                        "linkColor": "#0000ee",
                        "linkHoverColor": "#0000ee",
                        "linkUnderline": true,
                        "linkHoverUnderline": true
                      },
                      "hideDesktop": false,
                      "displayCondition": null,
                      "_meta": {
                        "htmlID": "u_content_text_1",
                        "htmlClassNames": "u_content_text"
                      },
                      "selectable": true,
                      "draggable": true,
                      "duplicatable": true,
                      "deletable": true,
                      "hideable": true,
                      "text": "<h1 style=\"margin: 0; color: #1f2937; font-size: 28px; font-weight: bold;\">Welcome to Our Newsletter</h1>"
                    }
                  },
                  {
                    "id": "intro-text",
                    "type": "text",
                    "values": {
                      "containerPadding": "10px 40px 20px",
                      "anchor": "",
                      "textAlign": "center",
                      "lineHeight": "160%",
                      "linkStyle": {
                        "inherit": true,
                        "linkColor": "#0000ee",
                        "linkHoverColor": "#0000ee",
                        "linkUnderline": true,
                        "linkHoverUnderline": true
                      },
                      "hideDesktop": false,
                      "displayCondition": null,
                      "_meta": {
                        "htmlID": "u_content_text_2",
                        "htmlClassNames": "u_content_text"
                      },
                      "selectable": true,
                      "draggable": true,
                      "duplicatable": true,
                      "deletable": true,
                      "hideable": true,
                      "text": "<p style=\"margin: 0; color: #6b7280; font-size: 16px; line-height: 160%;\">Thank you for subscribing! We're excited to share our latest updates, news, and exclusive offers with you.</p>"
                    }
                  },
                  {
                    "id": "cta-button",
                    "type": "button",
                    "values": {
                      "containerPadding": "20px",
                      "anchor": "",
                      "href": {
                        "name": "web",
                        "values": {
                          "href": "https://example.com",
                          "target": "_blank"
                        }
                      },
                      "buttonColors": {
                        "color": "#ffffff",
                        "backgroundColor": "#4F46E5",
                        "hoverColor": "#ffffff",
                        "hoverBackgroundColor": "#4338CA"
                      },
                      "size": {
                        "autoWidth": true,
                        "width": "100%"
                      },
                      "textAlign": "center",
                      "lineHeight": "120%",
                      "padding": "14px 40px",
                      "border": {},
                      "borderRadius": "6px",
                      "hideDesktop": false,
                      "displayCondition": null,
                      "_meta": {
                        "htmlID": "u_content_button_1",
                        "htmlClassNames": "u_content_button"
                      },
                      "selectable": true,
                      "draggable": true,
                      "duplicatable": true,
                      "deletable": true,
                      "hideable": true,
                      "text": "<span style=\"font-size: 16px; font-weight: 600;\">Get Started</span>"
                    }
                  },
                  {
                    "id": "divider",
                    "type": "divider",
                    "values": {
                      "containerPadding": "20px",
                      "anchor": "",
                      "width": "100%",
                      "border": {
                        "borderTopWidth": "1px",
                        "borderTopStyle": "solid",
                        "borderTopColor": "#e5e7eb"
                      },
                      "textAlign": "center",
                      "hideDesktop": false,
                      "displayCondition": null,
                      "_meta": {
                        "htmlID": "u_content_divider_1",
                        "htmlClassNames": "u_content_divider"
                      },
                      "selectable": true,
                      "draggable": true,
                      "duplicatable": true,
                      "deletable": true,
                      "hideable": true
                    }
                  },
                  {
                    "id": "body-text",
                    "type": "text",
                    "values": {
                      "containerPadding": "20px 40px",
                      "anchor": "",
                      "textAlign": "left",
                      "lineHeight": "160%",
                      "linkStyle": {
                        "inherit": true,
                        "linkColor": "#4F46E5",
                        "linkHoverColor": "#4338CA",
                        "linkUnderline": true,
                        "linkHoverUnderline": true
                      },
                      "hideDesktop": false,
                      "displayCondition": null,
                      "_meta": {
                        "htmlID": "u_content_text_3",
                        "htmlClassNames": "u_content_text"
                      },
                      "selectable": true,
                      "draggable": true,
                      "duplicatable": true,
                      "deletable": true,
                      "hideable": true,
                      "text": "<h2 style=\"margin: 0 0 10px; color: #1f2937; font-size: 20px; font-weight: 600;\">What's New This Week</h2><p style=\"margin: 10px 0; color: #4b5563; font-size: 14px; line-height: 160%;\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p><ul style=\"margin: 10px 0; padding-left: 20px; color: #4b5563;\"><li style=\"margin: 5px 0;\">Feature update: New dashboard design</li><li style=\"margin: 5px 0;\">Announcement: Upcoming webinar</li><li style=\"margin: 5px 0;\">Tips & tricks: Getting the most out of our platform</li></ul>"
                    }
                  }
                ],
                "values": {
                  "backgroundColor": "#ffffff",
                  "padding": "0px",
                  "border": {},
                  "borderRadius": "8px",
                  "_meta": {
                    "htmlID": "u_column_2",
                    "htmlClassNames": "u_column"
                  }
                }
              }
            ],
            "values": {
              "displayCondition": null,
              "columns": false,
              "backgroundColor": "#f8f9fa",
              "columnsBackgroundColor": "#ffffff",
              "backgroundImage": {
                "url": "",
                "fullWidth": true,
                "repeat": "no-repeat",
                "size": "custom",
                "position": "center"
              },
              "padding": "10px",
              "anchor": "",
              "hideDesktop": false,
              "_meta": {
                "htmlID": "u_row_2",
                "htmlClassNames": "u_row"
              },
              "selectable": true,
              "draggable": true,
              "duplicatable": true,
              "deletable": true,
              "hideable": true
            }
          },
          {
            "id": "footer-row",
            "cells": [1],
            "columns": [
              {
                "id": "footer-column",
                "contents": [
                  {
                    "id": "footer-text",
                    "type": "text",
                    "values": {
                      "containerPadding": "20px 40px",
                      "anchor": "",
                      "textAlign": "center",
                      "lineHeight": "140%",
                      "linkStyle": {
                        "inherit": true,
                        "linkColor": "#6b7280",
                        "linkHoverColor": "#4b5563",
                        "linkUnderline": true,
                        "linkHoverUnderline": true
                      },
                      "hideDesktop": false,
                      "displayCondition": null,
                      "_meta": {
                        "htmlID": "u_content_text_4",
                        "htmlClassNames": "u_content_text"
                      },
                      "selectable": true,
                      "draggable": true,
                      "duplicatable": true,
                      "deletable": true,
                      "hideable": true,
                      "text": "<p style=\"margin: 0; color: #9ca3af; font-size: 12px;\">© 2025 Your Company. All rights reserved.<br/>123 Main Street, City, State 12345</p><p style=\"margin: 10px 0 0; color: #9ca3af; font-size: 12px;\"><a href=\"#\" style=\"color: #6b7280; text-decoration: underline;\">Unsubscribe</a> | <a href=\"#\" style=\"color: #6b7280; text-decoration: underline;\">View in browser</a></p>"
                    }
                  }
                ],
                "values": {
                  "backgroundColor": "",
                  "padding": "0px",
                  "border": {},
                  "borderRadius": "0px",
                  "_meta": {
                    "htmlID": "u_column_3",
                    "htmlClassNames": "u_column"
                  }
                }
              }
            ],
            "values": {
              "displayCondition": null,
              "columns": false,
              "backgroundColor": "#f8f9fa",
              "columnsBackgroundColor": "",
              "backgroundImage": {
                "url": "",
                "fullWidth": true,
                "repeat": "no-repeat",
                "size": "custom",
                "position": "center"
              },
              "padding": "0px",
              "anchor": "",
              "hideDesktop": false,
              "_meta": {
                "htmlID": "u_row_3",
                "htmlClassNames": "u_row"
              },
              "selectable": true,
              "draggable": true,
              "duplicatable": true,
              "deletable": true,
              "hideable": true
            }
          }
        ],
        "values": {
          "popupPosition": "center",
          "popupWidth": "600px",
          "popupHeight": "auto",
          "borderRadius": "10px",
          "contentAlign": "center",
          "contentVerticalAlign": "center",
          "contentWidth": "600px",
          "fontFamily": {
            "label": "Arial",
            "value": "arial,helvetica,sans-serif"
          },
          "textColor": "#000000",
          "popupBackgroundColor": "#FFFFFF",
          "popupBackgroundImage": {
            "url": "",
            "fullWidth": true,
            "repeat": "no-repeat",
            "size": "cover",
            "position": "center"
          },
          "popupOverlay_backgroundColor": "rgba(0, 0, 0, 0.1)",
          "popupCloseButton_position": "top-right",
          "popupCloseButton_backgroundColor": "#DDDDDD",
          "popupCloseButton_iconColor": "#000000",
          "popupCloseButton_borderRadius": "0px",
          "popupCloseButton_margin": "0px",
          "popupCloseButton_action": {
            "name": "close_popup",
            "attrs": {
              "onClick": "document.querySelector('.u-popup-container').style.display = 'none';"
            }
          },
          "backgroundColor": "#f8f9fa",
          "backgroundImage": {
            "url": "",
            "fullWidth": true,
            "repeat": "no-repeat",
            "size": "custom",
            "position": "center"
          },
          "preheaderText": "",
          "linkStyle": {
            "body": true,
            "linkColor": "#0000ee",
            "linkHoverColor": "#0000ee",
            "linkUnderline": true,
            "linkHoverUnderline": true
          },
          "_meta": {
            "htmlID": "u_body",
            "htmlClassNames": "u_body"
          }
        }
      },
      "schemaVersion": 16
    };

    editor?.loadDesign(sampleTemplate);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const downloadHTML = () => {
    const blob = new Blob([htmlOutput], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'newsletter.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="unlayer-builder">
      <div className="unlayer-header">
        <h1>Email Newsletter Builder (Unlayer)</h1>
        <div className="header-actions">
          <button onClick={saveDesign} className="btn btn-secondary">
            Save Design
          </button>
          <button onClick={loadDesign} className="btn btn-secondary">
            Load Design
          </button>
          <button onClick={exportHtml} className="btn btn-primary">
            Generate HTML
          </button>
          {htmlOutput && (
            <button onClick={() => setShowPreview(!showPreview)} className="btn btn-secondary">
              {showPreview ? 'Hide' : 'Show'} Preview
            </button>
          )}
        </div>
      </div>

      <div className="unlayer-content">
        <div className={`editor-section ${showPreview ? 'half-width' : 'full-width'}`}>
          <EmailEditor
            ref={emailEditorRef}
            onReady={onReady}
            minHeight="calc(100vh - 80px)"
            options={{
              displayMode: 'email',
              appearance: {
                theme: 'dark',
              },
              features: {
                textEditor: {
                  tables: true,
                  emojis: true,
                },
              },
            }}
          />
        </div>

        {showPreview && htmlOutput && (
          <div className="preview-section">
            <div className="preview-header">
              <h2>Preview & Export</h2>
              <div className="preview-actions">
                <button onClick={() => copyToClipboard(htmlOutput)} className="btn-small">
                  Copy HTML
                </button>
                <button onClick={downloadHTML} className="btn-small">
                  Download
                </button>
              </div>
            </div>

            <div className="preview-tabs">
              <button
                className="tab-btn active"
                onClick={(e) => {
                  document.querySelectorAll('.preview-tabs .tab-btn').forEach(btn => btn.classList.remove('active'));
                  document.querySelectorAll('.preview-section .tab-content').forEach(content => content.classList.remove('active'));
                  e.target.classList.add('active');
                  document.getElementById('preview-visual').classList.add('active');
                }}
              >
                Visual Preview
              </button>
              <button
                className="tab-btn"
                onClick={(e) => {
                  document.querySelectorAll('.preview-tabs .tab-btn').forEach(btn => btn.classList.remove('active'));
                  document.querySelectorAll('.preview-section .tab-content').forEach(content => content.classList.remove('active'));
                  e.target.classList.add('active');
                  document.getElementById('preview-html').classList.add('active');
                }}
              >
                HTML Code
              </button>
              <button
                className="tab-btn"
                onClick={(e) => {
                  document.querySelectorAll('.preview-tabs .tab-btn').forEach(btn => btn.classList.remove('active'));
                  document.querySelectorAll('.preview-section .tab-content').forEach(content => content.classList.remove('active'));
                  e.target.classList.add('active');
                  document.getElementById('preview-json').classList.add('active');
                }}
              >
                JSON Design
              </button>
            </div>

            <div className="preview-content">
              <div id="preview-visual" className="tab-content active">
                <iframe
                  srcDoc={htmlOutput}
                  title="Email Preview"
                  className="preview-iframe"
                />
              </div>
              <div id="preview-html" className="tab-content">
                <pre className="code-preview">
                  <code>{htmlOutput}</code>
                </pre>
              </div>
              <div id="preview-json" className="tab-content">
                <pre className="code-preview">
                  <code>{jsonOutput}</code>
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Main Application Logic
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const subjectSelect = document.getElementById('subject');
    const termSelect = document.getElementById('term');
    const topicSelect = document.getElementById('topic');
    const selectionHint = document.getElementById('selectionHint');
    const hintText = document.getElementById('hintText');
    const readingAgeSlider = document.getElementById('readingAge');
    const readingAgeValue = document.getElementById('readingAgeValue');
    const numTasksSlider = document.getElementById('numTasks');
    const numTasksValue = document.getElementById('numTasksValue');
    const form = document.getElementById('worksheetForm');
    const outputSection = document.getElementById('outputSection');
    const promptOutput = document.getElementById('promptOutput');
    const copyBtn = document.getElementById('copyBtn');
    const copyText = document.getElementById('copyText');
    const copyIcon = document.getElementById('copyIcon');
    const downloadDocxBtn = document.getElementById('downloadDocxBtn');

    // Store current worksheet settings for docx generation
    let currentWorksheetSettings = {};

    // Update terms when subject changes
    subjectSelect.addEventListener('change', function() {
        const selectedSubject = this.value;
        
        // Reset term and topic dropdowns
        termSelect.innerHTML = '';
        topicSelect.innerHTML = '<option value="">First select a term...</option>';
        topicSelect.disabled = true;
        
        if (selectedSubject && curriculumData[selectedSubject]) {
            termSelect.disabled = false;
            termSelect.innerHTML = '<option value="">Select term...</option>';
            
            // Get terms for this subject
            Object.keys(curriculumData[selectedSubject]).forEach(term => {
                const option = document.createElement('option');
                option.value = term;
                option.textContent = term;
                termSelect.appendChild(option);
            });
            
            selectionHint.classList.remove('hidden');
            hintText.textContent = `${selectedSubject} terms loaded. Select a term to see topics.`;
        } else {
            termSelect.disabled = true;
            termSelect.innerHTML = '<option value="">First select a subject...</option>';
            selectionHint.classList.add('hidden');
        }
    });

    // Update topics when term changes
    termSelect.addEventListener('change', function() {
        const selectedSubject = subjectSelect.value;
        const selectedTerm = this.value;
        
        // Reset topic dropdown
        topicSelect.innerHTML = '';
        
        if (selectedSubject && selectedTerm && curriculumData[selectedSubject][selectedTerm]) {
            topicSelect.disabled = false;
            topicSelect.innerHTML = '<option value="">Select topic...</option>';
            
            curriculumData[selectedSubject][selectedTerm].forEach(topic => {
                const option = document.createElement('option');
                option.value = topic;
                option.textContent = topic;
                topicSelect.appendChild(option);
            });
            
            const topicCount = curriculumData[selectedSubject][selectedTerm].length;
            hintText.textContent = `${topicCount} topics available for ${selectedSubject} ${selectedTerm}.`;
        } else {
            topicSelect.disabled = true;
            topicSelect.innerHTML = '<option value="">First select a term...</option>';
        }
    });

    // Update reading age display
    readingAgeSlider.addEventListener('input', function() {
        readingAgeValue.textContent = this.value;
    });

    // Update number of tasks display
    numTasksSlider.addEventListener('input', function() {
        numTasksValue.textContent = this.value;
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const subject = subjectSelect.value;
        const yearGroup = document.getElementById('yearGroup').value;
        const term = termSelect.value;
        const topic = topicSelect.value;
        const difficulty = document.getElementById('difficulty').value;
        const readingAge = readingAgeSlider.value;
        const numTasks = numTasksSlider.value;
        
        // Get selected SEND adaptations
        const sendCheckboxes = document.querySelectorAll('input[name="send"]:checked');
        const selectedSend = Array.from(sendCheckboxes).map(cb => cb.value);
        
        // Validation
        if (!subject || !yearGroup || !term || !topic) {
            alert('Please select Subject, Year Group, Term, and Topic to generate a prompt.');
            return;
        }
        
        // Store settings for docx generation
        currentWorksheetSettings = {
            subject,
            yearGroup,
            term,
            topic,
            difficulty,
            readingAge,
            numTasks,
            selectedSend
        };

        // Generate the prompt
        const prompt = generatePrompt(subject, yearGroup, term, topic, difficulty, readingAge, numTasks, selectedSend);

        // Display the output
        promptOutput.textContent = prompt;
        outputSection.classList.remove('hidden');
        
        // Scroll to output
        setTimeout(() => {
            outputSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    });

    // Copy to clipboard
    copyBtn.addEventListener('click', async function() {
        const textToCopy = promptOutput.textContent;
        
        try {
            await navigator.clipboard.writeText(textToCopy);
            showCopySuccess();
        } catch (err) {
            // Fallback for older browsers
            fallbackCopy(textToCopy);
            showCopySuccess();
        }
    });

    function showCopySuccess() {
        copyText.textContent = 'Copied!';
        copyIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>';
        copyBtn.classList.remove('bg-marker');
        copyBtn.classList.add('bg-green-500');
        
        setTimeout(() => {
            copyText.textContent = 'Copy';
            copyIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>';
            copyBtn.classList.remove('bg-green-500');
            copyBtn.classList.add('bg-marker');
        }, 2000);
    }

    function fallbackCopy(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }

    // Download as .docx
    downloadDocxBtn.addEventListener('click', async function() {
        const { subject, yearGroup, term, topic, difficulty, readingAge, numTasks, selectedSend } = currentWorksheetSettings;

        if (!subject) {
            alert('Please generate a prompt first.');
            return;
        }

        const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle, Table, TableRow, TableCell, WidthType, VerticalAlign, ShadingType, convertInchesToTwip } = docx;

        // Create document children array
        const children = [];

        // School header placeholder
        children.push(
            new Paragraph({
                children: [
                    new TextRun({
                        text: "[School Name]",
                        bold: true,
                        size: 28,
                        color: "666666"
                    })
                ],
                alignment: AlignmentType.CENTER,
                spacing: { after: 120 }
            })
        );

        // Main Title
        children.push(
            new Paragraph({
                children: [
                    new TextRun({
                        text: `${subject}: ${topic}`,
                        bold: true,
                        size: 56,
                        color: "2D3142"
                    })
                ],
                alignment: AlignmentType.CENTER,
                spacing: { after: 200 }
            })
        );

        // Year group and term subtitle
        children.push(
            new Paragraph({
                children: [
                    new TextRun({
                        text: `${yearGroup} • ${term} • ${difficulty} Level`,
                        size: 26,
                        color: "4F5D75"
                    })
                ],
                alignment: AlignmentType.CENTER,
                spacing: { after: 400 }
            })
        );

        // Student info box
        const studentInfoTable = new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({ text: "Name: ", bold: true, size: 24 }),
                                        new TextRun({ text: "________________________________________", size: 24, color: "AAAAAA" })
                                    ],
                                    spacing: { before: 120, after: 120 }
                                })
                            ],
                            width: { size: 50, type: WidthType.PERCENTAGE },
                            borders: {
                                top: { style: BorderStyle.SINGLE, size: 8, color: "DDDDDD" },
                                bottom: { style: BorderStyle.SINGLE, size: 8, color: "DDDDDD" },
                                left: { style: BorderStyle.SINGLE, size: 8, color: "DDDDDD" },
                                right: { style: BorderStyle.NONE }
                            },
                            shading: { fill: "F8F8F8", type: ShadingType.CLEAR }
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({ text: "Date: ", bold: true, size: 24 }),
                                        new TextRun({ text: "_____________________", size: 24, color: "AAAAAA" })
                                    ],
                                    spacing: { before: 120, after: 120 }
                                })
                            ],
                            width: { size: 50, type: WidthType.PERCENTAGE },
                            borders: {
                                top: { style: BorderStyle.SINGLE, size: 8, color: "DDDDDD" },
                                bottom: { style: BorderStyle.SINGLE, size: 8, color: "DDDDDD" },
                                left: { style: BorderStyle.NONE },
                                right: { style: BorderStyle.SINGLE, size: 8, color: "DDDDDD" }
                            },
                            shading: { fill: "F8F8F8", type: ShadingType.CLEAR }
                        })
                    ]
                })
            ]
        });
        children.push(studentInfoTable);

        // Spacing after student info
        children.push(new Paragraph({ spacing: { after: 400 } }));

        // SEND adaptations note if any (teacher reference - can be removed)
        if (selectedSend && selectedSend.length > 0) {
            children.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Adaptations: ",
                            bold: true,
                            size: 20,
                            color: "888888",
                            italics: true
                        }),
                        new TextRun({
                            text: selectedSend.join(", "),
                            size: 20,
                            color: "888888",
                            italics: true
                        })
                    ],
                    spacing: { after: 200 }
                })
            );
        }

        // Instructions box
        const instructionsTable = new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: "Instructions",
                                            bold: true,
                                            size: 26
                                        })
                                    ],
                                    spacing: { before: 160, after: 80 }
                                }),
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: "• Read each question carefully before answering.",
                                            size: 22
                                        })
                                    ],
                                    spacing: { after: 60 }
                                }),
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: "• Write your answers in the boxes provided.",
                                            size: 22
                                        })
                                    ],
                                    spacing: { after: 60 }
                                }),
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: "• Show your working where appropriate.",
                                            size: 22
                                        })
                                    ],
                                    spacing: { after: 160 }
                                })
                            ],
                            borders: {
                                top: { style: BorderStyle.SINGLE, size: 12, color: "4ECDC4" },
                                bottom: { style: BorderStyle.SINGLE, size: 12, color: "4ECDC4" },
                                left: { style: BorderStyle.SINGLE, size: 12, color: "4ECDC4" },
                                right: { style: BorderStyle.SINGLE, size: 12, color: "4ECDC4" }
                            },
                            shading: { fill: "F0FFFE", type: ShadingType.CLEAR }
                        })
                    ]
                })
            ]
        });
        children.push(instructionsTable);

        // Spacing before key information
        children.push(new Paragraph({ spacing: { after: 400 } }));

        // Key Information box
        const keyInfoTable = new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: "Key Information",
                                            bold: true,
                                            size: 26
                                        })
                                    ],
                                    spacing: { before: 160, after: 120 }
                                }),
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: "[Add key vocabulary, formulas, or concepts here]",
                                            size: 22,
                                            color: "666666",
                                            italics: true
                                        })
                                    ],
                                    spacing: { after: 80 }
                                }),
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: "• ",
                                            size: 22
                                        }),
                                        new TextRun({
                                            text: "[Key term 1]",
                                            size: 22,
                                            color: "666666",
                                            italics: true
                                        }),
                                        new TextRun({
                                            text: " - [Definition or explanation]",
                                            size: 22,
                                            color: "666666",
                                            italics: true
                                        })
                                    ],
                                    spacing: { after: 60 }
                                }),
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: "• ",
                                            size: 22
                                        }),
                                        new TextRun({
                                            text: "[Key term 2]",
                                            size: 22,
                                            color: "666666",
                                            italics: true
                                        }),
                                        new TextRun({
                                            text: " - [Definition or explanation]",
                                            size: 22,
                                            color: "666666",
                                            italics: true
                                        })
                                    ],
                                    spacing: { after: 60 }
                                }),
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: "• ",
                                            size: 22
                                        }),
                                        new TextRun({
                                            text: "[Worked example or formula]",
                                            size: 22,
                                            color: "666666",
                                            italics: true
                                        })
                                    ],
                                    spacing: { after: 160 }
                                })
                            ],
                            borders: {
                                top: { style: BorderStyle.SINGLE, size: 12, color: "EF8354" },
                                bottom: { style: BorderStyle.SINGLE, size: 12, color: "EF8354" },
                                left: { style: BorderStyle.SINGLE, size: 12, color: "EF8354" },
                                right: { style: BorderStyle.SINGLE, size: 12, color: "EF8354" }
                            },
                            shading: { fill: "FFF8F5", type: ShadingType.CLEAR }
                        })
                    ]
                })
            ]
        });
        children.push(keyInfoTable);

        // Spacing before questions
        children.push(new Paragraph({ spacing: { after: 500 } }));

        // Questions section header
        children.push(
            new Paragraph({
                children: [
                    new TextRun({
                        text: "Questions",
                        bold: true,
                        size: 32,
                        color: "2D3142"
                    })
                ],
                spacing: { after: 300 }
            })
        );

        // Add numbered questions with answer boxes
        const totalQuestions = parseInt(numTasks);
        for (let i = 1; i <= totalQuestions; i++) {
            // Question number and text on same line
            children.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text: `${i}. [Enter question here]`,
                            bold: true,
                            size: 26
                        })
                    ],
                    spacing: { before: 400, after: 100 }
                })
            );

            // Hint for the question
            children.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Hint: ",
                            bold: true,
                            size: 20,
                            color: "4ECDC4"
                        }),
                        new TextRun({
                            text: "[Add a helpful hint or tip here]",
                            size: 20,
                            color: "888888",
                            italics: true
                        })
                    ],
                    spacing: { after: 200 }
                })
            );

            // Answer box with border
            const answerBox = new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: "Answer:",
                                                bold: true,
                                                size: 22,
                                                color: "666666"
                                            })
                                        ],
                                        spacing: { before: 120, after: 80 }
                                    }),
                                    // Multiple blank lines for writing space
                                    new Paragraph({ spacing: { after: 300 } }),
                                    new Paragraph({ spacing: { after: 300 } }),
                                    new Paragraph({ spacing: { after: 300 } }),
                                    new Paragraph({ spacing: { after: 200 } })
                                ],
                                borders: {
                                    top: { style: BorderStyle.SINGLE, size: 8, color: "CCCCCC" },
                                    bottom: { style: BorderStyle.SINGLE, size: 8, color: "CCCCCC" },
                                    left: { style: BorderStyle.SINGLE, size: 8, color: "CCCCCC" },
                                    right: { style: BorderStyle.SINGLE, size: 8, color: "CCCCCC" }
                                },
                                shading: { fill: "FAFAFA", type: ShadingType.CLEAR }
                            })
                        ]
                    })
                ]
            });
            children.push(answerBox);

            // Spacing between questions
            children.push(new Paragraph({ spacing: { after: 200 } }));
        }

        // Teacher's Answer Key header (on new page)
        children.push(
            new Paragraph({
                children: [
                    new TextRun({
                        text: "Answer Key",
                        bold: true,
                        size: 36,
                        color: "2D3142"
                    })
                ],
                alignment: AlignmentType.CENTER,
                spacing: { after: 120 },
                pageBreakBefore: true
            })
        );

        children.push(
            new Paragraph({
                children: [
                    new TextRun({
                        text: "(Teacher Reference - Remove before printing)",
                        size: 20,
                        color: "999999",
                        italics: true
                    })
                ],
                alignment: AlignmentType.CENTER,
                spacing: { after: 400 }
            })
        );

        // Answer key placeholders
        for (let i = 1; i <= totalQuestions; i++) {
            children.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text: `${i}. `,
                            bold: true,
                            size: 24
                        }),
                        new TextRun({
                            text: "[Answer and explanation]",
                            size: 24,
                            color: "666666",
                            italics: true
                        })
                    ],
                    spacing: { before: 200, after: 200 }
                })
            );
        }

        // Footer
        children.push(
            new Paragraph({
                children: [
                    new TextRun({
                        text: "─".repeat(50),
                        size: 16,
                        color: "DDDDDD"
                    })
                ],
                alignment: AlignmentType.CENTER,
                spacing: { before: 600, after: 200 }
            })
        );

        children.push(
            new Paragraph({
                children: [
                    new TextRun({
                        text: `Generated by Worksheet Generator • ${new Date().toLocaleDateString()}`,
                        size: 18,
                        color: "AAAAAA"
                    })
                ],
                alignment: AlignmentType.CENTER
            })
        );

        // Create the document with proper page margins
        const doc = new Document({
            sections: [{
                properties: {
                    page: {
                        margin: {
                            top: convertInchesToTwip(1),
                            right: convertInchesToTwip(1),
                            bottom: convertInchesToTwip(1),
                            left: convertInchesToTwip(1)
                        }
                    }
                },
                children: children
            }]
        });

        // Generate and download
        const blob = await Packer.toBlob(doc);
        const filename = `${subject}_${yearGroup}_${topic.replace(/\s+/g, '_')}_worksheet.docx`;
        saveAs(blob, filename);
    });
});

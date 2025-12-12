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

        const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } = docx;

        // Create document children array
        const children = [];

        // Title
        children.push(
            new Paragraph({
                children: [
                    new TextRun({
                        text: `${subject} Worksheet`,
                        bold: true,
                        size: 48,
                        color: "2D3142"
                    })
                ],
                alignment: AlignmentType.CENTER,
                spacing: { after: 200 }
            })
        );

        // Subtitle with details
        children.push(
            new Paragraph({
                children: [
                    new TextRun({
                        text: `${yearGroup} | ${term} | ${topic}`,
                        size: 24,
                        color: "4F5D75"
                    })
                ],
                alignment: AlignmentType.CENTER,
                spacing: { after: 100 }
            })
        );

        children.push(
            new Paragraph({
                children: [
                    new TextRun({
                        text: `Difficulty: ${difficulty} | Reading Age: ${readingAge}`,
                        size: 20,
                        color: "4F5D75",
                        italics: true
                    })
                ],
                alignment: AlignmentType.CENTER,
                spacing: { after: 400 }
            })
        );

        // Horizontal line
        children.push(
            new Paragraph({
                border: {
                    bottom: { color: "E8E6DF", size: 1, style: BorderStyle.SINGLE }
                },
                spacing: { after: 400 }
            })
        );

        // SEND adaptations note if any
        if (selectedSend && selectedSend.length > 0) {
            children.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "SEND Adaptations Applied: ",
                            bold: true,
                            size: 20
                        }),
                        new TextRun({
                            text: selectedSend.join(", "),
                            size: 20,
                            italics: true
                        })
                    ],
                    spacing: { after: 300 }
                })
            );
        }

        // Instructions section
        children.push(
            new Paragraph({
                text: "Instructions",
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 200, after: 100 }
            })
        );

        children.push(
            new Paragraph({
                children: [
                    new TextRun({
                        text: "Answer all questions in the spaces provided. Show your working where appropriate.",
                        size: 22
                    })
                ],
                spacing: { after: 400 }
            })
        );

        // Questions section
        children.push(
            new Paragraph({
                text: "Questions",
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 200, after: 200 }
            })
        );

        // Add numbered questions with space for answers
        const totalQuestions = parseInt(numTasks);
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
                            text: `[Question ${i} - ${topic}]`,
                            size: 24,
                            color: "666666"
                        })
                    ],
                    spacing: { before: 200, after: 100 }
                })
            );

            // Answer space
            children.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Answer: ",
                            size: 22,
                            color: "888888"
                        }),
                        new TextRun({
                            text: "_".repeat(60),
                            size: 22,
                            color: "CCCCCC"
                        })
                    ],
                    spacing: { after: 300 }
                })
            );
        }

        // Footer with generation info
        children.push(
            new Paragraph({
                border: {
                    top: { color: "E8E6DF", size: 1, style: BorderStyle.SINGLE }
                },
                spacing: { before: 600 }
            })
        );

        children.push(
            new Paragraph({
                children: [
                    new TextRun({
                        text: "Generated by Worksheet Generator | ",
                        size: 18,
                        color: "999999"
                    }),
                    new TextRun({
                        text: new Date().toLocaleDateString(),
                        size: 18,
                        color: "999999"
                    })
                ],
                alignment: AlignmentType.CENTER,
                spacing: { before: 200 }
            })
        );

        // Create the document
        const doc = new Document({
            sections: [{
                properties: {},
                children: children
            }]
        });

        // Generate and download
        const blob = await Packer.toBlob(doc);
        const filename = `${subject}_${yearGroup}_${topic.replace(/\s+/g, '_')}_worksheet.docx`;
        saveAs(blob, filename);
    });
});

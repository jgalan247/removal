// Prompt Generator Function
function generatePrompt(subject, yearGroup, term, topic, difficulty, readingAge, numTasks, sendAdaptations) {
    let prompt = `Create a ${subject} worksheet with the following specifications:

## Worksheet Details
- **Subject:** ${subject}
- **Year Group:** ${yearGroup}
- **Term:** ${term}
- **Topic:** ${topic}
- **Difficulty Level:** ${difficulty}
- **Reading Age:** ${readingAge} years
- **Number of Questions:** ${numTasks}

## Required Format
The worksheet must include:
1. **Title** showing Subject, Year, Term, Topic, and Difficulty level
2. **Instructions** that are short, clear, and student-friendly (appropriate for reading age ${readingAge})
3. **${numTasks} questions** scaffolded by difficulty (starting easier, progressing harder)
4. **Answer key** with brief explanations for each answer

## Subject-Specific Formatting
${subjectFormatting[subject]}

## General Formatting Requirements
- Output in Markdown format
- Number all questions clearly

## Layout and Spacing Requirements
- Use consistent, moderate spacing between questions (not excessive white space)
- Working space for each question should be a fixed height (e.g., 3-4 lines)
- Avoid large empty gaps at the bottom of pages
- Fit 4-5 questions per page where possible (balancing readability with page economy)
- Use ruled lines or a small box for working space rather than blank area
- Questions should flow naturally with page breaks only when necessary (not forcing new pages mid-worksheet)

## Visual Support
Include relevant diagrams, images, or visual aids to support learning where appropriate:
- **Maths:** Include diagrams of shapes (triangles, rectangles, circles), number lines, bar models, fraction diagrams, graphs, or tables as needed for each question
- **Science:** Include labelled diagrams of experiments, organisms, body parts, circuits, or scientific processes
- **Geography:** Include simple maps, climate graphs, or diagrams showing geographical features
- **History:** Include timelines, source images, or historical artefact illustrations
- **English:** Include text boxes for extracts, graphic organisers, or story maps
- **Computing:** Include flowcharts, pseudocode boxes, or screen layout diagrams
- **Languages:** Include images depicting vocabulary items, speech bubbles, or dialogue scenarios

Visual aids help students understand questions better and support different learning styles.`;

    // Add SEND adaptations if selected
    if (sendAdaptations.length > 0) {
        prompt += `\n\n## SEND Adaptations Required
Apply the following adaptations to make this worksheet accessible:\n`;
        sendAdaptations.forEach(send => {
            prompt += `\n**${send}:** ${sendGuidelines[send]}`;
        });
    }

    // Add difficulty-specific guidance
    prompt += `\n\n## Difficulty Guidelines for "${difficulty}" Level`;
    
    if (difficulty === "Very Basic") {
        prompt += `
- Use single-step problems/questions only
- Include worked examples before questions
- Use simple, familiar contexts
- Provide visual aids or scaffolds where possible
- Include sentence starters or word banks if appropriate`;
    } else if (difficulty === "Basic") {
        prompt += `
- Mix of single and two-step problems/questions
- Start with simpler content, gradually increase complexity
- Include one worked example
- Some questions may require basic reasoning
- Provide some scaffolding but encourage independence`;
    } else {
        prompt += `
- Multi-step problems/questions allowed
- Include questions with real-world contexts
- Expect students to show working or explain reasoning
- Challenge questions at the end
- May include extension activities
- Encourage higher-order thinking`;
    }

    // Reading age considerations
    prompt += `\n\n## Reading Age Considerations
The language complexity should be appropriate for a reading age of ${readingAge} years:`;
    
    if (parseInt(readingAge) <= 9) {
        prompt += `
- Very simple vocabulary only
- Short sentences (max 8-10 words)
- Familiar, everyday contexts
- Avoid technical terminology where possible`;
    } else if (parseInt(readingAge) <= 11) {
        prompt += `
- Simple vocabulary with some subject-specific terms
- Sentences up to 12-15 words
- Relatable contexts
- Define any technical terms used`;
    } else {
        prompt += `
- Age-appropriate vocabulary including subject terminology
- Standard sentence complexity
- Can include more abstract contexts
- Technical terms can be used with context`;
    }

    // Subject-specific tips
    prompt += `\n\n## ${subject}-Specific Tips`;
    
    switch(subject) {
        case "Maths":
            prompt += `
- Ensure numerical progression is logical
- Include a mix of calculation and reasoning questions
- Use real-world contexts where appropriate (money, measurement, time)`;
            break;
        case "English":
            prompt += `
- Include model answers for writing tasks
- Provide text extracts for comprehension questions
- Include SPaG (spelling, punctuation, grammar) elements`;
            break;
        case "Science":
            prompt += `
- Link to practical applications where possible
- Include questions about scientific method
- Use correct scientific terminology with explanations`;
            break;
        case "History":
            prompt += `
- Include primary and secondary source questions
- Encourage evaluation and analysis
- Link to chronology and cause/consequence`;
            break;
        case "Geography":
            prompt += `
- Include map/data interpretation where relevant
- Link to case studies and real places
- Include human and physical geography connections`;
            break;
        case "Computing":
            prompt += `
- Include practical coding challenges where appropriate
- Test both knowledge and application
- Include debugging or error-spotting questions`;
            break;
        case "French":
        case "Spanish":
            prompt += `
- Include listening/reading/writing/speaking task variety
- Test vocabulary recall and grammar application
- Include translation tasks (both directions)
- Ensure accents and special characters are correct`;
            break;
    }

    prompt += `\n\n---
Please generate the complete worksheet now, ready for a teacher to use.

**OUTPUT FORMAT:** Format the worksheet so the teacher can easily copy and paste it into Microsoft Word or Google Docs. Use clear headings, numbered questions, and proper spacing. The teacher will use the "Download .docx" button on our website to get a template, then paste your questions into it.`;

    return prompt;
}

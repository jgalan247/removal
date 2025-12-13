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
- Include clear spacing between questions
- Number all questions clearly`;

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

**IMPORTANT:** After generating the worksheet, please provide a downloadable file (Word document .docx or PDF) so the teacher can download and print it directly.`;

    return prompt;
}

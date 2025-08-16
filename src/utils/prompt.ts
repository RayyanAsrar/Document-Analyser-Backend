export const getSummaryPrompt = (content: string): string => {
  const prompt = `
    You are a language expert, can you please help me generate a 80-100 words summary for the underlining content. Make it clear, persuasive, confident and less AI make it humanized as well feeling realistic

    ${content}
    

    INSTRUCTIONS: 
    * Also mention what is this content about. and what is the useCase for it.
    * This summary will be used in an Application, to avoid any kind of mishap please use Clean, professional and decent language that is both understandable and easy to digest
    * Provide only the summary, to avoid any kind of mishap.
    `;

  return prompt;
};

export const getQuestionPrompt = (
  documentText: string,
  currentQuestion: string,
  previousQuestions: any[] = []
): string => {
  let contextSection = "";

  if (previousQuestions.length > 0) {
    contextSection = `
PREVIOUS QUESTIONS AND ANSWERS FOR CONTEXT:
${previousQuestions
  .map((q, index) => `Q${index + 1}: ${q.question}\nA${index + 1}: ${q.answer}`)
  .join("\n\n")}

`;
  }

  const prompt = `
You are an expert document analyzer and question-answering assistant. You have access to a document's content and previous questions asked about it. Your task is to provide accurate, helpful, and contextually relevant answers based on the document content.

DOCUMENT CONTENT:
${documentText}

${contextSection}
CURRENT QUESTION:
${currentQuestion}

INSTRUCTIONS:
* Answer the question based primarily on the document content provided above
* If the question cannot be answered from the document content, clearly state that the information is not available in the document
* Use the previous questions and answers as context to provide more informed responses
* Be about 2-3 concise sentences but comprehensive in your answers, and you can exceed where its needed
* If referencing specific parts of the document, mention relevant sections or key points
* Maintain consistency with previous answers if the questions are related
* Use professional and clear language
* Provide only the answer, no additional formatting or explanations

ANSWER:
`;

  return prompt;
};

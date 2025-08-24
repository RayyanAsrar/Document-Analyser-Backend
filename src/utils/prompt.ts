export const getSummaryPrompt = (content: string): string => {
  const prompt = `
You are an expert writer and analyst. Please generate a **comprehensive and structured summary** of the following content.

DOCUMENT CONTENT:
${content}

INSTRUCTIONS:
* Write a **clear, professional, and human-like summary** that feels natural, not robotic.
* Cover **all key points, arguments, features, and details** — do not skip important information.
* Organize the summary into **sections with short headings** (e.g., Overview, Key Features, Use Cases, Limitations).
* Use **bullet points and sub-points** wherever appropriate for readability.
* Minimum length: **400–600 words** (can exceed if needed).
* Explicitly mention:
    - What the content/document is about.
    - The **purpose and use cases**.
    - Key details, features, and insights included.
* Keep language **clean, professional, and easy to digest**.
* Provide only the summary — no extra explanations or meta-comments.

SUMMARY:
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
  .map(
    (q, index) => `Q${index + 1}: ${q.question}\nA${index + 1}: ${q.answer}`
  )
  .join("\n\n")}
`;
  }

  const prompt = `
You are an expert **document analysis assistant**. Your role is to read the given document carefully and provide **detailed, accurate, and contextually relevant answers**.

DOCUMENT CONTENT:
${documentText}

${contextSection}
CURRENT QUESTION:
${currentQuestion}

INSTRUCTIONS:
* Always base your answer on the document content first.
* If the document does not contain the answer, clearly say: "This information is not available in the document."
* Provide a **detailed, well-structured answer**:
   - Use **bullet points, numbered lists, or short sections** if it improves clarity.
   - Include **examples, key details, and references to the document sections** when relevant.
   - Minimum **4–6 sentences**, but feel free to expand when the question requires it.
* Maintain consistency with previous answers if related.
* Use **professional, natural, and human-like language** (avoid sounding robotic).
* Do **not** include explanations about how you answered, just provide the answer itself.

ANSWER:
`;

  return prompt;
};

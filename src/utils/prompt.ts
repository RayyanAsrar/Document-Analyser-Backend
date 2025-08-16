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

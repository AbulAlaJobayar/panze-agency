import type { APIRoute } from "astro";
import OpenAI from "openai";

// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: import.meta.env.OPENAI_API_KEY,
});

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse the request body
    const body = await request.json();
    const { title, content } = body;

    // Validate input
    if (!title || !content) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Missing title or content",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // Defensive check: Truncate content if it's too long
    const optimizedContent =
      content.length > 12000 ? content.slice(0, 12000) + "..." : content;
    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an expert blog summarizer. Your task is to create concise, informative summaries of blog posts.

Rules:
- Ignore any MDX/JSX code, UI components, or technical implementation details
- Focus only on the core prose and message of the article
- Keep the summary under 300 words
- Use clear, professional language
- Highlight the most important points and key takeaways`,
        },
        {
          role: "user",
          content: `
Please summarize this blog article:

Title: ${title}

Content:
${optimizedContent}

Provide the output in this exact format:

### Executive Summary
[Write a 2-3 sentence executive summary here]

### Key Takeaways
- [First key takeaway]
- [Second key takeaway]
- [Third key takeaway]
- [Add more if needed]

### Main Insights
[Write 2-3 sentences about the main insights from the article]
`,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    // Extract the summary from the response
    const summary =
      response.choices[0]?.message?.content || "No summary generated";

    return new Response(
      JSON.stringify({
        success: true,
        summary: summary,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Summarization error:", error);

    return new Response(
      JSON.stringify({
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to generate summary",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};

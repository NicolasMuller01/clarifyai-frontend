"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { CheckCircle2, AlertCircle, Trello, Copy, Check } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Groq from "groq-sdk";

interface JiraTicket {
  title: string;
  description: string;
  acceptanceCriteria: string[];
  technicalDetails: string;
}

type Platform = "jira" | "trello" | "asana";

const groq = new Groq({
  apiKey: "",
  dangerouslyAllowBrowser: true,
});

const PromptSection = () => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [previewTicket, setPreviewTicket] = useState<JiraTicket | null>(null);
  const [platform, setPlatform] = useState<Platform>("jira");
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const ticket = await generateJiraTicket(prompt);
      if (!ticket || !ticket.title) {
        throw new Error("Invalid ticket data received");
      }
      setPreviewTicket(ticket);

      let formattedTicket = "";

      // Format ticket based on selected platform
      switch (platform) {
        case "jira":
          formattedTicket = `
h1. ${ticket.title}

${ticket.description || ""}

h2. Acceptance Criteria
${(ticket.acceptanceCriteria || []).join("\n")}

${ticket.technicalDetails || ""}
        `.trim();
          break;
        case "trello":
          formattedTicket = `
# ${ticket.title}

## Description
${(ticket.description || "").replace(/h2\.\s/g, "## ")}

## Acceptance Criteria
${(ticket.acceptanceCriteria || [])
  .map((criteria) => `- [ ] ${criteria}`)
  .join("\n")}

## Technical Details
${(ticket.technicalDetails || "").replace(/h2\.\s/g, "## ").replace(/\*/g, "-")}
        `.trim();
          break;
        case "asana":
          formattedTicket = `
${ticket.title}

Description:
${(ticket.description || "").replace(/h2\.\s/g, "")}

Subtasks:
${(ticket.acceptanceCriteria || [])
  .map((criteria) => `- ${criteria}`)
  .join("\n")}

Notes:
${(ticket.technicalDetails || "").replace(/h2\.\s/g, "")}
        `.trim();
          break;
        default:
          formattedTicket = JSON.stringify(ticket, null, 2);
      }

      toast({
        title: "Ticket Generated!",
        description: `${getPlatformName(platform)} ticket is ready`,
      });
    } catch (error) {
      console.error("Error generating ticket:", error);
      toast({
        title: "Error",
        description:
          typeof error === "object" && error !== null && "message" in error
            ? String(error.message)
            : "Could not generate ticket. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Get formatted platform name
  const getPlatformName = (platform: Platform): string => {
    switch (platform) {
      case "jira":
        return "JIRA";
      case "trello":
        return "Trello";
      case "asana":
        return "Asana";
      default:
        return "Ticket";
    }
  };

  const generateJiraTicket = async (prompt: string): Promise<JiraTicket> => {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `Eres un experto en análisis funcional y en la creación de tickets ${platform}. 
          IMPORTANTE: DEBES RESPONDER ÚNICAMENTE CON UN OBJETO JSON VÁLIDO, SIN MARKDOWN NI TEXTO ADICIONAL.
          
          El ticket debe incluir:
          1. Un título conciso y descriptivo
          2. Una descripción detallada del requerimiento
          3. Criterios de aceptación específicos y medibles
          4. Detalles técnicos relevantes

          Formato de respuesta (respeta exactamente esta estructura, sin markdown) ademas todo en ingles:
          {
            "title": "string",
            "description": "string (puede incluir formato ${platform} como h2. para títulos)",
            "acceptanceCriteria": ["array de strings"],
            "technicalDetails": "string (puede incluir formato ${platform} como h2. y viñetas con *)"
          }`,
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
    });

    const content = completion.choices[0].message.content;
    try {
      // Remove markdown code block markers if present
      const cleanJson = content
        ? content.replace(/```json\n?|\n?```/g, "").trim()
        : "{}";
      return JSON.parse(cleanJson) as JiraTicket;
    } catch (e) {
      console.error("Invalid JSON response:", content);
      throw new Error(
        "La respuesta del modelo no es un JSON válido. Por favor intente nuevamente."
      );
    }
  };

  // Render platform-specific preview
  const renderPlatformPreview = () => {
    if (!previewTicket) return null;

    switch (platform) {
      case "jira":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-primary/10 text-primary">
                User Story
              </span>
              <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-yellow-100 text-yellow-800">
                To Be Estimated
              </span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              {previewTicket.title}
            </h2>
            <div className="prose prose-sm max-w-none">
              <div className="text-sm text-gray-600 whitespace-pre-wrap">
                <div className="text-sm text-gray-600 whitespace-pre-wrap">
                  {previewTicket.description.split("\n").map((line, i) => (
                    <div key={i} className="mb-2">
                      {line.startsWith("h2.") ? (
                        <h3 className="text-base font-semibold mt-4 mb-2">
                          {line.replace("h2.", "")}
                        </h3>
                      ) : line.startsWith("{quote}") ? (
                        <blockquote className="border-l-4 border-gray-200 pl-4 italic">
                          {line.replace(/{quote}/g, "")}
                        </blockquote>
                      ) : (
                        line
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <h3 className="text-base font-semibold mb-3">
                    Acceptance Criteria
                  </h3>
                  <ul className="space-y-2">
                    {previewTicket.acceptanceCriteria.map((criteria, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm">
                          {criteria.replace("✅ ", "")}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6">
                  <div className="text-sm text-gray-600 whitespace-pre-wrap">
                    {previewTicket.technicalDetails
                      .split("\n")
                      .map((line, i) => (
                        <div key={i} className="mb-2">
                          {line.startsWith("h2.") ? (
                            <h3 className="text-base font-semibold mb-2">
                              {line.replace("h2.", "")}
                            </h3>
                          ) : line.startsWith("*") ? (
                            <div className="flex items-start">
                              <span className="mr-2">•</span>
                              {line.replace("* ", "")}
                            </div>
                          ) : (
                            line
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "trello":
        return (
          <div className="space-y-4 bg-sky-50 p-4 rounded-lg border border-sky-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Trello className="h-5 w-5 text-sky-600 mr-2" />
                <span className="text-sm font-medium text-sky-700">
                  Trello Card
                </span>
              </div>
              <span className="text-xs bg-sky-100 text-sky-800 px-2 py-1 rounded">
                Medium
              </span>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 border-b border-sky-200 pb-2">
              {previewTicket.title}
            </h2>

            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Description
              </h3>
              <div className="text-sm text-gray-600 bg-white p-3 rounded border border-sky-100">
                {previewTicket.description
                  .replace(/h2\.\s/g, "**")
                  .replace(/\n\n/g, "\n")}
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Checklist
              </h3>
              <div className="bg-white p-3 rounded border border-sky-100">
                {previewTicket.acceptanceCriteria.map((criteria, index) => (
                  <div key={index} className="flex items-center py-1">
                    <input
                      type="checkbox"
                      className="mr-2 h-4 w-4 rounded border-gray-300 text-sky-600"
                    />
                    <span className="text-sm text-gray-700">{criteria}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 bg-white p-3 rounded border border-sky-100">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Technical Details
              </h3>
              <div className="text-sm text-gray-600">
                {previewTicket.technicalDetails
                  .replace(/h2\.\s/g, "")
                  .split("\n")
                  .map((line, i) => (
                    <div key={i} className="py-1">
                      {line.startsWith("*") ? (
                        <div className="flex items-start">
                          <span className="mr-2">-</span>
                          {line.replace("* ", "")}
                        </div>
                      ) : (
                        line
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        );

      case "asana":
        return (
          <div className="space-y-4 bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5 text-purple-600 mr-2"
                >
                  <path d="M12 3.67178C5.12097 3.67178 1.28916 11.1323 3.26347 16.9794C4.29116 19.9323 7.04494 21.8807 10.3094 22.2904C14.5397 22.8111 18.4805 20.3427 20.0485 16.7242C22.2449 11.7245 18.3255 3.67178 12 3.67178ZM7.0291 13.6244C5.5717 13.6244 4.40033 12.4531 4.40033 10.9957C4.40033 9.53835 5.5717 8.36699 7.0291 8.36699C8.48649 8.36699 9.65786 9.53835 9.65786 10.9957C9.65786 12.4531 8.48649 13.6244 7.0291 13.6244ZM16.9714 13.6244C15.514 13.6244 14.3427 12.4531 14.3427 10.9957C14.3427 9.53835 15.514 8.36699 16.9714 8.36699C18.4288 8.36699 19.6002 9.53835 19.6002 10.9957C19.6002 12.4531 18.4288 13.6244 16.9714 13.6244Z" />
                </svg>
                <span className="text-sm font-medium text-purple-700">
                  Asana Task
                </span>
              </div>
              <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                In Progress
              </span>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 border-b border-purple-200 pb-2">
              {previewTicket.title}
            </h2>

            <div className="mt-4">
              <div className="flex items-center text-sm text-purple-700 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Description
              </div>
              <div className="text-sm text-gray-600 bg-white p-3 rounded border border-purple-100">
                {previewTicket.description
                  .replace(/h2\.\s/g, "**")
                  .replace(/\n\n/g, "\n")}
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center text-sm text-purple-700 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                Subtasks
              </div>
              <div className="bg-white p-3 rounded border border-purple-100">
                {previewTicket.acceptanceCriteria.map((criteria, index) => (
                  <div key={index} className="flex items-center py-1">
                    <input
                      type="checkbox"
                      className="mr-2 h-4 w-4 rounded border-gray-300 text-purple-600"
                    />
                    <span className="text-sm text-gray-700">{criteria}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center text-sm text-purple-700 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Technical Details
              </div>
              <div className="text-sm text-gray-600 bg-white p-3 rounded border border-purple-100">
                {previewTicket.technicalDetails
                  .replace(/h2\.\s/g, "")
                  .split("\n")
                  .map((line, i) => (
                    <div key={i} className="py-1">
                      {line.startsWith("*") ? (
                        <div className="flex items-start">
                          <span className="mr-2">•</span>
                          {line.replace("* ", "")}
                        </div>
                      ) : (
                        line
                      )}
                    </div>
                  ))}
              </div>
            </div>

            <div className="flex justify-between mt-4 pt-3 border-t border-purple-200">
              <div className="flex items-center">
                <span className="text-xs text-purple-600">Due: In 7 days</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs">
                  JD
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const handleCopyTicket = () => {
    if (!previewTicket) return;

    let formattedTicket = "";

    // Format ticket based on selected platform
    switch (platform) {
      case "jira":
        formattedTicket = `
h1. ${previewTicket.title}

${previewTicket.description || ""}

h2. Acceptance Criteria
${(previewTicket.acceptanceCriteria || []).join("\n")}

${previewTicket.technicalDetails || ""}
      `.trim();
        break;
      case "trello":
        formattedTicket = `
# ${previewTicket.title}

## Description
${(previewTicket.description || "").replace(/h2\.\s/g, "## ")}

## Acceptance Criteria
${(previewTicket.acceptanceCriteria || [])
  .map((criteria) => `- [ ] ${criteria}`)
  .join("\n")}

## Technical Details
${(previewTicket.technicalDetails || "")
  .replace(/h2\.\s/g, "## ")
  .replace(/\*/g, "-")}
      `.trim();
        break;
      case "asana":
        formattedTicket = `
${previewTicket.title}

Description:
${(previewTicket.description || "").replace(/h2\.\s/g, "")}

Subtasks:
${(previewTicket.acceptanceCriteria || [])
  .map((criteria) => `- ${criteria}`)
  .join("\n")}

Notes:
${(previewTicket.technicalDetails || "").replace(/h2\.\s/g, "")}
      `.trim();
        break;
      default:
        formattedTicket = JSON.stringify(previewTicket, null, 2);
    }

    navigator.clipboard.writeText(formattedTicket).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      toast({
        title: "Copied!",
        description: `${getPlatformName(
          platform
        )} format has been copied to clipboard`,
      });
    });
  };

  return (
    <section className="container mx-auto min-h-[calc(100vh-4rem)] mt-96">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 place-items-center">
          {/* Form */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="prompt" className="text-sm font-medium">
                  Describe your requirement:
                </label>
                <Textarea
                  id="prompt"
                  placeholder="Example: Implement user authentication system with role-based access. Users should be able to sign in with email and password..."
                  className="min-h-[200px] resize-none"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  disabled={isLoading}
                />
                <p className="text-sm text-muted-foreground">
                  Tip: Be as specific as possible. Include what, why, and any
                  important constraints.
                </p>
              </div>
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isLoading}
              >
                {isLoading
                  ? `Generating ${getPlatformName(platform)} ticket...`
                  : `Generate Ticket`}
              </Button>
            </form>
          </div>

          {/* Preview */}
          <div className="relative">
            <div className="sticky top-24">
              <Card className="p-6 shadow-lg border-2 border-border bg-white">
                <div className="mb-4 border-b pb-4">
                  <label
                    htmlFor="platform"
                    className="text-sm font-medium block mb-2"
                  >
                    Select platform:
                  </label>
                  <Select
                    value={platform}
                    onValueChange={(value) => setPlatform(value as Platform)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jira">
                        <div className="flex items-center">
                          <svg
                            viewBox="0 0 24 24"
                            className="h-5 w-5 mr-2 text-blue-600"
                            fill="currentColor"
                          >
                            <path d="M11.571 11.513H0a5.218 5.218 0 0 0 5.232 5.215h2.13v2.057A5.215 5.215 0 0 0 12.575 24V12.518a1.005 1.005 0 0 0-1.005-1.005z" />
                            <path
                              d="M5.232 11.513h11.57A5.215 5.215 0 0 0 11.571 6.3H9.441V4.243A5.216 5.216 0 0 0 4.227 0v11.513a1.005 1.005 0 0 0 1.005 0z"
                              fillOpacity=".8"
                            />
                          </svg>
                          JIRA
                        </div>
                      </SelectItem>
                      <SelectItem value="trello">
                        <div className="flex items-center">
                          <Trello className="h-5 w-5 mr-2 text-sky-600" />
                          Trello
                        </div>
                      </SelectItem>
                      <SelectItem value="asana">
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-5 w-5 mr-2 text-purple-600"
                          >
                            <path d="M12 3.67178C5.12097 3.67178 1.28916 11.1323 3.26347 16.9794C4.29116 19.9323 7.04494 21.8807 10.3094 22.2904C14.5397 22.8111 18.4805 20.3427 20.0485 16.7242C22.2449 11.7245 18.3255 3.67178 12 3.67178ZM7.0291 13.6244C5.5717 13.6244 4.40033 12.4531 4.40033 10.9957C4.40033 9.53835 5.5717 8.36699 7.0291 8.36699C8.48649 8.36699 9.65786 9.53835 9.65786 10.9957C9.65786 12.4531 8.48649 13.6244 7.0291 13.6244ZM16.9714 13.6244C15.514 13.6244 14.3427 12.4531 14.3427 10.9957C14.3427 9.53835 15.514 8.36699 16.9714 8.36699C18.4288 8.36699 19.6002 9.53835 19.6002 10.9957C19.6002 12.4531 18.4288 13.6244 16.9714 13.6244Z" />
                          </svg>
                          Asana
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-6">
                  {previewTicket && (
                    <div className="absolute top-2 right-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCopyTicket}
                        className="h-8 w-8 p-0"
                        title="Copy ticket"
                      >
                        {isCopied ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                        <span className="sr-only">Copy ticket</span>
                      </Button>
                    </div>
                  )}
                  {previewTicket ? (
                    renderPlatformPreview()
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>
                        Ticket preview will appear here when you submit your
                        requirement
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromptSection;

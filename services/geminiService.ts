
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, PersonalizedRoadmap } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateCareerRoadmap = async (profile: UserProfile): Promise<PersonalizedRoadmap> => {
  const prompt = `
    Based on the following user profile, create a highly detailed, personalized tech career transition roadmap for 2025.
    
    User Profile:
    - Name: ${profile.name}
    - Education: ${profile.education}
    - Background: ${profile.currentBackground}
    - Tech Knowledge: ${profile.techKnowledge}
    - Core Skills: ${profile.skills.join(", ")}
    - Interests: ${profile.interests.join(", ")}
    - Past Projects: ${profile.projects}
    - Reason: ${profile.reasonForTech}
    - Goal Timeline: ${profile.timelineGoal}

    Guidelines:
    1. Role Selection: Identify the best-fit 2025 role. Explain how their background and core skills (${profile.skills.join(", ")}) are assets.
    2. Roadmap: Provide a 4-5 step sequence.
    3. Resources: Include FREE online certifications (Coursera, Google, Microsoft, AWS).
    4. AI Leverage: For EACH step, explain how to use "Google AI Studio" or other AI tools to speed up learning or automate tasks (like coding).
    5. Portfolio: For each step, suggest a "Reality Project" they can build using AI tools to boost their portfolio.
    6. Projections: Provide detailed outlooks for 5 and 10 years including roles, salaries, and required advanced skills.
    7. Expert Mentors: Suggest 3 world-renowned experts for inspiration with their platform (LinkedIn or YouTube).
    8. Textbooks: Suggest 2-3 specific books they can read online or find in libraries.
    9. Institutions: Mention types of institutions (e.g. specific certification bodies or online universities) relevant to their path.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          suggestedRole: { type: Type.STRING },
          summary: { type: Type.STRING },
          steps: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                resources: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      url: { type: Type.STRING },
                      isFree: { type: Type.BOOLEAN },
                      type: { type: Type.STRING, enum: ['course', 'textbook', 'tool', 'institution'] }
                    },
                    required: ["name", "url", "isFree", "type"]
                  }
                },
                timeEstimate: { type: Type.STRING },
                aiAdvantage: { type: Type.STRING },
                portfolioIdea: { type: Type.STRING }
              },
              required: ["title", "description", "resources", "timeEstimate", "aiAdvantage", "portfolioIdea"]
            }
          },
          fiveYearOutlook: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              projectedSalary: { type: Type.STRING },
              requiredSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
              keyExperts: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    role: { type: Type.STRING },
                    profileUrl: { type: Type.STRING },
                    platform: { type: Type.STRING, enum: ['linkedin', 'youtube'] }
                  }
                }
              }
            }
          },
          tenYearOutlook: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              projectedSalary: { type: Type.STRING },
              requiredSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
              keyExperts: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    role: { type: Type.STRING },
                    profileUrl: { type: Type.STRING },
                    platform: { type: Type.STRING, enum: ['linkedin', 'youtube'] }
                  }
                }
              }
            }
          },
          recommendedBooks: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                author: { type: Type.STRING },
                why: { type: Type.STRING }
              }
            }
          }
        },
        required: ["suggestedRole", "summary", "steps", "fiveYearOutlook", "tenYearOutlook", "recommendedBooks"]
      }
    }
  });

  return JSON.parse(response.text);
};

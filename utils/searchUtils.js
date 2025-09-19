import { toolCategories } from '../data/tools.js';

// Extract keywords from description for better search
function extractKeywords(description) {
  const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'with', 'for', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'from', 'up', 'about', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'between', 'among', 'under', 'over', 'around', 'near', 'far', 'here', 'there', 'where', 'when', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 'just', 'now'];
  
  return description
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2 && !commonWords.includes(word))
    .slice(0, 10); // Limit to 10 most relevant keywords
}

// Fuzzy search algorithm
function fuzzySearch(query, text) {
  if (!query) return 0;
  
  const queryLower = query.toLowerCase();
  const textLower = text.toLowerCase();
  
  // Exact match gets highest score
  if (textLower === queryLower) return 100;
  
  // Starts with query gets high score
  if (textLower.startsWith(queryLower)) return 90;
  
  // Contains query gets medium score
  if (textLower.includes(queryLower)) return 70;
  
  // Fuzzy match using simple algorithm
  let score = 0;
  let queryIndex = 0;
  
  for (let i = 0; i < textLower.length && queryIndex < queryLower.length; i++) {
    if (textLower[i] === queryLower[queryIndex]) {
      score += 1;
      queryIndex++;
    }
  }
  
  // Return percentage of query matched
  return queryIndex === queryLower.length ? (score / queryLower.length) * 60 : 0;
}

// Pre-process all tools once
let allTools = null;

function getAllTools() {
  if (!allTools) {
    allTools = toolCategories.flatMap(category =>
      category.tools.map(tool => ({
        ...tool,
        category: category.name,
        keywords: extractKeywords(tool.description)
      }))
    );
  }
  return allTools;
}

// Search function
export function searchTools(query) {
  if (!query.trim()) return [];
  
  const tools = getAllTools();
  
  const results = tools.map(tool => {
    let score = 0;
    
    // Name matching (highest priority)
    const nameScore = fuzzySearch(query, tool.name);
    score += nameScore * 3; // Weight name matches heavily
    
    // Description matching
    const descScore = fuzzySearch(query, tool.description);
    score += descScore * 1.5;
    
    // Category matching
    const categoryScore = fuzzySearch(query, tool.category);
    score += categoryScore * 1.2;
    
    // Keyword matching
    const keywordScore = tool.keywords.reduce((max, keyword) => 
      Math.max(max, fuzzySearch(query, keyword)), 0);
    score += keywordScore * 1.8;
    
    return { ...tool, score };
  })
  .filter(tool => tool.score > 20) // Minimum relevance threshold
  .sort((a, b) => b.score - a.score)
  .slice(0, 8); // Limit to 8 results
  
  return results;
}

// Highlight matching text - returns array of strings and objects for React rendering
export function highlightText(text, query) {
  if (!query) return [text];
  
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedQuery})`, 'gi');
  const parts = text.split(regex);
  
  return parts.map((part, index) => 
    regex.test(part) ? {
      type: 'highlight',
      content: part,
      index
    } : part
  );
}


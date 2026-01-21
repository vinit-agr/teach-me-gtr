import { ConceptNode } from "./types";
import { metricTensorConcept } from "./metricTensor";

// All concepts in the curriculum
export const allConcepts: Record<string, ConceptNode> = {
  "metric-tensor": metricTensorConcept,
  // More concepts will be added here in future phases
};

// Get concept by ID
export function getConcept(conceptId: string): ConceptNode | undefined {
  return allConcepts[conceptId];
}

// Get all concept IDs
export function getAllConceptIds(): string[] {
  return Object.keys(allConcepts);
}

// Check if all prerequisites are met
export function arePrerequisitesMet(
  conceptId: string,
  completedConceptIds: string[]
): boolean {
  const concept = allConcepts[conceptId];
  if (!concept) return false;

  return concept.prerequisites.every((prereqId) =>
    completedConceptIds.includes(prereqId)
  );
}

// Get next available concepts based on completed concepts
export function getAvailableConcepts(
  completedConceptIds: string[]
): ConceptNode[] {
  return Object.values(allConcepts).filter((concept) =>
    arePrerequisitesMet(concept.id, completedConceptIds)
  );
}

export { metricTensorConcept };
export type { ConceptNode, DerivationStep, Problem } from "./types";

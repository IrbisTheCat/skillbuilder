import { Skill } from "./skill.model";

export type LessonPlan = {
    level: string,
    description: string,
    skills: Skill[]
};
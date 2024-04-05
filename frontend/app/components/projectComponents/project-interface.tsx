export interface Project {
    name: string;
    start_date?: string; // '?' denotes that the field is optional
    end_date?: string;
    location: string;
    initials: string;
}
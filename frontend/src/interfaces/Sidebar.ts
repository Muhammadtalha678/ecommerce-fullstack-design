export interface SidebarSection {
    categories?: string[];
    brands?: string[];
    features?: string[];
    price?: { min: number; max: number };
    conditions?: string[];
    ratings?: number[];
}

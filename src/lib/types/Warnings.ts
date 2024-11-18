import type { WarningType } from "$lib/enums/BlockTypes";
export interface WarningData {
	warningType?: WarningType
	message?: string;
    fieldName?: string | string[];

    
}

export interface ParentWarningData {
	warningType: WarningType
	message: string;
	parents: string | string[];
/**
 * @deprecated The property will be removed in future updates
 * kept for backwards compatibility
 */
    fieldName?: string | string[];
}
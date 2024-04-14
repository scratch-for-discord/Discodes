import { goto } from "$app/navigation";
/**
 * Opens an editor with the given ID
 *
 * @export
 * @param {string} workspaceID
 */
export default function openEditor(workspaceID: string): void {
	goto(`/editor?id=${workspaceID}`);
}

/**
 * Checks for equality between password field and password confirmation
 * field
 */
export function passwordValidator(watcher: string, value: string) {
  if (watcher != value) {
    return "Your passwords do not match";
  }
}

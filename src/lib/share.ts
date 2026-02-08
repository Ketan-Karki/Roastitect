/**
 * Share Utilities for Roastitect
 * Handles sharing coffee profiles via Web Share API and clipboard
 */

import type { CoffeeProfile, GrinderType } from "./coffee-data";
import { GRINDERS } from "./coffee-data";

export type ShareData = {
  profile: CoffeeProfile;
  grinder: GrinderType;
};

/**
 * Generate shareable text for a coffee profile
 */
export const generateShareText = (data: ShareData): string => {
  const { profile, grinder } = data;
  const grinderName =
    GRINDERS.find((g) => g.id === grinder)?.name || "your grinder";
  const grinderTicks = profile.grindTicks[grinder];

  return `☕ Roastitect Recipe - ${profile.region}

🌍 Method: ${profile.brewMethod}
🔥 Roast: ${profile.roastLevel}
⏱️  Time: ${profile.brewTime}s (${Math.floor(profile.brewTime / 60)}m ${profile.brewTime % 60}s)
⚙️  Grinder: ${grinderName} - ${grinderTicks} clicks

📝 Notes: ${profile.notes.join(", ")}

${profile.story}

Craft your perfect cup at roastitect.ketankarki.wiki`;
};

/**
 * Generate shareable URL with encoded profile data
 */
export const generateShareURL = (
  profileId: string,
  grinder: GrinderType
): string => {
  const baseURL = window.location.origin;
  const params = new URLSearchParams({
    profile: profileId,
    grinder: grinder,
  });
  return `${baseURL}?${params.toString()}`;
};

/**
 * Share via Web Share API (mobile-first)
 */
export const shareViaWebShare = async (data: ShareData): Promise<boolean> => {
  if (!navigator.share) {
    return false;
  }

  try {
    await navigator.share({
      title: `Roastitect - ${data.profile.region}`,
      text: generateShareText(data),
      url: window.location.href,
    });
    return true;
  } catch (error) {
    // User cancelled or error occurred
    if (error instanceof Error && error.name !== "AbortError") {
      console.error("Error sharing:", error);
    }
    return false;
  }
};

/**
 * Copy to clipboard (fallback for desktop)
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);

    return successful;
  } catch (error) {
    console.error("Failed to copy:", error);
    return false;
  }
};

/**
 * Main share function with fallback
 */
export const shareProfile = async (data: ShareData): Promise<boolean> => {
  // Try Web Share API first (better on mobile)
  const sharedViaAPI = await shareViaWebShare(data);
  if (sharedViaAPI) {
    return true;
  }

  // Fallback to clipboard
  const text = generateShareText(data);
  return await copyToClipboard(text);
};

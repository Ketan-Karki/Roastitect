/**
 * Browser Notification Utilities for Roastitect
 * Handles notification permissions and displays
 */

export type NotificationPermission = "granted" | "denied" | "default";

/**
 * Request notification permission from the user
 */
export const requestNotificationPermission =
  async (): Promise<NotificationPermission> => {
    if (!("Notification" in window)) {
      console.warn("This browser does not support notifications");
      return "denied";
    }

    if (Notification.permission === "granted") {
      return "granted";
    }

    if (Notification.permission !== "denied") {
      const permission = await Notification.requestPermission();
      return permission;
    }

    return Notification.permission;
  };

/**
 * Show a notification if permission is granted
 */
export const showNotification = (
  title: string,
  options?: NotificationOptions
): Notification | null => {
  if (!("Notification" in window)) {
    return null;
  }

  if (Notification.permission === "granted") {
    return new Notification(title, {
      icon: "/favicon.svg",
      badge: "/favicon.svg",
      ...options,
    });
  }

  return null;
};

/**
 * Play a notification sound
 */
export const playNotificationSound = (volume: number = 0.3): void => {
  try {
    // Create a simple pleasant chime using Web Audio API
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Pleasant coffee chime frequencies
    oscillator.frequency.setValueAtTime(
      523.25,
      audioContext.currentTime
    ); // C5
    oscillator.frequency.setValueAtTime(
      659.25,
      audioContext.currentTime + 0.1
    ); // E5
    oscillator.frequency.setValueAtTime(
      783.99,
      audioContext.currentTime + 0.2
    ); // G5

    oscillator.type = "sine";
    gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.5
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  } catch (error) {
    console.warn("Failed to play notification sound:", error);
  }
};

/**
 * Vibrate device if supported (mobile)
 */
export const vibrateDevice = (pattern: number | number[] = 200): void => {
  if ("vibrate" in navigator) {
    navigator.vibrate(pattern);
  }
};

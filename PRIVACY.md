# Privacy Policy

> Last updated: June 27, 2025

## Introduction

This privacy policy describes how the **Wannkommtrewe to Calendar Adder** browser extension ("Extension") handles user data. The Extension is not affiliated with REWE and is provided as-is to enhance your calendar invitations with delivery tracking links.

## Data Collection

- **Order ID:** The Extension reads the order ID displayed on the REWE checkout/aftersale page (`https://shop.rewe.de/checkout/aftersale`) to construct a tracking URL (e.g., `https://wannkommt.rewe.de/{OrderID}`).

- **No other data:** No additional user information (personal, financial, or behavioral) is collected, transmitted, or stored by the Extension.

## Data Usage

- The order ID is used **only in-memory** within your browser session to:

  1. Modify calendar links (`.ics` files and Google Calendar URLs) by appending the tracking URL.

  2. Trigger downloads of modified calendar invites.

- **No persistent storage:** The Extension does not write data to disk, local storage, or any external server.

## Data Sharing

- **No third-party sharing:** Your order ID and any derived URLs are not shared with any external service except when you click the calendar link, which naturally opens Google Calendar or downloads an `.ics` file in your browser.

- The tracking link points to `wannkommt.rewe.de`, an official REWE tracking service, but the Extension does not transmit data to any other endpoint.

## Remote Code

- The Extension uses only JavaScript files packaged within the extension bundle.

- No remote scripts or `eval()` calls are performed.

## Permissions

- **Host permission:** `https://shop.rewe.de/checkout/aftersale` to read the order ID and calendar links.

- No additional permissions (e.g., storage, history, tabs) are requested.

## Security

- All network requests (if any) respect the browser’s same-origin policy and are performed with `credentials: include` for `.ics` downloads, mirroring normal browser behavior.

- No sensitive data (passwords, cookies beyond standard session cookies) is accessed or stored.

## Contact & Source

- This Extension is open-source. You can review the code or submit issues and pull requests at:
https://github.com/LinqLover/chrome-wannkommtrewe-calendar

---

If you have any questions about this policy, please open an issue in the repository or contact the maintainer via GitHub.

# Claude Desktop RTL Mod

A Claude Code mod for the **Code tab of the Claude desktop app**. It does not support the `claude` CLI in a terminal.

## The problem

The app sets each line's direction from its first letter. A Persian, Arabic or Hebrew line that opens with an English word is shown left-to-right:

```
React یک کتابخانه برای ساخت رابط کاربری است.
```

## The fix

Before a message is drawn, the mod puts an invisible right-to-left mark (U+200F) at the start of each such line. It changes only what is shown, never the stored message.

- Applies to Claude's replies and your own messages.
- Keeps list markers, headings and quotes in place. Checks each table cell on its own.
- Leaves code blocks alone.
- Leaves mostly-English lines left-to-right, such as `The word سلام means hello`.

## Install

In the desktop app, click **+** next to the prompt box, then **Plugins** → **Add marketplace**, enter `Meshkati/claude-desktop-rtl-mod`, then **Add plugin**.

From a terminal:

```bash
claude plugin install rtl-mod --marketplace Meshkati/claude-desktop-rtl-mod
```

Messages drawn before the install keep their old direction until the session is reopened.

---

## فارسی

یک ماد Claude Code برای **تب Code در اپ دسکتاپ Claude**. فعلاً `claude` در ترمینال (CLI) پشتیبانی نمی‌شود.

خط‌های فارسی، عربی یا عبری که با کلمه‌ی انگلیسی شروع می‌شوند، در اپ چپ‌به‌راست نمایش داده می‌شوند. این ماد پیش از نمایش، یک نویسه‌ی نامرئی RLM اول این خط‌ها می‌گذارد تا راست‌به‌چپ نمایش داده شوند. پیام ذخیره‌شده تغییر نمی‌کند و بلوک‌های کد و خط‌هایی که بیشترشان انگلیسی است دست نمی‌خورند.

نصب: مراحل بخش Install بالا.

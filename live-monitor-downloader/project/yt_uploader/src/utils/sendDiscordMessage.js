require('dotenv').config();

async function sendDiscordMessage({ webhookPayload }) {
  const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;

  try {
    const response = await fetch(discordWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(webhookPayload),
    });

    if (response.status !== 204) {
      console.error(`Failed to send Discord webhook: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error(`Error sending Discord webhook: ${error.message}`);
  }
}

module.exports = { sendDiscordMessage };

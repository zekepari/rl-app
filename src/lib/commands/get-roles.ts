import { APIChatInputApplicationCommandInteraction, InteractionResponseType, MessageFlags } from "discord-api-types/v10";
import { NextResponse } from "next/server";

export async function getRoles(interaction: APIChatInputApplicationCommandInteraction) {
    const res = await fetch(`https://discord.com/api/v10/guilds/${interaction.guild_id}/members/${interaction.user?.id}/roles/1197897676692398170`, {
        method: 'PUT',
        headers: {
            Authorization: 'Bot ' + process.env.DISCORD_BOT_TOKEN,
        }
    });

    if (!res.ok) {
        const responseText = (await res.text()).substring(0, 1024)
        
        return NextResponse.json({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                embeds: [
                    {
                        title: 'Something went wrong!',
                        color: 15548997,
                        fields: [
                            { name: 'Status', value: res.status, inline: true },
                            { name: 'Body', value: responseText, inline: true },
                            { name: 'Guild ID', value: interaction.guild_id, inline: true },
                            { name: 'User ID', value: interaction.user?.id, inline: true },
                        ]
                    }
                ],
                flags: MessageFlags.Ephemeral,
            },
        });
    };

    return NextResponse.json({
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
            content: `Get roles`,
            flags: MessageFlags.Ephemeral,
        },
    });
}
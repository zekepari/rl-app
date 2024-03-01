import { auth } from "@/auth";
import { getBotGuild, getUserGuilds } from "@/lib/guilds";
import { PlusIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { APIGuild } from "discord-api-types/v10";
import Link from "next/link";
import Image from 'next/image';

export const runtime = "edge";

export default async function Page({ params }: { params: { id: string } }) {
    const session = await auth();

    const userGuilds: Array<APIGuild> = await getUserGuilds(session?.user.access_token);
    const userGuild: APIGuild | undefined = userGuilds.find(guild => guild.id === params.id);

    if (!userGuild || !userGuild.owner) {
        return (
            <div>No permission</div>
        )
    };

    const botGuild: APIGuild = await getBotGuild(params.id);

    return (
        <div className='flex-col space-y-2 w-full'>
            <div className='flex items-center justify-between space-x-4 bg-neutral-800 w-full px-4 py-2 rounded shadow-lg'>
                <div className='flex items-center space-x-4'>
                    {userGuild.icon ? (
                        <Image src={`https://cdn.discordapp.com/icons/${userGuild.id}/${userGuild.icon}.png`} alt={`${userGuild.name} Icon`} className='h-16 w-16 rounded' width={100} height={100} />
                    ) : (
                        <div className='h-16 w-16 flex items-center justify-center'>
                            <span className='text-4xl'>{userGuild.name.charAt(0)}</span>
                        </div>
                    )}
                    <span className='text-lg'>{userGuild.name}</span>
                </div>
                {!botGuild && (
                    <div className='flex items-center gap-4'>
                        <ExclamationTriangleIcon className="h-16 w-6" />RoLinker is not a member of this guild.
                    </div>
                )}
            </div>
            {!botGuild && (
                <Link className="px-4 py-2 w-full flex justify-center items-center gap-4 hover:bg-neutral-700 bg-neutral-800 rounded shadow-lg" href={`https://discord.com/api/oauth2/authorize?scope=bot+applications.commands&client_id=990855457885278208&permissions=8&guild_id=${params.id}&disable_guild_select=true&redirect_uri=https://rolinker.net/api/auth/guild&response_type=cod`}>
                    Add RoLinker<PlusIcon className="h-16 w-6" />
                </Link>
            )}
        </div>
    )
}
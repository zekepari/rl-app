import Link from "next/link";
import { UsersIcon, CircleStackIcon } from '@heroicons/react/24/outline'
import Block from "../_components/Block";

export default function ManageLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section className='container'>
            <h1 className='font-bold text-3xl mb-4'>Manage</h1>

            <div className='md:flex gap-4 items-start'>
                <Block>
                    <Link href='/manage/accounts' className='flex items-center justify-between gap-4 py-2 px-4 hover:bg-neutral-700 rounded-t'>
                        <UsersIcon className="h-6" />
                        <span>Accounts</span>
                    </Link>
                    <Link href='/manage/guilds' className='flex items-center justify-between gap-4 py-2 px-4 hover:bg-neutral-700 rounded-b'>
                        <CircleStackIcon className="h-6" />
                        <span>Guilds</span>
                    </Link>
                </Block>
                {children}
            </div>
        </section>
    )
}
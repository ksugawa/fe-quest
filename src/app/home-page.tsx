"use client";

import Link from 'next/link'

export default function HomePage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center">

            <div className="relative place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
                <h1>FE問題集</h1>
                <div>
                    <Link href="/form" className="relative py-1 px-5 cursor-pointer rounded-3xl border-2 border-solid divide-slate-700 outline-black">
                        問題を登録
                    </Link>
                    <button className="relative h-12 w-52 cursor-pointer rounded-3xl border-2 border-solid divide-slate-700 outline-black">問題を解く</button>
                </div>
            </div>
        </main>
    );
}

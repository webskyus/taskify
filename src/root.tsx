import {cssBundleHref} from '@remix-run/css-bundle';
import {
    type LoaderFunctionArgs,
    type LinksFunction, json, SerializeFrom,
} from '@remix-run/node';
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration, useLoaderData, useRevalidator, useRouteLoaderData,
} from '@remix-run/react';
import clsx from 'clsx';
import {getTheme} from '~/app/theme/theme-session.server';
import {ClientHintCheck, getHints, useNonce} from '~/app/theme/client-hints';
import {useTheme} from "~/routes/action.set-theme";
import styles from "~/app/styles/root.css";
import db from "~/app/supabase/db";
import {useEffect, useState} from "react";
import {createBrowserClient, createServerClient} from "@supabase/auth-helpers-remix";
import {useSupabase} from "~/app/supabase/use-supabase";
import {getSupabaseWithSessionAndHeaders} from "~/app/supabase/supabase.server";

export const links: LinksFunction = () => [
    {rel: "stylesheet", href: styles},
    ...(cssBundleHref ? [{rel: "stylesheet", href: cssBundleHref}] : []),
];

export const loader = async ({request}: LoaderFunctionArgs) => {
    const env = {
        SUPABASE_URL: process.env.SUPABASE_URL!,
        SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!
    };
    const {serverSession, headers} = await getSupabaseWithSessionAndHeaders({
        request,
    });

    return json(
        {
            env,
            serverSession,
            theme: {
                requestInfo: {
                    hints: getHints(request),
                    userPrefs: {
                        theme: getTheme(request),
                    },
                }
            },
        },
        {
            headers
        }
    )
}

export default function App() {
    const nonce = useNonce();
    const theme = useTheme();
    const {env, serverSession} = useLoaderData<typeof loader>();
    const {supabase} = useSupabase({
        env,
        serverSession
    });

    // console.log('dd.db.supabase.print', db);
    return (
        <html lang="en" className={clsx(theme)}>
        <head>
            <ClientHintCheck nonce={nonce}/>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width,initial-scale=1"/>
            <Meta/>
            <Links/>
        </head>
        <body>
        <Outlet context={{supabase}}/>
        <ScrollRestoration/>
        <Scripts/>
        <LiveReload/>
        </body>
        </html>
    );
}

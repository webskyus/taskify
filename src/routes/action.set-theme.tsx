import { json } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import {setTheme} from "~/app/theme/theme-session.server";
import {ThemeToggler} from '~/features/theme-toggler';
import {isTheme, Theme, useHints, useRequestInfo} from "~/app/theme/utils";

export const action: ActionFunction = async ({ request }) => {
    const requestText = await request.text();
    const form = new URLSearchParams(requestText);
    const theme = form.get("theme");

    if (!isTheme(theme)) {
        return json({
            success: false,
            message: `theme value of ${theme} is not a valid theme`,
        });
    }
    return json(
        {
            success: true
        },
        {
            headers: {
                "Set-Cookie": setTheme(theme === "system" ? undefined : theme),
            },
        }
    );
};

export const ThemeSwitch = () => {
    const fetcher = useFetcher();

    const handleSelect = (themeValue: Theme) => {
        fetcher.submit(
            { theme: themeValue },
            { method: "post", action: "/action/set-theme" }
        );
    };

    return <ThemeToggler handleThemeChange={handleSelect} />;
}

/**
 * @returns the user's theme preference, or the client hint theme if the user
 * has not set a preference.
 */
export const useTheme = () => {
    const hints = useHints();
    const requestInfo = useRequestInfo();

    return requestInfo.userPrefs.theme ?? hints.theme;
}

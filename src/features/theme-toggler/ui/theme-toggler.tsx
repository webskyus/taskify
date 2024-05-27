import { Moon, Sun } from 'lucide-react';
import { Button } from '~/shared/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '~/shared/ui/dropdown-menu';
import {FC} from "react";
import {Theme} from "~/app/theme/utils";
import {useTheme} from "~/routes/action.set-theme";

interface Props {
	handleThemeChange: (theme: Theme) => void;
}

export const ThemeToggler: FC<Props> = (props) => {
	const {handleThemeChange} = props;
	const [_, setTheme] = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Button variant='ghost' size='icon'>
					<Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
					<Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
					<span className='sr-only'>Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='center'>
				<DropdownMenuItem onClick={() => handleThemeChange(Theme.LIGHT)}>
					Light
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => handleThemeChange(Theme.DARK)}>
					Dark
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

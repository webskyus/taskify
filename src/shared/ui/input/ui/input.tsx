import * as React from 'react';
import { cn } from '~/shared/lib/utils';
import { useField } from 'remix-validated-form';

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		const { name } = props;
		const { error, getInputProps } = useField(name as string);

		return (
			<>
				<input
					type={type}
					className={cn(
						'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
						className
					)}
					ref={ref}
					{...getInputProps({ id: name })}
					{...props}
				/>

				{error && <p className='pt-2 text-xs text-red-400'>{error}</p>}
			</>
		);
	}
);

Input.displayName = 'Input';
export { Input };

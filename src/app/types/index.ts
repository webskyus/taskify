import { LoaderFunction } from '@remix-run/node';

export type LoaderData<TLoaderFn extends LoaderFunction> = Awaited<
	ReturnType<TLoaderFn>
> extends Response | infer D
	? D
	: never;

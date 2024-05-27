import type { MetaFunction } from '@remix-run/node';
import { Header } from '~/widgets/header';
import { LandingBanner } from '~/widgets/landing-banner/ui/landing-banner';

export const meta: MetaFunction = () => {
	return [
		{
			title: 'Plan.io',
		},
		{
			name: 'description',
			content: 'Your all in one productivity app',
		},
	];
};

const Index = () => {
	return (
		<section className={'container'}>
			<Header />
			<LandingBanner />
		</section>
	);
};

export default Index;

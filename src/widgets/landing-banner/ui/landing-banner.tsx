import { Link } from '@remix-run/react';
import { ROUTES } from '~/shared/lib/utils/urls';
import { Button } from '~/shared/ui/button';
import { ChevronRight } from 'lucide-react';
import { LANDING_TEXT } from '~/shared/lib/utils/static';

const LandingBanner = () => {
	return (
		<section className={'mt-24 sm:mt-56 m-auto text-center'}>
			<h1
				className={
					'text-3xl sm:text-7xl sm:pl-40 sm:pr-40 mb-8 font-bold text-foundation-primary-500'
				}
				dangerouslySetInnerHTML={{ __html: LANDING_TEXT.title }}
			/>

			<p
				className={`
						lg:pl-48 lg:pr-48 xl:pl-48 
						xl:pr-48 mb-10 m-auto text-xl 
						sm:text-2xl text-center font-medium text-foundation-secondary-400
					`}>
				{LANDING_TEXT.description}
			</p>

			<Button
				asChild
				className={'pt-[4px] pb-[4px] pl-[16px] pr-[16px] group'}
				variant={'secondary'}>
				<Link to={ROUTES.SIGN_UP} unstable_viewTransition>
					{LANDING_TEXT.auth_button}
					<ChevronRight
						size={20}
						className={'transition-all group-hover:translate-x-0.5'}
					/>
				</Link>
			</Button>
		</section>
	);
};

export { LandingBanner };

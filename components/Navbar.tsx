'use client';

import { useAppKit } from '@reown/appkit/react';

const Navbar = () => {
	const { open } = useAppKit();
	return (
		<div className="flex justify-between items-center">
			<div>Logo</div>
			<div>search</div>
			<div onClick={() => open()}>wallect connect</div>
		</div>
	);
};

export default Navbar;

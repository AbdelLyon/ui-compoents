import { useState, useEffect } from 'react';

const useResponsiveScreen = () => {
	const [isMobile, setIsMobile] = useState(false);
	const [isTablet, setIsTablet] = useState(false);
	const [isDesktop, setIsDesktop] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			const screenWidth = window.innerWidth;
			setIsMobile(screenWidth <= 768);
			setIsTablet(screenWidth > 768 && screenWidth <= 1024);
			setIsDesktop(screenWidth > 1024);
		};

		handleResize();
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return { isMobile, isTablet, isDesktop };
};

export default useResponsiveScreen;

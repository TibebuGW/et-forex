"use client";

import { useEffect, useState } from "react";

import { usePathname } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useNavigation = (): any => {
  const pathname = usePathname();
  const [isDashboardActive, setIsDashboardActive] = useState<boolean>(false);
  const [isRestaurantsActive, setIsRestaurantActive] = useState<boolean>(false);
  const [isItemsActive, setIsItemActive] = useState<boolean>(false);
  const [isReviewsActive, setIsReviewsActive] = useState<boolean>(false);
  const [isUsersActive, setIsUsersActive] = useState<boolean>(false);
  const [isIncentivesActive, setIsIncentivesActive] = useState<boolean>(false);

  useEffect(() => {
    setIsDashboardActive(false);
    setIsRestaurantActive(false);
    setIsItemActive(false);
    setIsReviewsActive(false);
    setIsReviewsActive(false);
    setIsIncentivesActive(false);

    if (pathname === "/admin/dashboard") {
      setIsDashboardActive(true);
    } else if (pathname.includes("/admin/restaurant")) {
      setIsRestaurantActive(true);
    } else if (pathname.includes("/admin/item")) {
      setIsItemActive(true);
    } else if (pathname.includes("/admin/users")) {
      setIsUsersActive(true);
    } else if (pathname.includes("/admin/reviews")) {
      setIsReviewsActive(true);
    } else if (pathname.includes("/admin/finance")) {
      setIsIncentivesActive(true);
    }
  }, [pathname]);

  return {
    isDashboardActive,
    isRestaurantsActive,
    isItemsActive,
    isUsersActive,
    isReviewsActive,
    isIncentivesActive,
  };
};

export default useNavigation;

import { useState, useCallback } from "react";

const useToast = () => {
  const [isShowToast, setIsShowToast] = useState<boolean>(false);

  const openToast = useCallback(() => setIsShowToast(true), [setIsShowToast]);

  const closeToast = useCallback(() => setIsShowToast(false), [setIsShowToast]);

  const toggleToast = useCallback(
    () => setIsShowToast((prev) => !prev),
    [setIsShowToast]
  );

  return { isShowToast, openToast, closeToast, toggleToast };
};

export default useToast;

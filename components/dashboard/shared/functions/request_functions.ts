"use client";
import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "sonner";

export const useCustomToast = () => {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const customToast = ({
    func,
    sfunc,
    loading,
    suc,
    err,
    efunc,
  }: {
    func: () => Promise<any>;
    sfunc?: () => void;
    loading?: string;
    suc?: string;
    err?: string;
    efunc?: (() => Promise<void>) | (() => void);
  }) => {
    setModalOpen(true);
    setLoading(true);

    return toast.promise(
      func()
        .then((res) => {
          setLoading(false);
          setModalOpen(false);
          if (sfunc) sfunc();
        })
        .catch((e) => {
          const axiosError = e?.response?.data?.message;
          setLoading(false);
          if (efunc) efunc();
          throw new Error(axiosError || e);
        }),

      {
        loading: loading || "Loading...",
        success: suc || "Success",
        error: (e) => {
          return e.message || err || "An error occurred";
        },
      }
    );
  };
  return { customToast, loading, modalOpen, setModalOpen };
};

export const useCustomLoader = () => {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // control modal state

  const handlePromise = async ({
    func,
    onSuccess,
    onError,
    useToast = true,
    successText = "Success",
    errorText = "An error occurred",
    openModal = false, // if true, modal opens
  }: {
    func: () => Promise<any>;
    onSuccess?: () => void;
    onError?: (error: any) => void;
    useToast?: boolean; // choose whether to use toast
    loadingText?: string;
    successText?: string;
    errorText?: string;
    openModal?: boolean; // decide to show modal or not
  }) => {
    try {
      if (openModal) setModalOpen(true); // open modal if required
      setLoading(true);

      const result = await func();

      setLoading(false);
      setModalOpen(false);
      if (onSuccess) {
        onSuccess();
        setModalOpen(false);
      }
      if (useToast) {
        toast.success(successText);
      }

      return result;
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      // if (openModal) setModalOpen(false);

      const axiosError = error?.response?.data?.message || error?.message;

      if (onError) onError(axiosError);

      if (useToast) {
        toast.error(axiosError || errorText);
      }
    }
  };

  return {
    handlePromise,
    loading,
    modalOpen, // expose this to track modal state
    setModalOpen, // allow manual control of modal outside the hook
  };
};

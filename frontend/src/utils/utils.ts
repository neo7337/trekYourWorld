import { Toast, ToastMessage } from "primereact/toast";

const showToast = (
    toastRef: React.RefObject<Toast>,
    severity: ToastMessage["severity"],
    summary: string,
    detail: string,
    timeout: number
) => {
    toastRef.current?.show({
        severity: severity,
        summary: summary,
        detail: detail,
        life: timeout,
    });
};

export { showToast };

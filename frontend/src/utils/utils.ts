import { ToastMessage } from "primereact/toast";
import { toastRef } from '../App';

const showToast = (severity: ToastMessage["severity"], summary: string, detail: string) => {
  if (toastRef.current) {
    toastRef.current.show({
      severity: severity,
      summary: summary,
      detail: detail,
      life: 5000, // Set toast duration
    });
  }
};

export { showToast };

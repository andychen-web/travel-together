//**********
// 共用模組
//**********
import { notifyError } from "@/utilities/globalUtil";
import { showToast } from "@/utilities/globalUtil";
import { handleADSGetApiError } from "@/utilities/apiUtil";
export { notifyError, showToast, handleADSGetApiError };

Array.from(document.querySelectorAll("._acan")).forEach((btn, i) => {
    // remove this btn's class _acan after click
    btn.addEventListener("click", () => {
        btn.classList.remove("_acan");
    });
      btn.click()
});

let queue = [];
let isShowing = false;

function createToast(type) {
  const messages = {
    success: "Thành công!",
    error: "Có lỗi xảy ra!",
    info: "Thông tin!",
    warning: "Cảnh báo!",
  };

  queue.push({ type, message: messages[type] });
  showNext();
}

function showNext() {
  if (isShowing) return;
  if (queue.length === 0) return;

  isShowing = true;

  const { type, message } = queue.shift();

  const container = document.getElementById("toast-container");

  const toast = document.createElement("div");
  toast.className = "toast " + type;

  toast.innerHTML = `
    <span>${message}</span>
    <span class="close">×</span>
    <div class="progress"></div>
  `;

  container.appendChild(toast);

  const progress = toast.querySelector(".progress");
  progress.style.animation = "progress 4s linear forwards";

  const removeToast = () => {
    toast.style.animation = "slideOut 0.4s forwards";
    setTimeout(() => {
      toast.remove();
      isShowing = false;
      showNext();
    }, 400);
  };

  setTimeout(removeToast, 4000);

  toast.querySelector(".close").onclick = removeToast;
}

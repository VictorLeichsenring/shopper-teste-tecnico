const showTemporaryAlert = (message: string): void => {
  const alertBox = document.createElement("div");
  alertBox.textContent = message;
  alertBox.style.position = "fixed";
  alertBox.style.top = "20px";
  alertBox.style.right = "20px";
  alertBox.style.backgroundColor = "#4caf50"; // Cor de sucesso
  alertBox.style.color = "white";
  alertBox.style.padding = "15px";
  alertBox.style.borderRadius = "8px";
  alertBox.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
  alertBox.style.fontSize = "1em";
  alertBox.style.zIndex = "1000";
  alertBox.style.opacity = "0.9";
  alertBox.style.transition = "opacity 0.3s ease";

  document.body.appendChild(alertBox);

  // Remove o alerta após 3 segundos
  setTimeout(() => {
    alertBox.style.opacity = "0"; // Gradualmente desaparece
    setTimeout(() => {
      document.body.removeChild(alertBox); // Remove do DOM
    }, 300); // Tempo para a transição de opacidade
  }, 3000);
};

export default showTemporaryAlert;
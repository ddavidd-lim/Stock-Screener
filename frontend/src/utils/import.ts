export function exportToJson(data: unknown, filename = "tickers.json") {
  const jsonStr = JSON.stringify(data, null, 2); // pretty print
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

type TabData = {
  label: string;
  index: number;
  tickers: string[];
};
export function importFromJson(
  event: React.ChangeEvent<HTMLInputElement>,
  onSuccess: (data: TabData[]) => void
) {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const result = e.target?.result;
      if (typeof result === "string") {
        const parsed = JSON.parse(result);

        // Optionally validate structure
        const isValid = Array.isArray(parsed) &&
          parsed.every(
            item =>
              typeof item.label === "string" &&
              typeof item.index === "number" &&
              Array.isArray(item.tickers)
          );

        if (!isValid) {
          alert("Invalid data format.");
          return;
        }

        localStorage.setItem("yourKey", JSON.stringify(parsed));
        onSuccess(parsed); // Update parent state
        alert("Import successful!");
      }
    } catch {
      alert("Invalid JSON file.");
    }
  };
  reader.readAsText(file);
}

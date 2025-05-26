// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from "react";

type TradingViewWidgetProps = {
  tickerSymbol?: string;
}

function TradingViewWidget(props: TradingViewWidgetProps) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current?.querySelector("script")) {
      // If the script is already present, do not add it again
      console.log("TradingViewWidget script already exists");
      return;
    }
    console.log("TradingViewWidget mounted");
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "autosize": true,
          "symbol": "${props.tickerSymbol}",
          "range": "1M",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "3",
          "withdateranges": true,
          "save_image": false,
          "locale": "en",
          "support_host": "https://www.tradingview.com"
        }`;
    container.current?.appendChild(script);
  }, [props.tickerSymbol]);

  return (
    <div
      className="tradingview-widget-container"
      ref={container}
      style={{ height: "100%", width: "100%" }}>
      
      <div
        className="tradingview-widget-container__widget"
        style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
    </div>
  );
}

export default memo(TradingViewWidget);

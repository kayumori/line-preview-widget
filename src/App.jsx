import React, { useState } from "react";
import { User, ChevronUp, ChevronDown } from "lucide-react";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [richMenuType, setRichMenuType] = useState("none");
  const [showPhone, setShowPhone] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleAddMessage = () => {
    if (inputText.trim()) {
      const now = new Date();
      const time = `${now.getHours()}:${String(now.getMinutes()).padStart(
        2,
        "0"
      )}`;
      setMessages([
        ...messages,
        {
          id: Date.now(),
          text: inputText,
          time: time,
        },
      ]);
      setInputText("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAddMessage();
    }
  };

  const handleClear = () => {
    setMessages([]);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const formatText = (text) => {
    if (!text) return "";

    const result = [];
    const lines = text.split("\n");

    // 文字の表示幅を計算（全角=2、半角=1）
    const getCharWidth = (char) => {
      return char.match(/[^\x01-\x7E\uFF61-\uFF9F]/) ? 2 : 1;
    };

    for (let line of lines) {
      if (line === "") {
        result.push("");
        continue;
      }

      let currentLine = "";
      let currentWidth = 0;

      for (let char of line) {
        const charWidth = getCharWidth(char);

        // 15文字幅を超える場合は改行
        if (currentWidth + charWidth > 30) {
          result.push(currentLine);
          currentLine = char;
          currentWidth = charWidth;
        } else {
          currentLine += char;
          currentWidth += charWidth;
        }
      }

      if (currentLine) {
        result.push(currentLine);
      }
    }

    return result.join("\n");
  };

  const getRichMenuHeight = () => {
    if (!showMenu) return 0;
    if (richMenuType === "large") return 180;
    if (richMenuType === "small") return 90;
    return 0;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-8">
      <div className="flex gap-8 max-w-7xl w-full">
        <div className="flex-1 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-8 border border-gray-100">
          <h2 className="text-xl font-bold mb-6 text-gray-900 tracking-tight">
            メッセージを入力
          </h2>
          <div className="relative">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="メッセージを入力してください..."
              className="w-full h-64 p-6 border-2 border-gray-200 rounded-2xl resize-none focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 text-lg transition-all shadow-sm bg-white"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
            />
          </div>
          <button
            onClick={handleAddMessage}
            className="mt-6 w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-2xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-base"
          >
            メッセージ追加
          </button>

          <div className="mt-6 pt-6 border-t border-gray-200 space-y-2.5">
            <button
              onClick={handleClear}
              className="w-full px-4 py-2.5 bg-gradient-to-r from-red-50 to-rose-50 hover:from-red-100 hover:to-rose-100 text-red-600 rounded-xl font-medium transition-all shadow-sm hover:shadow-md border border-red-100 text-sm"
            >
              メッセージクリア
            </button>

            <div className="space-y-2">
              <p className="text-xs font-bold text-gray-600 tracking-wide uppercase mt-3">
                リッチメニュー
              </p>
              <button
                onClick={() => setRichMenuType("small")}
                className={`w-full px-4 py-2.5 rounded-xl font-medium transition-all shadow-sm hover:shadow-md text-sm ${
                  richMenuType === "small"
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                    : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200"
                }`}
              >
                リッチメニュー(小)表示
              </button>
              <button
                onClick={() => setRichMenuType("large")}
                className={`w-full px-4 py-2.5 rounded-xl font-medium transition-all shadow-sm hover:shadow-md text-sm ${
                  richMenuType === "large"
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                    : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200"
                }`}
              >
                リッチメニュー(大)表示
              </button>
            </div>

            <button
              onClick={() => setShowPhone(!showPhone)}
              className="w-full px-4 py-2.5 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white rounded-xl font-medium transition-all shadow-lg md:hidden text-sm"
            >
              {showPhone ? "プレビューを隠す" : "プレビューを表示"}
            </button>
          </div>
        </div>

        <div
          className={`flex-shrink-0 ${showPhone ? "block" : "hidden"} md:block`}
        >
          <div
            className="bg-gray-900 rounded-3xl p-3 shadow-2xl"
            style={{ width: "420px" }}
          >
            <div className="bg-black rounded-t-3xl pt-2 pb-1">
              <div className="flex justify-center">
                <div className="w-32 h-6 bg-black rounded-b-2xl"></div>
              </div>
            </div>

            <div
              className="bg-white rounded-2xl overflow-hidden shadow-2xl relative"
              style={{ height: "750px" }}
            >
              <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 backdrop-blur-sm bg-opacity-95">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center shadow-sm">
                  <User size={24} className="text-gray-600" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-900">公式アカウント</div>
                </div>
              </div>

              <div
                className="overflow-y-auto p-4"
                style={{
                  backgroundColor: "#95B1DA",
                  height: `calc(750px - 60px - 50px - ${getRichMenuHeight()}px)`,
                }}
              >
                {messages.map((msg) => (
                  <div key={msg.id} className="flex mb-3 justify-start">
                    <div className="max-w-[75%]">
                      <div className="bg-white text-black rounded-xl px-4 py-3 shadow-md">
                        <div
                          className="text-[15px] leading-relaxed break-words whitespace-pre-wrap"
                          style={{
                            fontFamily: "system-ui, -apple-system, sans-serif",
                          }}
                        >
                          {formatText(msg.text)}
                        </div>
                      </div>
                      <div className="text-xs text-gray-700 mt-1 px-1 font-medium">
                        {msg.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {showMenu && richMenuType !== "none" && (
                <div
                  className="bg-gradient-to-b from-white to-gray-50 border-t-2 border-gray-200 relative shadow-inner"
                  style={{ height: `${getRichMenuHeight()}px` }}
                >
                  <button
                    onClick={toggleMenu}
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-gray-200 hover:border-gray-300 transition-all"
                  >
                    <ChevronDown size={20} className="text-gray-600" />
                  </button>
                  <div className="flex items-center justify-center h-full text-gray-400 text-sm font-semibold">
                    リッチメニュー({richMenuType === "small" ? "小" : "大"})
                  </div>
                </div>
              )}

              <div
                className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex items-center justify-center py-3"
                style={{ height: "50px" }}
              >
                <button
                  onClick={toggleMenu}
                  className="flex items-center gap-1 text-gray-600 text-sm font-medium hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors"
                >
                  <span>メニュー</span>
                  {showMenu ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronUp size={16} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

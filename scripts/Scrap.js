document.addEventListener('DOMContentLoaded', function () {
  scrapeWebsite();
});
function scrapeWebsite() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tab = tabs[0];
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: scrapeData
    }, (results) => {
      document.getElementById("Youtube").addEventListener("click", () => {
        chrome.runtime.sendMessage({ message: "buttonClicked" });
      });
      if (chrome.runtime.lastError || !results || results.length === 0) {
        console.error('Scraping failed:', chrome.runtime.lastError);
        return;
      }
    });
  });
}

function scrapeData() {
  let btn = document.getElementsByClassName('style-scope ytd-watch-metadata')[0];
  if (btn) {
    let btn1 = btn.getElementsByTagName('h1')[0];
    if (btn1) {
      btn1.style = "display: flex; align-items: center; gap: 8px;";
      btn1.innerHTML = '<label>' + document.getElementsByClassName('style-scope ytd-watch-metadata')[0].getElementsByTagName('h1')[0].innerText + '</label>' + '<div class="max-ai-youtube-summary-button" style="display: flex; align-items: center; justify-content: start; margin-left: auto; flex-shrink: 0;"><max-ai-youtube-summary-button><style><style data-emotion="max-ai-youtube-summary-button emotion-cache" data-s=""></style></style><div><button id="Youtube" class="use-chat-gpt-ai--MuiButtonBase-root use-chat-gpt-ai--MuiButton-root use-chat-gpt-ai--MuiButton-contained use-chat-gpt-ai--MuiButton-containedPrimary use-chat-gpt-ai--MuiButton-sizeMedium use-chat-gpt-ai--MuiButton-containedSizeMedium use-chat-gpt-ai--MuiButton-disableElevation use-chat-gpt-ai--MuiButton-root use-chat-gpt-ai--MuiButton-contained use-chat-gpt-ai--MuiButton-containedPrimary use-chat-gpt-ai--MuiButton-sizeMedium use-chat-gpt-ai--MuiButton-containedSizeMedium use-chat-gpt-ai--MuiButton-disableElevation max-ai-youtube-summary-button-emotion-cache-1o6hljk" tabindex="0" type="button" style=" display: inline-flex;-webkit-box-align: center;align-items: center;-webkit-box-pack: center;justify-content: center;position: relative;box-sizing: border-box;-webkit-tap-highlight-color: transparent;outline: 0px;border: 0px;margin: 0px;cursor: pointer;user-select: none;vertical-align: middle;appearance: none;text-decoration: none;font-family: Roboto, Helvetica, Arial, sans-serif;font-weight: 500;line-height: 1.75;letter-spacing: 0.02857em;min-width: 64px;padding: 6px 16px;transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;color: rgb(255, 255, 255);box-shadow: none;font-size: 14px;text-transform: none;background-color: rgba(107, 36, 194, 0.7);border-radius: 18px;"><span class="use-chat-gpt-ai--MuiButton-startIcon use-chat-gpt-ai--MuiButton-iconSizeMedium max-ai-youtube-summary-button-emotion-cache-1l6c7y9"><svg class="use-chat-gpt-ai--MuiSvgIcon-root use-chat-gpt-ai--MuiSvgIcon-fontSizeMedium max-ai-youtube-summary-button-emotion-cache-x9k0kd" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><svg width="24" height="24" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M36 16L33.5 10.5L28 8L33.5 5.5L36 0L38.5 5.5L44 8L38.5 10.5L36 16ZM36 44L33.5 38.5L28 36L33.5 33.5L36 28L38.5 33.5L44 36L38.5 38.5L36 44ZM16 38L11 27L0 22L11 17L16 6L21 17L32 22L21 27L16 38Z" fill="currentColor"></path></svg></svg></span>Summarize<span class="use-chat-gpt-ai--MuiTouchRipple-root max-ai-youtube-summary-button-emotion-cache-w0pj6f"></span></button></div></max-ai-youtube-summary-button></div>'
    }
  }

  let btn2 = document.getElementsByClassName('css-175oi2r r-1awozwy r-18u37iz r-knv0ih')[0];
  if (btn2) {
    btn2.outerHTML = document.getElementsByClassName('css-175oi2r r-1awozwy r-18u37iz r-knv0ih')[0].outerHTML + `
    <button id="twiter" style="color: #e3c5c5;height: 40px ;border-radius: 35px; background-color: #41a2e3; margin-top: 10px ;">Auto tweet</button>
   <div  id ="dropdowns" style=" display: none;
   position: absolute;
   background-color: #f1f1f1;
   position: absolute;
   right: 8.5rem;
   z-index: 1024;
   top: 3.25rem;
   ">
    <a type="button" style="padding: 12px 16px;color: white;z-index:2000000;text-decoration: none;display: block; background-color: #9fbed3;" id="like">Like</a>
    <a type="button" style="padding: 12px 16px;color: white;z-index:2000000;text-decoration: none;display: block; background-color: #9fbed3;" id="comment">Comment</a>
    <a type="button" style="padding: 12px 16px;color: white;z-index:2000000;text-decoration: none;display: block; background-color: #9fbed3;" id="givesometweet">Give Some Tweet</a>
  </div> 
  `
  }
  document.body.addEventListener("click", (event) => {
    if (event.target.id == "copy") {
      navigator.clipboard.writeText(event.target.previousSibling.data);
    }
    if (event.target.id == 'like' || event.target.id == 'comment' || event.target.id == 'givesometweet') {
      const full = document.getElementsByClassName('css-175oi2r r-13qz1uu r-417010 r-18u37iz')[0];
      if (full) {
        full.style = "width:75%";

        let modalId = document.getElementById('modalId')
        if (modalId == null) {
          const div1 = document.createElement('div');
          div1.id = "modalId"
          div1.innerHTML = `
        <div>
        <div style="display: flex; padding: 2%;border-bottom:1px solid gray;">
          <h1 style="color:white; margin:0">ChatGPT</h1>
          <span class="close" style="right: 20px;
          position: fixed;
          color: gray;
          font-size: 2rem;" id="closeModel">&times;</span>
        </div>
        <div style="display: flex;border-bottom:1px solid gray;">
        <button id="chatTab" style="width: 10rem;padding: 2%;border: none;background: #2c2c2c;color: white;border-bottom:4px solid #582695">Chat</button>
        <button id="summaryTab" style="border: none;width: 10rem;border-bottom:none;background: #2c2c2c;color: gray;">Summary</button>
        </div>
        <div id="chatContent" style="height: 81vh; overflow-y:scroll;">
          <div class="chat-content">
            <div class="chatbot">
              <div class="containers" style="padding:2%">
              </div>
            </div>
          </div>
        </div>
        <div id="summaryContent" style="height: 81vh; overflow-y:scroll;display:none;">
          <div class="summary-content">
            <div class="summarybot">
              <div class="summarycontainers" style="padding:2%">
              </div>
            </div>
          </div>
        </div>
        <div id="footerContent" style="display: flex;padding:3%">
          <input type="text" placeHolder="Ask AI..." style="width: 100%;height: 3rem;background: #2c2c2c;border: 1px solid gray;padding: 1%;color: white;" id="chatText">
          <button id="sendBtn" class="btn btn-primary" style="background:#582695;color:white">Send</button>
        </div>
        <div id="summaryFooterContent" style="display: none;padding:3%">
        <input type="text" placeHolder="Ask AI..." style="width: 100%;height: 3rem;background: #2c2c2c;border: 1px solid gray;padding: 1%;color: white;" id="summaryText">
        <button id="sendSummaryBtn" class="btn btn-primary" style="background:#582695;color:white">Send</button>
      </div>
      </div>
        `;
          div1.style = "width:25%;position: fixed;top: 0;right: 0;height: 100vh;box-sizing: border-box;display: flex!important;flex-direction: column;opacity: 1;opacity: 1;z-index: 2147483600;background: #2c2c2c;";
          (document.body).append(div1);
        }
      }
      const chatbox = document.querySelector(".containers");
      const chatLi = document.createElement("div");
      const text = event.target.innerText;
      chatLi.innerHTML = '<p style="font-size: 1.5rem;position: relative;margin-bottom: 10px;max-width: 80%;border-radius: 0.5rem;margin-left: auto;padding: 10px;background-color: #838392e0;color: white;width: fit-content;height: auto;text-align: left;font: 400 .9em "Open Sans", sans-serif;border: 1px solid #75bcf6;border-radius: 10px;">' + text + '</p>';
      chatbox.appendChild(chatLi);
      const apiKeys = "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";
      const apiUrls = "https://api.openai.com/v1/completions";
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKeys}`
        },
        body: JSON.stringify({
          model: "text-davinci-003",
          prompt: text + " for tweet",
          max_tokens: 4000,
          temperature: 0.5
        })
      }
      fetch(apiUrls, requestOptions).then(res => res.json()).then(data => {
        const chatbox1 = document.querySelector(".containers");
        const chatLi1 = document.createElement("div");
        chatLi1.innerHTML = '<p style="font-size: 1.5rem;margin-bottom: 10px;padding: 2%;border-radius: 0.5rem;width: fit-content;background: #582695;color: white;">' + data.choices[0].text.trim() + '<img src="https://thenounproject.com/api/private/icons/5418785/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23808080&foregroundOpacity=1&imageFormat=png&rotation=0" alt="copy" style="height: 38px;position: relative;top: 1rem;cursor: pointer; " id="copy" title="Copy" />' + '</p>';
        chatbox1.appendChild(chatLi1);
      }).catch(() => {
      })
    }

    if (event.target.id == 'Youtube') {
      document.body.style = "display: flex;width:100%;";
      const ytapp = document.getElementsByTagName('ytd-app')[0];
      if (ytapp) {
        ytapp.style = "width:75%";
        let modalId = document.getElementById('modalId')
        if (modalId == null) {
          const div1 = document.createElement('div');
          div1.id = "modalId"
          div1.innerHTML = `
        <div>
        <div style="display: flex; padding: 2%;border-bottom:1px solid gray;">
          <h1 style="color:white;">ChatGPT</h1>
          <span class="close" style="right: 20px;
          position: fixed;
          color: gray;
          font-size: 2rem;" id="closeModel">&times;</span>
        </div>
        <div style="display: flex;border-bottom:1px solid gray;">
        <button id="chatTab" style="border: none;width: 10rem;border-bottom:none;background: #2c2c2c;color: gray;">Chat</button>
        <button id="summaryTab" style="width: 10rem;padding: 2%;border: none;background: #2c2c2c;color: white;border-bottom:4px solid #582695">Summary</button>
        </div>
        <div id="chatContent" style="height: 85vh; overflow-y:scroll;display:none;">
          <div class="chat-content">
            <div class="chatbot">
              <div class="containers" style="padding:2%">
              </div>
            </div>
          </div>
        </div>
        <div id="summaryContent" style="height: 85vh; overflow-y:scroll;">
          <div class="summary-content">
            <div class="summarybot">
              <div class="summarycontainers" style="padding:2%">
              </div>
            </div>
          </div>
        </div>
        <div id="footerContent" style="display:none; padding:3%;" >
          <input type="text" placeHolder="Ask AI..." style="width: 100%;height: 3rem;background: #2c2c2c;border: 1px solid gray;padding: 1%;color: white;" id="chatText">
          <button id="sendBtn" class="btn btn-primary" style="background:#582695;color:white">Send</button>
        </div>
        <div id="summaryFooterContent" style="display: flex;padding:3%">
        <input type="text" placeHolder="Ask AI..." style="width: 100%;height: 3rem;background: #2c2c2c;border: 1px solid gray;padding: 1%;color: white;" id="summaryText">
        <button id="sendSummaryBtn" class="btn btn-primary" style="background:#582695;color:white">Send</button>
      </div>
      </div>
        `;

          div1.style = "width:25%;position: fixed;top: 0;right: 0;height: 100vh;box-sizing: border-box;display: flex!important;flex-direction: column;opacity: 1;opacity: 1;z-index: 2147483600;background: #2c2c2c;";
          (document.body).append(div1);
        }
      }

      const chatbox = document.querySelector(".summarycontainers");
      const chatLi = document.createElement("div");
      chatLi.innerHTML = '<p style="font-size: 1.5rem;position: relative;margin-bottom: 10px;max-width: 80%;border-radius: 0.5rem;margin-left: auto;padding: 10px;background-color: #838392e0;color: white;width: fit-content;height: auto;text-align: left;font: 400 .9em "Open Sans", sans-serif;border: 1px solid #75bcf6;border-radius: 10px;">' + document.getElementsByTagName('yt-attributed-string')[14].innerText + " Give Summary For It" + '</p>';
      chatbox.appendChild(chatLi);
      const text = document.getElementsByTagName('yt-attributed-string')[14].innerText + " Give Summary For It"
      const apiKeys = "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";
      const apiUrls = "https://api.openai.com/v1/completions";
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKeys}`
        },
        body: JSON.stringify({
          model: "text-davinci-003",
          prompt: text,
          max_tokens: 4000,
          temperature: 0.5
        })
      }
      fetch(apiUrls, requestOptions).then(res => res.json()).then(data => {
        const chatbox1 = document.querySelector(".summarycontainers");
        const chatLi1 = document.createElement("div");
        chatLi1.innerHTML = '<p style="font-size: 1.5rem;margin-bottom: 10px;padding: 2%;border-radius: 0.5rem;width: fit-content;background: #582695;color: white;">' + data.choices[0].text.trim() + '</p>';
        chatbox1.appendChild(chatLi1);
      }).catch(() => {
      })
    }

    if (event.target.id == 'closeModel') {
      document.getElementById('modalId').remove();
      const ytapp = document.getElementsByTagName('ytd-app')[0];
      const full = document.getElementsByClassName('css-175oi2r r-13qz1uu r-417010 r-18u37iz')[0];
      if (ytapp) {
        ytapp.style = "width:100%";
      }
      if (full) {
        full.style = "width:100%";
      }
    }

    if (event.target.id == "sendBtn") {
      const text = document.getElementById('chatText').value;
      if (text.trim() != "") {
        const chatbox = document.querySelector(".containers");
        const chatLi = document.createElement("div");
        chatLi.innerHTML = '<p style="font-size: 1.5rem;position: relative;margin-bottom: 10px;max-width: 80%;border-radius: 0.5rem;margin-left: auto;padding: 10px;background-color: #838392e0;color: white;width: fit-content;height: auto;text-align: left;font: 400 .9em "Open Sans", sans-serif;border: 1px solid #75bcf6;border-radius: 10px;">' + text + '</p>';
        chatbox.appendChild(chatLi);
        document.getElementById('chatText').value = "";
        const apiKey = "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";
        const apiUrl = "https://api.openai.com/v1/completions";
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: "text-davinci-003",
            prompt: text,
            max_tokens: 4000,
            temperature: 0.5
          })
        }
        fetch(apiUrl, requestOptions).then(res => res.json()).then(data => {
          const chatbox = document.querySelector(".containers");
          const chatLi = document.createElement("div");
          chatLi.innerHTML = '<p style="font-size: 1.5rem;margin-bottom: 10px;padding: 2%;border-radius: 0.5rem;width: fit-content;background: #582695;color: white;">' + data.choices[0].text.trim() + '</p>';
          chatbox.appendChild(chatLi);
          document.getElementById('chatText').focus();
        }).catch(() => {
        })
      }
    }
    if (event.target.id == "sendSummaryBtn") {
      const text = document.getElementById('summaryText').value;
      if (text.trim() != "") {
        const chatbox = document.querySelector(".summarycontainers");
        const chatLi = document.createElement("div");
        chatLi.innerHTML = '<p style="font-size: 1.5rem;position: relative;margin-bottom: 10px;max-width: 80%;border-radius: 0.5rem;margin-left: auto;padding: 10px;background-color: #838392e0;color: white;width: fit-content;height: auto;text-align: left;font: 400 .9em "Open Sans", sans-serif;border: 1px solid #75bcf6;border-radius: 10px;">' + text + '</p>';
        chatbox.appendChild(chatLi);
        document.getElementById('summaryText').value = "";
        const apiKey = "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";
        const apiUrl = "https://api.openai.com/v1/completions";
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: "text-davinci-003",
            prompt: text,
            max_tokens: 4000,
            temperature: 0.5
          })
        }
        fetch(apiUrl, requestOptions).then(res => res.json()).then(data => {
          const chatbox = document.querySelector(".summarycontainers");
          const chatLi = document.createElement("div");
          chatLi.innerHTML = '<p style="font-size: 1.5rem;margin-bottom: 10px;padding: 2%;border-radius: 0.5rem;width: fit-content;background: #582695;color: white;">' + data.choices[0].text.trim() + '</p>';
          chatbox.appendChild(chatLi);
          document.getElementById('summaryText').focus();
        }).catch(() => {
        })
      }
    }

    if (event.target.id == "chatTab") {
      document.getElementById("chatTab").style = "width: 10rem;padding: 2%;border: none;background: #2c2c2c;color: white;border-bottom:4px solid #582695";
      document.getElementById("summaryTab").style = "border: none;width: 10rem;border-bottom:none;background: #2c2c2c;color: gray;";
      document.getElementById('chatContent').style.display = 'block';
      document.getElementById('summaryContent').style.display = 'none';
      document.getElementById('summaryFooterContent').style.display = 'none';
      document.getElementById('footerContent').style.display = 'flex';
    }

    if (event.target.id == "summaryTab") {
      document.getElementById("summaryTab").style = "width: 10rem;padding: 2%;border: none;background: #2c2c2c;color: white;border-bottom:4px solid #582695";
      document.getElementById("chatTab").style = "border: none;width: 10rem;border-bottom:none;background: #2c2c2c;color: gray;";
      document.getElementById('chatContent').style.display = 'none';
      document.getElementById('summaryContent').style.display = 'block';
      document.getElementById('summaryFooterContent').style.display = 'flex';
      document.getElementById('footerContent').style.display = 'none';
    }
  });

  document.body.addEventListener("mouseover", (event) => {
    if (event.target.id == 'twiter') {
      let btn = document.getElementById('dropdowns')
      btn.style = "display: block; position: absolute;right: 6.5rem;z-index: 1024;top: 3.25rem;border: 2px solid #9fbed3;border-radius: 3px"
    }

    let likes = document.getElementById('like');
    let comment = document.getElementById('comment');
    let givesometweet = document.getElementById('givesometweet');

    if (event.target.id == 'like' && likes) {
      likes.style = "color: #0c0b0b; background-color: #f0f0f0; padding: 12px 16px;text-decoration: none;display: block;"
      comment.style = "padding: 12px 16px;color: white;z-index:2000000;text-decoration: none;display: block; background-color: #9fbed3;"
      givesometweet.style = "padding: 12px 16px;color: white;z-index:2000000;text-decoration: none;display: block; background-color: #9fbed3;"
    }
    if (event.target.id == 'comment' && comment) {
      comment.style = "color: #0c0b0b; background-color: #f0f0f0; padding: 12px 16px;text-decoration: none;display: block;"
      likes.style = "padding: 12px 16px;color: white;z-index:2000000;text-decoration: none;display: block; background-color: #9fbed3;"
      givesometweet.style = "padding: 12px 16px;color: white;z-index:2000000;text-decoration: none;display: block; background-color: #9fbed3;"
    }
    if (event.target.id == 'givesometweet' && givesometweet) {
      givesometweet.style = "color: #0c0b0b; background-color: #f0f0f0; padding: 12px 16px;text-decoration: none;display: block;"
      likes.style = "padding: 12px 16px;color: white;z-index:2000000;text-decoration: none;display: block; background-color: #9fbed3;"
      comment.style = "padding: 12px 16px;color: white;z-index:2000000;text-decoration: none;display: block; background-color: #9fbed3;"
    }
  });
}





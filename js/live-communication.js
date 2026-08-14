/**
 * ZIABRIDGE 5-Channel Live Communication Widget
 * Integrates WhatsApp, Messenger, Email, LinkedIn, and Phone Call Options
 */

document.addEventListener("DOMContentLoaded", function () {
  // Create Live Communication Widget Container
  const widgetHtml = `
    <div class="live-comm-widget" id="liveCommWidget">
      <button class="live-comm-trigger" id="liveCommTrigger" aria-label="Open Communication Channels">
        <svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
        <span class="comm-badge">Live</span>
      </button>

      <div class="live-comm-menu" id="liveCommMenu">
        <div class="comm-header">
          <h4>Connect with ZIABRIDGE</h4>
          <p>Choose your preferred communication channel:</p>
        </div>

        <a href="https://wa.me/8801825222414?text=Hello%20ZIABRIDGE%2C%20I%20am%20interested%20in%20your%20services." target="_blank" class="comm-item comm-wa">
          <span class="comm-item-icon">
            <svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#25D366"/><path fill="#FFFFFF" d="M16 6c-5.523 0-10 4.477-10 10 0 1.771.463 3.482 1.34 4.99L6 26l5.163-1.32A9.958 9.958 0 0 0 16 26c5.523 0 10-4.477 10-10S21.523 6 16 6zm5.888 14.244c-.242.68-1.42 1.303-1.96 1.343-.5.037-1.02.208-3.428-.715-2.9-1.12-4.76-4.06-4.905-4.25-.144-.19-1.176-1.563-1.176-2.98 0-1.418.744-2.114 1.008-2.403.264-.29.577-.362.769-.362.192 0 .385.002.553.01.177.008.415-.067.649.495.242.579.822 2 .894 2.146.072.146.12.317.024.51-.096.194-.144.314-.288.482-.144.169-.303.377-.433.507-.144.145-.294.302-.126.593.168.29.746 1.232 1.6 1.996 1.099.98 2.026 1.284 2.316 1.428.29.145.457.121.626-.073.169-.194.72-.84.912-1.128.192-.29.385-.242.649-.145.264.097 1.68.792 1.968.937.288.145.48.217.552.338.072.121.072.7-.17 1.38z"/></svg>
          </span>
          <div class="comm-item-text">
            <strong>WhatsApp Chat</strong>
            <small>Fastest Response (+880 1825-222414)</small>
          </div>
        </a>

        <a href="https://m.me/ziabridge" target="_blank" class="comm-item comm-msg">
          <span class="comm-item-icon">
            <svg viewBox="0 0 32 32"><defs><linearGradient id="commMsgGrad" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stop-color="#00C6FF"/><stop offset="50%" stop-color="#7B2FF7"/><stop offset="100%" stop-color="#F95CA4"/></linearGradient></defs><path fill="url(#commMsgGrad)" d="M16 2C8.268 2 2 7.686 2 15.077c0 4.14 2.02 7.85 5.19 10.29V30l4.75-2.61c1.27.35 2.62.54 4.06.54 7.732 0 14-5.686 14-13.077S23.732 2 16 2z"/><path fill="#FFFFFF" d="M8.6 19.2l4.63-4.9 3.55 2.66 4.94-4.9-5.13 5.4-3.55-2.66-4.44 4.4z"/></svg>
          </span>
          <div class="comm-item-text">
            <strong>Facebook Messenger</strong>
            <small>Connect via Social Media</small>
          </div>
        </a>

        <a href="mailto:ziabridge.bd@gmail.com?subject=ZIABRIDGE%20Business%20Inquiry" class="comm-item comm-email">
          <span class="comm-item-icon">
            <svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#EA4335"/><rect x="8" y="10" width="16" height="12" rx="2" fill="none" stroke="#FFFFFF" stroke-width="1.6"/><polyline points="8.5,11 16,17 23.5,11" fill="none" stroke="#FFFFFF" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </span>
          <div class="comm-item-text">
            <strong>Direct Email</strong>
            <small>ziabridge.bd@gmail.com</small>
          </div>
        </a>

        <a href="https://linkedin.com/company/ziabridge" target="_blank" class="comm-item comm-li">
          <span class="comm-item-icon">
            <svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#0A66C2"/><path fill="#FFFFFF" d="M11.75 13h3.2v10.5h-3.2V13zm1.6-5.1a1.85 1.85 0 1 1 0 3.7 1.85 1.85 0 0 1 0-3.7zM17.5 13h3.07v1.44h.04c.43-.78 1.47-1.6 3.03-1.6 3.24 0 3.84 2.03 3.84 4.67v6h-3.2v-5.32c0-1.27-.02-2.9-1.77-2.9-1.78 0-2.05 1.36-2.05 2.8v5.42h-3.2V13z"/></svg>
          </span>
          <div class="comm-item-text">
            <strong>LinkedIn Corporate</strong>
            <small>Official Business Network</small>
          </div>
        </a>

        <a href="tel:+8801825222414" class="comm-item comm-phone">
          <span class="comm-item-icon">
            <svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#17408F"/><path fill="#FFFFFF" d="M11.5 9.5c.3-.3.8-.3 1.1 0l2 2c.3.3.3.8 0 1.1l-1.2 1.2c.7 1.6 2 2.9 3.6 3.6l1.2-1.2c.3-.3.8-.3 1.1 0l2 2c.3.3.3.8 0 1.1l-1.4 1.4c-.5.5-1.2.7-1.9.5-3.4-.9-6.4-3.9-7.3-7.3-.2-.7 0-1.4.5-1.9l1.3-1.5z"/></svg>
          </span>
          <div class="comm-item-text">
            <strong>Direct Phone Call</strong>
            <small>Speak to our representative</small>
          </div>
        </a>
      </div>
    </div>
  `;

  // Inject widget CSS styles
  const style = document.createElement("style");
  style.innerHTML = `
    .live-comm-widget {
      position: fixed;
      top: 96px;
      right: 20px;
      z-index: 950;
    }
    .live-comm-trigger {
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background: linear-gradient(135deg, #00ADB5, #1E3E62);
      border: 2px solid rgba(255,255,255,0.3);
      color: #FFFFFF;
      cursor: pointer;
      box-shadow: 0 8px 22px rgba(0, 173, 181, 0.45);
      position: relative;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .live-comm-trigger svg {
      width: 24px;
      height: 24px;
    }
    .live-comm-trigger:hover {
      transform: scale(1.08);
      box-shadow: 0 10px 26px rgba(0, 173, 181, 0.65);
    }
    .comm-badge {
      position: absolute;
      top: -4px;
      right: -4px;
      background: #10B981;
      color: #000;
      font-size: 0.65rem;
      font-weight: 800;
      padding: 2px 6px;
      border-radius: 10px;
      border: 1.5px solid #0B192C;
    }
    .live-comm-menu {
      position: absolute;
      top: 62px;
      right: 0;
      width: 290px;
      background: rgba(11, 25, 44, 0.97);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 16px;
      padding: 16px;
      box-shadow: 0 16px 40px rgba(0,0,0,0.5);
      display: none;
      flex-direction: column;
      gap: 10px;
      animation: commFadeDown 0.3s ease forwards;
    }
    .live-comm-menu.active {
      display: flex;
    }
    .comm-header h4 {
      color: #FFFFFF;
      font-size: 1rem;
      margin: 0 0 4px;
    }
    .comm-header p {
      color: #A0AEC0;
      font-size: 0.8rem;
      margin: 0 0 12px;
    }
    .comm-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 12px;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 10px;
      text-decoration: none;
      transition: all 0.2s ease;
    }
    .comm-item:hover {
      background: rgba(0, 173, 181, 0.15);
      border-color: #00ADB5;
      transform: translateX(4px);
    }
    .comm-item-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .comm-item-icon svg {
      width: 30px;
      height: 30px;
    }
    .comm-item-text strong {
      display: block;
      color: #F8F9FA;
      font-size: 0.85rem;
    }
    .comm-item-text small {
      color: #A0AEC0;
      font-size: 0.75rem;
    }
    @keyframes commFadeDown {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @media (max-width: 600px) {
      .live-comm-widget {
        top: 82px;
        right: 12px;
      }
      .live-comm-menu {
        width: 260px;
      }
    }
  `;

  document.head.appendChild(style);
  document.body.insertAdjacentHTML("beforeend", widgetHtml);

  const trigger = document.getElementById("liveCommTrigger");
  const menu = document.getElementById("liveCommMenu");

  if (trigger && menu) {
    trigger.addEventListener("click", function (e) {
      e.stopPropagation();
      menu.classList.toggle("active");
    });

    document.addEventListener("click", function (e) {
      if (!menu.contains(e.target) && e.target !== trigger) {
        menu.classList.remove("active");
      }
    });
  }
});

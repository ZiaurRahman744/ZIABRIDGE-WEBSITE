/**
 * ZIABRIDGE 5-Channel Live Communication Widget
 * Integrates WhatsApp, Messenger, Email, LinkedIn, and Phone Call Options
 */

document.addEventListener("DOMContentLoaded", function () {
  // Create Live Communication Widget Container
  const widgetHtml = `
    <div class="live-comm-widget" id="liveCommWidget">
      <button class="live-comm-trigger" id="liveCommTrigger" aria-label="Open Communication Channels">
        <span class="comm-icon">&#128172;</span>
        <span class="comm-badge">Live</span>
      </button>

      <div class="live-comm-menu" id="liveCommMenu">
        <div class="comm-header">
          <h4>Connect with ZIABRIDGE</h4>
          <p>Choose your preferred communication channel:</p>
        </div>

        <a href="https://wa.me/8801825222414?text=Hello%20ZIABRIDGE%2C%20I%20am%20interested%20in%20your%20services." target="_blank" class="comm-item comm-wa">
          <span class="comm-item-icon">&#128587;</span>
          <div class="comm-item-text">
            <strong>WhatsApp Chat</strong>
            <small>Fastest Response (+880 1825-222414)</small>
          </div>
        </a>

        <a href="https://m.me/ziabridge" target="_blank" class="comm-item comm-msg">
          <span class="comm-item-icon">&#9889;</span>
          <div class="comm-item-text">
            <strong>Facebook Messenger</strong>
            <small>Connect via Social Media</small>
          </div>
        </a>

        <a href="mailto:ziabridge.bd@gmail.com?subject=ZIABRIDGE%20Business%20Inquiry" class="comm-item comm-email">
          <span class="comm-item-icon">&#9993;</span>
          <div class="comm-item-text">
            <strong>Direct Email</strong>
            <small>ziabridge.bd@gmail.com</small>
          </div>
        </a>

        <a href="https://linkedin.com/company/ziabridge" target="_blank" class="comm-item comm-li">
          <span class="comm-item-icon">&#128084;</span>
          <div class="comm-item-text">
            <strong>LinkedIn Corporate</strong>
            <small>Official Business Network</small>
          </div>
        </a>

        <a href="tel:+8801825222414" class="comm-item comm-phone">
          <span class="comm-item-icon">&#128222;</span>
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
      bottom: 25px;
      left: 25px;
      z-index: 99999;
    }
    .live-comm-trigger {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: linear-gradient(135deg, #00ADB5, #1E3E62);
      border: 2px solid rgba(255,255,255,0.3);
      color: #FFFFFF;
      font-size: 1.5rem;
      cursor: pointer;
      box-shadow: 0 8px 25px rgba(0, 173, 181, 0.5);
      position: relative;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .live-comm-trigger:hover {
      transform: scale(1.08);
      box-shadow: 0 10px 30px rgba(0, 173, 181, 0.7);
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
      bottom: 70px;
      left: 0;
      width: 290px;
      background: rgba(11, 25, 44, 0.95);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 16px;
      padding: 16px;
      box-shadow: 0 16px 40px rgba(0,0,0,0.5);
      display: none;
      flex-direction: column;
      gap: 10px;
      animation: commFadeUp 0.3s ease forwards;
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
      font-size: 1.3rem;
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
    @keyframes commFadeUp {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
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

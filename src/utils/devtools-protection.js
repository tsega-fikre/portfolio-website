// DevTools Detection and Protection
class DevToolsProtection {
  constructor() {
    this.isDevToolsOpen = false;
    this.threshold = 160;
    this.checkInterval = null;
  }

  // Detect DevTools by checking window size differences
  detectDevTools() {
    const widthThreshold = window.outerWidth - window.innerWidth > this.threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > this.threshold;
    
    if (widthThreshold || heightThreshold) {
      if (!this.isDevToolsOpen) {
        this.isDevToolsOpen = true;
        this.onDevToolsOpen();
      }
    } else {
      this.isDevToolsOpen = false;
    }
  }

  // Actions when DevTools is detected
  onDevToolsOpen() {
    // Blur the page content
    document.body.style.filter = 'blur(5px)';
    document.body.style.userSelect = 'none';
    
    // Show warning overlay
    this.showWarning();
  }

  showWarning() {
    const overlay = document.createElement('div');
    overlay.id = 'devtools-warning';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.95);
      z-index: 999999;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #00FF88;
      font-family: monospace;
      font-size: 24px;
      text-align: center;
      padding: 20px;
    `;
    overlay.innerHTML = `
      <div>
        <h1 style="margin-bottom: 20px;">⚠️ Developer Tools Detected</h1>
        <p>Please close DevTools to continue</p>
      </div>
    `;
    
    if (!document.getElementById('devtools-warning')) {
      document.body.appendChild(overlay);
    }
  }

  removeWarning() {
    const overlay = document.getElementById('devtools-warning');
    if (overlay) {
      overlay.remove();
      document.body.style.filter = '';
      document.body.style.userSelect = '';
    }
  }

  // Start monitoring
  start() {
    // Check on load
    this.detectDevTools();
    
    // Check periodically
    this.checkInterval = setInterval(() => {
      this.detectDevTools();
      if (!this.isDevToolsOpen) {
        this.removeWarning();
      }
    }, 500);

    // Disable right-click
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      return false;
    });

    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
    document.addEventListener('keydown', (e) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'J') ||
        (e.ctrlKey && e.shiftKey && e.key === 'C') ||
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault();
        return false;
      }
    });

    // Detect debugger
    setInterval(() => {
      const before = new Date();
      debugger;
      const after = new Date();
      if (after - before > 100) {
        this.onDevToolsOpen();
      }
    }, 1000);

    // Disable console methods in production
    if (import.meta.env.PROD) {
      const noop = () => {};
      console.log = noop;
      console.warn = noop;
      console.error = noop;
      console.info = noop;
      console.debug = noop;
    }
  }

  stop() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }
  }
}

export default DevToolsProtection;
